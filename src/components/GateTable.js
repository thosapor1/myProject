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
      maxHeight: 270,
    },
    header: {
      backgroundColor: "#7C85BFff",
      border: "1px solid white",
      color: "white",
      fontSize: "0.8rem",
    },
    body: {
      fontSize: "0.8rem",
    },
  };
});

const headCells = [
  {
    id: "station",
    label: "ด่าน",
    minWidth: 170,
  },
  {
    id: "lane",
    label: "ช่องจราจร",
  },
  {
    id: "volume",
    label: "ปริมาณรถ",
  },
];

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

export default function GateTable(props) {
  const classes = useStyles();
  const { dataList } = props;

  return (
    <div>
      <TableContainer className={classes.container}>
        <Table stickyHeader>
          <TableHead>
            <StyledTableRow>
              {headCells.map((headCell, index) => (
                <TableCell
                  key={index}
                  className={classes.header}
                  align="center"
                >
                  {headCell.label}
                </TableCell>
              ))}
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {!!dataList
              ? dataList.map((data, index) => (
                  <StyledTableRow key={index}>
                    <TableCell align="center" className={classes.body}>{data.checkpoint_name}</TableCell>
                    <TableCell align="center" className={classes.body}>{data.gate_name}</TableCell>
                    <TableCell align="center" className={classes.body}>{data.ts_count}</TableCell>
                  </StyledTableRow>
                ))
              : []}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
