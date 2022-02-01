import {
  Box,
  Button,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import React, { useState } from "react";
import { Pagination } from "@material-ui/lab";
import Swal from "sweetalert2";
import format from "date-fns/format";
import ModalActivity3 from "./ModalActivity3";
import { getDataExpectIncomeActivity } from "../service/allService";

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
  // {
  //   state: 5,
  //   color: "black",
  //   label: "รอพิจารณาพิเศษ",
  // },
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
    container: {
      maxHeight: "59vh",
      overflow: "auto",
      [theme.breakpoints.down("lg")]: {
        maxHeight: "58vh",
      },
      marginTop: 10,
    },
    header: {
      backgroundColor: "#7C85BFff",
      border: "1px solid white",
      color: "white",
      fontSize: "0.8rem",
      // padding: "6px",
      zIndex: 1,
    },
    header2: {
      backgroundColor: "#7C85BFff",
      border: "1px solid white",
      color: "white",
      fontSize: "0.8rem",
      padding: "6px",
      position: "sticky",
      top: 38,
      zIndex: 1,
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
      height: 28,
    },
    // tableCell2: {
    //   cursor: "pointer",
    //   fontSize: "0.75rem",
    //   padding: "6px",
    //   // height: 10,
    // },
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
      marginTop: "0.5rem",
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
    selected: {
      "&.Mui-selected, &.Mui-selected:hover": {
        backgroundColor: "purple",
        "& > .MuiTableCell-root": {
          color: "yellow",
          backgroundColor: "purple",
        },
      },
    },
  };
});

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

export default function TableCollectFromPk3(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [selectedPage, setSelectedPage] = useState("");
  const [dataForActivity, SetDataForActivity] = useState({});
  const [rowID, setRowID] = useState("");

  const { dataList, page, onChange, checkDate, onFetchData } = props;

  const fetchData = async (ts, index1, index2) => {
    Swal.fire({
      title: "Loading",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    console.log(index1, index2);
    const tsBefore1 =
      index1 > -1 ? dataList.resultsDisplay[index1].transactionId : "0";
    const tsBefore2 =
      index2 > -1 ? dataList.resultsDisplay[index2].transactionId : "0";

    const sendData = {
      transactionId: [ts, tsBefore1, tsBefore2],
      date: format(checkDate, "yyyy-MM-dd"),
    };

    const res = await getDataExpectIncomeActivity(sendData);
    SetDataForActivity(!!res ? res.data : []);
    if (!!res && !!res.status) {
      Swal.close();
      setOpen(true);
    }
  };

  // const handleOpen = (state) => {
  //   if (state === 2) {
  //     setOpen(true);
  //   }
  //   setOpen1(true);
  // };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Box className={classes.box}>
        {/* page box */}
        <Box style={{ marginTop: -5, display: "flex" }}>
          <Box>
            <TextField
              variant="outlined"
              className={classes.input1}
              style={{ margin: "0" }}
              label="go to page"
              value={selectedPage}
              onChange={(e) => setSelectedPage(e.target.value)}
            />
            <Button
              variant="contained"
              color="secondary"
              style={{ height: 35 }}
              onClick={() => {
                onFetchData(parseInt(selectedPage));
                setSelectedPage("");
              }}
            >
              Go
            </Button>
          </Box>
          <Box>
            {/* search page box */}
            <Pagination
              count={dataList.totalPages}
              color="primary"
              page={page}
              onChange={onChange}
              className={classes.pagination}
            />
          </Box>
        </Box>

        {/* detail box */}
        {/* <Box style={{ display: "flex", paddingTop: 4 }}>
          {detailStatus.map((item) => (
            <Box style={{ paddingLeft: 10 }}>
              <FiberManualRecordIcon
                className={classes.dot}
                style={{ color: item.color }}
              />
              <Typography className={classes.detailStatus}>
                {item.label}
              </Typography>
            </Box>
          ))}
        </Box> */}
      </Box>
      <TableContainer className={classes.container}>
        <Table stickyHeader>
          <TableHead>
            <StyledTableRow>
              <TableCell align="center" className={classes.header}>
                ลำดับ
              </TableCell>
              <TableCell align="center" className={classes.header}>
                เลขที่ใบแจ้งหนี้
              </TableCell>
              <TableCell align="center" className={classes.header}>
                ประเภทบัญชี
              </TableCell>
              <TableCell align="center" className={classes.header}>
                ค่าธรรมเนียมทั้งหมด
              </TableCell>
              <TableCell align="center" className={classes.header}>
                ค่าปรับทั้งหมด
              </TableCell>
              <TableCell align="center" className={classes.header}>
                ค่าดำเนินการทั้งหมด
              </TableCell>
              <TableCell align="center" className={classes.header}>
                ค่าชำระเงินทั้งหมด
              </TableCell>
              <TableCell align="center" className={classes.header}>
                วันแจ้งหนี้
              </TableCell>
              <TableCell align="center" className={classes.header}>
                การชำระ
              </TableCell>
              <TableCell align="center" className={classes.header}>
                จำนวนเงินที่จ่าย
              </TableCell>
              <TableCell align="center" className={classes.header}>
                วันที่จ่าย
              </TableCell>
              <TableCell align="center" className={classes.header}>
                ช่องทางการจ่าย
              </TableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {!!dataList.resultsDisplay
              ? dataList.resultsDisplay.map((data, index) => (
                  <StyledTableRow
                    key={data.transactionId}
                    onClick={() => {
                      // fetchData(data.transactionId, index - 1, index - 2);
                      // setRowID(index);
                      // ChangeEyeStatus(index);
                    }}
                    // className={classes.tableRow}
                    // selected={rowID === index}
                    className={classes.selected}
                  >
                    <TableCell align="center" className={classes.tableCell}>
                      {(page - 1) * 100 + (index + 1)}
                    </TableCell>
                    <TableCell align="center" className={classes.tableCell}>
                      {!!data.invoiceNo ? data.invoiceNo : "-"}
                    </TableCell>
                    <TableCell align="center" className={classes.tableCell}>
                      {!!data.transactionType ? data.transactionType : "-"}
                    </TableCell>
                    <TableCell align="center" className={classes.tableCell}>
                      {!!data.feeAmount ? data.feeAmount : "-"}
                    </TableCell>
                    <TableCell align="center" className={classes.tableCell}>
                      {!!data.fineAmount ? data.fineAmount : "-"}
                    </TableCell>
                    <TableCell align="center" className={classes.tableCell}>
                      {!!data.collectionAmount ? data.collectionAmount : "-"}
                    </TableCell>
                    <TableCell align="center" className={classes.tableCell}>
                      {data.totalAmount ? data.totalAmount : "-"}
                    </TableCell>
                    <TableCell align="center" className={classes.tableCell}>
                      {data.issueDate ? data.issueDate : "-"}
                    </TableCell>
                    <TableCell align="center" className={classes.tableCell}>
                      {!!data.payment_flag ? data.payment_flag : "-"}
                    </TableCell>
                    <TableCell align="center" className={classes.tableCell}>
                      {!!data.payment_totalAmount
                        ? data.payment_totalAmount
                        : "-"}
                    </TableCell>
                    <TableCell align="center" className={classes.tableCell}>
                      {!!data.payment_date ? data.payment_date : "-"}
                    </TableCell>
                    <TableCell align="center" className={classes.tableCell}>
                      {!!data.payment_channel_code
                        ? data.payment_channel_code
                        : "-"}
                    </TableCell>
                  </StyledTableRow>
                ))
              : []}
          </TableBody>
        </Table>
      </TableContainer>

      {/* <ModalActivity3
        dataList={dataForActivity}
        open={open}
        onClick={handleClose}
        onFetchData={props.onFetchData}
        dropdown={dropdown}
        checkDate={checkDate}
        page={page}
      /> */}
    </div>
  );
}
