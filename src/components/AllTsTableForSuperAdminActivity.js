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
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import React, { useState } from "react";
import { Pagination } from "@material-ui/lab";
import axios from "axios";
import ModalSuperAdminActivity from "./ModalSuperAdminActivity";
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
    tableCell: {
      cursor: "pointer",
      fontSize: "0.8rem",
    },
  };
});

const headerCells = [
  {
    id: "status",
    label: "สถานะ",
  },
  {
    id: "transaction",
    label: "transaction",
  },
  {
    id: "timeArrive",
    label: "เวลาเข้าด่าน",
  },
  {
    id: "typeCarAudit",
    label: "ประเภทรถ(ระบบตรวจสอบ)",
  },
  {
    id: "feeAudit",
    label: "ค่าผ่านทาง(ระบบตรวจสอบ)",
  },
  {
    id: "typeCarPK3",
    label: "ประเภทรถ(PK3)",
  },
  {
    id: "feePK3",
    label: "ค่าผ่านทาง(PK3)",
  },
  {
    id: "carDetail",
    label: "รายละเอียดรถ",
  },
];

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

export default function AllTsTableForSuperAdminActivity(props) {
  const [open, setOpen] = useState(false);
  const [dataForActivity, SetDataForActivity] = useState([]);

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

  const handleOpen = async () => {
    await setOpen(true);
  };

  const handleClose = () => {
    
    setOpen(false);
  };

  const classes = useStyles();
  const { dataList, page, onChange } = props;

  return (
    <>
      <Pagination
        count={dataList.totalPages}
        color="primary"
        page={page}
        onChange={onChange}
        style={{
          display: "inline",
          margin: "2rem",
          position: "sticky",
          top: 0,
        }}
      />
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
            {!!dataList
              ? dataList.ts_table.map((data, index) => (
                  <StyledTableRow
                    key={index}
                    onClick={() => {
                      fetchData(data.transactionId, data.timestamp);
                      handleOpen();
                    }}
                    className={classes.tableRow}
                  >
                    <TableCell align="center" className={classes.tableCell}>
                      <FiberManualRecordIcon
                        fontSize="small"
                        style={{
                          color:
                            data.state === 2
                              ? "orange"
                              : data.state === 3
                              ? "blue"
                              : data.state === 4
                              ? "yellow"
                              : "black",
                        }}
                      />
                      {/* {data.match_id} */}
                    </TableCell>
                    <TableCell align="center" className={classes.tableCell}>
                      {data.transactionId}
                    </TableCell>
                    <TableCell align="center" className={classes.tableCell}>
                      {data.timestamp.split(" ").pop()}
                    </TableCell>
                    <TableCell align="center" className={classes.tableCell}>
                      {data.class}
                    </TableCell>
                    <TableCell align="center" className={classes.tableCell}>
                      {data.fee}
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

      <ModalSuperAdminActivity
        dataList={dataForActivity}
        open={open}
        onClick={handleClose}
        onFetchData={props.onFetchData}
      />
    </>
  );
}
