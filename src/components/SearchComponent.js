import { Button, Paper, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React from "react";
import format from "date-fns/format";
import Swal from "sweetalert2";
import { searchOnExpectIncome } from "../service/allService";

const useStyle = makeStyles((theme) => {
  return {
    root: {},
    input: {
      "& .MuiInputBase-input": {
        fontSize: "0.8rem",
      },
      "& .MuiSelect-selectMenu": {
        height: 15,
      },
      "& .MuiInputBase-root": {
        height: 40,
      },
      width: 150,
      margin: theme.spacing(1),
      [theme.breakpoints.down("lg")]: {
        width: 150,
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
        height: 40,
      },
      "& .MuiInputLabel-outlined": {
        transform: "translate(14px, 14px) scale(1)",
        fontSize: "0.8rem",
      },
      "& .MuiInputLabel-shrink": {
        transform: "translate(14px, -6px) scale(0.75)",
      },
      width: 200,
      margin: theme.spacing(1),
      [theme.breakpoints.down("lg")]: {
        width: 200,
      },
    },
  };
});

export default function SearchComponent(props) {
  const classes = useStyle();
  const {
    date,
    label,
    value,
    name,
    handleOnChange,
    setTable,
    endpoint,
    setEyesStatus,
  } = props;

  const onClickHandle = async () => {
    const sendData = {
      date: format(date, "yyyy-MM-dd"),
      transactionId: value,
    };
    let eye = [];

    Swal.fire({
      title: "Loading",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    const res = await searchOnExpectIncome(endpoint, sendData);

    if (!!res && !!res.data.status) {
      eye.push({
        state: res.data.resultsDisplay[0].state,
        readFlag: res.data.resultsDisplay[0].readFlag,
        transactionId: res.data.resultsDisplay[0].transactionId,
      });
      setEyesStatus(eye);
      setTable(!!res.data.status ? res.data : []);
      Swal.close();
    }
    if (!!res && !res.data.status) {
      Swal.fire({
        title: "Fail",
        text: "โปรดใส่ transaction",
        icon: "warning",
      });
    }
  };

  return (
    <>
      <Paper style={{ height: 112 }}>
        <TextField
          variant="outlined"
          className={classes.input1}
          label={label}
          value={value}
          name={name}
          onChange={handleOnChange}
        />
        <Button
          variant="contained"
          color="primary"
          style={{ display: "block", marginLeft: 120 }}
          onClick={onClickHandle}
        >
          {`Search`}
        </Button>
      </Paper>
    </>
  );
}
