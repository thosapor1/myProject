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
import { format, set } from "date-fns";
import Swal from "sweetalert2";
import DescriptionTwoToneIcon from "@material-ui/icons/DescriptionTwoTone";
import TableMonitor from "../components/TableMonitorData";

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
      padding: "0.5rem",
      height: 80,
      paddingTop: 20,
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
      width: 165,
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

export default function MonitorData() {
  const creactObject = (name) => {
    return {
      name: `${name}`,

      "01:00": 0,
      "02:00": 0,
      "03:00": 0,
      "04:00": 0,
      "05:00": 0,
      "06:00": 0,
      "07:00": 0,
      "08:00": 0,
      "09:00": 0,
      "10:00": 0,
      "11:00": 0,
      "12:00": 0,
      "13:00": 0,
      "14:00": 0,
      "15:00": 0,
      "16:00": 0,
      "17:00": 0,
      "18:00": 0,
      "19:00": 0,
      "20:00": 0,
      "21:00": 0,
      "22:00": 0,
      "23:00": 0,
      "00:00": 0,
    };
  };

  let TableDataHQ = creactObject("MFLane");
  let TableDataHQ2 = creactObject("HQ");
  let TableDataHQ3 = creactObject("ผลต่างข้อมูล(MF-HQ)");
  let TableDataTypeHQ = creactObject("Member");
  let TableDataTypeHQ2 = creactObject("Non-Member");
  let TableDataTypeHQ3 = creactObject("Non-Charge");
  let TableDataTypeHQ4 = creactObject("Illegal");
  let TableDataTypeHQ5 = creactObject("ป้ายแดง");
  let TableDataTypeHQ6 = creactObject("อ่านทะเบียนไม่ได้");
  let TableDataTSFull = creactObject("TS Full Audit");

  const [TableHQ, setTableHQ] = useState([
    TableDataHQ,
    TableDataHQ2,
    TableDataHQ3,
    TableDataTSFull,
    TableDataTypeHQ,
    TableDataTypeHQ2,
    TableDataTypeHQ3,
    TableDataTypeHQ4,
    TableDataTypeHQ5,
    TableDataTypeHQ6,
  ]);

  const [summaryMFLane, setSummaryMFLane] = useState(0);
  const [summaryHQ, setSummaryHQ] = useState(0);
  const [summaryTSFull, setSummaryTSFull] = useState(0);
  const [selectedDate, setSelectedDate] = useState(
    new Date().setDate(new Date().getDate())
  );
  const [seconds, setSeconds] = useState(0);
  const fetchData = async () => {
    Swal.fire({
      title: "Loading",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    const date = format(selectedDate, "yyyy-MM-dd");

    const sendData = {
      date: date,
    };

    apiURL
      .post("/daily-data-monitor", sendData)
      .then((res) => {
        Swal.close();
        console.log(res.data);
        // setHqAndLane(res.data.status !== false ? res.data.sql : []);
        // console.log("res :", Object.keys(res.data.sql[0]));
        // setTableTSFull(TableTSFull[0] = {});
        setSummaryMFLane(res.data.card[0]);
        setSummaryHQ(res.data.card[0]);
        setSummaryTSFull(0);

        let dataHQ1 = [
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          0,
        ];
        let dataHQ2 = [
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          0,
        ];
        let dataHQ3 = [
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          0,
        ];
        let dataTypeHQ1 = [
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          0,
        ];
        let dataTypeHQ2 = [
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          0,
        ];
        let dataTypeHQ3 = [
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          0,
        ];
        let dataTypeHQ4 = [
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          0,
        ];
        let dataTypeHQ5 = [
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          0,
        ];
        let dataTypeHQ6 = [
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          0,
        ];

        for (let index = 0; index < res.data.sql.length; index++) {
          if ("00:00" === res.data.sql[index].date_time.substring(11, 16)) {
            dataHQ1[0] = res.data.sql[index].lane;
            dataHQ2[0] = res.data.sql[index].hq;
            dataHQ3[0] = res.data.sql[index].dif_count;
            dataTypeHQ1[0] = res.data.sql[index].mem;
            dataTypeHQ2[0] = res.data.sql[index].non_mem;
            dataTypeHQ3[0] = res.data.sql[index].non_charge;
            dataTypeHQ4[0] = res.data.sql[index].illegal;
            dataTypeHQ5[0] = res.data.sql[index].red_plate;
            dataTypeHQ6[0] = res.data.sql[index].ver;
          } else if (
            "01:00" === res.data.sql[index].date_time.substring(11, 16)
          ) {
            dataHQ1[1] = res.data.sql[index].lane;
            dataHQ2[1] = res.data.sql[index].hq;
            dataHQ3[1] = res.data.sql[index].dif_count;
            dataTypeHQ1[1] = res.data.sql[index].mem;
            dataTypeHQ2[1] = res.data.sql[index].non_mem;
            dataTypeHQ3[1] = res.data.sql[index].non_charge;
            dataTypeHQ4[1] = res.data.sql[index].illegal;
            dataTypeHQ5[1] = res.data.sql[index].red_plate;
            dataTypeHQ6[1] = res.data.sql[index].ver;
          } else if (
            "02:00" === res.data.sql[index].date_time.substring(11, 16)
          ) {
            dataHQ1[2] = res.data.sql[index].lane;
            dataHQ2[2] = res.data.sql[index].hq;
            dataHQ3[2] = res.data.sql[index].dif_count;
            dataTypeHQ1[2] = res.data.sql[index].mem;
            dataTypeHQ2[2] = res.data.sql[index].non_mem;
            dataTypeHQ3[2] = res.data.sql[index].non_charge;
            dataTypeHQ4[2] = res.data.sql[index].illegal;
            dataTypeHQ5[2] = res.data.sql[index].red_plate;
            dataTypeHQ6[2] = res.data.sql[index].ver;
          } else if (
            "03:00" === res.data.sql[index].date_time.substring(11, 16)
          ) {
            dataHQ1[3] = res.data.sql[index].lane;
            dataHQ2[3] = res.data.sql[index].hq;
            dataHQ3[3] = res.data.sql[index].dif_count;
            dataTypeHQ1[4] = res.data.sql[index].mem;
            dataTypeHQ2[4] = res.data.sql[index].non_mem;
            dataTypeHQ3[4] = res.data.sql[index].non_charge;
            dataTypeHQ4[4] = res.data.sql[index].illegal;
            dataTypeHQ5[4] = res.data.sql[index].red_plate;
            dataTypeHQ6[4] = res.data.sql[index].ver;
          } else if (
            "04:00" === res.data.sql[index].date_time.substring(11, 16)
          ) {
            dataHQ1[4] = res.data.sql[index].lane;
            dataHQ2[4] = res.data.sql[index].hq;
            dataHQ3[4] = res.data.sql[index].dif_count;
            dataTypeHQ1[4] = res.data.sql[index].mem;
            dataTypeHQ2[4] = res.data.sql[index].non_mem;
            dataTypeHQ3[4] = res.data.sql[index].non_charge;
            dataTypeHQ4[4] = res.data.sql[index].illegal;
            dataTypeHQ5[4] = res.data.sql[index].red_plate;
            dataTypeHQ6[4] = res.data.sql[index].ver;
          } else if (
            "05:00" === res.data.sql[index].date_time.substring(11, 16)
          ) {
            dataHQ1[5] = res.data.sql[index].lane;
            dataHQ2[5] = res.data.sql[index].hq;
            dataHQ3[5] = res.data.sql[index].dif_count;
            dataTypeHQ1[5] = res.data.sql[index].mem;
            dataTypeHQ2[5] = res.data.sql[index].non_mem;
            dataTypeHQ3[5] = res.data.sql[index].non_charge;
            dataTypeHQ4[5] = res.data.sql[index].illegal;
            dataTypeHQ5[5] = res.data.sql[index].red_plate;
            dataTypeHQ6[5] = res.data.sql[index].ver;
          } else if (
            "06:00" === res.data.sql[index].date_time.substring(11, 16)
          ) {
            dataHQ1[6] = res.data.sql[index].lane;
            dataHQ2[6] = res.data.sql[index].hq;
            dataHQ3[6] = res.data.sql[index].dif_count;
            dataTypeHQ1[6] = res.data.sql[index].mem;
            dataTypeHQ2[6] = res.data.sql[index].non_mem;
            dataTypeHQ3[6] = res.data.sql[index].non_charge;
            dataTypeHQ4[6] = res.data.sql[index].illegal;
            dataTypeHQ5[6] = res.data.sql[index].red_plate;
            dataTypeHQ6[6] = res.data.sql[index].ver;
          } else if (
            "07:00" === res.data.sql[index].date_time.substring(11, 16)
          ) {
            dataHQ1[7] = res.data.sql[index].lane;
            dataHQ2[7] = res.data.sql[index].hq;
            dataHQ3[7] = res.data.sql[index].dif_count;
            dataTypeHQ1[7] = res.data.sql[index].mem;
            dataTypeHQ2[7] = res.data.sql[index].non_mem;
            dataTypeHQ3[7] = res.data.sql[index].non_charge;
            dataTypeHQ4[7] = res.data.sql[index].illegal;
            dataTypeHQ5[7] = res.data.sql[index].red_plate;
            dataTypeHQ6[7] = res.data.sql[index].ver;
          } else if (
            "08:00" === res.data.sql[index].date_time.substring(11, 16)
          ) {
            dataHQ1[8] = res.data.sql[index].lane;
            dataHQ2[8] = res.data.sql[index].hq;
            dataHQ3[8] = res.data.sql[index].dif_count;
            dataTypeHQ1[8] = res.data.sql[index].mem;
            dataTypeHQ2[8] = res.data.sql[index].non_mem;
            dataTypeHQ3[8] = res.data.sql[index].non_charge;
            dataTypeHQ4[8] = res.data.sql[index].illegal;
            dataTypeHQ5[8] = res.data.sql[index].red_plate;
            dataTypeHQ6[8] = res.data.sql[index].ver;
          } else if (
            "09:00" === res.data.sql[index].date_time.substring(11, 16)
          ) {
            dataHQ1[9] = res.data.sql[index].lane;
            dataHQ2[9] = res.data.sql[index].hq;
            dataHQ3[9] = res.data.sql[index].dif_count;
            dataTypeHQ1[9] = res.data.sql[index].mem;
            dataTypeHQ2[9] = res.data.sql[index].non_mem;
            dataTypeHQ3[9] = res.data.sql[index].non_charge;
            dataTypeHQ4[9] = res.data.sql[index].illegal;
            dataTypeHQ5[9] = res.data.sql[index].red_plate;
            dataTypeHQ6[9] = res.data.sql[index].ver;
          } else if (
            "10:00" === res.data.sql[index].date_time.substring(11, 16)
          ) {
            dataHQ1[10] = res.data.sql[index].lane;
            dataHQ2[10] = res.data.sql[index].hq;
            dataHQ3[10] = res.data.sql[index].dif_count;
            dataTypeHQ1[10] = res.data.sql[index].mem;
            dataTypeHQ2[10] = res.data.sql[index].non_mem;
            dataTypeHQ3[10] = res.data.sql[index].non_charge;
            dataTypeHQ4[10] = res.data.sql[index].illegal;
            dataTypeHQ5[10] = res.data.sql[index].red_plate;
            dataTypeHQ6[10] = res.data.sql[index].ver;
          } else if (
            "11:00" === res.data.sql[index].date_time.substring(11, 16)
          ) {
            dataHQ1[11] = res.data.sql[index].lane;
            dataHQ2[11] = res.data.sql[index].hq;
            dataHQ3[11] = res.data.sql[index].dif_count;
            dataTypeHQ1[11] = res.data.sql[index].mem;
            dataTypeHQ2[11] = res.data.sql[index].non_mem;
            dataTypeHQ3[11] = res.data.sql[index].non_charge;
            dataTypeHQ4[11] = res.data.sql[index].illegal;
            dataTypeHQ5[11] = res.data.sql[index].red_plate;
            dataTypeHQ6[11] = res.data.sql[index].ver;
          } else if (
            "12:00" === res.data.sql[index].date_time.substring(11, 16)
          ) {
            dataHQ1[12] = res.data.sql[index].lane;
            dataHQ2[12] = res.data.sql[index].hq;
            dataHQ3[12] = res.data.sql[index].dif_count;
            dataTypeHQ1[12] = res.data.sql[index].mem;
            dataTypeHQ2[12] = res.data.sql[index].non_mem;
            dataTypeHQ3[12] = res.data.sql[index].non_charge;
            dataTypeHQ4[12] = res.data.sql[index].illegal;
            dataTypeHQ5[12] = res.data.sql[index].red_plate;
            dataTypeHQ6[12] = res.data.sql[index].ver;
          } else if (
            "13:00" === res.data.sql[index].date_time.substring(11, 16)
          ) {
            dataHQ1[13] = res.data.sql[index].lane;
            dataHQ2[13] = res.data.sql[index].hq;
            dataHQ3[13] = res.data.sql[index].dif_count;
            dataTypeHQ1[13] = res.data.sql[index].mem;
            dataTypeHQ2[13] = res.data.sql[index].non_mem;
            dataTypeHQ3[13] = res.data.sql[index].non_charge;
            dataTypeHQ4[13] = res.data.sql[index].illegal;
            dataTypeHQ5[13] = res.data.sql[index].red_plate;
            dataTypeHQ6[13] = res.data.sql[index].ver;
          } else if (
            "14:00" === res.data.sql[index].date_time.substring(11, 16)
          ) {
            dataHQ1[14] = res.data.sql[index].lane;
            dataHQ2[14] = res.data.sql[index].hq;
            dataHQ3[14] = res.data.sql[index].dif_count;
            dataTypeHQ1[14] = res.data.sql[index].mem;
            dataTypeHQ2[14] = res.data.sql[index].non_mem;
            dataTypeHQ3[14] = res.data.sql[index].non_charge;
            dataTypeHQ4[14] = res.data.sql[index].illegal;
            dataTypeHQ5[14] = res.data.sql[index].red_plate;
            dataTypeHQ6[14] = res.data.sql[index].ver;
          } else if (
            "15:00" === res.data.sql[index].date_time.substring(11, 16)
          ) {
            dataHQ1[15] = res.data.sql[index].lane;
            dataHQ2[15] = res.data.sql[index].hq;
            dataHQ3[15] = res.data.sql[index].dif_count;
            dataTypeHQ1[15] = res.data.sql[index].mem;
            dataTypeHQ2[15] = res.data.sql[index].non_mem;
            dataTypeHQ3[15] = res.data.sql[index].non_charge;
            dataTypeHQ4[15] = res.data.sql[index].illegal;
            dataTypeHQ5[15] = res.data.sql[index].red_plate;
            dataTypeHQ6[15] = res.data.sql[index].ver;
          } else if (
            "16:00" === res.data.sql[index].date_time.substring(11, 16)
          ) {
            dataHQ1[16] = res.data.sql[index].lane;
            dataHQ2[16] = res.data.sql[index].hq;
            dataHQ3[16] = res.data.sql[index].dif_count;
            dataTypeHQ1[16] = res.data.sql[index].mem;
            dataTypeHQ2[16] = res.data.sql[index].non_mem;
            dataTypeHQ3[16] = res.data.sql[index].non_charge;
            dataTypeHQ4[16] = res.data.sql[index].illegal;
            dataTypeHQ5[16] = res.data.sql[index].red_plate;
            dataTypeHQ6[16] = res.data.sql[index].ver;
          } else if (
            "17:00" === res.data.sql[index].date_time.substring(11, 16)
          ) {
            dataHQ1[17] = res.data.sql[index].lane;
            dataHQ2[17] = res.data.sql[index].hq;
            dataHQ3[17] = res.data.sql[index].dif_count;
            dataTypeHQ1[17] = res.data.sql[index].mem;
            dataTypeHQ2[17] = res.data.sql[index].non_mem;
            dataTypeHQ3[17] = res.data.sql[index].non_charge;
            dataTypeHQ4[17] = res.data.sql[index].illegal;
            dataTypeHQ5[17] = res.data.sql[index].red_plate;
            dataTypeHQ6[17] = res.data.sql[index].ver;
          } else if (
            "18:00" === res.data.sql[index].date_time.substring(11, 16)
          ) {
            dataHQ1[18] = res.data.sql[index].lane;
            dataHQ2[18] = res.data.sql[index].hq;
            dataHQ3[18] = res.data.sql[index].dif_count;
            dataTypeHQ1[18] = res.data.sql[index].mem;
            dataTypeHQ2[18] = res.data.sql[index].non_mem;
            dataTypeHQ3[18] = res.data.sql[index].non_charge;
            dataTypeHQ4[18] = res.data.sql[index].illegal;
            dataTypeHQ5[18] = res.data.sql[index].red_plate;
            dataTypeHQ6[18] = res.data.sql[index].ver;
          } else if (
            "19:00" === res.data.sql[index].date_time.substring(11, 16)
          ) {
            dataHQ1[19] = res.data.sql[index].lane;
            dataHQ2[19] = res.data.sql[index].hq;
            dataHQ3[19] = res.data.sql[index].dif_count;
            dataTypeHQ1[19] = res.data.sql[index].mem;
            dataTypeHQ2[19] = res.data.sql[index].non_mem;
            dataTypeHQ3[19] = res.data.sql[index].non_charge;
            dataTypeHQ4[19] = res.data.sql[index].illegal;
            dataTypeHQ5[19] = res.data.sql[index].red_plate;
            dataTypeHQ6[19] = res.data.sql[index].ver;
          } else if (
            "20:00" === res.data.sql[index].date_time.substring(11, 16)
          ) {
            dataHQ1[20] = res.data.sql[index].lane;
            dataHQ2[20] = res.data.sql[index].hq;
            dataHQ3[20] = res.data.sql[index].dif_count;
            dataTypeHQ1[20] = res.data.sql[index].mem;
            dataTypeHQ2[20] = res.data.sql[index].non_mem;
            dataTypeHQ3[20] = res.data.sql[index].non_charge;
            dataTypeHQ4[20] = res.data.sql[index].illegal;
            dataTypeHQ5[20] = res.data.sql[index].red_plate;
            dataTypeHQ6[20] = res.data.sql[index].ver;
          } else if (
            "21:00" === res.data.sql[index].date_time.substring(11, 16)
          ) {
            dataHQ1[21] = res.data.sql[index].lane;
            dataHQ2[21] = res.data.sql[index].hq;
            dataHQ3[21] = res.data.sql[index].dif_count;
            dataTypeHQ1[21] = res.data.sql[index].mem;
            dataTypeHQ2[21] = res.data.sql[index].non_mem;
            dataTypeHQ3[21] = res.data.sql[index].non_charge;
            dataTypeHQ4[21] = res.data.sql[index].illegal;
            dataTypeHQ5[21] = res.data.sql[index].red_plate;
            dataTypeHQ6[21] = res.data.sql[index].ver;
          } else if (
            "22:00" === res.data.sql[index].date_time.substring(11, 16)
          ) {
            dataHQ1[22] = res.data.sql[index].lane;
            dataHQ2[22] = res.data.sql[index].hq;
            dataHQ3[22] = res.data.sql[index].dif_count;
            dataTypeHQ1[22] = res.data.sql[index].mem;
            dataTypeHQ2[22] = res.data.sql[index].non_mem;
            dataTypeHQ3[22] = res.data.sql[index].non_charge;
            dataTypeHQ4[22] = res.data.sql[index].illegal;
            dataTypeHQ5[22] = res.data.sql[index].red_plate;
            dataTypeHQ6[22] = res.data.sql[index].ver;
          } else if (
            "23:00" === res.data.sql[index].date_time.substring(11, 16)
          ) {
            dataHQ1[23] = res.data.sql[index].lane;
            dataHQ2[23] = res.data.sql[index].hq;
            dataHQ3[23] = res.data.sql[index].dif_count;
            dataTypeHQ1[23] = res.data.sql[index].mem;
            dataTypeHQ2[23] = res.data.sql[index].non_mem;
            dataTypeHQ3[23] = res.data.sql[index].non_charge;
            dataTypeHQ4[23] = res.data.sql[index].illegal;
            dataTypeHQ5[23] = res.data.sql[index].red_plate;
            dataTypeHQ6[23] = res.data.sql[index].ver;
          }
        }

        setTableHQ([
          {
            ...TableDataHQ,

            "01:00": dataHQ1[1].toLocaleString(),
            "02:00": dataHQ1[2].toLocaleString(),
            "03:00": dataHQ1[3].toLocaleString(),
            "04:00": dataHQ1[4].toLocaleString(),
            "05:00": dataHQ1[5].toLocaleString(),
            "06:00": dataHQ1[6].toLocaleString(),
            "07:00": dataHQ1[7].toLocaleString(),
            "08:00": dataHQ1[8].toLocaleString(),
            "09:00": dataHQ1[9].toLocaleString(),
            "10:00": dataHQ1[10].toLocaleString(),
            "11:00": dataHQ1[11].toLocaleString(),
            "12:00": dataHQ1[12].toLocaleString(),
            "13:00": dataHQ1[13].toLocaleString(),
            "14:00": dataHQ1[14].toLocaleString(),
            "15:00": dataHQ1[15].toLocaleString(),
            "16:00": dataHQ1[16].toLocaleString(),
            "17:00": dataHQ1[17].toLocaleString(),
            "18:00": dataHQ1[18].toLocaleString(),
            "19:00": dataHQ1[19].toLocaleString(),
            "20:00": dataHQ1[20].toLocaleString(),
            "21:00": dataHQ1[21].toLocaleString(),
            "22:00": dataHQ1[22].toLocaleString(),
            "23:00": dataHQ1[23].toLocaleString(),
            "00:00": dataHQ1[0].toLocaleString(),
          },
          {
            ...TableDataHQ2,

            "01:00": dataHQ2[1].toLocaleString(),
            "02:00": dataHQ2[2].toLocaleString(),
            "03:00": dataHQ2[3].toLocaleString(),
            "04:00": dataHQ2[4].toLocaleString(),
            "05:00": dataHQ2[5].toLocaleString(),
            "06:00": dataHQ2[6].toLocaleString(),
            "07:00": dataHQ2[7].toLocaleString(),
            "08:00": dataHQ2[8].toLocaleString(),
            "09:00": dataHQ2[9].toLocaleString(),
            "10:00": dataHQ2[10].toLocaleString(),
            "11:00": dataHQ2[11].toLocaleString(),
            "12:00": dataHQ2[12].toLocaleString(),
            "13:00": dataHQ2[13].toLocaleString(),
            "14:00": dataHQ2[14].toLocaleString(),
            "15:00": dataHQ2[15].toLocaleString(),
            "16:00": dataHQ2[16].toLocaleString(),
            "17:00": dataHQ2[17].toLocaleString(),
            "18:00": dataHQ2[18].toLocaleString(),
            "19:00": dataHQ2[19].toLocaleString(),
            "20:00": dataHQ2[20].toLocaleString(),
            "21:00": dataHQ2[21].toLocaleString(),
            "22:00": dataHQ2[22].toLocaleString(),
            "23:00": dataHQ2[23].toLocaleString(),
            "00:00": dataHQ2[0].toLocaleString(),
          },
          {
            ...TableDataHQ3,

            "01:00": dataHQ3[1].toLocaleString(),
            "02:00": dataHQ3[2].toLocaleString(),
            "03:00": dataHQ3[3].toLocaleString(),
            "04:00": dataHQ3[4].toLocaleString(),
            "05:00": dataHQ3[5].toLocaleString(),
            "06:00": dataHQ3[6].toLocaleString(),
            "07:00": dataHQ3[7].toLocaleString(),
            "08:00": dataHQ3[8].toLocaleString(),
            "09:00": dataHQ3[9].toLocaleString(),
            "10:00": dataHQ3[10].toLocaleString(),
            "11:00": dataHQ3[11].toLocaleString(),
            "12:00": dataHQ3[12].toLocaleString(),
            "13:00": dataHQ3[13].toLocaleString(),
            "14:00": dataHQ3[14].toLocaleString(),
            "15:00": dataHQ3[15].toLocaleString(),
            "16:00": dataHQ3[16].toLocaleString(),
            "17:00": dataHQ3[17].toLocaleString(),
            "18:00": dataHQ3[18].toLocaleString(),
            "19:00": dataHQ3[19].toLocaleString(),
            "20:00": dataHQ3[20].toLocaleString(),
            "21:00": dataHQ3[21].toLocaleString(),
            "22:00": dataHQ3[22].toLocaleString(),
            "23:00": dataHQ3[23].toLocaleString(),
            "00:00": dataHQ3[0].toLocaleString(),
          },
          TableDataTSFull,
          {
            ...TableDataTypeHQ,

            "01:00": dataTypeHQ1[1].toLocaleString(),
            "02:00": dataTypeHQ1[2].toLocaleString(),
            "03:00": dataTypeHQ1[3].toLocaleString(),
            "04:00": dataTypeHQ1[4].toLocaleString(),
            "05:00": dataTypeHQ1[5].toLocaleString(),
            "06:00": dataTypeHQ1[6].toLocaleString(),
            "07:00": dataTypeHQ1[7].toLocaleString(),
            "08:00": dataTypeHQ1[8].toLocaleString(),
            "09:00": dataTypeHQ1[9].toLocaleString(),
            "10:00": dataTypeHQ1[10].toLocaleString(),
            "11:00": dataTypeHQ1[11].toLocaleString(),
            "12:00": dataTypeHQ1[12].toLocaleString(),
            "13:00": dataTypeHQ1[13].toLocaleString(),
            "14:00": dataTypeHQ1[14].toLocaleString(),
            "15:00": dataTypeHQ1[15].toLocaleString(),
            "16:00": dataTypeHQ1[16].toLocaleString(),
            "17:00": dataTypeHQ1[17].toLocaleString(),
            "18:00": dataTypeHQ1[18].toLocaleString(),
            "19:00": dataTypeHQ1[19].toLocaleString(),
            "20:00": dataTypeHQ1[20].toLocaleString(),
            "21:00": dataTypeHQ1[21].toLocaleString(),
            "22:00": dataTypeHQ1[22].toLocaleString(),
            "23:00": dataTypeHQ1[23].toLocaleString(),
            "00:00": dataTypeHQ1[0].toLocaleString(),
          },
          {
            ...TableDataTypeHQ2,

            "01:00": dataTypeHQ2[1].toLocaleString(),
            "02:00": dataTypeHQ2[2].toLocaleString(),
            "03:00": dataTypeHQ2[3].toLocaleString(),
            "04:00": dataTypeHQ2[4].toLocaleString(),
            "05:00": dataTypeHQ2[5].toLocaleString(),
            "06:00": dataTypeHQ2[6].toLocaleString(),
            "07:00": dataTypeHQ2[7].toLocaleString(),
            "08:00": dataTypeHQ2[8].toLocaleString(),
            "09:00": dataTypeHQ2[9].toLocaleString(),
            "10:00": dataTypeHQ2[10].toLocaleString(),
            "11:00": dataTypeHQ2[11].toLocaleString(),
            "12:00": dataTypeHQ2[12].toLocaleString(),
            "13:00": dataTypeHQ2[13].toLocaleString(),
            "14:00": dataTypeHQ2[14].toLocaleString(),
            "15:00": dataTypeHQ2[15].toLocaleString(),
            "16:00": dataTypeHQ2[16].toLocaleString(),
            "17:00": dataTypeHQ2[17].toLocaleString(),
            "18:00": dataTypeHQ2[18].toLocaleString(),
            "19:00": dataTypeHQ2[19].toLocaleString(),
            "20:00": dataTypeHQ2[20].toLocaleString(),
            "21:00": dataTypeHQ2[21].toLocaleString(),
            "22:00": dataTypeHQ2[22].toLocaleString(),
            "23:00": dataTypeHQ2[23].toLocaleString(),
            "00:00": dataTypeHQ2[0].toLocaleString(),
          },
          {
            ...TableDataTypeHQ3,

            "01:00": dataTypeHQ3[1].toLocaleString(),
            "02:00": dataTypeHQ3[2].toLocaleString(),
            "03:00": dataTypeHQ3[3].toLocaleString(),
            "04:00": dataTypeHQ3[4].toLocaleString(),
            "05:00": dataTypeHQ3[5].toLocaleString(),
            "06:00": dataTypeHQ3[6].toLocaleString(),
            "07:00": dataTypeHQ3[7].toLocaleString(),
            "08:00": dataTypeHQ3[8].toLocaleString(),
            "09:00": dataTypeHQ3[9].toLocaleString(),
            "10:00": dataTypeHQ3[10].toLocaleString(),
            "11:00": dataTypeHQ3[11].toLocaleString(),
            "12:00": dataTypeHQ3[12].toLocaleString(),
            "13:00": dataTypeHQ3[13].toLocaleString(),
            "14:00": dataTypeHQ3[14].toLocaleString(),
            "15:00": dataTypeHQ3[15].toLocaleString(),
            "16:00": dataTypeHQ3[16].toLocaleString(),
            "17:00": dataTypeHQ3[17].toLocaleString(),
            "18:00": dataTypeHQ3[18].toLocaleString(),
            "19:00": dataTypeHQ3[19].toLocaleString(),
            "20:00": dataTypeHQ3[20].toLocaleString(),
            "21:00": dataTypeHQ3[21].toLocaleString(),
            "22:00": dataTypeHQ3[22].toLocaleString(),
            "23:00": dataTypeHQ3[23].toLocaleString(),
            "00:00": dataTypeHQ3[0].toLocaleString(),
          },
          {
            ...TableDataTypeHQ4,

            "01:00": dataTypeHQ4[1].toLocaleString(),
            "02:00": dataTypeHQ4[2].toLocaleString(),
            "03:00": dataTypeHQ4[3].toLocaleString(),
            "04:00": dataTypeHQ4[4].toLocaleString(),
            "05:00": dataTypeHQ4[5].toLocaleString(),
            "06:00": dataTypeHQ4[6].toLocaleString(),
            "07:00": dataTypeHQ4[7].toLocaleString(),
            "08:00": dataTypeHQ4[8].toLocaleString(),
            "09:00": dataTypeHQ4[9].toLocaleString(),
            "10:00": dataTypeHQ4[10].toLocaleString(),
            "11:00": dataTypeHQ4[11].toLocaleString(),
            "12:00": dataTypeHQ4[12].toLocaleString(),
            "13:00": dataTypeHQ4[13].toLocaleString(),
            "14:00": dataTypeHQ4[14].toLocaleString(),
            "15:00": dataTypeHQ4[15].toLocaleString(),
            "16:00": dataTypeHQ4[16].toLocaleString(),
            "17:00": dataTypeHQ4[17].toLocaleString(),
            "18:00": dataTypeHQ4[18].toLocaleString(),
            "19:00": dataTypeHQ4[19].toLocaleString(),
            "20:00": dataTypeHQ4[20].toLocaleString(),
            "21:00": dataTypeHQ4[21].toLocaleString(),
            "22:00": dataTypeHQ4[22].toLocaleString(),
            "23:00": dataTypeHQ4[23].toLocaleString(),
            "00:00": dataTypeHQ4[0].toLocaleString(),
          },
          {
            ...TableDataTypeHQ5,

            "01:00": dataTypeHQ5[1].toLocaleString(),
            "02:00": dataTypeHQ5[2].toLocaleString(),
            "03:00": dataTypeHQ5[3].toLocaleString(),
            "04:00": dataTypeHQ5[4].toLocaleString(),
            "05:00": dataTypeHQ5[5].toLocaleString(),
            "06:00": dataTypeHQ5[6].toLocaleString(),
            "07:00": dataTypeHQ5[7].toLocaleString(),
            "08:00": dataTypeHQ5[8].toLocaleString(),
            "09:00": dataTypeHQ5[9].toLocaleString(),
            "10:00": dataTypeHQ5[10].toLocaleString(),
            "11:00": dataTypeHQ5[11].toLocaleString(),
            "12:00": dataTypeHQ5[12].toLocaleString(),
            "13:00": dataTypeHQ5[13].toLocaleString(),
            "14:00": dataTypeHQ5[14].toLocaleString(),
            "15:00": dataTypeHQ5[15].toLocaleString(),
            "16:00": dataTypeHQ5[16].toLocaleString(),
            "17:00": dataTypeHQ5[17].toLocaleString(),
            "18:00": dataTypeHQ5[18].toLocaleString(),
            "19:00": dataTypeHQ5[19].toLocaleString(),
            "20:00": dataTypeHQ5[20].toLocaleString(),
            "21:00": dataTypeHQ5[21].toLocaleString(),
            "22:00": dataTypeHQ5[22].toLocaleString(),
            "23:00": dataTypeHQ5[23].toLocaleString(),
            "00:00": dataTypeHQ5[0].toLocaleString(),
          },
          {
            ...TableDataTypeHQ6,

            "01:00": dataTypeHQ6[1].toLocaleString(),
            "02:00": dataTypeHQ6[2].toLocaleString(),
            "03:00": dataTypeHQ6[3].toLocaleString(),
            "04:00": dataTypeHQ6[4].toLocaleString(),
            "05:00": dataTypeHQ6[5].toLocaleString(),
            "06:00": dataTypeHQ6[6].toLocaleString(),
            "07:00": dataTypeHQ6[7].toLocaleString(),
            "08:00": dataTypeHQ6[8].toLocaleString(),
            "09:00": dataTypeHQ6[9].toLocaleString(),
            "10:00": dataTypeHQ6[10].toLocaleString(),
            "11:00": dataTypeHQ6[11].toLocaleString(),
            "12:00": dataTypeHQ6[12].toLocaleString(),
            "13:00": dataTypeHQ6[13].toLocaleString(),
            "14:00": dataTypeHQ6[14].toLocaleString(),
            "15:00": dataTypeHQ6[15].toLocaleString(),
            "16:00": dataTypeHQ6[16].toLocaleString(),
            "17:00": dataTypeHQ6[17].toLocaleString(),
            "18:00": dataTypeHQ6[18].toLocaleString(),
            "19:00": dataTypeHQ6[19].toLocaleString(),
            "20:00": dataTypeHQ6[20].toLocaleString(),
            "21:00": dataTypeHQ6[21].toLocaleString(),
            "22:00": dataTypeHQ6[22].toLocaleString(),
            "23:00": dataTypeHQ6[23].toLocaleString(),
            "00:00": dataTypeHQ6[0].toLocaleString(),
          },
        ]);
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          text: "ไม่สามารถเชื่อมต่อเซิฟเวอร์ได้ในขณะนี้",
        });
      });
  };
  // console.log(TableTSFull);
  const dataCard = [
    {
      value: !!summaryMFLane.count_hq
        ? summaryMFLane.count_lane.toLocaleString().toString()
        : "0",
      status: "checklist",
      label: "MFLane",
      color: "red",
    },
    {
      value: !!summaryHQ.count_lane
        ? summaryHQ.count_hq.toLocaleString().toString()
        : "0",
      status: "checklist",
      label: "HQ",
      color: "green",
    },
    {
      value: !!summaryTSFull ? summaryTSFull.toLocaleString().toString() : "0",
      status: "checklist",
      label: "TS Full Audit",
      color: "blue",
    },
  ];

  // useEffect(() => {
  //   fetchData();
  //   setInterval(() => fetchData(), 10000);
  // }, []);

  useEffect(() => {
    fetchData();
    const interval = setInterval(() => {
      fetchData();
    }, 900000);
    return () => clearInterval(interval);
  }, []);

  const classes = useStyles();
  return (
    <>
      <Container maxWidth="xl" className={classes.root}>
        <Typography variant="h6" style={{ fontSize: "0.9rem" }}>
          Monitor Display
        </Typography>

        {/* Filter Section */}
        <Grid container component={Paper} className={classes.filterSection}>
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

          <Button
            variant="contained"
            className={classes.btn}
            onClick={() => fetchData(1)}
          >
            ดูข้อมูล
          </Button>
        </Grid>

        {/* Card Section */}
        <Box className={classes.cardSection}>
          <Grid container style={{ display: "flex", columnGap: "0.8rem" }}>
            {dataCard.map((card, index) => (
              <Grid
                item
                component={Paper}
                key={index}
                lg={2}
                className={classes.card}
                style={{
                  borderLeft: `3px solid ${card.color}`,
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
                        color: card.color,
                        fontSize: "1rem",
                        fontWeight: 700,
                      }}
                    >
                      {card.label}
                    </Typography>
                    <Typography style={{ fontSize: "1rem" }}>
                      {card.value}
                      {card.status === "revenue" ? ` บาท` : ` รายการ`}
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
            <TableMonitor data={TableHQ} />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
