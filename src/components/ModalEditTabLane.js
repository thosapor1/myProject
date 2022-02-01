import {
  Button,
  Divider,
  Grid,
  makeStyles,
  MenuItem,
  Modal,
  TextField,
  Typography,
} from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
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

export default function ModalEditTabLane(props) {
  const classes = useStyle();

  const [inputModal, setInputModal] = useState({
    gate_name: "",
    cam_ip: "",
    cam_lane: "",
    highway_id: "",
    checkpoint_id: "",
    id: "",
  });

  const {
    checkpoint_name,
    gate_name,
    cam_ip,
    cam_lane,
    highway_id,
    checkpoint_id,
    id,
  } = inputModal;

  const handleChange = (event) => {
    event.preventDefault();
    setInputModal({ ...inputModal, [event.target.name]: event.target.value });
  };

  const handleUpdate = async () => {
    const sendData = {
      gate_id: id,
      highway_id: highway_id,
      checkpoint_id: checkpoint_name,
      gate_name: gate_name,
      cam_ip: cam_ip,
      cam_lane: cam_lane,
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
          .post("/update-gate", sendData)
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

  useEffect(() => {
    if (props.dataForEdit) setInputModal(props.dataForEdit);
    // console.log("dataModal", props.dataForEdit);
  }, [props.dataForEdit]);

  const body = (
    <div className={classes.modal}>
      <Typography variant="h6">แก้ไขข้อมูลช่องเก็บค่าผ่านทาง</Typography>
      <Divider />
      <Grid Container style={{ marginTop: 20, display: "flex" }}>
        <Grid item md={12} style={{ textAlign: "center" }}>
          <TextField
            select
            className={classes.modalTextField}
            size="small"
            variant="outlined"
            label="สายทาง"
            name="highway_name"
            onChange={handleChange}
            value={highway_id}
          >
            {props.dataList.highway_list.map((item) => (
              <MenuItem key={item.id} value={item.id}>
                {item.highway_name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            className={classes.modalTextField}
            size="small"
            variant="outlined"
            label="ด่าน"
            name="checkpoint_name"
            onChange={handleChange}
            value={checkpoint_id}
          >
            {props.dataList.checkpoint_list.map((item) => (
              <MenuItem key={item.id} value={item.id}>
                {item.checkpoint_name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            className={classes.modalTextField}
            size="small"
            variant="outlined"
            label="ช่องจราจร"
            name="gate_name"
            onChange={handleChange}
            value={gate_name}
          />
          <TextField
            className={classes.modalTextField}
            size="small"
            variant="outlined"
            label="camera ip"
            name="cam_ip"
            onChange={handleChange}
            value={cam_ip}
          />
          <TextField
            className={classes.modalTextField}
            size="small"
            variant="outlined"
            label="camera lane"
            name="cam_lane"
            onChange={handleChange}
            value={cam_lane}
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
