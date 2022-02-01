import { Button, MenuItem, Paper, TextField } from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import React from "react";

export default function FilterSectionMonitorPage(props) {
  const {
    dateValue,
    dateOnChange,
    checkpointValue,
    checkpointList,
    checkpointOnChange,
    gateValue,
    gateList,
    gateOnChange,
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
        select
        label="ด่าน"
        onChange={checkpointOnChange}
        style={{ width: 100, margin: 10 }}
        name="checkpoint"
        SelectProps={{ value: checkpointValue }}
      >
        {!!checkpointList
          ? checkpointList.map((item) => (
              <MenuItem key={item.id} value={item.id}>
                {item.checkpoint_name}
              </MenuItem>
            ))
          : []}
      </TextField>

      <TextField
        select
        label="ช่อง"
        onChange={gateOnChange}
        style={{ width: 100, margin: 10 }}
        name="gate"
        SelectProps={{ value: gateValue }}
      >
        {!!gateList
          ? gateList.map((item) => (
              <MenuItem key={item.id} value={item.id}>
                {item.name}
              </MenuItem>
            ))
          : []}
      </TextField>

      <Button
        variant="contained"
        style={{
          marginTop: "20px",
          marginLeft: "10px",
          backgroundColor: `${color}`,
          color:'white'
        }}
        onClick={buttonOnClick}
      >
        filter
      </Button>
    </Paper>
  );
}


