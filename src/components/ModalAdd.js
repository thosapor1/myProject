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
import React, { useState } from "react";
import Swal from "sweetalert2";

const apiURL = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? `${process.env.REACT_APP_BASE_URL_PROD_V2}`
      : `${process.env.REACT_APP_BASE_URL_V2}`,
});

const useStyle = makeStyles((theme) => {
  return {
    root: {},
    modal: {
      width: "35%",
      position: "absolute",
      backgroundColor: theme.palette.background.paper,
      border: "1px solid gray",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 3),
    },
    modalTextField: {
      margin: theme.spacing(0.5, 0),
      width: "100%",
    },
    modalTextFieldHide: {
      margin: theme.spacing(0.5, 0),
      width: "100%",
      display: "none",
    },
    btn2: {
      margin: theme.spacing(1, 1, 0, 0),
    },
  };
});

export default function ModalAdd(props) {
  const classes = useStyle();

  const [inputModal, setInputModal] = useState({
    username: "",
    password: "",
    fname: "",
    lname: "",
    position_id: "",
    department_id: "",
    email: "",
    tel: "",
    permission_id: "",
    highway_id: "",
    checkpoint_id: "0",
  });

  const {
    username,
    password,
    fname,
    lname,
    position_id,
    department_id,
    email,
    tel,
    highway_id,
    checkpoint_id,
  } = inputModal;

  const handleChange = (event) => {
    event.preventDefault();
    setInputModal({ ...inputModal, [event.target.name]: event.target.value });

    console.log(inputModal);
  };

  const handleCancel = () => {
    setInputModal({
      username: "",
      password: "",
      fname: "",
      lname: "",
      position_id: "",
      department_id: "",
      email: "",
      tel: "",
      permission_id: "",
      highway_id: "",
      checkpoint_id: "0",
    });
    setShowResult(false);
  };

  const handleSubmit = () => {
    props.onClose();
    apiURL
      .post("/add-user", {
        username: username,
        password: password,
        first_name: fname,
        last_name: lname,
        position_id: position_id,
        department_id: department_id,
        email: email,
        tel: tel,
        permission_id: position_id,
        highway_id: highway_id,
        checkpoint_id: checkpoint_id,
      })
      .then((res) => {
        if (res.data.status === true) {
          props.onClose();
          Swal.fire({
            title: "Success!",
            text: "ข้อมูลของท่านถูกบันทึกแล้ว",
            icon: "success",
            confirmButtonText: "OK",
          });
          window.location.reload();
        } else {
          props.onClose();
          Swal.fire({
            icon: "error",
            text: "ตรวจสอบข้อมูลของท่าน",
          });
          window.location.reload();
        }
      })
      .catch((err) => {
        props.onClose();
        Swal.fire({
          icon: "error",
          text: "ไม่สามารถเชื่อมต่อเซิฟเวอร์ได้ในขณะนี้",
        });
      });
  };

  const [showResult, setShowResult] = useState(false);

  const body = (
    <div className={classes.modal}>
      <Typography variant="h6">เพิ่มผู้ใช้งาน</Typography>
      <Divider style={{ marginBottom: 20 }} />
      <Grid container justifyContent="center">
        <Grid item sm={12} md={12} lg={12} style={{ textAlign: "center" }}>
          <TextField
            // error={username.length === 0 ? true : false}
            className={classes.modalTextField}
            size="small"
            variant="outlined"
            label="username"
            name="username"
            onChange={handleChange}
            value={username}
          />
          <TextField
            className={classes.modalTextField}
            size="small"
            variant="outlined"
            label="password"
            name="password"
            onChange={handleChange}
            value={password}
          />
          <TextField
            className={classes.modalTextField}
            size="small"
            variant="outlined"
            label="ชื่อ"
            name="fname"
            onChange={handleChange}
            value={fname}
          />
          <TextField
            className={classes.modalTextField}
            size="small"
            variant="outlined"
            label="นามสกุล"
            name="lname"
            onChange={handleChange}
            value={lname}
          />
          <TextField
            className={classes.modalTextField}
            size="small"
            variant="outlined"
            label="ตำแหน่ง"
            select
            onChange={handleChange}
            name="position_id"
            value={position_id}
          >
            <MenuItem key="1" value="1">
              super admin
            </MenuItem>
            <MenuItem key="2" value="2">
              หัวหน้างาน
            </MenuItem>
            <MenuItem key="3" value="3">
              เจ้าหน้าที่
            </MenuItem>
          </TextField>
          <TextField
            className={classes.modalTextField}
            size="small"
            variant="outlined"
            label="หน่วยงาน(สังกัด)"
            select
            onChange={handleChange}
            name="department_id"
            value={department_id}
          >
            <MenuItem key="1" value="1">
              เจ้าหน้าที่ตรวจสอบรายได้
            </MenuItem>
            <MenuItem key="1" value="2">
              เจ้าหน้าที่จัดเก็บ
            </MenuItem>
          </TextField>
          <TextField
            className={classes.modalTextField}
            size="small"
            variant="outlined"
            label="อีเมล"
            name="email"
            onChange={handleChange}
            value={email}
          />
          <TextField
            className={classes.modalTextField}
            size="small"
            variant="outlined"
            label="เบอร์โทรศัพท์"
            name="tel"
            onChange={handleChange}
            value={tel}
          />

          {/* permission data */}

          <TextField
            className={classes.modalTextField}
            variant="outlined"
            select
            size="small"
            label="สายทาง"
            onChange={handleChange}
            name="highway_id"
            value={highway_id}
          >
            <MenuItem key="1" value="1" onClick={() => setShowResult(true)}>
              ทางหลวงหมายเลข 9
            </MenuItem>
            <MenuItem
              key="2"
              value="2"
              onClick={() => {
                setShowResult(false);
              }}
            >
              SDFS
            </MenuItem>
          </TextField>

          <TextField
            select
            variant="outlined"
            className={
              showResult === 1
                ? classes.modalTextField
                : classes.modalTextFieldHide
            }
            size="small"
            label="ด่าน"
            name="checkpoint_id"
            value={checkpoint_id}
            onChange={handleChange}
          >
            <MenuItem key="0" value="0">
              ทุกด่าน
            </MenuItem>
            <MenuItem key="1" value="1">
              ทับช้าง1
            </MenuItem>
            <MenuItem key="2" value="2">
              ทับช้าง2
            </MenuItem>
            <MenuItem key="3" value="3">
              ธัญบุรี1
            </MenuItem>
            <MenuItem key="4" value="4">
              ธัญบุรี2
            </MenuItem>
          </TextField>
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
          onClick={() => {
            props.onClick();
            handleCancel();
          }}
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
        }}
      >
        {body}
      </Modal>
    </div>
  );
}
