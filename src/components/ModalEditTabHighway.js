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
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { updateHighway } from "../service/allService";

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

export default function ModalEditTabHighway(props) {
  const classes = useStyle();

  const [inputModal, setInputModal] = useState({
    id: "",
    highway_name: "",
  });

  const { id, highway_name } = inputModal;

  const handleChange = (event) => {
    event.preventDefault();
    setInputModal({ ...inputModal, [event.target.name]: event.target.value });
  };

  const handleUpdate = async () => {
    const sendData = {
      highway_id: id,
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
      const res = updateHighway(sendData);
      if (res.data.status === true) {
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

  useEffect(() => {
    if (props.dataForEdit) setInputModal(props.dataForEdit);
    // console.log("dataModal", props.dataForEdit);
  }, [props.dataForEdit]);

  const body = (
    <div className={classes.modal}>
      <Typography variant="h6">แก้ไขข้อมูลสายทาง</Typography>
      <Divider />
      <Grid Container style={{ marginTop: 20 }}>
        <Grid item sm={12} md={12} lg={12} style={{ textAlign: "center" }}>
          <TextField
            className={classes.modalTextField}
            fullWidth
            size="small"
            variant="outlined"
            label="ชื่อสายทาง"
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
          onClick={handleUpdate}
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
