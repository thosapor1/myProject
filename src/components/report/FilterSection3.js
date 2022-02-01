import {
  Button,
  Grid,
  makeStyles,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import React, { useEffect, useRef, useState } from "react";
import DateFnsUtils from "@date-io/date-fns";

const useStyles = makeStyles((theme) => {
  return {
    root: {},
    filterSection: {
      padding: theme.spacing(2),
      marginTop: 10,
      justifyContent: "center",
      alignItems: "center",
    },
    btn: {
      backgroundColor: "#46005E",
      color: "white",
      margin: theme.spacing(1),
      "&:hover": {
        backgroundColor: "#6a008f",
      },
    },
    input: {
      "& .MuiInputBase-input": {
        fontSize: "0.8rem",
      },
      "& .MuiSelect-selectMenu": {
        height: 15,
      },
      width: 150,
      margin: theme.spacing(1),
      [theme.breakpoints.down("lg")]: {
        width: 150,
      },
    },
  };
});

const valueMenuItem = [
  // {
  //   id: 0,
  //   value: 0,
  //   label: "ทุกด่าน",
  // },
  {
    id: 1,
    value: 1,
    label: "ทับช้าง1",
  },
  {
    id: 2,
    value: 2,
    label: "ทับช้าง2",
  },
  {
    id: 3,
    value: 3,
    label: "ธัญบุรี1",
  },
  {
    id: 4,
    value: 4,
    label: "ธัญบุรี2",
  },
];

export default function FilterSection3(props) {
  const { onFetchData, report, exportExcel } = props;
  const classes = useStyles();
  const [selectedDate, setSelectedDate] = useState(
    new Date().setDate(new Date().getDate() - 1)
  );
  const [checkpoint, setCheckpoint] = useState(1);

  useEffect(() => {}, []);
  return (
    <>
      <Grid
        container
        component={Paper}
        maxWidth="xl"
        className={classes.filterSection}
      >
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            inputVariant="outlined"
            className={classes.input}
            disableToolbar
            variant="inlined"
            format="dd/MM/yyyy"
            margin="normal"
            id="date"
            label="เดือน"
            value={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
          />
        </MuiPickersUtilsProvider>

        <TextField
          variant="outlined"
          className={classes.input}
          select
          label="ด่าน"
          value={checkpoint}
          onChange={(e) => {
            setCheckpoint(e.target.value);
          }}
          name="gate_select"
        >
          {valueMenuItem.map((item) => (
            <MenuItem key={item.id} value={item.value}>
              {item.label}
            </MenuItem>
          ))}
        </TextField>

        <Button
          variant="contained"
          className={classes.btn}
          onClick={() => {
            onFetchData();
          }}
        >
          ดูข้อมูล
        </Button>

        <Button
          variant="contained"
          className={classes.btn}
          style={{ backgroundColor: "lightpink" }}
          onClick={() => {
            report(selectedDate, checkpoint);
          }}
        >
          pdf
        </Button>

        <Button
          variant="contained"
          className={classes.btn}
          style={{ backgroundColor: "lightgreen" }}
          onClick={() => {
            exportExcel(selectedDate, checkpoint);
          }}
        >
          excel
        </Button>
        <Typography id="load"></Typography>
      </Grid>
    </>
  );
}
