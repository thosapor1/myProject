import {
  Button,
  CardMedia,
  createTheme,
  Grid,
  makeStyles,
  MuiThemeProvider,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import P_login from "../image/P_login.jpg";
import Logo_doh from "../image/Logo_doh.png";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import Cookies from "js-cookie";

const theme = createTheme({
  typography: {
    fontFamily: "Prompt",
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 600,
    fontWeightBold: 700,
  },
});

const useStyle = makeStyles((theme) => {
  return {
    root: {
      backgroundColor: "#933583",
      // height: "100vh",
      paddingBottom: "25%",
      paddingTop: "4%",
      [theme.breakpoints.down("xs")]: {
        padding: "0px 0px",
      },
    },
    paper: {
      display: "flex",
      width: "60%",
      margin: "0px auto",
      [theme.breakpoints.down("xs")]: {
        width: "100%",
      },
    },
    leftSide: {},
    rightSide: {
      paddingBottom: "60px",
      [theme.breakpoints.down("xs")]: {
        paddingBottom: "30%",
      },
    },
    typography: {
      fontSize: "1.5rem",
      fontFamily: "Prompt",
    },
    btn: {
      marginTop: "2rem",
      width: 100,
      height: 40,
      fontFamily: "Prompt",
    },
    textField: {
      margin: "10px auto",
      width: "60%",
      fontFamily: "Prompt",
    },
  };
});

const apiURL = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? `${process.env.REACT_APP_BASE_URL_PROD_V2}`
      : `${process.env.REACT_APP_BASE_URL_V2}`,
});

export default function Login() {
  const classes = useStyle();

  const history = useHistory();

  const [state, setState] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    e.preventDefault();
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const userName = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    console.log(userName, password);

    const sendData = {
      username: userName,
      password: password,
    };

    Swal.fire({
      title: "Loading",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    apiURL.post("/auth", sendData, { timeout: 10000 }).then((res) => {
      localStorage.setItem("isAuth", true);
      console.log("res:", res.data);
      Swal.close();
      const setCookies = () => {
        Cookies.set("checkpoint_id", res.data.result[0].checkpoint_id);
        Cookies.set("department_id", res.data.result[0].department_id);
        Cookies.set("highway_id", res.data.result[0].highway_id);
        Cookies.set("userId", res.data.result[0].id);
        Cookies.set("permission_id", res.data.result[0].permission_id);
        Cookies.set("position_id", res.data.result[0].position_id);
        Cookies.set("username", res.data.result[0].username);
      };

      if (!!res.data.status && res.data.result[0].department_id === 1) {
        console.log("pass", res.data.status);
        setCookies();
        history.push("/dashboard2");
      } else if (!!res.data.status && res.data.result[0].department_id === 2) {
        setCookies();
        history.push("/pk3Display");
        console.log("res:", res.data);
      } else if (res.data.status === false) {
        console.log("res:", res.data);
        Swal.fire({
          icon: "error",
          text: "ตรวจสอบ username และ password ของท่าน",
        });
      } else if (res.data.result[0].status === 0) {
        console.log("res:", res.data);
        Swal.fire({
          icon: "error",
          text: "โปรดติดต่อ ADMIN",
        });
      } else {
        console.log("res:", res.data);
        Swal.fire({
          icon: "error",
          text: "ตรวจสอบ username และ password ของท่าน",
        });
      }
    }).catch((error) => {
      // handleClose();
      Swal.fire({
        icon: "error",
        text: "ไม่สามารถเชื่อมต่อเซิฟเวอร์ได้ในขณะนี้",
      });
    });

    // console.log(state.username, state.password);
  };

  return (
    <div className={classes.root}>
      <MuiThemeProvider theme={theme}>
        <Paper className={classes.paper}>
          <Grid container>
            <Grid item className={classes.leftSide} md={6} sm={12}>
              <CardMedia
                component="img"
                image={P_login}
                style={{ height: "100%", width: "100%" }}
              />
            </Grid>
            <Grid item className={classes.rightSide} sm={12} md={6} xs={12}>
              <CardMedia
                component="img"
                image={Logo_doh}
                style={{
                  maxWidth: 150,
                  height: 150,
                  width: "100%",
                  marginTop: "2rem",
                  marginBottom: "2rem",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              />
              <Typography
                variant="body1"
                align="center"
                className={classes.typography}
              >
                ระบบตรวจสอบรายได้
              </Typography>
              <Typography
                variant="body1"
                align="center"
                className={classes.typography}
              >
                กรมทางหลวง
              </Typography>

              <form noValidate autoComplete="off">
                <Grid
                  container
                  style={{ textAlign: "center", marginTop: "2rem" }}
                >
                  <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                    <TextField
                      className={classes.textField}
                      id="username"
                      label="ผู้ใช้งาน"
                      value={state.username}
                      variant="outlined"
                      name="username"
                      onChange={handleChange}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                    <TextField
                      className={classes.textField}
                      id="password"
                      label="รหัสผ่าน"
                      type="password"
                      value={state.password}
                      variant="outlined"
                      name="password"
                      onChange={handleChange}
                      fullWidth
                    />
                  </Grid>
                </Grid>
                <div
                  style={{
                    padding: "0px 8%",
                    display: "flex",
                    justifyContent: "space-around",
                  }}
                >
                  <Button
                    className={classes.btn}
                    variant="contained"
                    color="primary"
                    type="submit"
                    onClick={handleSubmit}
                  >
                    เข้าสู่ระบบ
                  </Button>
                  <Button
                    className={classes.btn}
                    variant="contained"
                    color="secondary"
                    onClick={() => {
                      setState({ username: "", password: "" });
                      localStorage.removeItem("isAuth");
                    }}
                  >
                    ยกเลิก
                  </Button>
                </div>
              </form>
            </Grid>
          </Grid>
        </Paper>
      </MuiThemeProvider>
    </div>
  );
}
