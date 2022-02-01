import DateFnsUtils from "@date-io/date-fns";
import {
  Box,
  Button,
  Container,
  Grid,
  makeStyles,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import {
  KeyboardDatePicker,
  KeyboardTimePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import Swal from "sweetalert2";
import TableAuditDisplay2 from "../components/TableAuditDisplay2";
import DescriptionTwoToneIcon from "@material-ui/icons/DescriptionTwoTone";
import GateTable2 from "../components/GateTable2";
import ClassTable from "../components/ClassTable";
import { getDataExpectIncome, getDropdown } from "../service/allService";
import SearchComponent2 from "../components/SearchComponent2";
import SearchByPlateComponent from "../components/SearchByPlateComponent ";

const useStyles = makeStyles((theme) => {
  return {
    root: {
      backgroundColor: "#f9f9f9",
      paddingTop: 20,
    },
    filterSection: {
      padding: theme.spacing(1),
      marginTop: 10,
      justifyContent: "center",
      alignItems: "center",
    },
    cardSection: {
      marginTop: 10,
    },
    gateAndClassSection: {
      marginTop: 10,
      padding: theme.spacing(2),
      backgroundColor: "white",
      columnGap: "1rem",
      justifyContent: "space-between",
    },
    allTsTable: {
      marginTop: 10,
      padding: theme.spacing(1),
      backgroundColor: "white",
    },
    card: {
      padding: "1rem",
      height: 50,
      paddingTop: 5,
      width: "10%",
    },
    btn: {
      backgroundColor: "#46005E",
      color: "white",
      margin: theme.spacing(1),
      "&:hover": {
        backgroundColor: "#6a008f",
      },
    },
    btn2: {
      backgroundColor: "green",
      color: "white",
      margin: theme.spacing(1),
      "&:hover": {
        backgroundColor: "darkgreen",
      },
    },
    input: {
      "& .MuiInputBase-input": {
        fontSize: "0.8rem",
      },
      "& .MuiSelect-selectMenu": {
        height: 15,
      },
      "& .MuiInputBase-root": {
        height: 40,
      },
      width: 150,
      margin: theme.spacing(1),
      [theme.breakpoints.down("lg")]: {
        width: 150,
      },
    },
    input1: {
      "& .MuiInputBase-input": {
        fontSize: "0.8rem",
      },
      "& .MuiSelect-selectMenu": {
        height: 15,
      },
      "& .MuiInputBase-root": {
        height: 40,
      },
      "& .MuiInputLabel-outlined": {
        // transform: 'translate(14px, 14px) scale(1)',
        // paddingBottom: 20,
        fontSize: "0.8rem",
      },
      width: 150,
      margin: theme.spacing(1),
      [theme.breakpoints.down("lg")]: {
        width: 150,
      },
    },
    typography: {
      fontSize: "0.8rem",
    },
  };
});

export default function ExpectIncome() {
  // const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [allTsTable, setAllTsTable] = useState([]);
  const [checkpoint, setCheckpoint] = useState(1);
  const [status_select, setStatus_select] = useState(0);
  const [selectGate, setSelectGate] = useState(0);
  const [selectCarType, setSelectCarType] = useState(0);
  const [summary, setSummary] = useState([]);
  const [eyesStatus, setEyesStatus] = useState([]);
  const [dropdown, setDropdown] = useState([]);
  const [tsType, setTsType] = useState(0);
  const [transactionId, setTransactionId] = useState("");
  const [endpoint, setEndpoint] = useState("/search-transaction-hq");
  const [province, setProvince] = useState(null);
  const [licensePlate, setLicensePlate] = useState("");
  const [inputValue, setInputValue] = useState("");

  const [selectedDate, setSelectedDate] = useState(
    new Date().setDate(new Date().getDate() - 1)
  );
  const [selectedTimeStart, setSelectedTimeStart] = useState(
    new Date("Aug 10, 2021 00:00:00")
  );
  const [selectedTimeEnd, setSelectedTimeEnd] = useState(
    new Date("Aug 10, 2021 00:00:00")
  );

  const handlePageChange = (event, value) => {
    fetchData(value);
  };
  // const handleOpen = () => {
  //   setOpen(true);
  // };

  const checkFormatSearch = (e) => {
    if (/^m/gi.test(e)) {
      setEndpoint("/search-transaction-match");
    } else if (/^t/gi.test(e)) {
      setEndpoint("/search-transaction-hq");
    } else if (/\d{6}/.test(e)) {
      setEndpoint("/search-transaction-audit");
    }
    console.log(endpoint);
  };

  const fetchData = async (pageId = 1) => {
    let eyes = [];
    Swal.fire({
      title: "Loading",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });
    if (pageId === 1) {
      setPage(1);
    } else {
      setPage(pageId);
    }

    const date = format(selectedDate, "yyyy-MM-dd");
    const timeStart = format(selectedTimeStart, "HH:mm:ss");
    const timeEnd = format(selectedTimeEnd, "HH:mm:ss");

    const sendData = {
      page: pageId.toString(),
      checkpoint: checkpoint.toString() || "0",
      gate: selectGate.toString() || "0",
      state: status_select.toString() || "0",
      vehicleClass: selectCarType.toString() || "0",
      date: date,
      startTime: timeStart,
      endTime: timeEnd,
      status: tsType.toString(),
    };
    console.log(sendData);

    const res = await getDataExpectIncome(sendData);
    if (!!res && res.data.status === false) {
      Swal.fire({
        icon: "error",
        text: "ไม่มีข้อมูล",
      });
      console.log("test");
    }
    if (!!res) {
      setAllTsTable(!!res ? res.data : []);
      setSummary(!!res ? res.data.summary : summary);
    }
    if (!!res && !!res.data.resultsDisplay) {
      for (let i = 0; i <= res.data.resultsDisplay.length - 1; i++) {
        eyes.push({
          state: res.data.resultsDisplay[i].state,
          readFlag: res.data.resultsDisplay[i].readFlag,
          transactionId: res.data.resultsDisplay[i].transactionId,
        });
      }
      setEyesStatus(eyes);
    }

    if (!!res && res.data.status !== false) {
      Swal.close();
    }
  };

  // const refresh = (pageId = 1) => {
  //   Swal.fire({
  //     title: "Loading",
  //     allowOutsideClick: false,
  //     didOpen: () => Swal.showLoading(),
  //   });
  //   if (pageId === 1) {
  //     setPage(1);
  //   } else {
  //     setPage(pageId);
  //   }

  //   setSelectedDate(new Date().setDate(new Date().getDate() - 1));
  //   setCheckpoint(0);
  //   setStatus_select(0);
  //   setSelectedTimeStart(new Date("Aug 10, 2021 00:00:00"));
  //   setSelectedTimeEnd(new Date("Aug 10, 2021 00:00:00"));
  //   const timeStart = "00:00:00";
  //   const timeEnd = "00:00:00";
  //   const date = format(
  //     new Date().setDate(new Date().getDate() - 1),
  //     "yyyy-MM-dd"
  //   );

  //   const sendData = {
  //     page: pageId.toString(),
  //     checkpoint_id: checkpoint.toString() || "0",
  //     gate_id: selectGate.toString() || "0",
  //     state: status_select.toString() || "0",
  //     vehicleClass: selectCarType.toString() || "0",
  //     date: date,
  //     startTime: timeStart,
  //     endTime: timeEnd,
  //     status: tsType.toString(),
  //   };
  //   console.log(sendData);

  //   apiURLv1.post("/expect-income", sendData).then((res) => {
  //     Swal.close();
  //     setAllTsTable({
  //       summary: {
  //         total: 0,
  //         normal: 0,
  //         unMatch: 0,
  //         miss: 0,
  //       },
  //       ts_table: [],
  //     });
  //     console.log(
  //       "res: ",
  //       res.data,
  //       "tsClass:",
  //       res.data.ts_class,
  //       "tsGate: ",
  //       res.data.ts_gate_table,
  //       "ts_Table:",
  //       res.data.ts_table,
  //       "Summary: ",
  //       res.data.summary
  //     );
  //     setAllTsTable(res.data.status !== false ? res.data : []);
  //   });
  // };

  const dataCard = [
    {
      value: !!summary[0] && !!summary[0].ts_total ? summary[0].ts_total : "0",
      status: "total",
      label: "รายการทั้งหมด",
    },
    {
      value:
        !!summary[0] && !!summary[0].ts_normal ? summary[0].ts_normal : "0",
      status: "normal",
      label: "รายการรถปกติ",
    },
    {
      value:
        summary[0] && !!summary[0].ts_not_normal
          ? summary[0].ts_not_normal
          : "0",
      status: "not_normal",
      label: "รายการผิดปกติ",
    },
    {
      value: !!summary[0] && !!summary[0].wait_hq ? summary[0].wait_hq : "0",
      status: "waitPk3",
      label: "รายการรอจัดเก็บ",
    },
    {
      value:
        !!summary[0] && !!summary[0].wait_super ? summary[0].wait_super : "0",
      status: "waitSuper",
      label: "รายการรอSuper",
    },
    {
      value:
        !!summary[0] && !!summary[0].wait_acknowledge
          ? summary[0].wait_acknowledge
          : "0",
      status: "waitToKnow",
      label: "รายการรอรับทราบ",
    },
    {
      value:
        !!summary[0] && !!summary[0].wait_consider
          ? summary[0].wait_consider
          : "0",
      status: "checked",
      label: "รายการตรวจสอบแล้ว",
    },
    {
      value: !!summary[0] && !!summary[0].wait_hq ? summary[0].revenue : "0",
      status: "revenue",
      label: "รายได้พึงได้รายวัน",
    },
  ];

  useEffect(() => {
    // fetchData();
    async function fetchDropdown() {
      const res = await getDropdown();
      setDropdown(res.data);
    }
    fetchDropdown();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const classes = useStyles();
  return (
    <>
      <Container maxWidth="xl" className={classes.root}>
        <Typography variant="h6" style={{ fontSize: "0.9rem" }}>
          ตรวจสอบ (DOH) : รายได้พึงได้รายวัน
        </Typography>

        {/* Filter Section */}
        <Grid container component={Paper} className={classes.filterSection}>
          <TextField
            select
            variant="outlined"
            label="ด่าน"
            value={checkpoint}
            onChange={(e) => setCheckpoint(e.target.value)}
            className={classes.input1}
            name="gate_select"
          >
            {!!dropdown.checkpoint
              ? dropdown.checkpoint
                  .filter((item) => item.id > 0)
                  .map((item, index) => (
                    <MenuItem key={index} value={item.id}>
                      {item.checkpoint_name}
                    </MenuItem>
                  ))
              : []}
          </TextField>

          <TextField
            select
            variant="outlined"
            label="ช่อง"
            value={selectGate}
            onChange={(e) => setSelectGate(e.target.value)}
            className={classes.input1}
            name="gate"
          >
            {!!dropdown.gate
              ? dropdown.gate.map((item, index) => (
                  <MenuItem key={index} value={item.id}>
                    {item.name}
                  </MenuItem>
                ))
              : []}
          </TextField>

          {/* <TextField
            select
            variant="outlined"
            label="ประเภทรถ"
            value={selectCarType}
            onChange={(e) => setSelectCarType(e.target.value)}
            className={classes.input1}
            name="carType"
          >
            {!!dropdown.vehicle
              ? dropdown.vehicle.map((item, index) => (
                  <MenuItem key={index} value={item.id}>
                    {item.class}
                  </MenuItem>
                ))
              : []}
          </TextField> */}

          <TextField
            select
            variant="outlined"
            label="สถานะ"
            value={status_select}
            onChange={(e) => {
              setStatus_select(e.target.value);
            }}
            className={classes.input1}
            name="status_select"
          >
            {!!dropdown.state
              ? dropdown.state.map((item, index) => (
                  <MenuItem key={index} value={item.id}>
                    {item.name}
                  </MenuItem>
                ))
              : []}
          </TextField>

          <TextField
            select
            variant="outlined"
            label="ประเภทTS"
            value={tsType}
            onChange={(e) => {
              setTsType(e.target.value);
            }}
            className={classes.input1}
            name="tsType"
          >
            {!!dropdown.ts_status
              ? dropdown.ts_status.map((item, index) => (
                  <MenuItem key={index} value={item.id}>
                    {item.name}
                  </MenuItem>
                ))
              : []}
          </TextField>

          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              className={classes.input}
              disableToolbar
              variant="inlined"
              inputVariant="outlined"
              format="dd/MM/yyyy"
              margin="normal"
              id="date-picker-inline"
              label="วันที่เข้าด่าน"
              value={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
          </MuiPickersUtilsProvider>

          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardTimePicker
              inputVariant="outlined"
              ampm={false}
              variant="inline"
              label="เวลาเริ่มต้น"
              openTo="hours"
              views={["hours", "minutes", "seconds"]}
              format="HH:mm:ss"
              value={selectedTimeStart}
              onChange={setSelectedTimeStart}
              className={classes.input}
            />
          </MuiPickersUtilsProvider>

          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardTimePicker
              inputVariant="outlined"
              ampm={false}
              variant="inline"
              label="เวลาสิ้นสุด"
              openTo="hours"
              views={["hours", "minutes", "seconds"]}
              format="HH:mm:ss"
              value={selectedTimeEnd}
              onChange={setSelectedTimeEnd}
              className={classes.input}
            />
          </MuiPickersUtilsProvider>

          <Button
            variant="contained"
            className={classes.btn}
            onClick={() => fetchData(1)}
          >
            ดูข้อมูล
          </Button>
          <Button
            variant="contained"
            className={classes.btn2}
            // onClick={() => refresh(1)}
          >
            refresh
          </Button>
        </Grid>

        {/* Card Section */}

        <Paper
          item
          style={{
            display: "flex",
            margin: "10px 0px 0px 0px",
            justifyContent: "center",
          }}
        >
          <Box style={{ marginRight: "0.5rem" }}>
            <SearchComponent2
              value={transactionId}
              date={selectedDate}
              handleOnChange={(e) => {
                setTransactionId(e.target.value);
                checkFormatSearch(e.target.value);
                // console.log(e.target.value);
              }}
              name="search"
              label="transaction id"
              setTable={setAllTsTable}
              endpoint={endpoint}
              setEyesStatus={setEyesStatus}
              eyesStatus={eyesStatus}
            />
          </Box>

          <SearchByPlateComponent
            valuePlate={licensePlate}
            valueProvince={province}
            setProvince={setProvince}
            date={selectedDate}
            handleOnChange={(e) => {
              setLicensePlate(e.target.value);
            }}
            handleOnChangeProvince={(e, newProvince) => {
              setProvince(newProvince);
            }}
            setInputValue={(e) => setInputValue(e.target.value)}
            inputValue={inputValue}
            dropdown={dropdown.province}
            setTable={setAllTsTable}
            endpoint={endpoint}
            setEyesStatus={setEyesStatus}
            eyesStatus={eyesStatus}
          />
        </Paper>

        <Box
          style={{
            display: "flex",
            margin: "10px 0px 0px 0px",
            justifyContent: "space-between",
          }}
        >
          {dataCard.map((card, index) => (
            <Paper
              className={classes.card}
              key={index}
              style={{
                borderLeft:
                  card.status === "total"
                    ? "3px solid gray"
                    : card.status === "normal"
                    ? "3px solid green"
                    : card.status === "revenue"
                    ? "3px solid gold"
                    : card.status === "not_normal"
                    ? "3px solid red"
                    : card.status === "waitPk3"
                    ? "3px solid blue"
                    : card.status === "waitToKnow"
                    ? "3px solid darkviolet"
                    : card.status === "waitSuper"
                    ? "3px solid orange"
                    : card.status === "checked"
                    ? "3px solid lightgreen"
                    : "3px solid lightgrey",
              }}
            >
              <Typography
                style={{
                  color:
                    card.status === "total"
                      ? "gray"
                      : card.status === "normal"
                      ? "green"
                      : card.status === "revenue"
                      ? "gold"
                      : card.status === "not_normal"
                      ? "red"
                      : card.status === "waitPk3"
                      ? "blue"
                      : card.status === "waitToKnow"
                      ? "darkviolet"
                      : card.status === "waitSuper"
                      ? "orange"
                      : card.status === "checked"
                      ? "lightgreen"
                      : "lightgrey",
                  fontSize: "0.9rem",
                }}
              >
                {card.label}
              </Typography>
              <Typography
                style={{
                  fontSize: "1.15rem",
                  fontWeight: 700,
                  textAlign: "center",
                }}
              >
                {!!card.value ? card.value.toLocaleString() : []}
              </Typography>
              <Typography style={{ fontSize: "0.7rem", textAlign: "center" }}>
                {card.status === "revenue" ? " บาท" : " รายการ"}
              </Typography>
            </Paper>
          ))}
        </Box>

        {/* Table Section */}
        <Grid
          container
          component={Paper}
          className={classes.gateAndClassSection}
        >
          <Grid item md={12} sm={12} lg={4} className={classes.gateTable}>
            <GateTable2 dataList={allTsTable} />
          </Grid>
          <Grid item md={12} sm={12} lg={7} className={classes.classTable}>
            <ClassTable dataList={allTsTable} />
          </Grid>
        </Grid>
        <Grid item md={12} sm={12} lg={12} className={classes.allTsTable}>
          <TableAuditDisplay2
            dataList={allTsTable}
            page={page}
            onChange={handlePageChange}
            onFetchData={fetchData}
            dropdown={dropdown}
            checkDate={selectedDate}
            eyesStatus={eyesStatus}
            setEyesStatus={setEyesStatus}
          />
        </Grid>
      </Container>
    </>
  );
}
