import {
  Button,
  CardMedia,
  Grid,
  makeStyles,
  MenuItem,
  Modal,
  Tab,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  TextField,
  Typography,
} from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import CameraEnhanceTwoToneIcon from "@material-ui/icons/CameraEnhanceTwoTone";
import noImage from "../image/noImageFound.jpg";
import CancelTwoToneIcon from "@material-ui/icons/CancelTwoTone";
import Cookies from "js-cookie";

const apiURL = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? `${process.env.REACT_APP_BASE_URL_PROD_V2}`
      : `${process.env.REACT_APP_BASE_URL_V2}`,
});

function TabPanel1(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabs1-${index}`}
      aria-labelledby={`tab1-${index}`}
      {...other}
    >
      {value === index && <div>{children}</div>}
    </div>
  );
}

function TabPanel2(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`taps2-${index}`}
      aria-labelledby={`taps2-${index}`}
      {...other}
    >
      {value === index && <div>{children}</div>}
    </div>
  );
}

function TabPanel3(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`taps3-${index}`}
      aria-labelledby={`taps3-${index}`}
      {...other}
    >
      {value === index && <div>{children}</div>}
    </div>
  );
}

function TabPanel4(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`taps3-${index}`}
      aria-labelledby={`taps3-${index}`}
      {...other}
    >
      {value === index && <div>{children}</div>}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyle = makeStyles((theme) => {
  return {
    root: {},
    bodyModal: {
      height: "auto",
      width: "70%",
      position: "absolute",
      backgroundColor: theme.palette.background.paper,
      border: "1px solid lightgray",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      [theme.breakpoints.down("md")]: {
        marginTop: 700,
      },
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
    table: {
      width: "100%",
      padding: "1rem",
      "& .MuiTableCell-root": { paddingTop: "0.2rem", paddingBottom: "0.2rem" },
    },
    btn: { marginTop: 10 },
    textField: {
      height: 20,
      bottom: 5,
      width: 50,
      "& .MuiInput-input": { fontSize: "0.8rem" },
      float: "right",
    },
    tab: {
      fontSize: "0.7rem",
      minWidth: "25%",
    },
    tabs: {
      height: "0.3rem",
      color: "blue",
      padding: "0px 10px",
    },
  };
});

export default function ModalActivity(props) {
  const classes = useStyle();
  const { dataList, dropdown } = props;

  const [value1, setValue1] = React.useState(2);
  const [value2, setValue2] = React.useState(2);
  const [value3, setValue3] = React.useState(2);
  const [value4, setValue4] = React.useState(2);

  const handleChangeTabs1 = (event, newValue) => {
    setValue1(newValue);
  };
  const handleChangeTabs2 = (event, newValue) => {
    setValue2(newValue);
  };
  const handleChangeTabs3 = (event, newValue) => {
    setValue3(newValue);
  };
  const handleChangeTabs4 = (event, newValue) => {
    setValue4(newValue);
  };

  // const download = () => {
  //   const header = {
  //     "Content-Type": "application/pdf",
  //     responseType: "blob",
  //   };
  //   const sendData = {
  //     transactionId: dataList.transactionId,
  //     date: "2021-09-29",
  //   };
  //   apiURLv1
  //     .post("/download-file-super-audit", sendData, header)
  //     .then((res) => {
  //       const url = window.URL.createObjectURL(new Blob([res.data]));
  //       const link = document.createElement("a");
  //       link.href = url;
  //       link.setAttribute("download", "M20210929000000014_PK3.pdf");
  //       document.body.appendChild(link);
  //       link.click();
  //       link.parentNode.removeChild(link);
  //       console.log(res.data);
  //       console.log(url);
  //     });
  // };

  const mockPic = 0;
  const [state, setState] = useState({
    audit_lp: "",
    audit_province: "",
    audit_comment: "",
  });
  const { audit_lp, audit_province, audit_comment } = state;

  const [audit_vehicleClass, setAudit_vehicleClass] = useState(0);
  const [audit_feeAmount, setAudit_feeAmount] = useState("");
  const [audit_vehicleClass_id, setAudit_vehicleClass_id] = useState(0);
  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const handleOptionChange = (event) => {
    const index = event.target.value;
    setAudit_vehicleClass(index);
    setAudit_vehicleClass_id(dataList.dropdown_audit_vehicelClass[index].id);
    setAudit_feeAmount(dataList.dropdown_audit_feeAmount[index].fee);

    console.log(
      `super_audit_feeAmount: ${audit_feeAmount}
      super_audit_vehicleClass: ${audit_vehicleClass}
      event.target.value: ${index}`
    );
  };

  const handleUpdate = () => {
    const sendData = {
      user_id: Cookies.get("userId"),
      transactionId: dataList.transactionId,
      audit_lp: audit_lp,
      audit_province: audit_province,
      // audit_vehicleClass: audit_vehicleClass,
      audit_feeAmount: audit_feeAmount,
      audit_comment: audit_comment,
      audit_vehicleClass_id: audit_vehicleClass_id,
      timestamp: dataList.timestamp,
    };

    Swal.fire({
      text: "คุณต้องการบันทึกข้อมูล!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "ยืนยัน",
      cancelButtonText: "ยกเลิก",
    })
      .then((result) => {
        if (result.isConfirmed) {
          apiURL.post("/changeState2to3", sendData).then((res) => {
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
          });
        }
      })
      .then(() => props.onClick())
      .then(() => props.onFetchData());

    // const res = await apiURL.post("/changeState2to3", sendData);
    console.log(sendData);
    // console.log(res.data);
  };
  const handleChangeState6To7 = () => {
    const sendData = {
      user_id: Cookies.get("userId"),
      transactionId: dataList.transactionId,
      timestamp: dataList.timestamp,
    };

    Swal.fire({
      text: "คุณต้องการบันทึกข้อมูล!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "ยืนยัน",
      cancelButtonText: "ยกเลิก",
    })
      .then((result) => {
        if (result.isConfirmed) {
          apiURL.post("/changeState2to7", sendData).then((res) => {
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
          });
        }
      })
      .then(() => props.onClick())
      .then(() => props.onFetchData());

    // const res = await apiURL.post("/changeState2to3", sendData);
    console.log(sendData);
    // console.log(res.data);
  };

  useEffect(() => {
    if (dataList) {
      setState(dataList);
      setAudit_vehicleClass(dataList.audit_vehicleClass);
      setAudit_feeAmount(dataList.audit_feeAmount);
      setAudit_vehicleClass_id(dataList.audit_vehicleClass_id);
      console.log("dataList", dataList);
    }
  }, [dataList]);

  const body = (
    <div className={classes.bodyModal}>
      <div className={classes.head}>
        <div>
          <Typography variant="h6" style={{ color: "#c80000" }}>
            {dataList.state === 1
              ? "ข้อมูลปกติ (state 1)"
              : dataList.state === 2
                ? "ข้อมูลรอตรวจสอบ (state 2)"
                : dataList.state === 3
                  ? "อยู่ระหว่างการตรวจสอบ (state 3)"
                  : dataList.state === 4
                    ? "ตรวจสอบ:ส่งกลับแก้ไข (state 4)"
                    : dataList.state === 5
                      ? "ข้อมูลแแก้ไขกลับมาตรวจสอบ (state 5)"
                      : dataList.state === 6
                        ? "ตรวจสอบ:รอการยืนยันความถูกต้อง (state 6)"
                        : dataList.state === 7
                          ? "ตรวจสอบ:ยืนยันความถูกต้อง (state 7)"
                          : "ไม่มีสถานะ"}
          </Typography>
          <Typography style={{ color: "blue", fontSize: 14 }}>
            transaction: {dataList.transactionId}{" "}
          </Typography>
          <Typography style={{ color: "gray", fontSize: 14 }}>
            {dataList.highway_name} / {dataList.checkpoint_name} /{" "}
            {dataList.gate_name}
          </Typography>
        </div>
        <div>
          <CancelTwoToneIcon
            fontSize="small"
            color="secondary"
            onClick={props.onClick}
          />
        </div>
      </div>
      <Grid container className={classes.cardContainer}>
        {/* CCTV Audit block */}
        <Grid item sm={6} md={6} lg={3} className={classes.cardItem}>
          <div className={classes.headCard}>
            <CameraEnhanceTwoToneIcon />
            <Typography style={{ marginLeft: 10 }}>CCTV Audit</Typography>
          </div>
          <div>
            <Tabs
              value={value4}
              onChange={handleChangeTabs4}
              aria-label="simple tabs example"
              indicatorColor="primary"
              className={classes.tabs}
            >
              <Tab
                label="ก่อน 2 คัน"
                {...a11yProps(0)}
                style={{ minWidth: "15%" }}
                className={classes.tab}
              />
              <Tab
                label="ก่อน 1 คัน"
                {...a11yProps(1)}
                style={{ minWidth: "15%" }}
                className={classes.tab}
              />
              <Tab
                label="คันที่ตรวจ"
                {...a11yProps(2)}
                style={{ minWidth: "15%" }}
                className={classes.tab}
              />
              <Tab
                label="วิดีโอ"
                {...a11yProps(3)}
                style={{ minWidth: "15%" }}
                className={classes.tab}
              />
            </Tabs>
          </div>
          <TabPanel4 value={value4} index={0}>
            <CardMedia
              component="img"
              src={
                mockPic !== 0
                  ? `data:image/png;base64, ${dataList.audit_pic_crop}`
                  : noImage
              }
              className={classes.image}
            />
          </TabPanel4>
          <TabPanel4 value={value4} index={1}>
            <CardMedia
              component="img"
              src={
                mockPic !== 0
                  ? `data:image/png;base64, ${dataList.audit_pic_crop}`
                  : noImage
              }
              className={classes.image}
            />
          </TabPanel4>
          <TabPanel4 value={value4} index={2}>
            <CardMedia
              component="img"
              src={
                dataList.audit_pic !== 0
                  ? `data:image/png;base64, ${dataList.audit_pic}`
                  : noImage
              }
              className={classes.image}
            />
          </TabPanel4>
          <TabPanel4 value={value4} index={3}>
            <CardMedia
              component="img"
              src={
                mockPic !== 0
                  ? `data:image/png;base64, ${dataList.audit_pic_crop}`
                  : noImage
              }
              className={classes.image}
            />
          </TabPanel4>

          <div
            style={{
              marginTop: 236,
              display: "flex",
              justifyContent: "space-between",
              padding: "0px 15px",
            }}
          >
            <Button
              className={classes.btn}
              variant="contained"
              color="primary"
            // startIcon={<AddTwoToneIcon fontSize="small" />}
            >
              สร้างรายการใหม่
            </Button>
            <Button
              className={classes.btn}
              variant="contained"
              color="secondary"
            // startIcon={<RemoveTwoToneIcon fontSize="small" />}
            >
              ลบรายการนี้
            </Button>
          </div>
        </Grid>

        {/* Audit Block */}
        <Grid item sm={6} md={6} lg={3} className={classes.cardItem}>
          <div className={classes.headCard}>
            <CameraEnhanceTwoToneIcon />
            <Typography style={{ marginLeft: 10 }}>
              CCTV Audit (Vehicle)
            </Typography>
          </div>
          <div>
            <Tabs
              value={value1}
              onChange={handleChangeTabs1}
              aria-label="simple tabs example"
              indicatorColor="primary"
              className={classes.tabs}
            >
              <Tab
                label="ก่อน 2 คัน"
                {...a11yProps(0)}
                className={classes.tab}
              />
              <Tab
                label="ก่อน 1 คัน"
                {...a11yProps(1)}
                style={{ minWidth: "15%" }}
                className={classes.tab}
              />
              <Tab
                label="คันที่ตรวจ"
                {...a11yProps(2)}
                style={{ minWidth: "15%" }}
                className={classes.tab}
              />
              <Tab
                label="วิดีโอ"
                {...a11yProps(3)}
                style={{ minWidth: "15%" }}
                className={classes.tab}
              />
            </Tabs>
          </div>
          <TabPanel1 value={value1} index={0}>
            <CardMedia
              component="img"
              src={
                mockPic !== 0
                  ? `data:image/png;base64, ${dataList.audit_pic_crop}`
                  : noImage
              }
              className={classes.image}
            />
          </TabPanel1>
          <TabPanel1 value={value1} index={1}>
            <CardMedia
              component="img"
              src={
                mockPic !== 0
                  ? `data:image/png;base64, ${dataList.audit_pic_crop}`
                  : noImage
              }
              className={classes.image}
            />
          </TabPanel1>
          <TabPanel1 value={value1} index={2}>
            <CardMedia
              component="img"
              src={
                dataList.audit_pic_crop !== 0
                  ? `data:image/png;base64, ${dataList.audit_pic_crop}`
                  : noImage
              }
              className={classes.image}
            />
          </TabPanel1>
          <TabPanel1 value={value1} index={3}>
            <CardMedia
              component="img"
              src={
                mockPic !== 0
                  ? `data:image/png;base64, ${dataList.audit_pic_crop}`
                  : noImage
              }
              className={classes.image}
            />
          </TabPanel1>
          <TableContainer>
            <table className={classes.table}>
              <TableHead>
                <TableRow className={classes.tableHead1}>
                  <TableCell colSpan={2} style={{ color: "white" }}>
                    ระบบตรวจสอบรายได้
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>กว้าง</TableCell>
                  <TableCell>-</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>ยาว</TableCell>
                  <TableCell>-</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>ประเภท</TableCell>
                  <TableCell>
                    {dataList.dlt_class === "Cnull" ? "-" : dataList.dlt_class}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>ค่าธรรมเนียม</TableCell>
                  {/* <TableCell>{dataList.dlt_fee_ref}</TableCell> */}
                  <TableCell>30</TableCell>
                </TableRow>
              </TableBody>
            </table>
          </TableContainer>
          <div style={{ padding: "0px 11px" }}>
            <Button
              variant="contained"
              style={{
                backgroundColor: "green",
                color: "white",
                marginTop: 65,
              }}
              onClick={handleChangeState6To7}
            >
              บันทึกเป็นรายการปกติ
            </Button>
          </div>
        </Grid>

        {/* ALPR Block */}
        <Grid item sm={6} md={6} lg={3}>
          <div className={classes.headCard}>
            <CameraEnhanceTwoToneIcon />
            <Typography style={{ marginLeft: 10 }}>ALPR</Typography>
          </div>
          <div>
            <Tabs
              value={value2}
              onChange={handleChangeTabs2}
              aria-label="simple tabs example"
              indicatorColor="primary"
              className={classes.tabs}
            >
              <Tab
                label="ก่อน 2 คัน"
                {...a11yProps(0)}
                className={classes.tab}
              />
              <Tab
                label="ก่อน 1 คัน"
                {...a11yProps(1)}
                style={{ minWidth: "15%" }}
                className={classes.tab}
              />
              <Tab
                label="คันที่ตรวจ"
                {...a11yProps(2)}
                style={{ minWidth: "15%" }}
                className={classes.tab}
              />
              <Tab
                label="วิดีโอ"
                {...a11yProps(3)}
                style={{ minWidth: "15%" }}
                className={classes.tab}
              />
            </Tabs>
          </div>
          <TabPanel2 value={value2} index={0}>
            <CardMedia
              component="img"
              src={
                mockPic !== 0
                  ? `data:image/png;base64, ${dataList.mf_pic}`
                  : noImage
              }
              className={classes.image}
            />
          </TabPanel2>
          <TabPanel2 value={value2} index={1}>
            <CardMedia
              component="img"
              src={
                mockPic !== 0
                  ? `data:image/png;base64, ${dataList.mf_pic}`
                  : noImage
              }
              className={classes.image}
            />
          </TabPanel2>
          <TabPanel2 value={value2} index={2}>
            <CardMedia
              component="img"
              src={
                dataList.mf_pic !== 0
                  ? `data:image/png;base64, ${dataList.mf_pic}`
                  : noImage
              }
              className={classes.image}
            />
          </TabPanel2>
          <TabPanel2 value={value2} index={3}>
            <CardMedia
              component="img"
              src={
                mockPic !== 0
                  ? `data:image/png;base64, ${dataList.mf_pic}`
                  : noImage
              }
              className={classes.image}
            />
          </TabPanel2>
          <TableContainer>
            <table className={classes.table}>
              <TableHead>
                <TableRow className={classes.tableHead2}>
                  <TableCell colSpan={2} style={{ color: "white" }}>
                    ระบบจัดเก็บรายได้
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>ทะเบียน</TableCell>
                  <TableCell>
                    {dataList.mf_lp === "null null" ? "-" : dataList.mf_lp}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>จังหวัด</TableCell>
                  <TableCell>
                    {dataList.mf_lp_province === null
                      ? "-"
                      : dataList.mf_lp_province}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>ประเภท</TableCell>
                  <TableCell>
                    {dataList.mf_class === "Cnull" ? "-" : dataList.mf_class}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>ค่าธรรมเนียม</TableCell>
                  <TableCell>
                    {dataList.mf_fee_ref === null ? "-" : dataList.mf_fee_ref}
                  </TableCell>
                </TableRow>
              </TableBody>
            </table>
          </TableContainer>
        </Grid>

        {/* DVES Block */}
        <Grid item sm={6} md={6} lg={3}>
          <div className={classes.headCard}>
            <CameraEnhanceTwoToneIcon />
            <Typography style={{ marginLeft: 10 }}>DVES</Typography>
          </div>
          <div>
            <Tabs
              value={value3}
              onChange={handleChangeTabs3}
              aria-label="simple tabs example"
              indicatorColor="primary"
              className={classes.tabs}
            >
              <Tab
                label="ก่อน 2 คัน"
                {...a11yProps(0)}
                className={classes.tab}
              />
              <Tab
                label="ก่อน 1 คัน"
                {...a11yProps(1)}
                style={{ minWidth: "15%" }}
                className={classes.tab}
              />
              <Tab
                label="คันที่ตรวจ"
                {...a11yProps(2)}
                style={{ minWidth: "15%" }}
                className={classes.tab}
              />
              <Tab
                label="วิดีโอ"
                {...a11yProps(3)}
                style={{ minWidth: "15%" }}
                className={classes.tab}
              />
            </Tabs>
          </div>
          <TabPanel3 value={value3} index={0}>
            <CardMedia
              component="img"
              src={
                mockPic !== 0
                  ? `data:image/png;base64, ${dataList.audit_pic}`
                  : noImage
              }
              className={classes.image}
            />
          </TabPanel3>
          <TabPanel3 value={value3} index={1}>
            <CardMedia
              component="img"
              src={
                mockPic !== 0
                  ? `data:image/png;base64, ${dataList.audit_pic}`
                  : noImage
              }
              className={classes.image}
            />
          </TabPanel3>
          <TabPanel3 value={value3} index={2}>
            <CardMedia
              component="img"
              src={
                mockPic !== 0
                  ? `data:image/png;base64, ${dataList.audit_pic}`
                  : noImage
              }
              className={classes.image}
            />
          </TabPanel3>
          <TabPanel3 value={value3} index={3}>
            <CardMedia
              component="img"
              src={
                mockPic !== 0
                  ? `data:image/png;base64, ${dataList.audit_pic}`
                  : noImage
              }
              className={classes.image}
            />
          </TabPanel3>
          <TableContainer>
            <table className={classes.table}>
              <TableHead>
                <TableRow className={classes.tableHead3}>
                  <TableCell
                    colSpan={2}
                    style={{ color: "white", fontSize: "0.75rem" }}
                  >
                    ส่งคำสั่งแก้ไขไปยังระบบจัดเก็บรายได้
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>ทะเบียน</TableCell>
                  <TableCell>
                    <TextField
                      size="small"
                      className={classes.textField}
                      name="audit_lp"
                      value={audit_lp || ""}
                      onChange={handleChange}
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>จังหวัด</TableCell>
                  <TableCell>
                    <TextField
                      size="small"
                      className={classes.textField}
                      name="audit_province"
                      value={audit_province || ""}
                      onChange={handleChange}
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>ประเภท</TableCell>
                  <TableCell>
                    <TextField
                      select
                      size="small"
                      className={classes.textField}
                      name="audit_vehicleClass"
                      value={audit_vehicleClass || ""}
                      onChange={handleOptionChange}
                    >
                      {!!dataList.dropdown_audit_vehicelClass
                        ? dataList.dropdown_audit_vehicelClass.map(
                          (item, index) => (
                            <MenuItem key={index} value={index}>
                              {item.class}
                            </MenuItem>
                          )
                        )
                        : []}
                    </TextField>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>ค่าธรรมเนียม</TableCell>
                  <TableCell>
                    <TextField
                      className={classes.textField}
                      size="small"
                      name="valueRef"
                      value={audit_feeAmount || ""}
                    />
                  </TableCell>
                </TableRow>
              </TableBody>
            </table>
          </TableContainer>
          <div
            style={{
              paddingLeft: 20,
              paddingRight: 20,
            }}
          >
            <TextField
              style={{ width: "100%", height: 20, padding: "10px" }}
              name="audit_comment"
              label="คำสั่งแก้ไข"
              value={audit_comment || ""}
              onChange={handleChange}
            />
            <Button
              variant="contained"
              color="primary"
              style={{ marginTop: 25, float: "right" }}
              // endIcon={<SendTwoToneIcon fontSize="small" />}
              onClick={handleUpdate}
            >
              ส่งคำสั่งแก้ไข
            </Button>
          </div>
        </Grid>
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
