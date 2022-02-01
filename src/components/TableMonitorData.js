import {
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import React, { useState } from "react";
import { Pagination } from "@material-ui/lab";
import axios from "axios";
import Swal from "sweetalert2";
import ModalReadOnly2 from "./ModalReadOnly2";
import ModalSuperActivity2 from "./ModalSuperActivity2";
import { format } from "date-fns";
import { getDataSuperauditActivity } from "../service/allService";
// import format from "date-fns/format";

const apiURLv2 = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? `${process.env.REACT_APP_BASE_URL_PROD_V2}`
      : `${process.env.REACT_APP_BASE_URL_V2}`,
});

const detailStatus = [
  {
    state: 1,
    color: "lightgray",
    label: "ปกติ",
  },
  {
    state: 2,
    color: "#FF2400",
    label: "ผิดปกติ",
  },
  {
    state: 3,
    color: "blue",
    label: "รอ pk3 ตรวจสอบ",
  },
  {
    state: 4,
    color: "orange",
    label: "รอ super audit ตรวจสอบ",
  },
  {
    state: 5,
    color: "black",
    label: "รอพิจารณาพิเศษ",
  },
  {
    state: 6,
    color: "darkviolet",
    label: "รอตรวจสอบรับทราบ",
  },
  {
    state: 7,
    color: "lightblue",
    label: "รอจัดเก็บยืนยัน",
  },
  {
    state: 8,
    color: "lightgreen",
    label: "ตรวจสอบแล้ว",
  },
];
const useStyles = makeStyles((theme) => {
  return {
    container: {
      maxHeight: "61.5vh",
      overflow: "auto",
      [theme.breakpoints.down("lg")]: {
        maxHeight: "50vh",
      },
      marginTop: 10,
    },
    header: {
      backgroundColor: "#7C85BFff",
      border: "0.5px solid white",
      color: "white",
      fontSize: "0.8rem",
      padding: "6px",
    },
    header2: {
      backgroundColor: "#7C85BFff",
      border: "1px solid white",
      color: "white",
      fontSize: "0.8rem",
      padding: "6px",
      position: "sticky",
      top: 38,
      // zIndex: 10,
    },
    tablesColor: {
      backgroundColor: "#FF968A",
    },
    tablesColor2: {
      backgroundColor: "#FFC5BF",
    },

    tableRow: {
      "&:hover": {
        backgroundColor: "#e8eaf6 !important",
      },
    },
    pagination: {
      "& .MuiPaginationItem-root": {
        height: 25,
        minWidth: 25,
        fontSize: "0.8rem",
        [theme.breakpoints.down("lg")]: {
          fontSize: "0.7rem",
        },
      },
      paddingTop: 5,
    },
    tableCell: {
      cursor: "pointer",
      fontSize: "0.75rem",
      padding: "6px",
    },
    detailStatus: {
      display: "inline",
      fontSize: "0.8rem",
      [theme.breakpoints.down("lg")]: {
        fontSize: "0.7rem",
      },
    },
    dot: {
      fontSize: "0.8rem",
    },
    box: {
      display: "flex",
      justifyContent: "space-between",
      [theme.breakpoints.down("md")]: {
        display: "block",
      },
      justifyItems: "center",
    },
    input1: {
      "& .MuiInputBase-input": {
        fontSize: "0.8rem",
      },
      "& .MuiSelect-selectMenu": {
        height: 15,
      },
      "& .MuiInputBase-root": {
        height: 35,
      },
      "& .MuiInputLabel-outlined": {
        // paddingBottom: 20,
        fontSize: "0.8rem",
        transform: "translate(10px, 10px) scale(1)",
      },
      "& .MuiInputLabel-shrink": {
        transform: "translate(14px, -6px) scale(0.75)",
      },
      width: 100,
      [theme.breakpoints.down("lg")]: {
        width: 100,
        marginBottom: 10,
      },
    },
  };
});

export default function TableMonitor(props) {
  const classes = useStyles();
  const { data } = props;

  return (
    <div>
      <TableContainer className={classes.container}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>จำนวนรถในแต่ละวัน</TableCell>

              <TableCell align="center" className={classes.header}>
                00-01
              </TableCell>
              <TableCell align="center" className={classes.header}>
                01-02
              </TableCell>
              <TableCell align="center" className={classes.header}>
                02-03
              </TableCell>
              <TableCell align="center" className={classes.header}>
                03-04
              </TableCell>
              <TableCell align="center" className={classes.header}>
                04-05
              </TableCell>
              <TableCell align="center" className={classes.header}>
                05-06
              </TableCell>
              <TableCell align="center" className={classes.header}>
                06-07
              </TableCell>
              <TableCell align="center" className={classes.header}>
                07-08
              </TableCell>
              <TableCell align="center" className={classes.header}>
                08-09
              </TableCell>
              <TableCell align="center" className={classes.header}>
                09-10
              </TableCell>
              <TableCell align="center" className={classes.header}>
                10-11
              </TableCell>
              <TableCell align="center" className={classes.header}>
                11-12
              </TableCell>
              <TableCell align="center" className={classes.header}>
                12-13
              </TableCell>
              <TableCell align="center" className={classes.header}>
                13-14
              </TableCell>
              <TableCell align="center" className={classes.header}>
                14-15
              </TableCell>
              <TableCell align="center" className={classes.header}>
                15-16
              </TableCell>
              <TableCell align="center" className={classes.header}>
                16-17
              </TableCell>
              <TableCell align="center" className={classes.header}>
                17-18
              </TableCell>
              <TableCell align="center" className={classes.header}>
                18-19
              </TableCell>
              <TableCell align="center" className={classes.header}>
                19-20
              </TableCell>
              <TableCell align="center" className={classes.header}>
                20-21
              </TableCell>
              <TableCell align="center" className={classes.header}>
                21-22
              </TableCell>
              <TableCell align="center" className={classes.header}>
                22-23
              </TableCell>
              <TableCell align="center" className={classes.header}>
                23-24
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow
                key={row.name}
                className={
                  row.name === "ผลต่างข้อมูล(MF-HQ)"
                    ? classes.tablesColor
                    : row.name === "Illegal"
                    ? classes.tablesColor
                    : row.name === "ป้ายแดง"
                    ? classes.tablesColor2
                    : row.name === "อ่านทะเบียนไม่ได้"
                    ? classes.tablesColor2
                    : "rgba(0,0,0,0)"
                }
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="center" className={classes.tableCell}>
                  {row["00:00"]}
                </TableCell>
                <TableCell align="center" className={classes.tableCell}>
                  {row["01:00"]}
                </TableCell>
                <TableCell align="center" className={classes.tableCell}>
                  {row["02:00"]}
                </TableCell>
                <TableCell align="center" className={classes.tableCell}>
                  {row["03:00"]}
                </TableCell>
                <TableCell align="center" className={classes.tableCell}>
                  {row["04:00"]}
                </TableCell>
                <TableCell align="center" className={classes.tableCell}>
                  {row["05:00"]}
                </TableCell>
                <TableCell align="center" className={classes.tableCell}>
                  {row["06:00"]}
                </TableCell>
                <TableCell align="center" className={classes.tableCell}>
                  {row["07:00"]}
                </TableCell>
                <TableCell align="center" className={classes.tableCell}>
                  {row["08:00"]}
                </TableCell>
                <TableCell align="center" className={classes.tableCell}>
                  {row["09:00"]}
                </TableCell>
                <TableCell align="center" className={classes.tableCell}>
                  {row["10:00"]}
                </TableCell>
                <TableCell align="center" className={classes.tableCell}>
                  {row["11:00"]}
                </TableCell>
                <TableCell align="center" className={classes.tableCell}>
                  {row["12:00"]}
                </TableCell>
                <TableCell align="center" className={classes.tableCell}>
                  {row["13:00"]}
                </TableCell>
                <TableCell align="center" className={classes.tableCell}>
                  {row["14:00"]}
                </TableCell>
                <TableCell align="center" className={classes.tableCell}>
                  {row["15:00"]}
                </TableCell>
                <TableCell align="center" className={classes.tableCell}>
                  {row["16:00"]}
                </TableCell>
                <TableCell align="center" className={classes.tableCell}>
                  {row["17:00"]}
                </TableCell>
                <TableCell align="center" className={classes.tableCell}>
                  {row["18:00"]}
                </TableCell>
                <TableCell align="center" className={classes.tableCell}>
                  {row["19:00"]}
                </TableCell>
                <TableCell align="center" className={classes.tableCell}>
                  {row["20:00"]}
                </TableCell>
                <TableCell align="center" className={classes.tableCell}>
                  {row["21:00"]}
                </TableCell>
                <TableCell align="center" className={classes.tableCell}>
                  {row["22:00"]}
                </TableCell>
                <TableCell align="center" className={classes.tableCell}>
                  {row["23:00"]}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
