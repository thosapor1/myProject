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
import TableSuperdisplay2 from "../components/TableSuperdisplay2";
import DescriptionTwoToneIcon from "@material-ui/icons/DescriptionTwoTone";
import SearchComponent from "../components/SearchComponent";
import {
  getDataSuperaudit,
} from "../service/allService";

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
    label: "????????????????????????",
  },
  {
    id: 1,
    value: 4,
    label: "?????? super audit ?????????????????????",
  },
  {
    id: 2,
    value: 5,
    label: "???????????????????????????",
  },
];

export default function SuperAuditDisplay2() {
  // const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [allTsTable, setAllTsTable] = useState([]);
  const [checkpoint, setCheckpoint] = useState("1");
  const [status_select, setStatus_select] = useState("0");
  const [summary, setSummary] = useState([]);
  const [selectGate, setSelectGate] = useState("0");
  const [selectCarType, setSelectCarType] = useState("0");
  const [dropdown, setDropdown] = useState([]);
  const [tsType, setTsType] = useState(0);
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
  const getCheckpoint = (e) => {
    apiURL.post("/dropdown").then((res) => {
      console.log(res.data);
      setDropdown(res.data);
    });
  };

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
      checkpoint: checkpoint.toString(),
      gate: selectGate,
      state: status_select.toString(),
      vehicleClass: selectCarType,
      date: date,
      startTime: timeStart,
      endTime: timeEnd,
      status: tsType.toString(),
    };
    console.log(sendData);

    const res = await getDataSuperaudit(sendData);
    if (!!res) {
      setAllTsTable(!!res ? res.data : []);
      setSummary(!!res ? res.data.summary : []);
    }
    if (!!res && !res.data.status) {
      Swal.fire({
        icon: "error",
        text: "?????????????????????????????????",
      });
      console.log("test");
    }
    if (!!res && res.data.status !== false) {
      Swal.close();
    }
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
      .post("/display-superaudit-activity2", sendData)
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
          text: "??????????????????????????????????????????????????????????????????????????????????????????????????????????????????",
        });
      });
  };

  const dataCard = [
    {
      value: !!summary.ts_count
        ? summary.ts_count.toLocaleString().toString()
        : "0",
      status: "checklist",
      label: "??????????????????????????????????????????????????????",
    },
    // {
    //   value: !!summary.normal ? summary.normal : 0,
    //   status: "normal",
    //   label: "??????????????????????????????",
    // },
    // {
    //   value: !!summary.unMatch ? summary.unMatch : 0,
    //   status: "unMatch",
    //   label: "???????????????????????????????????????????????????????????????",
    // },
    // {
    //   value: !!summary.miss ? summary.miss : 0,
    //   status: "miss",
    //   label: "????????????????????????????????????",
    // },
  ];

  useEffect(() => {
    // fetchData();
    getCheckpoint();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const classes = useStyles();
  return (
    <>
      <Container maxWidth="xl" className={classes.root}>
        <Typography variant="h6" style={{ fontSize: "0.9rem" }}>
          super audit display
        </Typography>

        {/* Filter Section */}
        <Grid container component={Paper} className={classes.filterSection}>
          <TextField
            select
            variant="outlined"
            label="????????????"
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
            label="????????????"
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
            label="????????????????????????"
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
            label="???????????????"
            value={status_select}
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
            label="??????????????????TS"
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
              label="??????????????????????????????????????????"
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
              label="????????????????????????????????????"
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
              label="?????????????????????????????????"
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
            ????????????????????????
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

          <Grid container style={{ display: "flex", columnGap: "0.8rem" }}>
            {dataCard.map((card, index) => (
              <Grid
                item
                component={Paper}
                key={index}
                lg={4}
                className={classes.card}
                style={{
                  borderLeft:
                    card.status === "total"
                      ? "3px solid gray"
                      : card.status === "normal"
                      ? "3px solid green"
                      : card.status === "unMatch"
                      ? "3px solid orange"
                      : "3px solid red",
                }}
              >
                <Grid
                  container
                  justifyContent="space-around"
                  alignItems="center"
                >
                  <Grid item>
                    <Typography
                      style={{
                        color:
                          card.status === "total"
                            ? "gray"
                            : card.status === "normal"
                            ? "green"
                            : card.status === "unMatch"
                            ? "orange"
                            : "red",
                        fontSize: "1rem",
                        fontWeight: 700,
                      }}
                    >
                      {card.label}
                    </Typography>
                    <Typography style={{ fontSize: "1rem" }}>
                      {card.value}
                      {card.status === "revenue" ? ` ?????????` : ` ??????????????????`}
                    </Typography>
                  </Grid>
                  <Grid>
                    <DescriptionTwoToneIcon />
                  </Grid>
                </Grid>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Table Section */}
        <Grid
          container
          component={Paper}
          className={classes.gateAndClassSection}
        >
          <Grid item md={12} sm={12} lg={12} className={classes.allTsTable}>
            <TableSuperdisplay2
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
