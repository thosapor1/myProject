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
import axios from "axios";
import { format } from "date-fns";
import Swal from "sweetalert2";
import TableMandatoryItem from "../components/TableMandatoryItem";
import SearchComponent from "../components/SearchComponent";
const apiURL = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? `${process.env.REACT_APP_BASE_URL_PROD_V1}`
      : `${process.env.REACT_APP_BASE_URL_V1}`,
});

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
      justifyContent: "space-between",
      marginTop: 10,
    },
    gateAndClassSection: {
      marginTop: 10,
      padding: theme.spacing(2),
      backgroundColor: "white",
    },
    allTsTable: {
      padding: theme.spacing(1),
      backgroundColor: "white",
    },
    card: {
      padding: "1rem",
      height: 80,
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

const valueStatus = [
  {
    id: 0,
    value: 0,
    label: "ทุกสถานะ",
  },
];

export default function MandatoryItem() {
  // const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [allTsTable, setAllTsTable] = useState([]);
  const [checkpoint, setCheckpoint] = useState("0");
  const [status_select, setStatus_select] = useState("0");
  // const [status, setStatus] = useState(0);
  // const [subState, setSubState] = useState(0);
  const [selectGate, setSelectGate] = useState("0");
  const [selectCarType, setSelectCarType] = useState("0");
  const [cardData, setCardData] = useState("");
  const [dropdown, setDropdown] = useState([]);
  const [tsType, setTsType] = useState("0");
  const [transactionId, setTransactionId] = useState("");
  // const [selectedDate, setSelectedDate] = useState(
  //   new Date("Sep 01, 2021")
  // );
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
  const getCheckpoint = (e) => {
    apiURL.post("/dropdown").then((res) => {
      console.log(res.data);
      setDropdown(res.data);
    });
  };

  const fetchData = (pageId = 1) => {
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

    // console.log(checkpoint);
    // console.log(selectGate);
    // console.log(selectCarType);
    // console.log(status_select);
    const sendData = {
      page: pageId,
      checkpoint_id: checkpoint,
      gate_id: selectGate,
      state: status_select,
      vehicleClass: selectCarType,
      date: date,
      startTime: timeStart,
      endTime: timeEnd,
      status: tsType.toString(),
    };
    console.log(sendData);

    apiURL
      .post("/pk3-force-display", sendData)
      .then((res) => {
        Swal.close();
        setAllTsTable({
          summary: {
            total: 0,
            normal: 0,
            unMatch: 0,
            miss: 0,
          },
          ts_table: [],
        });
        console.log(
          "res: ",
          res.data,
          "ts_Table:",
          res.data.ts_table,
          "Summary: ",
          res.data.summary
        );

        setAllTsTable(res.data.status !== false ? res.data : []);
        setCardData(res.data.status !== false ? res.data.summary : []);
      })
      .catch((error) => {
        // handleClose();
        Swal.fire({
          icon: "error",
          text: "ไม่สามารถเชื่อมต่อเซิฟเวอร์ได้ในขณะนี้",
        });
      });
  };

  const refresh = (pageId = 1) => {
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

    setSelectedDate(new Date().setDate(new Date().getDate() - 1));
    setCheckpoint(0);
    setStatus_select(0);
    setSelectedTimeStart(new Date("Aug 10, 2021 00:00:00"));
    setSelectedTimeEnd(new Date("Aug 10, 2021 00:00:00"));
    const timeStart = "00:00:00";
    const timeEnd = "00:00:00";
    const date = format(
      new Date().setDate(new Date().getDate() - 1),
      "yyyy-MM-dd"
    );

    const sendData = {
      page: pageId,
      checkpoint_id: "0",
      datetime: date,
      startTime: timeStart,
      endTime: timeEnd,
      state: "0",
    };

    apiURL
      .post("/display-pk3-activity", sendData)
      .then((res) => {
        Swal.close();
        setAllTsTable({
          summary: {
            total: 0,
            normal: 0,
            unMatch: 0,
            miss: 0,
          },
          ts_table: [],
        });
        console.log(
          "res: ",
          res.data,
          "tsClass:",
          res.data.ts_class,
          "tsGate: ",
          res.data.ts_gate_table,
          "ts_Table:",
          res.data.ts_table,
          "Summary: ",
          res.data.summary
        );
        setAllTsTable(res.data.status !== false ? res.data : []);
      })
      .catch((error) => {
        // handleClose();
        Swal.fire({
          icon: "error",
          text: "ไม่สามารถเชื่อมต่อเซิฟเวอร์ได้ในขณะนี้",
        });
      });
  };

  useEffect(() => {
    // fetchData();
    getCheckpoint();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const classes = useStyles();
  return (
    <>
      <Container maxWidth="xl" className={classes.root}>
        <Typography variant="h6" style={{ fontSize: "0.9rem" }}>
          รายการบังคับ
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
              ? dropdown.checkpoint.map((item, index) => (
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

          <TextField
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
          </TextField>

          <TextField
            select
            variant="outlined"
            label="สถานะ"
            value={status_select}
            disabled
            onChange={(e) => {
              setStatus_select(e.target.value);
            }}
            className={classes.input1}
            name="status_select"
          >
            {!!valueStatus
              ? valueStatus.map((item, index) => (
                  <MenuItem key={index} value={item.value}>
                    {item.label}
                  </MenuItem>
                ))
              : []}
          </TextField>

          <TextField
            select
            variant="outlined"
            label="ประเภทTS"
            disabled
            value={tsType}
            onChange={(e) => {
              setTsType(e.target.value);
            }}
            className={classes.input1}
            name="tsType"
          >
            {!!dropdown.ts_status
              ? dropdown.ts_status
                  .filter(
                    (item) => item.id === 0 || item.id === 2 || item.id === 3
                  )
                  .map((item, index) => (
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
            onClick={() => refresh(1)}
          >
            refresh
          </Button>
        </Grid>

        {/* Card Section */}
        <Box className={classes.cardSection}>
          <Box>
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
          <Box style={{ display: "flex" }}>
            <Paper className={classes.card} style={{ marginLeft: 10 }}>
              <Typography className={classes.typography}>
                {`รายได้ประมาณการ : ${
                  !!cardData.revenue ? cardData.revenue.toLocaleString() : 0
                }`}
              </Typography>
              <Typography className={classes.typography}>
                ชำระแล้ว : 0
              </Typography>
              <Typography className={classes.typography}>
                ค้างชำระ : 0
              </Typography>
            </Paper>
          </Box>
        </Box>
        {/* Table Section */}
        <Grid
          container
          component={Paper}
          className={classes.gateAndClassSection}
        >
          <Grid item md={12} sm={12} lg={12} className={classes.allTsTable}>
            <TableMandatoryItem
              dataList={allTsTable}
              page={page}
              onChange={handlePageChange}
              onFetchData={fetchData}
              dropdown={dropdown}
              checkDate={selectedDate}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
