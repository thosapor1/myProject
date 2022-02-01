import { Button, Paper, TextField } from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import React from "react";

export default function FilterSectionSearch(props) {
  const {
    dateValue,
    dateOnChange,
    transactionOnChange,
    transactionValue,
    buttonOnClick,
    color,
  } = props;

  return (
    <Paper style={{ textAlign: "center" }}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          style={{ width: 150, margin: 10 }}
          disableToolbar
          variant="inlined"
          format="dd/MM/yyyy"
          margin="normal"
          id="date-picker-inline"
          label="วันที่เข้าด่าน"
          value={dateValue}
          onChange={dateOnChange}
          KeyboardButtonProps={{
            "aria-label": "change date",
          }}
        />
      </MuiPickersUtilsProvider>

      <TextField
        label="Transaction id"
        onChange={transactionOnChange}
        style={{ width: 200, margin: 10 }}
        name="transactionId"
        SelectProps={{ value: transactionValue }}
      />

      <Button
        variant="contained"
        style={{
          marginTop: "20px",
          marginLeft: "10px",
          backgroundColor: `${color}`,
          color: "white",
        }}
        onClick={buttonOnClick}
      >
        Search
      </Button>
    </Paper>
  );
}
