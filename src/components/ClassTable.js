import {
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import React from "react";

const useStyles = makeStyles((theme) => {
  return {
    root: {
      "& .MuiTableCell-root": {
        padding: 10,
      },
    },
    container: {
      maxHeight: 210,
    },
    header: {
      backgroundColor: "#7C85BFff;",
      border: "1px solid white",
      color: "white",
      fontSize: "0.8rem",
      zIndex: 1,
    },
    footer: {
      backgroundColor: "darkgreen;",
      border: "1px solid white",
      color: "white",
      fontSize: "0.8rem",
    },
    body: {
      fontSize: "0.8rem",
    },
  };
});

const headerCells = [
  {
    id: "class",
    label: "ประเภท",
  },
  {
    id: "allCar",
    label: "จำนวนรถทั้งหมด(คัน)",
  },
  {
    id: "except",
    label: "รถยกเว้น(คัน)",
  },
  {
    id: "takeMoney",
    label: "รถรับเงิน(คัน)",
  },
  {
    id: "summary",
    label: "รวมเงิน(บาท)",
  },
];

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

export default function ClassTable(props) {
  const classes = useStyles();

  const { dataList } = props;

  return (
    <div>
      <TableContainer className={classes.container}>
        <Table stickyHeader className={classes.root}>
          <TableHead>
            <StyledTableRow>
              {headerCells.map((headerCell, index) => (
                <TableCell
                  key={index}
                  className={classes.header}
                  align="center"
                >
                  {headerCell.label}
                </TableCell>
              ))}
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {!!dataList.result_vehicleClass
              ? dataList.result_vehicleClass
                  .filter((item) => item.class !== "total")
                  .map((data, index) => (
                    <StyledTableRow key={index}>
                      <TableCell align="center" className={classes.body}>
                        {`C${data.class}`}
                      </TableCell>
                      <TableCell align="center" className={classes.body}>
                        {!!data.sum_all ? data.sum_all.toLocaleString() : 0}
                      </TableCell>
                      <TableCell align="center" className={classes.body}>
                        {!!data.reject ? data.reject.toLocaleString() : 0}
                      </TableCell>
                      <TableCell align="center" className={classes.body}>
                        {!!data.normal ? data.normal.toLocaleString() : 0}
                      </TableCell>
                      <TableCell align="center" className={classes.body}>
                        {!!data.revenue ? data.revenue.toLocaleString() : 0}
                      </TableCell>
                    </StyledTableRow>
                  ))
              : []}
          </TableBody>
          <TableFooter>
            <StyledTableRow>
              <TableCell align="center" className={classes.footer}>
                {!!dataList.result_vehicleClass &&
                !!dataList.result_vehicleClass[
                  dataList.result_vehicleClass.length - 1
                ]
                  ? dataList.result_vehicleClass[
                      dataList.result_vehicleClass.length - 1
                    ].class
                  : `total`}
              </TableCell>
              <TableCell align="center" className={classes.footer}>
                {!!dataList.result_vehicleClass &&
                !!dataList.result_vehicleClass[
                  dataList.result_vehicleClass.length - 1
                ].sum_all
                  ? dataList.result_vehicleClass[
                      dataList.result_vehicleClass.length - 1
                    ].sum_all.toLocaleString()
                  : 0}
              </TableCell>
              <TableCell align="center" className={classes.footer}>
                {!!dataList.result_vehicleClass &&
                !!dataList.result_vehicleClass[
                  dataList.result_vehicleClass.length - 1
                ].reject
                  ? dataList.result_vehicleClass[
                      dataList.result_vehicleClass.length - 1
                    ].reject.toLocaleString()
                  : 0}
              </TableCell>
              <TableCell align="center" className={classes.footer}>
                {!!dataList.result_vehicleClass &&
                !!dataList.result_vehicleClass[
                  dataList.result_vehicleClass.length - 1
                ].normal
                  ? dataList.result_vehicleClass[
                      dataList.result_vehicleClass.length - 1
                    ].normal.toLocaleString()
                  : 0}
              </TableCell>
              <TableCell align="center" className={classes.footer}>
                {!!dataList.result_vehicleClass &&
                !!dataList.result_vehicleClass[
                  dataList.result_vehicleClass.length - 1
                ].revenue
                  ? dataList.result_vehicleClass[
                      dataList.result_vehicleClass.length - 1
                    ].revenue.toLocaleString()
                  : 0}
              </TableCell>
            </StyledTableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </div>
  );
}
