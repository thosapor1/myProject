import {
  Box,
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
import Logo_doh from "../image/Logo_doh.png";
import noImage from "../image/noImageFound.jpg";
import CancelTwoToneIcon from "@material-ui/icons/CancelTwoTone";
import Cookies from "js-cookie";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import HelpOutlineTwoToneIcon from "@material-ui/icons/HelpOutlineTwoTone";
import Tooltip from "@material-ui/core/Tooltip";

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
    "@global": {
      "*::-webkit-scrollbar": {
        width: "0.3em",
      },
      "*::-webkit-scrollbar-track": {
        "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.00)",
      },
      "*::-webkit-scrollbar-thumb": {
        backgroundColor: "rgba(0,0,0,.1)",
        outline: "1px  lightgray",
      },
    },
    root: {},
    bodyModal: {
      height: "auto",
      width: "90%",
      position: "absolute",
      backgroundColor: theme.palette.background.paper,
      border: "1px solid lightgray",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      [theme.breakpoints.only("md")]: {
        marginTop: "90%",
      },
      [theme.breakpoints.only("sm")]: {
        marginTop: "120%",
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
      overflow: "hidden",
    },
    image: {
      height: "100%",
      Width: "100%",
      border: "1px solid lightgray",
      position: "absolute",
      objectFit: "cover",
    },
    imageWrap: {
      height: "0",
      paddingBottom: "45%",
      position: "relative",
      overflow: "hidden",
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
      paddingTop: "1rem",
      "& .MuiTableCell-root": {
        paddingTop: "0.2rem",
        paddingBottom: "0.2rem",
        fontSize: "0.8rem",
      },
    },
    btn: { marginTop: 10 },
    textField: {
      height: 20,
      bottom: 5,
      width: 50,
      "& .MuiInput-input": { fontSize: "0.8rem" },
      float: "right",
    },
    textField2: {
      height: 20,
      bottom: 5,
      width: "100px",
      "& .MuiInput-input": { fontSize: "0.75rem" },
      float: "right",
      "& .MuiOutlinedInput-inputMarginDense": {
        padding: "5px 5px",
      },
      // [theme.breakpoints.down('lg')]: {
      //   width: '300%'
      // }
      // "& .MuiInputBase-root": {
      //   width: 50,
      // },
    },
    tab: {
      fontSize: "0.7rem",
      minWidth: "25%",
    },
    tabs: {
      color: "white",
      backgroundColor: "#6200ea",
    },
    headTable: {
      fontSize: "0.75rem",
      color: "white",
    },
    checkType: {
      "& .MuiTableRow-root": {
        backgroundColor: "red",
      },
    },
    tableContainer: {
      height: "20vh",
      [theme.breakpoints.down("lg")]: {
        height: "25vh",
      },
    },
  };
});

export default function ModalActivity2(props) {
  const classes = useStyle();
  const { dataList, dropdown, checkDate, page } = props;

  const [value1, setValue1] = useState(2);
  const [value2, setValue2] = useState(2);
  const [value3, setValue3] = useState(2);
  const [value4, setValue4] = useState(2);
  const [value5, setValue5] = useState(2);
  const [value6, setValue6] = useState(2);

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
  const handleChangeTabs5 = (event, newValue) => {
    setValue5(newValue);
  };
  const handleChangeTabs6 = (event, newValue) => {
    setValue6(newValue);
  };

  const download = () => {
    const header = {
      "Content-Type": "application/pdf",
      responseType: "blob",
    };
    const sendData = {
      transactionId: resultDisplay.transactionId,
      date: format(checkDate, "yyyy-MM-dd"),
    };
    apiURLv1.post("/download-file-pk3", sendData, header).then((res) => {
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "downloadFile");
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      console.log(res.data);
      console.log(url);
    });
  };

  const mockPic = 0;
  const [state, setState] = useState({
    tsType: "",
    operation: "",
  });
  const { tsType, operation } = state;

  const [vehicleClass, setVehicleClass] = useState("");
  const [audit_feeAmount, setAudit_feeAmount] = useState("");
  const [audit_vehicleClass_id, setAudit_vehicleClass_id] = useState(0);
  const [resultDisplay, setResultDisplay] = useState([]);
  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.value });
    if (event.target.value === 0 || event.target.value === 2) {
      setVehicleClass("");
      setAudit_feeAmount("");
    }
  };

  const handleOptionChange = (event) => {
    const index = event.target.value;
    setVehicleClass(index);
    setAudit_vehicleClass_id(dropdown.vehicle[index].id);
    setAudit_feeAmount(dropdown.vehicle[index].fee);

    console.log(
      `super_audit_feeAmount: ${audit_feeAmount}
      super_audit_vehicleClass: ${vehicleClass}
      event.target.value: ${index}`
    );
  };

  const handleUpdate = () => {
    const date = format(checkDate, "yyyy-MM-dd");

    const sendData = {
      date: date,
      user_id: Cookies.get("userId"),
      transactionId: dataList.resultsDisplay[0].transactionId,
      state: dataList.resultsDisplay[0].state.toString(),
      vehicleClass: !!vehicleClass ? vehicleClass.toString() : "0",
      fee: audit_feeAmount || "0",
      operation: !!operation ? operation.toString() : "",
      pk3_comment: "",
      super_audit_comment: "",
      ts_duplication: "",
    };

    Swal.fire({
      text: "คุณต้องการบันทึกข้อมูล!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "ยืนยัน",
      cancelButtonText: "ยกเลิก",
      zIndex: 1300,
    })
      .then((result) => {
        if (result.isConfirmed) {
          apiURLv1
            .post("/operation", sendData)
            .then((res) => {
              if (res.data.status === true) {
                Swal.fire({
                  title: "Success",
                  text: "ข้อมูลของท่านถูกบันทึกแล้ว",
                  icon: "success",
                });
              } else {
                Swal.fire({
                  title: "Fail",
                  text: "บันทึกข้อมูลไม่สำเร็จ",
                  icon: "error",
                });
              }
            })
            .catch((error) => {
              // handleClose();
              Swal.fire({
                icon: "error",
                text: "ไม่สามารถเชื่อมต่อเซิฟเวอร์ได้ในขณะนี้",
              });
            });
        }
      })
      .then(() => {
        props.onClick();
        setTimeout(() => {
          props.onFetchData(page);
        }, 2000);
      });
  };

  useEffect(() => {
    if (dataList) {
      setState(dataList);
      setVehicleClass(dataList.vehicleClass);
      setAudit_feeAmount(dataList.audit_feeAmount);
      setAudit_vehicleClass_id(dataList.audit_vehicleClass_id);
      setResultDisplay(
        !!dataList.resultsDisplay ? dataList.resultsDisplay[0] : []
      );
      console.log("dataList", dataList);
    }
  }, [dataList]);

  const body = (
    <div className={classes.bodyModal}>
      <div className={classes.head}>
        <div style={{ width: "100%" }}>
          <Box
            style={{
              backgroundColor:
                !!dataList.resultsDisplay &&
                dataList.resultsDisplay[0].state === 1
                  ? "lightgray"
                  : !!dataList.resultsDisplay &&
                    dataList.resultsDisplay[0].state === 2
                  ? "red"
                  : !!dataList.resultsDisplay &&
                    dataList.resultsDisplay[0].state === 3
                  ? "blue"
                  : !!dataList.resultsDisplay &&
                    dataList.resultsDisplay[0].state === 4
                  ? "orange"
                  : !!dataList.resultsDisplay &&
                    dataList.resultsDisplay[0].state === 5
                  ? "black"
                  : !!dataList.resultsDisplay &&
                    dataList.resultsDisplay[0].state === 6
                  ? "darkviolet"
                  : !!dataList.resultsDisplay &&
                    dataList.resultsDisplay[0].state === 7
                  ? "lightblue"
                  : "none",
              width: "100%",
              display: "flex",
              justifyItems: "center",
              flexWrap: "wrap",
              columnGap: "1rem",
            }}
          >
            <Typography
              variant="h6"
              style={{ color: "white", paddingLeft: 20 }}
            >
              {!!dataList.resultsDisplay
                ? dataList.resultsDisplay[0].state === 1
                  ? "ปกติ"
                  : dataList.resultsDisplay[0].state === 2
                  ? "ผิดปกติ"
                  : dataList.resultsDisplay[0].state === 3
                  ? "รอ pk3 ตรวจสอบ"
                  : dataList.resultsDisplay[0].state === 4
                  ? "รอ super audit ตรวจสอบ"
                  : dataList.resultsDisplay[0].state === 5
                  ? "รอ พิจารณาพิเศษ"
                  : dataList.resultsDisplay[0].state === 6
                  ? "รอตรวจสอบรับทราบ"
                  : dataList.resultsDisplay[0].state === 7
                  ? "รอจัดเก็บยืนยัน"
                  : "ไม่มีสถานะ"
                : ""}
            </Typography>

            <Typography
              style={{
                color: "white",
                fontSize: "0.8rem",
                paddingTop: 8,
              }}
            >
              {`transaction :
            ${
              !!dataList.resultsDisplay
                ? dataList.resultsDisplay[0].transactionId
                : ""
            }`}
            </Typography>
            <Typography
              style={{
                color: "white",
                fontSize: "0.8rem",
                paddingTop: 8,
              }}
            >
              {`${
                !!dataList.resultsDisplay
                  ? dataList.resultsDisplay[0].match_checkpoint
                  : ""
              } / ${
                !!dataList.resultsDisplay
                  ? dataList.resultsDisplay[0].match_gate
                  : ""
              }`}
            </Typography>
          </Box>
        </div>
        <div>
          <Tooltip title="close">
            <CancelTwoToneIcon
              onClick={props.onClick}
              style={{
                cursor: "pointer",
                fontSize: "1.5rem",
                paddingTop: 5,
                color: "red",
              }}
            />
          </Tooltip>
        </div>
      </div>
      <Grid container spacing={1}>
        {/* AD vehicle section */}
        <Grid item sm={6} md={6} lg={2} className={classes.cardItem}>
          <div className={classes.headCard}>
            <CameraEnhanceTwoToneIcon />
            <Typography style={{ marginLeft: 10 }}>AD (Vehicle)</Typography>
          </div>
          <div>
            <Tabs
              value={value5}
              onChange={handleChangeTabs5}
              aria-label="simple tabs example"
              indicatorColor="primary"
              variant="scrollable"
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
          <TabPanel4 value={value5} index={0}>
            <div className={classes.imageWrap}>
              <CardMedia
                component="img"
                src={
                  mockPic !== 0
                    ? `data:image/png;base64, ${dataList.audit_pic_crop}`
                    : noImage
                }
                className={classes.image}
              />
            </div>
          </TabPanel4>
          <TabPanel4 value={value5} index={1}>
            <div className={classes.imageWrap}>
              <CardMedia
                component="img"
                src={
                  !!dataList.audit_pic_crop
                    ? `data:image/png;base64, ${dataList.audit_pic_crop}`
                    : noImage
                }
                className={classes.image}
              />
            </div>
          </TabPanel4>
          <TabPanel4 value={value5} index={2}>
            <div className={classes.imageWrap}>
              <CardMedia
                component="img"
                src={
                  !!dataList.audit_pic_crop
                    ? `data:image/png;base64, ${dataList.audit_pic_crop}`
                    : noImage
                }
                className={classes.image}
              />
            </div>
          </TabPanel4>
          <TabPanel4 value={value5} index={3}>
            <div className={classes.imageWrap}>
              <CardMedia
                component="img"
                src={
                  !!mockPic
                    ? `data:image/png;base64, ${dataList.audit_pic_crop}`
                    : noImage
                }
                className={classes.image}
              />
            </div>
          </TabPanel4>
        </Grid>

        <Grid item sm={6} md={6} lg={2} className={classes.cardItem}>
          <div className={classes.headCard}>
            <CameraEnhanceTwoToneIcon />
            <Typography style={{ marginLeft: 10 }}>AD (overview)</Typography>
          </div>
          <div>
            <Tabs
              value={value6}
              onChange={handleChangeTabs6}
              aria-label="simple tabs example"
              indicatorColor="primary"
              variant="scrollable"
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
          <TabPanel4 value={value6} index={0}>
            <div className={classes.imageWrap}>
              <CardMedia
                component="img"
                src={
                  mockPic !== 0
                    ? `data:image/png;base64, ${dataList.audit_pic_crop}`
                    : noImage
                }
                className={classes.image}
              />
            </div>
          </TabPanel4>
          <TabPanel4 value={value6} index={1}>
            <div className={classes.imageWrap}>
              <CardMedia
                component="img"
                src={
                  !!dataList.audit_pic_crop
                    ? `data:image/png;base64, ${dataList.audit_pic_crop}`
                    : noImage
                }
                className={classes.image}
              />
            </div>
          </TabPanel4>
          <TabPanel4 value={value6} index={2}>
            <div className={classes.imageWrap}>
              <CardMedia
                component="img"
                src={
                  !!dataList.audit_pic_crop
                    ? `data:image/png;base64, ${dataList.audit_pic_crop}`
                    : noImage
                }
                className={classes.image}
              />
            </div>
          </TabPanel4>
          <TabPanel4 value={value6} index={3}>
            <div className={classes.imageWrap}>
              <CardMedia
                component="img"
                src={
                  !!mockPic
                    ? `data:image/png;base64, ${dataList.audit_pic_crop}`
                    : noImage
                }
                className={classes.image}
              />
            </div>
          </TabPanel4>
        </Grid>

        <Grid item sm={6} md={6} lg={2} className={classes.cardItem}>
          <div className={classes.headCard}>
            <CameraEnhanceTwoToneIcon />
            <Typography style={{ marginLeft: 10 }}>ML (Vehicle)</Typography>
          </div>
          <div>
            <Tabs
              value={value4}
              onChange={handleChangeTabs4}
              aria-label="simple tabs example"
              indicatorColor="primary"
              variant="scrollable"
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
            <div className={classes.imageWrap}>
              <CardMedia
                component="img"
                src={
                  !!mockPic
                    ? `data:image/png;base64, ${dataList.audit_pic_crop}`
                    : noImage
                }
                className={classes.image}
              />
            </div>
          </TabPanel4>
          <TabPanel4 value={value4} index={1}>
            <div className={classes.imageWrap}>
              <CardMedia
                component="img"
                src={
                  !!mockPic
                    ? `data:image/png;base64, ${dataList.mf_lane_picFull}`
                    : noImage
                }
                className={classes.image}
              />
            </div>
          </TabPanel4>
          <TabPanel4 value={value4} index={2}>
            <div className={classes.imageWrap}>
              <CardMedia
                component="img"
                src={
                  !!dataList.mf_lane_picFull
                    ? `data:image/png;base64, ${dataList.mf_lane_picFull}`
                    : noImage
                }
                className={classes.image}
              />
            </div>
          </TabPanel4>
          <TabPanel4 value={value4} index={3}>
            <div className={classes.imageWrap}>
              <CardMedia
                component="img"
                src={
                  !!mockPic
                    ? `data:image/png;base64, ${dataList.audit_pic_crop}`
                    : noImage
                }
                className={classes.image}
              />
            </div>
          </TabPanel4>

          <TableContainer className={classes.tableContainer}>
            <table className={classes.table}>
              <TableHead>
                <TableRow className={classes.tableHead1}>
                  <TableCell colSpan={2} className={classes.headTable}>
                    ระบบตรวจสอบรายได้ (AD : เช็ค)
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>ประเภท</TableCell>
                  <TableCell>
                    {!!resultDisplay.audit_check_vehicleClass
                      ? `C${resultDisplay.audit_check_vehicleClass}`
                      : "-"}
                  </TableCell>
                </TableRow>
              </TableBody>
            </table>
          </TableContainer>

          <TableContainer>
            <table className={classes.table}>
              <TableHead>
                <TableRow className={classes.tableHead1}>
                  <TableCell colSpan={2} className={classes.headTable}>
                    ค่าปรับ
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>ระยะ 1</TableCell>
                  <TableCell>
                    {!!resultDisplay.match_fine_t1
                      ? resultDisplay.match_fine_t1
                      : "-"}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>ระยะ 2</TableCell>
                  <TableCell>
                    {!!resultDisplay.match_fine_t2
                      ? resultDisplay.match_fine_t2
                      : "-"}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>ระยะ 3</TableCell>
                  <TableCell>
                    {!!resultDisplay.match_fine_t3
                      ? resultDisplay.match_fine_t3
                      : "-"}
                  </TableCell>
                </TableRow>
              </TableBody>
            </table>
          </TableContainer>
        </Grid>

        {/* ML (LP) Block */}
        <Grid item sm={6} md={6} lg={2} className={classes.cardItem}>
          <div className={classes.headCard}>
            <CameraEnhanceTwoToneIcon />
            <Typography style={{ marginLeft: 10 }}>ML (LP)</Typography>
          </div>
          <div>
            <Tabs
              value={value1}
              onChange={handleChangeTabs1}
              aria-label="simple tabs example"
              indicatorColor="primary"
              variant="scrollable"
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
            <div className={classes.imageWrap}>
              <CardMedia
                component="img"
                src={
                  mockPic !== 0
                    ? `data:image/png;base64, ${dataList.audit_pic_crop}`
                    : noImage
                }
                className={classes.image}
              />
            </div>
          </TabPanel1>
          <TabPanel1 value={value1} index={1}>
            <div className={classes.imageWrap}>
              <CardMedia
                component="img"
                src={
                  mockPic !== 0
                    ? // ? `data:image/png;base64, ${dataList.audit_pic_crop}`
                      Logo_doh
                    : noImage
                }
                className={classes.image}
              />
            </div>
          </TabPanel1>
          <TabPanel1 value={value1} index={2}>
            <div className={classes.imageWrap}>
              <CardMedia
                component="img"
                src={
                  !!dataList.mf_lane_picCrop
                    ? `data:image/png;base64, ${dataList.mf_lane_picCrop}`
                    : noImage
                }
                className={classes.image}
              />
            </div>
          </TabPanel1>
          <TabPanel1 value={value1} index={3}>
            <div className={classes.imageWrap}>
              <CardMedia
                component="img"
                src={
                  mockPic !== 0
                    ? `data:image/png;base64, ${dataList.audit_pic_crop}`
                    : noImage
                }
                className={classes.image}
              />
            </div>
          </TabPanel1>

          <TableContainer className={classes.tableContainer}>
            <table className={classes.table}>
              <TableHead>
                <TableRow className={classes.tableHead1}>
                  <TableCell colSpan={2} className={classes.headTable}>
                    ระบบจัดเก็บรายได้ (ML : ระดับเลน)
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell colSpan={2}>
                    {!!resultDisplay.mf_lane_tranId
                      ? resultDisplay.mf_lane_tranId
                      : "-"}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>ประเภท</TableCell>
                  <TableCell>
                    {!!resultDisplay.mf_lane_vehicleClass
                      ? `C${resultDisplay.mf_lane_vehicleClass}`
                      : "-"}
                  </TableCell>
                </TableRow>
              </TableBody>
            </table>
          </TableContainer>

          <TableContainer>
            <table className={classes.table}>
              <TableHead>
                <TableRow className={classes.tableHead1}>
                  <TableCell colSpan={2} className={classes.headTable}>
                    การชำระ
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>
                    ชำระรวม
                    <Tooltip title="ค่าธรรมเนียม + ค่าปรับ">
                      <HelpOutlineTwoToneIcon style={{ fontSize: "0.8rem" }} />
                    </Tooltip>
                  </TableCell>
                  <TableCell>
                    {!!resultDisplay.match_total_cost
                      ? resultDisplay.match_total_cost
                      : "-"}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>ชำระแล้ว</TableCell>
                  <TableCell>-</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>ค้างจ่าย</TableCell>
                  <TableCell>
                    {!!resultDisplay.match_cost_dif
                      ? resultDisplay.match_cost_dif
                      : "-"}
                  </TableCell>
                </TableRow>
              </TableBody>
            </table>
          </TableContainer>
        </Grid>

        {/* MF (Vehicle : HQ)  Block */}
        <Grid item sm={6} md={6} lg={2}>
          <div className={classes.headCard}>
            <CameraEnhanceTwoToneIcon />
            <Typography style={{ marginLeft: 10 }}>
              MF (Vehicle : HQ)
            </Typography>
          </div>
          <div>
            <Tabs
              value={value2}
              onChange={handleChangeTabs2}
              aria-label="simple tabs example"
              indicatorColor="primary"
              variant="scrollable"
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
            <div className={classes.imageWrap}>
              <CardMedia
                component="img"
                src={
                  mockPic !== 0
                    ? `data:image/png;base64, ${dataList.mf_pic}`
                    : noImage
                }
                className={classes.image}
              />
            </div>
          </TabPanel2>
          <TabPanel2 value={value2} index={1}>
            <div className={classes.imageWrap}>
              <CardMedia
                component="img"
                src={
                  mockPic !== 0
                    ? `data:image/png;base64, ${dataList.mf_pic}`
                    : noImage
                }
                className={classes.image}
              />
            </div>
          </TabPanel2>
          <TabPanel2 value={value2} index={2}>
            <div className={classes.imageWrap}>
              <CardMedia
                component="img"
                src={
                  !!dataList.imageFile
                    ? `data:image/png;base64, ${dataList.imageFile}`
                    : noImage
                }
                className={classes.image}
              />
            </div>
          </TabPanel2>
          <TabPanel2 value={value2} index={3}>
            <div className={classes.imageWrap}>
              <CardMedia
                component="img"
                src={
                  mockPic !== 0
                    ? `data:image/png;base64, ${dataList.mf_pic}`
                    : noImage
                }
                className={classes.image}
              />
            </div>
          </TabPanel2>
          <TableContainer className={classes.tableContainer}>
            <table className={classes.table}>
              <TableHead>
                <TableRow className={classes.tableHead2}>
                  <TableCell colSpan={2} className={classes.headTable}>
                    ระบบจัดเก็บรายได้ (MF : ระดับ HQ)
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell colSpan={2}>
                    {!!resultDisplay.pk3_transactionId
                      ? resultDisplay.pk3_transactionId
                      : "-"}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>ประเภท</TableCell>
                  <TableCell>
                    {!!resultDisplay.vehicleClass
                      ? `C${resultDisplay.vehicleClass}`
                      : "-"}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>ค่าธรรมเนียม</TableCell>
                  <TableCell>
                    {!!resultDisplay.billing_fee
                      ? resultDisplay.billing_fee
                      : "-"}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>ทะเบียน</TableCell>
                  <TableCell>
                    {!!resultDisplay.cameras_plateNo1
                      ? resultDisplay.cameras_plateNo1
                      : "-"}
                  </TableCell>
                </TableRow>
              </TableBody>
            </table>
          </TableContainer>

          <TableContainer>
            <table className={classes.table}>
              <TableHead>
                <TableRow className={classes.tableHead1}>
                  <TableCell colSpan={2} className={classes.headTable}>
                    เพิ่มเติม
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>File จากจัดเก็บ</TableCell>
                  <TableCell>
                    {!!resultDisplay.pk3_upload_file ? (
                      <Link onClick={download}>download</Link>
                    ) : (
                      "-"
                    )}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>TS ซ้ำกับ</TableCell>
                  <TableCell>
                    {!!resultDisplay.ts_duplication
                      ? resultDisplay.ts_duplication
                      : "-"}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>ความเห็นจัดเก็บ</TableCell>
                  <TableCell>
                    {!!resultDisplay.pk3_comment
                      ? resultDisplay.pk3_comment
                      : "-"}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>ความเห็น super audit</TableCell>
                  <TableCell>
                    {!!resultDisplay.super_audit_comment
                      ? resultDisplay.super_audit_comment
                      : "-"}
                  </TableCell>
                </TableRow>
              </TableBody>
            </table>
          </TableContainer>
        </Grid>

        {/* MF (LP : HQ) Block */}
        <Grid item sm={6} md={6} lg={2}>
          <div className={classes.headCard}>
            <CameraEnhanceTwoToneIcon />
            <Typography style={{ marginLeft: 10 }}>MF (LP : HQ)</Typography>
          </div>
          <div>
            <Tabs
              value={value3}
              onChange={handleChangeTabs3}
              aria-label="simple tabs example"
              indicatorColor="primary"
              variant="scrollable"
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
            <div className={classes.imageWrap}>
              <CardMedia
                component="img"
                src={
                  mockPic !== 0
                    ? `data:image/png;base64, ${dataList.audit_pic}`
                    : noImage
                }
                className={classes.image}
              />
            </div>
          </TabPanel3>
          <TabPanel3 value={value3} index={1}>
            <div className={classes.imageWrap}>
              <CardMedia
                component="img"
                src={
                  mockPic !== 0
                    ? `data:image/png;base64, ${dataList.audit_pic}`
                    : noImage
                }
                className={classes.image}
              />
            </div>
          </TabPanel3>
          <TabPanel3 value={value3} index={2}>
            <div className={classes.imageWrap}>
              <CardMedia
                component="img"
                src={
                  !!dataList.imageFileCrop
                    ? `data:image/png;base64, ${dataList.imageFileCrop}`
                    : noImage
                }
                className={classes.image}
              />
            </div>
          </TabPanel3>
          <TabPanel3 value={value3} index={3}>
            <div className={classes.imageWrap}>
              <CardMedia
                component="img"
                src={
                  mockPic !== 0
                    ? `data:image/png;base64, ${dataList.audit_pic}`
                    : noImage
                }
                className={classes.image}
              />
            </div>
          </TabPanel3>

          <TableContainer className={classes.tableContainer}>
            <table className={classes.table}>
              <TableHead>
                <TableRow className={classes.tableHead3}>
                  <TableCell colSpan={2} className={classes.headTable}>
                    เก็บจริง
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>การดำเนินการ</TableCell>
                  <TableCell>
                    <TextField
                      disabled={
                        !!dataList.resultsDisplay &&
                        (dataList.resultsDisplay[0].state === 3 ||
                          dataList.resultsDisplay[0].state === 4 ||
                          dataList.resultsDisplay[0].state === 5 ||
                          dataList.resultsDisplay[0].state === 7)
                          ? true
                          : false
                      }
                      select
                      variant="outlined"
                      size="small"
                      className={classes.textField2}
                      name="operation"
                      value={operation}
                      onChange={handleChange}
                    >
                      {!!dataList.resultsDisplay &&
                      dataList.resultsDisplay[0].state === 1
                        ? dropdown.operation_key
                            .filter((item) => item.id === 2)
                            .map((item, index) => (
                              <MenuItem key={index} value={item.id}>
                                {item.name}
                              </MenuItem>
                            ))
                        : !!dataList.resultsDisplay &&
                          dataList.resultsDisplay[0].state === 2
                        ? dropdown.operation_key
                            .filter(
                              (item) =>
                                item.id === 1 || item.id === 2 || item.id === 3
                            )
                            .map((item, index) => (
                              <MenuItem key={index} value={item.id}>
                                {item.name}
                              </MenuItem>
                            ))
                        : !!dataList.resultsDisplay &&
                          (dataList.resultsDisplay[0].state === 3 ||
                            dataList.resultsDisplay[0].state === 4 ||
                            dataList.resultsDisplay[0].state === 5)
                        ? []
                        : !!dataList.resultsDisplay &&
                          dataList.resultsDisplay[0].state === 6
                        ? dropdown.operation_key
                            .filter((item) => item.id === 4)
                            .map((item, index) => (
                              <MenuItem key={index} value={item.id}>
                                {item.name}
                              </MenuItem>
                            ))
                        : []}
                    </TextField>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>ประเภท TS</TableCell>
                  <TableCell>
                    {!!dataList.resultsDisplay
                      ? dataList.resultsDisplay[0].state === 1
                        ? "ปกติ"
                        : dataList.resultsDisplay[0].state === 2
                        ? "ผิดปกติ"
                        : dataList.resultsDisplay[0].state === 3
                        ? "รอ pk3 ตรวจสอบ"
                        : dataList.resultsDisplay[0].state === 4
                        ? "รอ super audit ตรวจสอบ"
                        : dataList.resultsDisplay[0].state === 5
                        ? "รอ พิจารณาพิเศษ"
                        : dataList.resultsDisplay[0].state === 6
                        ? "รอตรวจสอบรับทราบ"
                        : dataList.resultsDisplay[0].state === 7
                        ? "รอจัดเก็บยืนยัน"
                        : "ไม่มีสถานะ"
                      : ""}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>ประเภท</TableCell>
                  <TableCell>
                    <TextField
                      disabled={
                        !!dataList.resultsDisplay &&
                        (dataList.resultsDisplay[0].state === 3 ||
                          dataList.resultsDisplay[0].state === 4 ||
                          dataList.resultsDisplay[0].state === 5 ||
                          dataList.resultsDisplay[0].state === 7)
                          ? true
                          : !!dataList.resultsDisplay &&
                            dataList.resultsDisplay[0].state === 1
                          ? true
                          : !!dataList.resultsDisplay &&
                            dataList.resultsDisplay[0].state === 2 &&
                            operation === 1
                          ? true
                          : !!dataList.resultsDisplay &&
                            dataList.resultsDisplay[0].state === 2 &&
                            operation === 2
                          ? true
                          : !!dataList.resultsDisplay &&
                            dataList.resultsDisplay[0].state === 2 &&
                            operation === 3
                          ? false
                          : !!dataList.resultsDisplay &&
                            dataList.resultsDisplay[0].state === 5
                          ? true
                          : true
                      }
                      variant="outlined"
                      select
                      size="small"
                      className={classes.textField2}
                      name="vehicleClass"
                      value={vehicleClass}
                      onChange={handleOptionChange}
                    >
                      {!!dropdown.vehicle
                        ? dropdown.vehicle
                            .filter((item) => item.id !== 0)
                            .map((item, index) => (
                              <MenuItem key={index} value={item.id}>
                                {item.class}
                              </MenuItem>
                            ))
                        : []}
                    </TextField>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>ค่าธรรมเนียม</TableCell>
                  <TableCell style={{ width: 20 }}>{audit_feeAmount}</TableCell>
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
            <Button
              disabled={
                !!dataList.resultsDisplay &&
                (dataList.resultsDisplay[0].state === 3 ||
                  dataList.resultsDisplay[0].state === 4 ||
                  dataList.resultsDisplay[0].state === 5 ||
                  dataList.resultsDisplay[0].state === 7)
                  ? true
                  : !!dataList.resultsDisplay &&
                    dataList.resultsDisplay[0].state === 1 &&
                    !!operation
                  ? false
                  : !!dataList.resultsDisplay &&
                    dataList.resultsDisplay[0].state === 2 &&
                    operation === 1
                  ? false
                  : !!dataList.resultsDisplay &&
                    dataList.resultsDisplay[0].state === 2 &&
                    operation === 2
                  ? false
                  : !!dataList.resultsDisplay &&
                    dataList.resultsDisplay[0].state === 2 &&
                    operation === 3 &&
                    !!vehicleClass
                  ? false
                  : !!dataList.resultsDisplay &&
                    dataList.resultsDisplay[0].state === 6 &&
                    !!operation
                  ? false
                  : true
              }
              variant="contained"
              color="primary"
              style={{ marginTop: 18, float: "right" }}
              // endIcon={<SendTwoToneIcon fontSize="small" />}
              onClick={handleUpdate}
            >
              บันทึก
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
          zIndex: 3,
          overflow: "scroll",
        }}
      >
        {body}
      </Modal>
    </div>
  );
}
