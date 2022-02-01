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
import { Pagination } from "@material-ui/lab";
import axios from "axios";
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
      pagination: {
        "$ .MuiPagination-root": {
          position: "fixed",
        },
      },
    },
    tableCell: {
      cursor: "pointer",
      fontSize: "0.75rem",
    },
  };
});

const headerCells = [
  {
    id: "No",
    label: "No",
  },
  {
    id: "match_id",
    label: "match id",
  },
  {
    id: "transaction_id",
    label: "transaction id",
  },
  {
    id: "awTimeStamp",
    label: "awTimeStamp",
  },
  {
    id: "audit_id",
    label: "audit id",
  },
  {
    id: "auditTimeStamp",
    label: "auditTimeStamp",
  },
];

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

export default function MatchTable(props) {
  const getImage = (
    audit_transactionId,
    pk3_transactionId_header,
    timestamp,
    page
  ) => {
    onClickRow(audit_transactionId, pk3_transactionId_header, page);
  };

  const classes = useStyles();
  const { dataList, page, onChange, onClickRow } = props;

  return (
    <div>
      <Pagination
        count={dataList.totalPages}
        color="primary"
        page={page}
        onChange={onChange}
        style={{
          display: "inline",
          margin: "2rem",
          position: "static",
          top: 0,
        }}
      />
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
            {!!dataList.results
              ? dataList.results.map((data) => (
                  <StyledTableRow
                    key={data.transactionId}
                    onClick={() => {
                      getImage(
                        data.audit_transactionId,
                        data.pk3_transactionId_header,
                        page
                      );
                    }}
                    className={classes.tableRow}
                  >
                    <TableCell align="center" className={classes.tableCell}>
                      {data.no}
                    </TableCell>
                    <TableCell align="center" className={classes.tableCell}>
                      {data.transactionId}
                    </TableCell>
                    <TableCell align="center" className={classes.tableCell}>
                      {data.pk3_transactionId_header}
                    </TableCell>
                    <TableCell align="center" className={classes.tableCell}>
                      {data.cameras_cameraTimestamp}
                    </TableCell>
                    <TableCell align="center" className={classes.tableCell}>
                      {data.audit_transactionId}
                    </TableCell>
                    <TableCell align="center" className={classes.tableCell}>
                      {data.timestamp}
                    </TableCell>
                  </StyledTableRow>
                ))
              : []}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
