import {
  Button,
  Container,
  Divider,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Paper from "@material-ui/core/Paper";
import LinearProgress from "@material-ui/core/LinearProgress";
import { format } from "date-fns";
import { th } from "date-fns/locale";
import axios from "axios";
import Swal from "sweetalert2";
import TableDashBoard2 from "../components/TableDashBorad2";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { getDataDashBoard } from "../service/allService";

const apiURL = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? `${process.env.REACT_APP_BASE_URL_PROD_V3}`
      : `${process.env.REACT_APP_BASE_URL_V3}`,
});

const useStyle = makeStyles((theme) => {
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
      display: "flex",
      backgroundColor: "#f9f9f9",
      paddingTop: 20,
    },

    card: {
      marginTop: 10,
      paddingTop: 10,
      paddingBottom: 8,
      textAlign: "center",
      borderRadius: 10,
      [theme.breakpoints.only["md"]]: {
        padding: 100,
      },
    },
    cardPopup: {
      width: "65%",
      marginRight: "auto",
      marginLeft: "auto",
      marginTop: 10,
      paddingTop: 10,
      paddingBottom: 10,
      height: "30vh",
      borderRadius: 10,
      display: "sticky",
      padding: 20,
      fontSize: "0.8rem",
      [theme.breakpoints.down("md")]: {
        marginBottom: 10,
        width: "45%",
      },
    },
    cardContainer: {
      [theme.breakpoints.down("md")]: {
        justifyContent: "space-evenly",
      },
    },
    btnContainer: {
      display: "flex",
      justifyContent: "space-between",
      marginTop: 20,
      width: "80%",
      marginRight: "auto",
      marginLeft: "auto",
    },
    calendar: {
      "& .fc": {
        fontFamily: "Prompt",
      },
    },
    progress: {
      width: "90%",
      marginRight: "auto",
      marginLeft: "auto",
      marginBottom: "1rem",
      "& .MuiLinearProgress-barColorPrimary": {
        backgroundColor: "green",
      },
    },
    inPopup: {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: "0.5rem",
    },
    orderList: {
      backgroundColor: "#75338c",
      marginBottom: 10,
      [theme.breakpoints.down("md")]: {},
    },
    filterSection: {
      padding: theme.spacing(1),
      paddingLeft: "35%",
      marginBottom: 10,
      [theme.breakpoints.only("sm")]: {
        paddingLeft: "27%",
      },
    },
    btn: {
      backgroundColor: "#46005E",
      color: "white",
      margin: theme.spacing(1),
      "&:hover": {
        backgroundColor: "#6a008f",
      },
    },
    tableSection: {},
    textField: {
      "& .MuiInputBase-input": {
        fontSize: "0.8rem",
      },
      "& .MuiSelect-selectMenu": {
        height: 15,
      },
      "& .MuiOutlinedInput-input": {
        padding: "12px 14px",
      },
      // width: 150,
      margin: theme.spacing(1),
      [theme.breakpoints.down("lg")]: {
        // width: 150,
      },
    },
  };
});

export default function DashBoard2() {
  let dateArray = [];
  let valueArray = [];

  const classes = useStyle();

  const [popUP, setPopUP] = useState({
    status: "",
    C1: 0,
    c1SumAmount: 0,
    C2: 0,
    c2SumAmount: 0,
    C3: 0,
    c3SumAmount: 0,
    reject: 0,
    countReject: 0,
    sumAmountallClass: 0,
    percentC1: 0,
    percentC2: 0,
    percentC3: 0,
    percentReject: 0,
  });
  const [cardData, setCardData] = useState([{}]);
  const [visible, setVisible] = useState("hidden");
  const [dataTable, setDataTable] = useState([]);
  const [selectedDate, setSelectedDate] = useState(
    new Date().setDate(new Date().getDate() - 1)
  );

  const handleClickDate = async (date) => {
    // console.log(date.dateStr);
    setVisible("visible");
    const res = await apiURL.post("/dashboard-listview", {
      date: date.dateStr,
    });
    setPopUP(res.data);
    console.log(res.data);
    return [
      {
        label: "C1",
        value: popUP.C1,
        sumValue: popUP.c1SumAmount,
      },
      {
        label: "C2",
        value: popUP.C2,
        sumValue: popUP.c2SumAmount,
      },
      {
        label: "C3",
        value: popUP.C3,
        sumValue: popUP.c3SumAmount,
      },
      {
        label: "รายได้รายวัน",
        value: popUP.reject,
        sumValue: popUP.countReject,
      },
    ];
  };

  // const getPopUpData = (dataInMonth) => {
  //   let data = [
  //     {
  //       label: "จำนวนรายการทั้งหมดของเดือน",
  //       value: dataInMonth.st_total,
  //       color: "gary",
  //     },
  //     {
  //       label: "จำนวนรายการตรวจสอบ",
  //       value: dataInMonth.st_wait,
  //       color: "red",
  //     },

  //     {
  //       label: "จำนวนรายการตรวจสอบแก้ไขแล้ว",
  //       value: dataInMonth.st_edited,
  //       color: "orange",
  //     },

  //     {
  //       label: "จำนวนรายการตรวจสอบเสร็จสิ้น",
  //       value: dataInMonth.st_finish,
  //       color: "green",
  //     },
  //   ];

  //   setCardData(data);
  //   console.log(cardData);
  // };

  const getChartData = (dataInMonth) => {
    if (!!dataInMonth) {
      dataInMonth.map((data) => {
        if (!!data.date) dateArray.push(data.date.slice(-2));
        valueArray.push(data.ts_count_all);
        return console.log("success");
      });
    }
  };

  const fetchData = async (month = format(new Date(), "yyyy-MM")) => {
    Swal.fire({
      title: "Loading",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    month = format(selectedDate, "yyyy-MM");
    const sendData = { date: month };
    const res = await getDataDashBoard(sendData);
    if (!!res) {
      setDataTable(!!res ? res.data : []);
      getChartData(!!res ? res.data.month : []);
      // getPopUpData(!!res ? res.data : []);
    }

    if (!!res && res.data.status === false) {
      Swal.fire({
        icon: "error",
        text: "ไม่มีข้อมูล",
      });
    }
    if (!!res && res.data.status !== false) {
      Swal.close();
    }
  };

  useEffect(() => {
    fetchData();
    console.log(new Date().toLocaleDateString("th-TH"));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Container maxWidth="xl" className={classes.root}>
      <Grid container spacing={1}>
        <Grid item lg={12} md={12} sm={12}>
          <Typography variant="h6" style={{ fontSize: "0.9rem" }}>
            ข้อมูลประจำเดือน
            {/* {format(selectedDate, "MMMM yyyy", {
              locale: th,
            })} */}
          </Typography>
        </Grid>
        <Grid item lg={12} md={12} sm={12}>
          <Grid item component={Paper} className={classes.filterSection}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                inputVariant="outlined"
                className={classes.textField}
                disableToolbar
                views={["year", "month"]}
                variant="inlined"
                format="MM/yyyy"
                margin="normal"
                id="date"
                label="เดือน"
                value={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
                // onClose={() => fetchData(format(selectedDate, "yyyy-MM"))}
              />
            </MuiPickersUtilsProvider>
            <Button className={classes.btn} onClick={() => fetchData()}>
              ดูข้อมูล
            </Button>
          </Grid>
          <Grid
            component={Paper}
            item
            style={{
              marginRight: "auto",
              marginLeft: "auto",
              padding: "1rem",
              marginBottom: 10,
            }}
          >
            <TableDashBoard2 dataList={dataTable} onFetchData={fetchData} />
          </Grid>
        </Grid>

        {/* <Grid
          component={Paper}
          item
          lg={2}
          md={12}
          sm={12}
          className={classes.orderList}
        >
          <Typography
            variant="h6"
            align="center"
            style={{ marginTop: "1rem", color: "white", fontSize: "0.9rem" }}
          >
            รายการ
          </Typography>

          <Grid
            container
            justifyContent="center"
            className={classes.cardContainer}
          >
            {!!cardData
              ? cardData.map((card, index) => (
                  <Grid
                    key={index}
                    item
                    component={Paper}
                    sm={5}
                    md={5}
                    lg={10}
                    className={classes.card}
                  >
                    <Typography style={{ fontSize: "0.75rem" }}>
                      {card.label}
                    </Typography>
                    <Divider
                      variant="middle"
                      style={{ marginTop: 10, marginBottom: 10 }}
                    />
                    <Typography
                      style={{ color: card.color, fontSize: "0.75rem" }}
                      variant="subtitle2"
                    >
                      {card.value}
                    </Typography>
                  </Grid>
                ))
              : [{}]}
          </Grid>

          <Paper
            elevation={2}
            className={classes.cardPopup}
            style={{ visibility: visible }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "1rem",
              }}
            >
              <Typography variant="subtitle2" style={{ fontSize: "0.9rem" }}>
                รายได้พึงได้รายวัน
              </Typography>
              <Typography variant="subtitle2" style={{ fontSize: "0.9rem" }}>
                {popUP.sumAmountallClass}
              </Typography>
            </div>
            <div>
              <Divider
                variant="middle"
                style={{ marginTop: 10, marginBottom: "1rem" }}
              />
            </div>

            <div className={classes.inPopup}>
              <Typography style={{ fontSize: "0.8rem" }}>
                C1 ({popUP.C1}) : {popUP.c1SumAmount}
              </Typography>
              <Typography style={{ fontSize: "0.8rem" }}>
                {popUP.percentC1}%
              </Typography>
            </div>
            <LinearProgress
              variant="determinate"
              value={popUP.percentC1}
              className={classes.progress}
            />

            <div className={classes.inPopup}>
              <Typography style={{ fontSize: "0.8rem" }}>
                C2 ({popUP.C2}) : {popUP.c2SumAmount}
              </Typography>
              <Typography style={{ fontSize: "0.8rem" }}>
                {popUP.percentC2}%
              </Typography>
            </div>
            <div>
              <LinearProgress
                variant="determinate"
                value={popUP.percentC2}
                className={classes.progress}
              />
            </div>

            <div className={classes.inPopup}>
              <Typography style={{ fontSize: "0.8rem" }}>
                C3 ({popUP.C3}) : {popUP.c3SumAmount}
              </Typography>
              <Typography style={{ fontSize: "0.8rem" }}>
                {popUP.percentC3}%
              </Typography>
            </div>
            <div>
              <LinearProgress
                variant="determinate"
                value={popUP.percentC3}
                className={classes.progress}
              />
            </div>

            <div className={classes.inPopup}>
              <Typography style={{ fontSize: "0.8rem" }}>
                รายได้รายวัน : {popUP.reject}
              </Typography>
              <Typography style={{ fontSize: "0.8rem" }}>
                {popUP.percentReject}%
              </Typography>
            </div>
            <div>
              <LinearProgress
                variant="determinate"
                value={popUP.percentReject}
                className={classes.progress}
              />
            </div>
          </Paper>
          <div>{}</div>

          <div className={classes.btnContainer}>
            <Button variant="contained" color="primary" size="small">
              พิมพ์รายงาน
            </Button>
            <Button variant="contained" color="primary" size="small">
              ดูข้อมูลทั้งหมด
            </Button>
          </div>
        </Grid> */}
      </Grid>
    </Container>
  );
}
