import {
  Button,
  Divider,
  Grid,
  makeStyles,
  Modal,
  TextField,
  Typography,
} from "@material-ui/core";
import axios from "axios";
import React, { useState } from "react";
import Swal from "sweetalert2";
import { addHighway } from "../service/allService";

const useStyle = makeStyles((theme) => {
  return {
    root: {},
    modal: {
      width: "20%",
      position: "absolute",
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      [theme.breakpoints.down("md")]: {
        width: "30%",
      },
    },
    modalTextField: {
      margin: theme.spacing(1, 0, 0),
      width: "100%",
    },
    btn2: {
      margin: theme.spacing(1, 1, 0, 0),
      // backgroundColor: "#46005E",
    },
  };
});

export default function ModalAddTabHighway(props) {
  const classes = useStyle();

  const [inputModal, setInputModal] = useState({
    highway_name: "",
  });

  const { highway_name } = inputModal;

  const handleChange = (event) => {
    event.preventDefault();
    setInputModal({ ...inputModal, [event.target.name]: event.target.value });

    console.log(inputModal);
  };

  const handleSubmit = async () => {
    const sendData = {
      highway_name: highway_name,
    };
    console.log(sendData);

    const result = await Swal.fire({
      text: "คุณต้องการบันทึกข้อมูล!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "ยืนยัน",
      cancelButtonText: "ยกเลิก",
    });

    if (result.isConfirmed) {
      const res = await addHighway(sendData);
      if (!!res && !!res.data.status) {
        Swal.fire({
          title: "Success",
          text: "ข้อมูลของท่านถูกบันทึกแล้ว",
          icon: "success",
          confirmButtonText: "OK",
        });
        props.onClick();
        props.onFetchData();
      } else {
        Swal.fire({
          title: "Fail",
          text: "บันทึกข้อมูลไม่สำเร็จ",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    }
  };

  const body = (
    <div className={classes.modal}>
      <Typography variant="h6">เพิ่มสายทาง</Typography>
      <Divider style={{ marginTop: 20 }} />
      <Grid Container style={{ marginTop: 20 }}>
        <Grid item sm={12} md={12} lg={12} style={{ textAlign: "center" }}>
          <TextField
            // error={username.length === 0 ? true : false}
            className={classes.modalTextField}
            size="small"
            variant="outlined"
            label="สายทาง"
            name="highway_name"
            onChange={handleChange}
            value={highway_name}
          />
        </Grid>
      </Grid>
      <Divider style={{ marginTop: 25 }} />
      <div style={{ textAlign: "right" }}>
        <Button
          variant="contained"
          color="primary"
          className={classes.btn2}
          onClick={handleSubmit}
        >
          บันทึก
        </Button>
        <Button
          variant="contained"
          className={classes.btn2}
          onClick={props.onClick}
          color="secondary"
        >
          ยกเลิก
        </Button>
      </div>
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
        }}
      >
        {body}
      </Modal>
    </div>
  );
}
