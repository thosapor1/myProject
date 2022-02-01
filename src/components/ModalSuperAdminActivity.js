import {
  Button,
  CardMedia,
  Grid,
  IconButton,
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
  Tooltip,
  Typography,
} from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import CameraEnhanceTwoToneIcon from "@material-ui/icons/CameraEnhanceTwoTone";
import noImage from "../image/noImageFound.jpg";
import CancelTwoToneIcon from "@material-ui/icons/CancelTwoTone";
import Cookies from "js-cookie";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";

const apiURL = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? `${process.env.REACT_APP_BASE_URL_PROD_V2}`
      : `${process.env.REACT_APP_BASE_URL_V2}`,
});
const apiURLv1 = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? `${process.env.REACT_APP_BASE_URL_PROD_V1}`
      : `${process.env.REACT_APP_BASE_URL_V1}`,
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
    modal: {
      top: 50,
      width: "70%",
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
      padding: "0px 5px",
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
    disableLabel2: {
      // "& .MuiInputLabel-root": {
      //   color: "blue",
      // },
      margin: "0px 0px 0px 10px",
      marginTop: 20,
      width: "91%",
    },
    inputBox: {
      margin: "20px 0px 0px 12px",
      width: "91%",
      [theme.breakpoints.down("md")]: {
        margin: "20px 0px 0px 18px",
      },
    },
    tabs: {
      height: "0.3rem",
      color: "blue",
      padding: "0px 10px",
    },
    containerBox: {
      padding: "0px 5px 0px 4px",
      // marginTop: 10,
      display: "flex",
      justifyContent: "space-between",
      [theme.breakpoints.down("md")]: {
        padding: "0px 10px",
        marginTop: 9,
      },
    },
  };
});

export default function ModalSuperAdminActivity(props) {
  const classes = useStyle();
  const { dataList } = props;

  const [selectFile, setSelectFile] = useState("");
  const [fileName, setFileName] = useState("");

  const [value1, setValue1] = useState(2);
  const [value2, setValue2] = useState(2);
  const [value3, setValue3] = useState(2);
  const [value4, setValue4] = useState(2);

  // const [disable, setDisable] = useState(false);

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

  const upload = () => {
    const URL = `${process.env.REACT_APP_BASE_URL_V1}`;
    let formData = new FormData();
    const getDate = dataList.timestamp.split(" ").shift();
    formData.append("file", selectFile);
    formData.append("date", getDate);
    formData.append("transactionId", dataList.transactionId);

    if (fileName !== "") {
      axios.post(`${URL}/super-audit-upload-file`, formData).then((res) => {
        if (res.data.status === true) {
          Swal.fire({
            title: "Success",
            text: "ข้อมูลของคุณถูกอัพโหลดสำเร็จแล้ว",
            icon: "success",
            confirmButtonText: "OK",
          });
        } else {
          Swal.fire({
            title: "Fail",
            text: "อัพโหลดข้อมูลไม่สำเร็จ",
            icon: "error",
            confirmButtonText: "OK",
          });
        }
      });
    }
  };

  const downloadPk3 = () => {
    const header = {
      "Content-Type": "application/pdf",
      responseType: "blob",
    };
    const sendData = {
      transactionId: dataList.transactionId,
      date: dataList.timestamp.split(" ").shift(),
    };
    apiURLv1.post("/download-file-pk3", sendData, header).then((res) => {
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "downloadFromPk3.pdf");
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      console.log(res.data);
      console.log(url);
    });
  };
  const downloadSuperAudit = () => {
    const header = {
      "Content-Type": "application/pdf",
      responseType: "blob",
    };
    const sendData = {
      transactionId: dataList.transactionId,
      date: dataList.timestamp.split(" ").shift(),
    };
    apiURLv1
      .post("/download-file-super-audit", sendData, header)
      .then((res) => {
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "downloadFromSuperAudit.pdf");
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
        console.log(res.data);
        console.log(url);
      });
  };

  const mockPic = 0;
  const [state, setState] = useState({
    super_audit_lp: "",
    super_audit_province: "",
    super_audit_comment: "",
  });
  const { super_audit_lp, super_audit_province, super_audit_comment } = state;

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const [super_audit_vehicleClass, setSuper_audit_vehicleClass] = useState("");
  const [super_audit_feeAmount, setSuper_audit_feeAmount] = useState("");
  const [super_audit_vehicleClass_id, setSuper_Audit_vehicleClass_id] =
    useState(0);

  const [fileDownloadPk3, setFileDownloadPk3] = useState(true);
  const [fileDownloadAudit, setFileDownloadAudit] = useState(true);

  const handleOptionChange = (event) => {
    const index = event.target.value;
    setSuper_audit_vehicleClass(index);
    setSuper_Audit_vehicleClass_id(dataList.dropdown_audit_vehicle[index].id);
    setSuper_audit_feeAmount(dataList.dropdown_audit_vehicle[index].fee);

    console.log(
      `super_audit_feeAmount: ${super_audit_feeAmount}
      super_audit_vehicleClass: ${super_audit_vehicleClass}
      event.target.value: ${index}`
    );
  };

  const handleUpdateState4To5 = () => {
    const sendData = {
      super_audit_approve_id: Cookies.get("userId"),
      transactionId: dataList.transactionId,
      super_audit_lp: super_audit_lp,
      super_audit_province: super_audit_province,
      // super_audit_vehicleClass: super_audit_vehicleClass,
      super_audit_feeAmount: super_audit_feeAmount,
      super_audit_comment: super_audit_comment,
      super_audit_vehicleClass_id: super_audit_vehicleClass_id,
      timestamp: dataList.timestamp,
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
    })
      .then((result) => {
        if (result.isConfirmed) {
          apiURL.post("/changeState4to5", sendData).then((res) => {
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

    // const res = await apiURL.post("/changeState4to5", sendData);
    console.log(sendData);
    // console.log(res.data);
  };
  const handleUpdateState4To6 = () => {
    const sendData = {
      super_audit_approve_id: Cookies.get("userId"),
      transactionId: dataList.transactionId,
      super_audit_lp: super_audit_lp,
      super_audit_province: super_audit_province,
      // super_audit_vehicleClass: super_audit_vehicleClass,
      super_audit_feeAmount: super_audit_feeAmount,
      super_audit_comment: super_audit_comment,
      super_audit_vehicleClass_id: super_audit_vehicleClass_id,
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
    }).then((result) => {
      if (result.isConfirmed) {
        apiURL
          .post("/changeState4to6", sendData)
          .then((res) => {
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

    // const res = await apiURL.post("/changeState4to6", sendData);
    console.log(sendData);
    // console.log(res.data);
  };

  useEffect(() => {
    setFileDownloadPk3(true);
    setFileDownloadAudit(true);
    if (dataList) {
      setState(dataList);
      console.log("dataList", dataList);
    }
    if (dataList.pk3_upload_file === 1) {
      setFileDownloadPk3(false);
    }
    if (dataList.super_audit_upload_file === 1) {
      setFileDownloadAudit(false);
    }
  }, [dataList]);

  const body = (
    <div className={classes.modal}>
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
        <Grid item sm={12} md={6} lg={3} className={classes.cardItem}>
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
          <TextField
            id="upload"
            disabled
            variant="outlined"
            className={classes.inputBox}
            label="upload file here"
            value={fileName}
            InputProps={{
              endAdornment: (
                <Tooltip title="cancel upload file" placement="top">
                  <IconButton onClick={() => setFileName("")}>
                    <HighlightOffIcon />
                  </IconButton>
                </Tooltip>
              ),
            }}
          />
          <div className={classes.containerBox}>
            <input
              // accept="image/*"
              className={classes.input}
              style={{ display: "none" }}
              id="raised-button-file"
              // multiple
              type="file"
              onChange={(e) => {
                setFileName(e.target.files[0].name);
                setSelectFile(e.target.files[0]);
                // console.log(ref.current.value.split("\\").pop());
              }}
            />
            <label htmlFor="raised-button-file">
              <Button
                variant="contained"
                className={classes.btn}
                color="primary"
                component="span"
                // onClick={() => {
                //   alert("test");
                // }}
              >
                choose file
              </Button>
            </label>
            <Button
              variant="contained"
              className={classes.btn}
              color="secondary"
              onClick={() => {
                upload();
              }}
            >
              upload
            </Button>
          </div>
          <div className={classes.containerBox}>
            <Button
              disabled={fileDownloadPk3}
              variant="contained"
              color="secondary"
              className={classes.btn}
              onClick={() => downloadPk3()}
              style={{ fontSize: "0.7rem" }}
            >
              download from pk3
            </Button>
            <Button
              disabled={fileDownloadAudit}
              variant="contained"
              color="secondary"
              className={classes.btn}
              onClick={() => downloadSuperAudit()}
              style={{ fontSize: "0.7rem" }}
            >
              download from audit
            </Button>
          </div>
          <div className={classes.containerBox} style={{ marginTop: 178 }}>
            <Button
              className={classes.btn}
              variant="contained"
              disabled={dataList.state === 6 ? false : true}
              // onClick={handleUpdateState6To7}
            >
              จนท.ตรวจสอบรับทราบ
            </Button>
          </div>
        </Grid>

        {/* Audit Block */}
        <Grid item sm={12} md={6} lg={3} className={classes.cardItem}>
          <div className={classes.headCard}>
            <CameraEnhanceTwoToneIcon />
            <Typography style={{ marginLeft: 10 }}>Audit</Typography>
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
                  <TableCell>{dataList.dlt_class}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>ค่าธรรมเนียม</TableCell>
                  {/* <TableCell>{dataList.dlt_fee_ref}</TableCell> */}
                  <TableCell>30</TableCell>
                </TableRow>
              </TableBody>
            </table>
          </TableContainer>
          <div
            style={{
              paddingLeft: 5,
              paddingRight: 5,
              display: "flex",
              justifyContent: "space-between",
              marginTop: 186,
            }}
          >
            <Button
              className={classes.btn}
              variant="contained"
              color="secondary"
            >
              ลบรายการนี้
            </Button>
            <Button
              className={classes.btn}
              variant="contained"
              style={{
                color: "white",
                backgroundColor: "orange",
              }}
              onClick={handleUpdateState4To5}
            >
              บันทึกแบบรายการพิเศษ
            </Button>
          </div>
        </Grid>

        {/* Pk3 Block */}
        <Grid item sm={12} md={6} lg={3} className={classes.cardItem}>
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
                mockPic !== 0
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
                  <TableCell>{dataList.mf_lp}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>จังหวัด</TableCell>
                  <TableCell>{dataList.mf_lp_province}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>ประเภท</TableCell>
                  <TableCell>{dataList.mf_class}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>ค่าธรรมเนียม</TableCell>
                  <TableCell>{dataList.mf_fee_ref}</TableCell>
                </TableRow>
              </TableBody>
            </table>
          </TableContainer>

          <TextField
            disabled={dataList.state !== 6 ? true : false}
            variant="outlined"
            label="ข้อความจากระบบจัดเก็บ"
            value={dataList.pk3_comment || ""}
            className={classes.disableLabel}
          />

          <TableContainer>
            <table className={classes.table}>
              <TableHead>
                <TableRow className={classes.tableHead4}>
                  <TableCell colSpan={2} style={{ color: "white" }}>
                    ระบุข้อมูลสุดท้าย
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
                      name="super_audit_lp"
                      value={super_audit_lp || ""}
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
                      name="super_audit_province"
                      value={super_audit_province || ""}
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
                      name="super_audit_vehicleClass"
                      value={super_audit_vehicleClass || ""}
                      onChange={handleOptionChange}
                    >
                      {!!dataList.dropdown_audit_vehicle
                        ? dataList.dropdown_audit_vehicle.map((item, index) => (
                            <MenuItem key={index} value={index}>
                              {item.class}
                            </MenuItem>
                          ))
                        : []}
                    </TextField>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>ค่าธรรมเนียม</TableCell>
                  <TableCell>
                    <TextField
                      id="valueRef"
                      size="small"
                      name="valueRef"
                      value={super_audit_feeAmount || ""}
                    />
                  </TableCell>
                </TableRow>
              </TableBody>
            </table>
          </TableContainer>
        </Grid>

        {/* DEVS Block */}
        <Grid item sm={12} md={6} lg={3}>
          <div className={classes.headCard}>
            <CameraEnhanceTwoToneIcon />
            <Typography style={{ marginLeft: 10 }}>DEVS</Typography>
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
                  <TableCell>{dataList.audit_lp}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>จังหวัด</TableCell>
                  <TableCell>{dataList.audit_province}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>ประเภท</TableCell>
                  <TableCell>{dataList.audit_vehicleClass}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>ค่าธรรมเนียม</TableCell>
                  <TableCell>{dataList.audit_feeAmount}</TableCell>
                </TableRow>
              </TableBody>
            </table>
          </TableContainer>

          <TextField
            disabled
            variant="outlined"
            label="ข้อความจากผู้ตรวจสอบ"
            value={dataList.audit_comment || ""}
            className={classes.disableLabel}
          />

          <div
            style={{
              // display: "flex",
              // justifyContent: "space-between",
              paddingLeft: 20,
              paddingRight: 20,
              marginTop: 70,
            }}
          >
            <TextField
              disable={dataList.state === 6 ? true : undefined}
              style={{ width: "100%", height: 20, padding: "10px" }}
              name="super_audit_comment"
              label="คำสั่งแก้ไข"
              value={super_audit_comment || ""}
              onChange={handleChange}
            />
            <Button
              disable={dataList.state === 6 ? true : undefined}
              variant="contained"
              color="primary"
              style={{
                top: 17,
                marginTop: 10,
                float: "right",
                fontSize: "0.75rem",
              }}
              // endIcon={<SendTwoToneIcon fontSize="small" />}
              onClick={handleUpdateState4To6}
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
