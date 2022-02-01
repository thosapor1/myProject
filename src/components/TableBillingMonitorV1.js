import {
  Box,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import { withStyles } from "@material-ui/styles";
import React, { useState } from "react";

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
    cursor: "pointer",
  },
}))(TableRow);
export default function TableBillingMonitorPage(props) {
  const classes = useStyles();
  const [rowID, setRowID] = useState("");
  const { header, body, countPage, page, pageOnChange, color } = props;
  console.log(countPage, page);
  return (
    <Paper style={{ marginTop: 10 }}>
      <Box
        style={{
          display: "flex",
          justifyContent: "space-between",
          paddingTop: 10,
        }}
      >
        <Pagination count={countPage} page={page} onChange={pageOnChange} />
        <h5 style={{ marginTop: 10, paddingRight: 20 }}>
          จำนวน Billing รวม : {body.data_count}
        </h5>
      </Box>

      <TableContainer style={{ maxHeight: 520 }}>
        <Table stickyHeader style={{ marginTop: 10, maxHeight: 200 }}>
          <TableHead>
            <TableRow>
              {!!header
                ? header.map((header) => (
                    <TableCell
                      key={header.id}
                      style={{
                        backgroundColor: `${color}`,
                        color: "white",
                        border: "1px solid white",
                      }}
                    >
                      {header.label}
                    </TableCell>
                  ))
                : []}
            </TableRow>
          </TableHead>
          <TableBody>
            {!!body.data
              ? body.data.map((item, index) => (
                  <StyledTableRow
                    onClick={() => {
                      setRowID(index);
                    }}
                    key={index}
                    selected={rowID === index}
                    className={classes.selected}
                  >
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{item.headerTransactionId}</TableCell>
                    <TableCell>
                      {item.invoiceDetails_transactionDate.substring(11)}
                    </TableCell>
                    <TableCell>{item.feeAmount}</TableCell>
                    <TableCell>{item.fineAmount}</TableCell>
                    <TableCell>{item.collectionAmount}</TableCell>
                    <TableCell>{item.totalAmount}</TableCell>
                    <TableCell>{item.timestamp.substring(11)}</TableCell>
                  </StyledTableRow>
                ))
              : []}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
