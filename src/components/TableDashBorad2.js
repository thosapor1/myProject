import {
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const apiURL = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? `${process.env.REACT_APP_BASE_URL_PROD_V3}`
      : `${process.env.REACT_APP_BASE_URL_V3}`,
});
const useStyles = makeStyles((theme) => {
  return {
    container: {
      maxHeight: 720,
    },
    header: {
      backgroundColor: "#7C85BFff",
      border: "1px solid white",
      color: "white",
      fontSize: "0.8rem",
    },
    tableRow: {
      "&:hover": {
        backgroundColor: "#e8eaf6 !important",
      },
    },
    tableCell: {
      cursor: "pointer",
      fontSize: "0.8rem",
    },
  };
});

const headerCells = [
  {
    id: "date",
    label: "วันที่",
  },
  {
    id: "number_of_car",
    label: "ทั้งหมด",
  },
  {
    id: "normal",
    label: "ปกติ",
  },
  {
    id: "not_normal",
    label: "ผิดปกติ",
  },
  {
    id: "wait",
    label: "รอจัดเก็บ",
  },
  {
    id: "wait_to_know",
    label: "รอรับทราบ",
  },
  {
    id: "wait_super",
    label: "รอ super",
  },
  {
    id: "wait_for_decide",
    label: "ตรวจสอบแล้ว",
  },
  {
    id: "income",
    label: "รายได้พึงได้",
  },
  {
    id: "paid",
    label: "ชำระแล้ว",
  },
  {
    id: "overdue",
    label: "ค้างชำระ",
  },
  {
    id: "remark",
    label: "หมายเหตุ",
  },
];

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

export default function TableDashBoard2(props) {
  //   const [open, setOpen] = useState(false);

  const fetchData = (ts, timestamp) => {
    Swal.fire({
      title: "Loading",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });
    const sendData = {
      transactionId: ts,
      timestamp: timestamp,
    };
    apiURL
      .post("/pk3display-activity", sendData)
      .then((res) => {
        Swal.close();
        console.log("res2:", res.data);
      })
      .catch((error) => {
        // handleClose();
        Swal.fire({
          icon: "error",
          text: "ไม่สามารถเชื่อมต่อเซิฟเวอร์ได้ในขณะนี้",
        });
      });
  };

  //   const handleOpen = async () => {
  //     await setOpen(true);
  //   };

  //   const handleClose = () => {
  //     setOpen(false);
  //   };

  const classes = useStyles();
  const { dataList } = props;

  return (
    <>
      <TableContainer className={classes.container}>
        <Table stickyHeader>
          <TableHead>
            <StyledTableRow>
              {headerCells.map((headerCell) => (
                <TableCell
                  align="center"
                  key={headerCell.id}
                  className={classes.header}
                >
                  {headerCell.label}
                </TableCell>
              ))}
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {!!dataList.month
              ? dataList.month.map((data, index) => (
                  <StyledTableRow key={index} className={classes.tableRow}>
                    <TableCell align="center" className={classes.tableCell}>
                      {!!data.date ? data.date : "-"}
                    </TableCell>
                    <TableCell align="center" className={classes.tableCell}>
                      {!!data.count_vehicle
                        ? data.count_vehicle.toLocaleString()
                        : "-"}
                    </TableCell>
                    <TableCell align="center" className={classes.tableCell}>
                      {!!data.ts_normal ? data.ts_normal.toLocaleString() : "-"}
                    </TableCell>
                    <TableCell align="center" className={classes.tableCell}>
                      {!!data.ts_not_normal
                        ? data.ts_not_normal.toLocaleString()
                        : "-"}
                    </TableCell>
                    <TableCell align="center" className={classes.tableCell}>
                      {!!data.wait_hq ? data.wait_hq.toLocaleString() : "-"}
                    </TableCell>
                    <TableCell align="center" className={classes.tableCell}>
                      {!!data.wait_acknowledge
                        ? data.wait_acknowledge.toLocaleString()
                        : "-"}
                    </TableCell>
                    <TableCell align="center" className={classes.tableCell}>
                      {!!data.wait_super
                        ? data.wait_super.toLocaleString()
                        : "-"}
                    </TableCell>
                    <TableCell align="center" className={classes.tableCell}>
                      {!!data.wait_consider
                        ? data.wait_consider.toLocaleString()
                        : "-"}
                    </TableCell>
                    <TableCell align="center" className={classes.tableCell}>
                      {!!data.income ? data.income.toLocaleString() : "-"}
                    </TableCell>
                    <TableCell align="center" className={classes.tableCell}>
                      -
                    </TableCell>
                    <TableCell align="center" className={classes.tableCell}>
                      -
                    </TableCell>
                    <TableCell align="center" className={classes.tableCell}>
                      -
                    </TableCell>
                  </StyledTableRow>
                ))
              : []}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
