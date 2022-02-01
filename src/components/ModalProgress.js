import { Grid, makeStyles, Modal, Typography } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import CameraEnhanceTwoToneIcon from "@material-ui/icons/CameraEnhanceTwoTone";
import noImage from "../image/noImageFound.jpg";
import CancelTwoToneIcon from "@material-ui/icons/CancelTwoTone";
import Cookies from "js-cookie";

const useStyle = makeStyles((theme) => {
  return {
    root: {},
    modal: {
      top: 50,
      width: "30%",
      position: "absolute",
      backgroundColor: theme.palette.background.paper,
      border: "1px solid lightgray",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
    head: {
      display: "flex",
      justifyContent: "space-between",
    },
    headCard: {
      display: "flex",
      margin: "10px 0px",
    },
    cardContainer: {},
    cardItem: {
      paddingLeft: "0.5rem",
      paddingRight: "0.5rem",
    },
    image: {
      height: "300px",
      width: "90%",
      border: "1px solid lightgray",
      marginRight: "auto",
      marginLeft: "auto",
    },
    tableHead1: {
      backgroundColor: "#7C85BFff",
      border: "1px solid white",
      color: "white",
    },
    tableHead2: {
      backgroundColor: "#ffac33",
      border: "1px solid white",
      color: "white",
    },
    tableHead3: {
      backgroundColor: "#64b5f6",
      border: "1px solid white",
      color: "white",
    },
    tableHead4: {
      backgroundColor: "red",
      border: "1px solid white",
      color: "white",
    },
    table: {
      width: "100%",
      padding: "1rem",
      "& .MuiTableCell-root": {
        paddingTop: "0.2rem",
        paddingBottom: "0.2rem",
        width: "50%",
      },
    },
    btn: {
      margin: theme.spacing(1),
      fontSize: "0.7rem",
    },
    textField: {
      height: 20,
      bottom: 5,
      width: 130,
      "& .MuiInput-input": { fontSize: "0.9rem" },
    },
    tab: {
      fontSize: "0.7rem",
      minWidth: "25%",
      color: "blue",
    },
    disableLabel: {
      "& .MuiInputLabel-root": {
        color: "blue",
      },
      width: "91%",
      marginTop: 2,
      margin: "0px 17px",
    },
    normalBtn: {
      color: "white",
      backgroundColor: "green",
      fontSize: "0.7rem",
      margin: theme.spacing(1),
    },
    disabledBtn: {
      color: "gray",
      backgroundColor: "lightgray",
      marginTop: 21,
      fontSize: "0.7rem",
    },
    divBTN: {
      padding: "0px 15px",
      marginTop: 150,
      [theme.breakpoints.only("md")]: {
        marginTop: 132,
      },
    },
    tabs: {
      height: "0.3rem",
      color: "blue",
      padding: "0px 10px",
    },
  };
});

export default function ModalProgress(props) {
  const classes = useStyle();

//   useEffect(() => {}, []);

  const body = (
    <div className={classes.modal}>
      <div className={classes.head}>
        <div>
          <Typography variant="h6" style={{ color: "#c80000" }}>
            {`Progress Bar`}
          </Typography>
        </div>
      </div>
      <Grid container className={classes.cardContainer}>
        {/* CCTV Audit block */}
      </Grid>
    </div>
  );

  return (
    <div>
      <Modal
        open={props.open}
        onClose={props.onClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 2,
          overflow: "scroll",
        }}
      >
        {body}
      </Modal>
    </div>
  );
}
