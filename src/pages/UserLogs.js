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
import axios from "axios";
import React, { useEffect, useState } from "react";
import UserLogsTAble from "../components/UserLogsTable";
import DateFnsUtils from "@date-io/date-fns";
import format from "date-fns/format";
import Swal from "sweetalert2";

const apiURL = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? `${process.env.REACT_APP_BASE_URL_PROD_V1}`
      : `${process.env.REACT_APP_BASE_URL_V1}`,
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
    btn: {
      backgroundColor: "#46005E",
      color: "white",
      margin: theme.spacing(1),
      "&:hover": {
        backgroundColor: "#6a008f",
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

export default function UserLogs() {
  const classes = useStyles();

  const [dropDrawUser, setDropDrawUser] = useState([]);
  const [dropDrawEvent, setDropDrawEvent] = useState([]);
  const [username, setUserName] = useState("");
  const [event, setEvent] = useState("");
  const [selectedDateStart, setSelectedDateStart] = useState(new Date());
  const [selectedDateEnd, setSelectedDateEnd] = useState(new Date());

  const [page, setPage] = useState(1);
  const [dataForTable, setDataForTable] = useState([]);

  const handlePageChange = (event, value) => {
    fetchData(value);
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

    const startDate = format(selectedDateStart, "yyyy-MM-dd");
    const endDate = format(selectedDateEnd, "yyyy-MM-dd");

    const sendData = {
      page: pageId,
      user_id: username,
      eventSelect: event,
      startDate: startDate,
      endDate: endDate,
    };
    console.log("sendData", sendData);

    apiURL.post("/datalogging", sendData).then((res) => {
      Swal.close();
      console.log("res: ", res.data);
      setDataForTable(res.data);
      setDropDrawUser(res.data.dropdownUserId);
      setDropDrawEvent(res.data.dropdownEvents);
    });
    //   .then((res) => setDataForTable(res.data));
  };
  
  useEffect(() => {
    fetchData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <Container maxWidth="xl" className={classes.root}>
      <Typography
        variant="h6"
        style={{ marginBottom: "1rem", fontSize: "0.9rem" }}
      >
        ตั้งค่า : รายงานความเคลื่อนไหวผู้ใช้งาน
      </Typography>
      <Grid
        container
        component={Paper}
        maxWidth="xl"
        className={classes.filterSection}
      >
        <TextField
          select
          variant="outlined"
          className={classes.input}
          label="username"
          value={username}
          onChange={(e) => setUserName(e.target.value)}
          name="username"
        >
          {!!dropDrawUser
            ? dropDrawUser.map((item, index) => (
                <MenuItem key={index} value={item.id}>
                  {item.username}
                </MenuItem>
              ))
            : []}
        </TextField>

        <TextField
          select
          variant="outlined"
          className={classes.input}
          label="สถานะ"
          value={event}
          onChange={(e) => setEvent(e.target.value)}
          name="status_select"
        >
          {!!dropDrawEvent
            ? dropDrawEvent.map((item, index) => (
                <MenuItem key={index} value={item.id}>
                  {item.events_name}
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
            id="startDate"
            label="วันที่เริ่มต้น"
            value={selectedDateStart}
            onChange={(date) => setSelectedDateStart(date)}
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
          />
        </MuiPickersUtilsProvider>

        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            className={classes.input}
            disableToolbar
            variant="inlined"
            inputVariant="outlined"
            format="dd/MM/yyyy"
            margin="normal"
            id="endDate"
            label="วันที่สิ้นสุด"
            value={selectedDateEnd}
            onChange={(date) => setSelectedDateEnd(date)}
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
          />
        </MuiPickersUtilsProvider>

        <Button
          variant="contained"
          className={classes.btn}
          onClick={() => {
            fetchData(1);
          }}
        >
          ดูข้อมูล
        </Button>
      </Grid>

      <Paper style={{ marginTop: "1rem" }}>
        <UserLogsTAble
          dataList={dataForTable}
          page={page}
          onChange={handlePageChange}
        />
      </Paper>
    </Container>
  );
}
