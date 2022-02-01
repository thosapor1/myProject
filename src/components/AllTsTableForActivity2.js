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
} from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import React, { useState } from "react";
import { Pagination } from "@material-ui/lab";
import axios from "axios";
import ModalActivity from "./ModalActivity";
import Swal from "sweetalert2";
// import format from "date-fns/format";

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
    container: {
      maxHeight: 600,
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

const headerCells = [
  {
    id: "checkpoint",
    label: "ด่าน",
  },
  {
    id: "timeArrive",
    label: "เวลาเข้าด่าน",
  },
  {
    id: "storedDate",
    label: "วันจัดเก็บ",
  },
  {
    id: "typeCarAudit",
    label: "ประเภทรถ",
  },
  {
    id: "feeAudit",
    label: "ค่าธรรมเนียมผ่านทาง",
  },
  {
    id: "fine",
    label: "ค่าปรับ",
  },
  {
    id: "summary",
    label: "ชำระรวม",
  },
  {
    id: "plate",
    label: "ทะเบียน",
  },
  {
    id: "province",
    label: "จังหวัด",
  },
  {
    id: "period",
    label: "ระยะเวลาชำระ (วัน)",
  },
  {
    id: "condition",
    label: "เงื่อนไขการชำระ",
  },
];

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

export default function AllTsTableForActivity2(props) {
  const { onFetchData, countPage } = props;
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [dataForActivity, SetDataForActivity] = useState({});
  const [selectedPage, setSelectedPage] = useState("");

  const fetchData = async (ts, State, timeStamp) => {
    Swal.fire({
      title: "Loading",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    const sendData = {
      transactionId: ts,
      timestamp: timeStamp,
    };
    let endpoint = "";
    if (State === 2) {
      endpoint = "/display-activity";
      setOpen(true);
    } else {
      endpoint = "/pk3display-activity";
      setOpen1(true);
    }
    apiURL
      .post(endpoint, sendData)
      .then((res) => {
        Swal.close();
        SetDataForActivity(res.data);
        console.log("res2:", res.data);
      })
      .catch((error) => {
        handleClose();
        Swal.fire({
          icon: "error",
          text: "ไม่สามารถเชื่อมต่อเซิฟเวอร์ได้ในขณะนี้",
        });
      });
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
  const { dataList, page, onChange } = props;

  return (
    <div>
      <Box style={{ marginTop: -5, display: "flex", marginBottom: 10 }}>
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
            count={countPage}
            color="primary"
            page={page}
            onChange={onChange}
            className={classes.pagination}
          />
        </Box>
      </Box>
      <TableContainer className={classes.container}>
        <Table stickyHeader>
          <TableHead>
            <StyledTableRow>
              {headerCells.map((headerCell, index) => (
                <TableCell
                  align="center"
                  key={index}
                  className={classes.header}
                >
                  {headerCell.label}
                </TableCell>
              ))}
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {!!dataList.detail
              ? dataList.detail.map((data) => (
                  <StyledTableRow
                    key={data.transactionId}
                    // onClick={() => {
                    //   fetchData(data.transactionId, data.state, data.timestamp);
                    // }}
                    className={classes.tableRow}
                  >
                    <TableCell align="center" className={classes.tableCell}>
                      {data.check_point}
                    </TableCell>
                    <TableCell align="center" className={classes.tableCell}>
                      {!!data.datetime ? data.datetime.split(" ").pop() : "-"}
                    </TableCell>
                    <TableCell align="center" className={classes.tableCell}>
                      {"-"}
                    </TableCell>
                    <TableCell align="center" className={classes.tableCell}>
                      {`C${data.vehicle_type}`}
                    </TableCell>
                    <TableCell align="center" className={classes.tableCell}>
                      {!!data.fee ? data.fee : "-"}
                    </TableCell>
                    <TableCell align="center" className={classes.tableCell}>
                      {!!data.fine ? data.fine.toLocaleString() : "-"}
                    </TableCell>
                    <TableCell align="center" className={classes.tableCell}>
                      {!!data.total_pay ? data.total_pay.toLocaleString() : "-"}
                    </TableCell>
                    <TableCell align="center" className={classes.tableCell}>
                      {!!data.plate ? data.plate : "-"}
                    </TableCell>
                    <TableCell align="center" className={classes.tableCell}>
                      {!!data.province ? data.province : "-"}
                    </TableCell>
                    <TableCell align="center" className={classes.tableCell}>
                      {!!data.fee ? data.fee : "-"}
                    </TableCell>
                    <TableCell align="center" className={classes.tableCell}>
                      {!!data.type && data.type === "MEMBER"
                        ? "MEMBER"
                        : !!data.type && data.type === "NONMEMBER"
                        ? "NONMEMBER"
                        : "-"}
                    </TableCell>
                  </StyledTableRow>
                ))
              : []}
          </TableBody>
        </Table>
      </TableContainer>

      <ModalActivity
        dataList={dataForActivity}
        open={open}
        onClick={handleClose}
        onFetchData={props.onFetchData}
      />
    </div>
  );
}
