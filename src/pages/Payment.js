import DateFnsUtils from "@date-io/date-fns";
import {
  Box,
  Button,
  Container,
  Grid,
  makeStyles,
  Paper,
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
import SearchComponent from "../components/SearchComponent";
import DescriptionTwoToneIcon from "@material-ui/icons/DescriptionTwoTone";
import { getDataMonitor, getDropdown } from "../service/allService";
import TablePayment from "../components/TablePayment";

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
      display: "flex",
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
      height: 112,
      paddingTop: 30,
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
      width: 155,
      margin: theme.spacing(1),
      [theme.breakpoints.down("lg")]: {
        width: 155,
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

export default function Payment() {
  // const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [allTsTable, setAllTsTable] = useState([]);
  //   const [checkpoint, setCheckpoint] = useState(1);
  //   const [status_select, setStatus_select] = useState(0);
  //   const [selectGate, setSelectGate] = useState(0);
  //   const [selectCarType, setSelectCarType] = useState(0);
  const [summary, setSummary] = useState([]);
  const [eyesStatus, setEyesStatus] = useState([]);

  const [dropdown, setDropdown] = useState([]);
  //   const [tsType, setTsType] = useState(0);
  const [transactionId, setTransactionId] = useState("");

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

  const fetchData = async (pageId = 1) => {
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
      //   checkpoint: checkpoint.toString() || "0",
      //   gate: selectGate.toString() || "0",
      //   state: status_select.toString() || "0",
      //   vehicleClass: selectCarType.toString() || "0",
      date: date,
      startTime: timeStart,
      endTime: timeEnd,
      //   status: tsType.toString(),
    };
    // console.log(sendData);

    const res = await getDataMonitor(sendData);

    if (!!res) {
      // console.log(res.data.result_card);
      setAllTsTable(!!res ? res.data : []);
      setSummary(!!res.data.result_card ? res.data.result_card[0] : summary);
    }
    if (!!res && !res.data.status) {
      Swal.fire({
        icon: "error",
        text: "ไม่มีข้อมูล",
      });
      // console.log("test");
    }
    if (!!res && res.data.status !== false) {
      Swal.close();
    }

    // console.log(eyesStatus);
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
    // {
    //   value:
    //     !!summary && !!summary.count_billing
    //       ? summary.count_billing.toLocaleString().toString()
    //       : "0",
    //   status: "total",
    //   label: "จำนวนรายการแจ้งหนี้",
    //   type: "label",
    // },
    {
      value:
        !!summary && !!summary.count
          ? summary.count.toLocaleString().toString()
          : "0",
      status: "normal",
      label: "จำนวนรายการ",
      type: "รายการ",
    },
    {
      value:
        !!summary && !!summary.sum_fee
          ? summary.sum_fee.toLocaleString().toString()
          : "0",
      status: "not_normal",
      label: "จำนวนเงิน",
      type: "money",
    },
    // {
    //   value:
    //     !!summary && !!summary.overdue
    //       ? summary.overdue.toLocaleString().toString()
    //       : "0",
    //   status: "revenue",
    //   label: "ค้างจ่าย",
    //   type: "money",
    // },
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
          รายการชำระรายวัน
        </Typography>

        {/* Filter Section */}
        <Grid container component={Paper} className={classes.filterSection}>
          {/* <TextField
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
          </TextField> */}

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

          {/* <TextField
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
          </TextField> */}

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

          {/* <MuiPickersUtilsProvider utils={DateFnsUtils}>
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
          </MuiPickersUtilsProvider> */}

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
        <Box className={classes.cardSection}>
          <Box style={{ marginRight: "0.8rem" }}>
            <SearchComponent
              value={transactionId}
              date={selectedDate}
              handleOnChange={(e) => {
                setTransactionId(e.target.value);
                console.log(transactionId);
              }}
              name="search"
              label="transaction id"
              setTable={setAllTsTable}
              endpoint="/audit-search"
            />
          </Box>
          <Grid
            container
            style={{ display: "flex", columnGap: "0.8rem", rowGap: "0.8rem" }}
          >
            {dataCard.map((card, index) => (
              <Grid
                item
                component={Paper}
                key={index}
                lg={3}
                md={5}
                xs={5}
                className={classes.card}
                style={{
                  borderLeft:
                    card.status === "total"
                      ? "3px solid gray"
                      : card.status === "normal"
                      ? "3px solid green"
                      : card.status === "not_normal"
                      ? "3px solid red"
                      : card.status === "revenue"
                      ? "3px solid orange"
                      : "3px solid lightgrey",
                }}
              >
                <Grid
                  container
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Grid item lg={10} md={12} sm={12}>
                    <Typography
                      style={{
                        color:
                          card.status === "total"
                            ? "gray"
                            : card.status === "normal"
                            ? "green"
                            : card.status === "not_normal"
                            ? "red"
                            : card.status === "revenue"
                            ? "orange"
                            : "lightgrey",
                        fontSize: "1rem",
                        fontWeight: 700,
                      }}
                    >
                      {card.label}
                    </Typography>
                    <Typography style={{ fontSize: "1rem" }}>
                      {!!card.value ? card.value.toLocaleString() : []}
                      {card.type === "money" ? " บาท" : " รายการ"}
                    </Typography>
                  </Grid>
                  <Grid item lg={2} md={12} sm={12}>
                    <DescriptionTwoToneIcon />
                  </Grid>
                </Grid>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Table Section */}

        <Grid item md={12} sm={12} lg={12} className={classes.allTsTable}>
          <TablePayment
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
