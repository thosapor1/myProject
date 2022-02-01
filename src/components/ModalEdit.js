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
    btn2: {
      margin: theme.spacing(1, 1, 0, 0),
    },
  };
});

export default function ModalEdit(props) {
  const classes = useStyle();

  const [inputModal, setInputModal] = useState({
    user_id: "",
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
    checkpoint_id: "",
  });

  const [status, setStatus] = useState();

  const {
    user_id,
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
  };

  const handleUpdate = async () => {
    const sendData = {
      user_id: user_id,
      username: username,
      first_name: fname,
      last_name: lname,
      position_id: position_id,
      department_id: department_id,
      email: email,
      tel: tel,
      highway_id: highway_id,
      checkpoint_id: checkpoint_id,
      permission_id: position_id,
      password: password,
    };
    console.log(sendData);
    apiURL.post("/update-user", sendData).then((res) => {
      setStatus({ status: res.data.status });
      console.log(res.data);
      props.onClose();
      Swal.fire({
        title: "Success!",
        text: "ข้อมูลของท่านถูกแก้ไขแล้ว",
        icon: "success",
        confirmButtonText: "ตกลง",
      }).then(() => {
        window.location.reload();
      });
      console.log("yes");
    });

    if (status === true) {
    }
    if (status === false) {
      props.onClose();
      Swal.fire({
        icon: "error",
        text: "ตรวจสอบข้อมูลของท่าน",
      });
      console.log("no");
    }
  };

  const [showResult, setshowResult] = useState(false);

  useEffect(() => {
    if (props.dataForEdit) setInputModal(props.dataForEdit);

    if (!!props.dataForEdit && props.dataForEdit.highway_id === 1) {
      setshowResult(true);
    } else {
      setshowResult(false);
    }

    // console.log("dataModal", props.dataForEdit);
  }, [props.dataForEdit]);

  const body = (
    <div className={classes.modal}>
      <Typography variant="h6">แก้ไขข้อมูลผู้ใช้งาน</Typography>
      <Divider style={{ marginBottom: 20 }} />
      <Grid container justifyContent="center">
        <Grid item sm={12} md={12} lg={12} style={{ textAlign: "center" }}>
          <TextField
            className={classes.modalTextField}
            fullWidth
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
            <MenuItem value="1">เจ้าหน้าที่ตรวจสอบรายได้</MenuItem>
            <MenuItem value="2">เจ้าหน้าที่ตรวจสอบระบบ</MenuItem>
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
            <MenuItem key="1" value="1" onClick={() => setshowResult(true)}>
              ทางหลวงหมายเลข 9
            </MenuItem>
            <MenuItem
              key="2"
              value="2"
              onClick={() => {
                setshowResult(false);
              }}
            >
              SDFS
            </MenuItem>
          </TextField>
          {showResult === 1 ? (
            <TextField
              select
              variant="outlined"
              className={classes.modalTextField}
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
          ) : null}
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
        }}
      >
        {body}
      </Modal>
    </div>
  );
}
