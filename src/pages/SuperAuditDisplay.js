import DateFnsUtils from "@date-io/date-fns";
import {
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
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DescriptionTwoToneIcon from "@material-ui/icons/DescriptionTwoTone";
import { KeyboardTimePicker } from "@material-ui/pickers";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { format } from "date-fns";
import AllTsTableForSuperAdminActivity from "../components/AllTsTableForSuperAdminActivity";
import Swal from "sweetalert2";

const apiURL = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? `${process.env.REACT_APP_BASE_URL_PROD_V3}`
      : `${process.env.REACT_APP_BASE_URL_V3}`,
});

const useStyles = makeStyles((theme) => {
  return {
    "@global": {
      "*::-webkit-scrollbar": {
        width: "0.3em",
      },
      "*::-webkit-scrollbar-track": {
        "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.00)",
      },
      "*::-webkit-scrollbar-thumb": {
        backgroundColor: "rgba(0,0,0,.1)",
        outline: "1px  lightgray",
      },
    },
    root: {
      backgroundColor: "#f9f9f9",
      paddingTop: 20,
    },
    filterSection: {
      padding: theme.spacing(2),
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
      height: 300,
      padding: theme.spacing(2),
      backgroundColor: "white",
    },
    allTsTable: {
      marginTop: 10,
      padding: theme.spacing(2),
      backgroundColor: "white",
    },
    card: {
      width: 290,
      height: 100,
      display: "flex",
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
      width: 150,
      margin: theme.spacing(1),
      [theme.breakpoints.down("lg")]: {
        width: 150,
      },
    },
  };
});

const valueStatus = [
  {
    id: "1",
    value: "1",
    label: "ปกติ",
  },
  {
    id: "2",
    value: "2",
    label: "ข้อมูลไม่ตรงกัน",
  },
  {
    id: "3",
    value: "3",
    label: "ข้อมูลสูญหาย",
  },
];

export default function AuditDisplay() {
  const [allTsTable, setAllTsTable] = useState("");
  const [summary, setSummary] = useState("");
  const [checkpoint, setCheckpoint] = useState("");
  const [status_select, setStatus_select] = useState("");
  const [valueMenuItem, setValueMenuItem] = useState([]);
  const [selectedDate, setSelectedDate] = useState(
    new Date().setDate(new Date().getDate() - 1)
  );
  const [selectedTimeStart, setSelectedTimeStart] = useState(
    new Date("Aug 10, 2021 00:00:00")
  );
  const [selectedTimeEnd, setSelectedTimeEnd] = useState(
    new Date("Aug 10, 2021 00:00:00")
  );
  const [page, setPage] = useState(1);

  const dataCard = [
    {
      value: summary.ts_not_normal,
      status: "ts_not_normal",
      label: "จำนวนรายการตรวจสอบ",
    },
  ];

  const handlePageChange = (value) => {
    fetchData(!!value ? value : 1);
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
    // const date = '2021-08-10';
    const timeStart = format(selectedTimeStart, "HH:mm:ss");
    const timeEnd = format(selectedTimeEnd, "HH:mm:ss");

    const sendData = {
      page: pageId,
      checkpoint_id: checkpoint,
      datetime: date,
      startTime: timeStart,
      endTime: timeEnd,
    };
    // console.log(`sendData: ${JSON.stringify(sendData)}`);
    apiURL.post("/display-superaudit", sendData).then((res) => {
      Swal.close();
      console.log(
        "res: ",
        res.data,
        "ts_Table:",
        res.data.ts_table,
        "Summary: ",
        res.data.summary
      );
      setSummary(res.data.status !== false ? res.data.summary : "");
      setAllTsTable(res.data.status !== false ? res.data : "");
      setValueMenuItem(
        res.data.status !== false ? res.data.dropdown_Checkpoint : []
      );
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
    setSelectedTimeStart(new Date("Aug 10, 2021 00:00:00"));
    setSelectedTimeEnd(new Date("Aug 10, 2021 00:00:00"));
    const date = format(
      new Date().setDate(new Date().getDate() - 1),
      "yyyy-MM-dd"
    );
    // const date = '2021-08-10'
    const timeStart = "00:00:00";
    const timeEnd = "00:00:00";

    const sendData = {
      page: pageId,
      checkpoint_id: checkpoint,
      datetime: date,
      startTime: timeStart,
      endTime: timeEnd,
    };
    console.log(`sendData: ${JSON.stringify(sendData)}`);
    apiURL.post("/display-superaudit", sendData).then((res) => {
      Swal.close();
      console.log(
        "res: ",
        res.data,
        "ts_Table:",
        res.data.ts_table,
        "Summary: ",
        res.data.summary
      );
      setSummary(res.data.status !== false ? res.data.summary : "");
      setAllTsTable(res.data.status !== false ? res.data : "");
    });
  };

  useEffect(() => {
    fetchData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const classes = useStyles();
  return (
    <>
      <Container maxWidth="xl" className={classes.root}>
        <Typography variant="h6" style={{ fontSize: "0.9rem" }}>
          super admin display
        </Typography>

        {/* Filter Section */}
        <Grid
          container
          component={Paper}
          maxWidth="xl"
          className={classes.filterSection}
        >
          <TextField
            variant="outlined"
            className={classes.input}
            select
            label="ด่าน"
            value={checkpoint}
            onChange={(e) => setCheckpoint(e.target.value)}
            name="gate_select"
          >
            {valueMenuItem.map((item, index) => (
              <MenuItem key={index} value={item.id}>
                {item.checkpoint_name}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            variant="outlined"
            className={classes.input}
            select
            label="สถานะ"
            value={status_select}
            onChange={(e) => setStatus_select(e.target.value)}
            name="status_select"
            disabled
          >
            {valueStatus.map((item, index) => (
              <MenuItem key={index} value={item.value}>
                {item.label}
              </MenuItem>
            ))}
          </TextField>

          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              inputVariant="outlined"
              className={classes.input}
              disableToolbar
              variant="inlined"
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
              className={classes.input}
              ampm={false}
              variant="inline"
              label="เวลาเริ่มต้น"
              openTo="hours"
              views={["hours", "minutes", "seconds"]}
              format="HH:mm:ss"
              value={selectedTimeStart}
              onChange={setSelectedTimeStart}
            />
          </MuiPickersUtilsProvider>

          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardTimePicker
              inputVariant="outlined"
              className={classes.input}
              ampm={false}
              variant="inline"
              label="เวลาสิ้นสุด"
              openTo="hours"
              views={["hours", "minutes", "seconds"]}
              format="HH:mm:ss"
              value={selectedTimeEnd}
              onChange={setSelectedTimeEnd}
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
        <div className={classes.cardSection}>
          {dataCard.map((card, index) => (
            <Paper
              key={index}
              className={classes.card}
              style={{
                borderLeft:
                  card.status === "ts_total"
                    ? "3px solid gray"
                    : card.status === "ts_normal"
                    ? "3px solid gray"
                    : card.status === "ts_not_normal"
                    ? "3px solid orange"
                    : "3px solid green",
              }}
            >
              <Grid container justifyContent="space-around" alignItems="center">
                <Grid item>
                  <Typography
                    style={{
                      fontSize: "0.8rem",
                      color:
                        card.status === "ts_total"
                          ? "gray"
                          : card.status === "ts_normal"
                          ? "gray"
                          : card.status === "ts_not_normal"
                          ? "orange"
                          : "green",
                    }}
                  >
                    {card.label}
                  </Typography>
                  <Typography style={{ fontSize: "0.8rem" }}>
                    {card.value} {card.status === "revenue" ? "บาท" : "รายการ"}
                  </Typography>
                </Grid>
                <Grid>
                  <DescriptionTwoToneIcon />
                </Grid>
              </Grid>
            </Paper>
          ))}
        </div>

        {/* Table Section */}

        <div className={classes.allTsTable}>
          <AllTsTableForSuperAdminActivity
            dataList={allTsTable}
            page={page}
            onChange={handlePageChange}
            onFetchData={fetchData}
          />
        </div>
      </Container>
    </>
  );
}
