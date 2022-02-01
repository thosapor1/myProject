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
      maxHeight: "74vh",
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
    id: "number_of_TS",
    label: "จำนวน TS Lane",
  },
  {
    id: "first_Time_Lane",
    label: "firstTimeStampLane",
  },
  {
    id: "last_Time_Lane",
    label: "lastTimeStampLane",
  },
  {
    id: "number_of_TS_HQ",
    label: "จำนวน TS HQ",
  },
  {
    id: "first_Time_HQ",
    label: "firstTimeStampHQ",
  },
  {
    id: "last_Time_HQ",
    label: "lastTimeStampHQ",
  },
  {
    id: "Verify",
    label: "รอ Verify",
  },
  {
    id: "confirm_TS",
    label: "ยืนยันจำนวน TS",
  },

  {
    id: "confirm_time",
    label: "เวลาที่ยืนยัน",
  },
];

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

export default function TableDataVolume(props) {
  //   const [open, setOpen] = useState(false);
  const [dataForActivity, SetDataForActivity] = useState([]);

  const classes = useStyles();
  const { dataList, onChange } = props;
  //   console.log(dataList);
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
            {!!dataList.data
              ? dataList.data.map((data, index) => (
                  <StyledTableRow key={index} className={classes.tableRow}>
                    <TableCell align="center" className={classes.tableCell}>
                      {!!data.date ? data.date : "-"}
                    </TableCell>
                    <TableCell align="center" className={classes.tableCell}>
                      {!!data.lane_count
                        ? data.lane_count.toLocaleString()
                        : "-"}
                    </TableCell>
                    <TableCell align="center" className={classes.tableCell}>
                      {!!data.lane_first &&
                      data.lane_first !== "0000-00-00 00:00:00"
                        ? data.lane_first
                        : "-"}
                    </TableCell>
                    <TableCell align="center" className={classes.tableCell}>
                      {!!data.lane_last &&
                      data.lane_last !== "0000-00-00 00:00:00"
                        ? data.lane_last
                        : "-"}
                    </TableCell>
                    <TableCell align="center" className={classes.tableCell}>
                      {!!data.hq_count ? data.hq_count.toLocaleString() : "-"}
                    </TableCell>
                    <TableCell align="center" className={classes.tableCell}>
                      {!!data.hq_first &&
                      data.hq_first !== "0000-00-00 00:00:00"
                        ? data.hq_first
                        : "-"}
                    </TableCell>
                    <TableCell align="center" className={classes.tableCell}>
                      {!!data.hq_last && data.hq_last !== "0000-00-00 00:00:00"
                        ? data.hq_last
                        : "-"}
                    </TableCell>
                    <TableCell align="center" className={classes.tableCell}>
                      {!!data.verify_count
                        ? data.verify_count.toLocaleString()
                        : "-"}
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
