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

const apiURL = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? `${process.env.REACT_APP_BASE_URL_PROD_V1}`
      : `${process.env.REACT_APP_BASE_URL_V1}`,
});

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

export default function ModalAddTabFee(props) {
  const classes = useStyle();

  const [inputModal, setInputModal] = useState({
    vehicle_class: "",
    vehicle_name: "",
    vehicle_fee: "",
  });

  const { vehicle_class, vehicle_name, vehicle_fee } = inputModal;

  const handleChange = (event) => {
    event.preventDefault();
    setInputModal({ ...inputModal, [event.target.name]: event.target.value });

    console.log(inputModal);
  };

  const handleSubmit = () => {
    const sendData = {
      vehicle_class: vehicle_class,
      vehicle_name: vehicle_name,
      vehicle_fee: vehicle_fee,
    };
    console.log(sendData);

    Swal.fire({
      text: "คุณต้องการบันทึกข้อมูล!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "ยืนยัน",
      cancelButtonText: "ยกเลิก",
    }).then((result) => {
      if (result.isConfirmed) {
        apiURL
          .post("/add-vehicle_type", sendData)
          .then((res) => {
            console.log(res.data);
            if (res.data.status === true) {
              Swal.fire({
                title: "Success",
                text: "ข้อมูลของท่านถูกบันทึกแล้ว",
                icon: "success",
                confirmButtonText: "OK",
              });
            } else {
              Swal.fire({
                title: "Fail",
                text: "บันทึกข้อมูลไม่สำเร็จ",
                icon: "error",
                confirmButtonText: "OK",
              });
            }
          })
          .then(() => props.onClick())
          .then(() => props.onFetchData());
      }
    });
  };

  const body = (
    <div className={classes.modal}>
      <Typography variant="h6">เพิ่มด่าน</Typography>
      <Divider />
      <Grid Container style={{ marginTop: 20, display: "flex" }}>
        <Grid item md={12} style={{ textAlign: "center" }}>
          <TextField
            // error={username.length === 0 ? true : false}
            className={classes.modalTextField}
            size="small"
            variant="outlined"
            label="รหัสประเภทรถ"
            name="vehicle_class"
            onChange={handleChange}
            value={vehicle_class}
          />
          <TextField
            // error={username.length === 0 ? true : false}
            className={classes.modalTextField}
            size="small"
            variant="outlined"
            label="ชื่อประเภทรถ"
            name="vehicle_name"
            onChange={handleChange}
            value={vehicle_name}
          />
          <TextField
            // error={username.length === 0 ? true : false}
            className={classes.modalTextField}
            size="small"
            variant="outlined"
            label="ค่าผ่านทาง"
            name="vehicle_fee"
            onChange={handleChange}
            value={vehicle_fee}
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
