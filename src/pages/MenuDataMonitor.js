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
import ChartMonitor from "../components/ChartMonitor";

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

export default function MenuDataMonitor() {
  const [summary, setSummary] = useState([]);
  const [hqAndLane, setHqAndLane] = useState([]);
  const [typeHq, setTypeHq] = useState([]);
  const [TSAudit, setTSAudit] = useState([]);
  const [hqAndLaneOptions, setHqAndLaneOptions] = useState([]);
  const [typeHqOptions, setTypeHqOptions] = useState([]);
  const [TSAuditOptions, setTSAuditOptions] = useState([]);
  const [selectedDate, setSelectedDate] = useState(
    new Date().setDate(new Date().getDate())
  );
  const fetchData = async () => {
    // Swal.fire({
    //   title: "Loading",
    //   allowOutsideClick: false,
    //   didOpen: () => Swal.showLoading(),
    // });

    const data1 = [
      ["ชั่วโมง", "MF_Lane", "HQ", "ผลต่าง"],
      ["00:00", 165, 938, 522],
      ["01:00", 135, 1120, 599],
      ["02:00", 157, 1167, 587],
      ["03:00", 139, 1110, 615],
      ["04:00", 136, 691, 629],
      ["05:00", 165, 938, 522],
      ["06:00", 135, 1120, 599],
      ["07:00", 157, 1167, 587],
      ["08:00", 139, 1110, 615],
      ["09:00", 136, 691, 629],
      ["10:00", 165, 938, 522],
      ["11:00", 135, 1120, 599],
      ["12:00", 157, 1167, 587],
      ["13:00", 139, 1110, 615],
      ["14:00", 136, 691, 629],
      ["15:00", 165, 938, 522],
      ["16:00", 135, 1120, 599],
      ["17:00", 157, 1167, 587],
      ["18:00", 139, 1110, 615],
      ["19:00", 136, 691, 629],
      ["20:00", 165, 938, 522],
      ["21:00", 135, 1120, 599],
      ["22:00", 157, 1167, 587],
      ["23:00", 139, 1110, 615],
    ];

    const data2 = [
      ["ชั่วโมง", "Member", "Non-Member", "Non-Charge", "Illegal"],
      ["00:00", 165, 938, 522, 423],
      ["01:00", 135, 1120, 599, 223],
      ["02:00", 157, 1167, 587, 523],
      ["03:00", 139, 1110, 615, 245],
      ["04:00", 136, 691, 629, 234],
      ["05:00", 165, 938, 522, 567],
      ["06:00", 135, 1120, 599, 776],
      ["07:00", 157, 1167, 587, 565],
      ["08:00", 139, 1110, 615, 543],
      ["09:00", 136, 691, 629, 324],
      ["10:00", 165, 938, 522, 432],
      ["11:00", 135, 1120, 599, 564],
      ["12:00", 157, 1167, 587, 665],
      ["13:00", 139, 1110, 615, 765],
      ["14:00", 136, 691, 629, 445],
      ["15:00", 165, 938, 522, 334],
      ["16:00", 135, 1120, 599, 345],
      ["17:00", 157, 1167, 587, 564],
      ["18:00", 139, 1110, 615, 345],
      ["19:00", 136, 691, 629, 354],
      ["20:00", 165, 938, 522, 224],
      ["21:00", 135, 1120, 599, 456],
      ["22:00", 157, 1167, 587, 345],
      ["23:00", 139, 1110, 615, 544],
    ];

    const data3 = [
      ["ชั่วโมง", "TS Full Audit"],
      ["00:00", 165],
      ["01:00", 135],
      ["02:00", 157],
      ["03:00", 139],
      ["04:00", 136],
      ["05:00", 165],
      ["06:00", 135],
      ["07:00", 157],
      ["08:00", 139],
      ["09:00", 136],
      ["10:00", 165],
      ["11:00", 135],
      ["12:00", 157],
      ["13:00", 139],
      ["14:00", 136],
      ["15:00", 165],
      ["16:00", 135],
      ["17:00", 157],
      ["18:00", 139],
      ["19:00", 136],
      ["20:00", 165],
      ["21:00", 135],
      ["22:00", 157],
      ["23:00", 139],
    ];

    const options1 = {
      title: "จำนวนรถในแต่ละช่วงเวลา",
      vAxis: { title: "จำนวนรถ" },
      hAxis: { title: "ชั่วโมง" },
      seriesType: "bars",
      series: { 2: { type: "line" } },
    };

    const options2 = {
      title: "จำนวนประเภท HQ",
      vAxis: { title: "จำนวนรถ" },
      hAxis: { title: "ชั่วโมง" },
      seriesType: "bars",
    };

    const options3 = {
      title: "จำนวน Audit",
      vAxis: { title: "จำนวนรถ" },
      hAxis: { title: "ชั่วโมง" },
      seriesType: "bars",
    };

    setHqAndLane(data1);
    setTypeHq(data2);
    setTSAudit(data3);
    setHqAndLaneOptions(options1);
    setTypeHqOptions(options2);
    setTSAuditOptions(options3);
  };

  const date = format(selectedDate, "yyyy-MM-dd");

  const dataCard = [
    {
      value: !!summary.ts_count
        ? summary.ts_count.toLocaleString().toString()
        : "0",
      status: "checklist",
      label: "จำนวนรถ",
      color: "red",
    },
    {
      value: !!summary.ts_count
        ? summary.ts_count.toLocaleString().toString()
        : "0",
      status: "checklist",
      label: "จำนวน HQ Type",
      color: "green",
    },
    {
      value: !!summary.ts_count
        ? summary.ts_count.toLocaleString().toString()
        : "0",
      status: "checklist",
      label: "จำนวน TS Full Audit",
      color: "blue",
    },
  ];

  useEffect(() => {
    fetchData();
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
            <ChartMonitor data={hqAndLane} options={hqAndLaneOptions} />
          </Grid>
          <Grid item md={12} sm={12} lg={12} className={classes.allTsTable}>
            <ChartMonitor data={typeHq} options={typeHqOptions} />
          </Grid>
          <Grid item md={12} sm={12} lg={12} className={classes.allTsTable}>
            <ChartMonitor data={TSAudit} options={TSAuditOptions} />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
