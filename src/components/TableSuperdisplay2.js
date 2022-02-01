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
      maxHeight: "60vh",
      overflow: "auto",
      [theme.breakpoints.down("lg")]: {
        maxHeight: "50vh",
      },
      marginTop: 10,
    },
    header: {
      backgroundColor: "#7C85BFff",
      border: "1px solid white",
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

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

export default function TableSuperdisplay2(props) {
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [dataForActivity, SetDataForActivity] = useState({});
  const [selectedPage, setSelectedPage] = useState("");

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

    const res = await getDataSuperauditActivity(sendData);

    if (!!res && !!res.data.status) {
      Swal.close();
      SetDataForActivity(res.data);
      console.log("res2:", res.data);
      setOpen(true);
    } else {
      Swal.fire({
        icon: "error",
        text: "เกิดข้อผิดพลาดกับเซิฟเวอร์ ติดต่อผู้ดูแลระบบ",
      });
      console.log("test");
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
    setOpen1(false);
  };

  const classes = useStyles();
  const { dataList, page, onChange, dropdown, checkDate, onFetchData } = props;

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
              onClick={() => onFetchData(parseInt(selectedPage))}
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
        <Box style={{ display: "flex", paddingTop: 4 }}>
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
        </Box>
      </Box>
      <TableContainer className={classes.container}>
        <Table stickyHeader>
          <TableHead>
            <StyledTableRow>
              <TableCell rowSpan={2} align="center" className={classes.header}>
                transaction
              </TableCell>
              <TableCell rowSpan={2} align="center" className={classes.header}>
                ด่าน
              </TableCell>
              <TableCell rowSpan={2} align="center" className={classes.header}>
                ช่อง
              </TableCell>
              <TableCell rowSpan={2} align="center" className={classes.header}>
                เวลาเข้าด่าน
              </TableCell>
              <TableCell colSpan={4} align="center" className={classes.header}>
                ประเภทรถ
              </TableCell>
              <TableCell rowSpan={2} align="center" className={classes.header}>
                ประเภท TS
              </TableCell>
              <TableCell rowSpan={2} align="center" className={classes.header}>
                ค่าผ่านทาง
              </TableCell>
              <TableCell rowSpan={2} align="center" className={classes.header}>
                หมายเหตุ
              </TableCell>
              <TableCell rowSpan={2} align="center" className={classes.header}>
                สถานะ
              </TableCell>
            </StyledTableRow>
            <StyledTableRow>
              <TableCell align="center" className={classes.header2}>
                จริง
              </TableCell>
              <TableCell align="center" className={classes.header2}>
                AD
              </TableCell>
              <TableCell align="center" className={classes.header2}>
                Lane
              </TableCell>
              <TableCell align="center" className={classes.header2}>
                HQ
              </TableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {!!dataList.resultsDisplay
              ? dataList.resultsDisplay.map((data, index) => (
                  <StyledTableRow
                    key={data.transactionId}
                    onClick={() => {
                      fetchData(data.transactionId, index - 1, index - 2);
                    }}
                    className={classes.tableRow}
                  >
                    <TableCell align="center" className={classes.tableCell}>
                      {data.transactionId}
                    </TableCell>
                    <TableCell align="center" className={classes.tableCell}>
                      {!!data.match_checkpoint ? data.match_checkpoint : "-"}
                    </TableCell>
                    <TableCell align="center" className={classes.tableCell}>
                      {!!data.match_gate ? data.match_gate : "-"}
                    </TableCell>
                    <TableCell align="center" className={classes.tableCell}>
                      {!!data.match_timestamp
                        ? data.match_timestamp.split(" ").pop()
                        : "-"}
                    </TableCell>
                    <TableCell align="center" className={classes.tableCell}>
                      {!!data.match_real_vehicleClass
                        ? `C${data.match_real_vehicleClass}`
                        : "-"}
                    </TableCell>
                    <TableCell align="center" className={classes.tableCell}>
                      {!!data.audit_check_vehicleClass
                        ? `C${data.audit_check_vehicleClass}`
                        : "-"}
                    </TableCell>
                    <TableCell align="center" className={classes.tableCell}>
                      {data.mf_lane_vehicleClass
                        ? `C${data.mf_lane_vehicleClass}`
                        : "-"}
                    </TableCell>
                    <TableCell align="center" className={classes.tableCell}>
                      {!!data.vehicleClass ? `C${data.vehicleClass}` : "-"}
                    </TableCell>
                    <TableCell align="center" className={classes.tableCell}>
                      {!!data.status ? data.status : "-"}
                    </TableCell>
                    <TableCell align="center" className={classes.tableCell}>
                      {!!data.match_real_fee ? data.match_real_fee : "-"}
                    </TableCell>
                    <TableCell align="center" className={classes.tableCell}>
                      {`-`}
                    </TableCell>
                    <TableCell align="center" className={classes.tableCell}>
                      <FiberManualRecordIcon
                        style={{
                          // fontSize: "0.8rem",
                          color:
                            data.state === 1
                              ? "lightgray"
                              : data.state === 2
                              ? "#FF2400"
                              : data.state === 3
                              ? "blue"
                              : data.state === 4
                              ? "orange"
                              : data.state === 5
                              ? "black"
                              : data.state === 6
                              ? "darkviolet"
                              : data.state === 7
                              ? "lightblue"
                              : "rgba(0,0,0,0)",
                        }}
                      />
                    </TableCell>
                  </StyledTableRow>
                ))
              : []}
          </TableBody>
        </Table>
      </TableContainer>

      <ModalSuperActivity2
        dataList={dataForActivity}
        open={open}
        onClick={handleClose}
        onFetchData={props.onFetchData}
        dropdown={dropdown}
        checkDate={checkDate}
        page={page}
      />
    </div>
  );
}
