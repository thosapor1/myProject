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
import React from "react";
import { Pagination } from "@material-ui/lab";

const useStyles = makeStyles((theme) => {
  return {
    container: {
      maxHeight: "67vh",
    },
    header: {
      backgroundColor: "#7C85BFff",
      border: "1px solid white",
      color: "white",
    },
    // tableRow: {
    //   "&:hover": {
    //     backgroundColor: "#e8eaf6 !important",
    //   },
    // },
    // tableCell: {
    //   cursor: "pointer",
    // },
  };
});

const headerCells = [
  {
    id: "userName",
    label: "userName",
  },
  {
    id: "event",
    label: "event",
  },
  {
    id: "transaction_id",
    label: "transaction_id",
  },
  {
    id: "from_State",
    label: "จาก State",
  },
  {
    id: "to_State",
    label: "มา State",
  },
  {
    id: "timestamp",
    label: "timestamp",
  },
];

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

export default function UserLogsTAble(props) {
  const classes = useStyles();
  const { dataList, page, onChange } = props;

  return (
    <div>
      <Pagination
        count={dataList.totalPages}
        color="primary"
        page={page}
        style={{
          display: "inline",
          margin: "2rem",
        }}
        onChange={onChange}
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
            {!!dataList.log_record
              ? dataList.log_record.map((data, index) => (
                  <StyledTableRow key={index} className={classes.tableRow}>
                    <TableCell align="center" className={classes.tableCell}>
                      {data.username}
                    </TableCell>
                    <TableCell align="center" className={classes.tableCell}>
                      {data.events_name}
                    </TableCell>
                    <TableCell align="center" className={classes.tableCell}>
                      {data.transactionId === "0" ? "-" : data.transactionId}
                    </TableCell>
                    <TableCell align="center" className={classes.tableCell}>
                      {data.stateBefore === 0 ? "-" : data.stateBefore}
                    </TableCell>
                    <TableCell align="center" className={classes.tableCell}>
                      {data.stateAfter === 0 ? "-" : data.stateAfter}
                    </TableCell>
                    <TableCell align="center" className={classes.tableCell}>
                      {data.timestamp}
                    </TableCell>
                  </StyledTableRow>
                ))
              :[]}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
