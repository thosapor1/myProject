import {
  Box,
  Button,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
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
    cursor: "pointer",
  },
}))(TableRow);

export default function TableSectionMonitorPage(props) {
  const classes = useStyles();
  const [rowID, setRowID] = useState("");
  const [selectedPage, setSelectedPage] = useState("");
  const {
    header,
    body,
    tableOnClick,
    countPage,
    page,
    pageOnChange,
    color,
    selectedDate,
    checkpoint,
    gate,
    onFetchData,
  } = props;
  const getItemData = (item) => {
    tableOnClick(item);
  };
  return (
    <Paper style={{ marginTop: 10 }}>
      {/* <Box style={{ display: 'flex', justifyContent: 'space-between' }}> */}
      <Pagination
        count={countPage}
        page={parseInt(page)}
        onChange={pageOnChange}
      />
      <Box
        style={{ display: "flex", justifyContent: "space-between", margin: 10 }}
      >
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
              onFetchData(
                parseInt(selectedPage),
                selectedDate,
                checkpoint,
                gate
              );
              setSelectedPage("");
            }}
          >
            Go
          </Button>
        </Box>
        <Box>
          <Typography style={{ paddingLeft: 20, paddingTop: 15 }}>
            จำนวน transaction : {!!body.totalCount ? body.totalCount : 0}
          </Typography>
        </Box>
      </Box>

      {/* </Box> */}
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
                        fontSize: "0.8rem",
                      }}
                    >
                      {header.label}
                    </TableCell>
                  ))
                : []}
            </TableRow>
          </TableHead>
          <TableBody>
            {!!body.resultsDisplay
              ? body.resultsDisplay.map((item, index) => (
                  <StyledTableRow
                    onClick={() => {
                      getItemData(item);
                      setRowID(index);
                    }}
                    key={index}
                    selected={rowID === index}
                    className={classes.selected}
                  >
                    <TableCell>{item.id}</TableCell>
                    <TableCell>{item.trg_id}</TableCell>
                    <TableCell>{`${item.ts_timestamp.split(" ").pop()}:${
                      item.ts_millisecond
                    }`}</TableCell>
                    <TableCell>{item.em_record_ts.split(" ").pop()}</TableCell>
                  </StyledTableRow>
                ))
              : []}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
