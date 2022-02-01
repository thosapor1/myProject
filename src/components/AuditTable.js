import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  makeStyles,
  Box,
  TextField,
  Button,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import { withStyles } from "@material-ui/styles";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import { Pagination } from "@material-ui/lab";
import CameraAltIcon from "@material-ui/icons/CameraAlt";
import ImageModal from "./ImageModal";
import Swal from "sweetalert2";
import format from "date-fns/format";
import { getDataRawTransactionActivity } from "../service/allService";

const detailStatus = [
  {
    state: 1,
    color: "lightgray",
    label: "ปกติ",
  },
  {
    state: 2,
    color: "#FF2400",
    label: "ผิดปกติ",
  },
  {
    state: 3,
    color: "blue",
    label: "รอ pk3 ตรวจสอบ",
  },
  {
    state: 4,
    color: "orange",
    label: "รอ super audit ตรวจสอบ",
  },
  {
    state: 5,
    color: "black",
    label: "รอพิจารณาพิเศษ",
  },
  {
    state: 6,
    color: "darkviolet",
    label: "รอตรวจสอบรับทราบ",
  },
  {
    state: 7,
    color: "lightblue",
    label: "รอจัดเก็บยืนยัน",
  },
  {
    state: 8,
    color: "lightgreen",
    label: "รอจัดเก็บยืนยัน",
  },
];
const useStyle = makeStyles((theme) => {
  return {
    root: {},
    container: {
      maxHeight: "60vh",
      overflow: "auto",
      [theme.breakpoints.down("lg")]: {
        maxHeight: "57vh",
      },
      marginTop: 10,
    },
    headerAudit: {
      backgroundColor: "#7C85BFff",
      border: "1px solid white",
      color: "white",
      padding: 10,
      height: 10,
      fontSize: "0.8rem",
      zIndex: 1,
    },
    headerPK: {
      backgroundColor: "#BB564B",
      border: "1px solid white",
      color: "white",
      padding: 10,
      height: 10,
      fontSize: "0.8rem",
    },
    headerPK2: {
      height: 10,
      backgroundColor: "#BB564B",
      border: "1px solid white",
      color: "white",
      fontSize: "0.8rem",
      padding: "6px",
      position: "sticky",
      top: 46,
    },
    headerPK3: {
      height: 10,
      backgroundColor: "#BB564B",
      border: "1px solid white",
      color: "white",
      fontSize: "0.8rem",
      padding: "6px",
      position: "sticky",
      top: 108,
    },
    bodyData: {
      fontSize: "0.65rem",
    },
    pagination: {
      "& .MuiPaginationItem-root": {
        height: 25,
        minWidth: 25,
        fontSize: "0.8rem",
        [theme.breakpoints.down("lg")]: {
          fontSize: "0.7rem",
        },
      },
      paddingTop: 5,
    },
    detailStatus: {
      display: "inline",
      fontSize: "0.8rem",
      [theme.breakpoints.down("lg")]: {
        fontSize: "0.7rem",
      },
    },
    dot: {
      fontSize: "0.8rem",
    },
    box: {
      display: "flex",
      justifyContent: "space-between",
      [theme.breakpoints.down("md")]: {
        display: "block",
      },
      justifyItems: "center",
    },
    input1: {
      "& .MuiInputBase-input": {
        fontSize: "0.8rem",
      },
      "& .MuiSelect-selectMenu": {
        height: 15,
      },
      "& .MuiInputBase-root": {
        height: 35,
      },
      "& .MuiInputLabel-outlined": {
        // paddingBottom: 20,
        fontSize: "0.8rem",
        transform: "translate(10px, 10px) scale(1)",
      },
      "& .MuiInputLabel-shrink": {
        transform: "translate(14px, -6px) scale(0.75)",
      },
      width: 100,
      [theme.breakpoints.down("lg")]: {
        width: 100,
        marginBottom: 10,
      },
    },
    header2: {
      backgroundColor: "#7C85BFff",
      border: "1px solid white",
      color: "white",
      fontSize: "0.8rem",
      padding: "6px",
      position: "sticky",
      top: 46,
      zIndex: 1,
    },
    header3: {
      backgroundColor: "#7C85BFff",
      border: "1px solid white",
      color: "white",
      fontSize: "0.8rem",
      padding: "6px",
      position: "sticky",
      top: 108,
      zIndex: 1,
    },
  };
});

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    "& > *": {
      marginTop: theme.spacing(2),
    },
  },
}))(TableRow);

export default function AuditTable(props) {
  const { page, onChange, dataList, onFetchData, checkDate } = props;
  const [selectedPage, setSelectedPage] = useState("");
  const [open, setOpen] = useState(false);
  const [dataForActivity, SetDataForActivity] = useState({});
  const classes = useStyle();

  const handleClose = () => {
    setOpen(false);
  };

  const fetchData = async (ts, path) => {
    Swal.fire({
      title: "Loading",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    const sendData = {
      date: format(checkDate, "yyyy-MM-dd"),
      transactionId: ts,
    };

    const res = await getDataRawTransactionActivity(sendData);
    Swal.close();

    if (!!res) {
      SetDataForActivity(
        path === 2
          ? {
              picCrop: res.data.mf_lane_picCrop,
              picFull: res.data.mf_lane_picFull,
            }
          : path === 3
          ? {
              picCrop: res.data.imageFileCrop,
              picFull: res.data.imageFile,
            }
          : { picCrop: "", picFull: "" }
      );
    }
    // console.log("res2:", res.data);
    setOpen(true);
  };
  return (
    <div>
      <Box className={classes.box}>
        {/* page box */}
        <Box style={{ marginTop: 10, display: "flex" }}>
          <Box>
            <TextField
              variant="outlined"
              className={classes.input1}
              style={{ margin: "0" }}
              label="go to page"
              value={selectedPage}
              onChange={(e) => setSelectedPage(e.target.value)}
            />
            <Button
              variant="contained"
              color="secondary"
              style={{ height: 35 }}
              onClick={() => onFetchData(parseInt(selectedPage))}
            >
              Go
            </Button>
          </Box>
          <Box>
            {/* search page box */}
            <Pagination
              count={dataList.totalPages}
              color="primary"
              page={page}
              onChange={onChange}
              className={classes.pagination}
            />
          </Box>
        </Box>

        {/* detail box */}
        <Box style={{ marginTop: 13, display: "flex", paddingTop: 4 }}>
          {detailStatus.map((item) => (
            <Box style={{ paddingLeft: 10 }}>
              <FiberManualRecordIcon
                className={classes.dot}
                style={{ color: item.color }}
              />
              <Typography className={classes.detailStatus}>
                {item.label}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>

      <TableContainer className={classes.container}>
        <Table stickyHeader>
          <TableHead>
            <TableRow style={{ padding: 5 }}>
              <TableCell
                colSpan={13}
                className={classes.headerAudit}
                align="center"
              >
                ระบบตรวจสอบรายได้ (Audit)
              </TableCell>
              <TableCell
                colSpan={10}
                className={classes.headerPK}
                align="center"
              >
                ระบบจัดเก็บรายได้ (M-Flow)
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center" rowSpan={2} className={classes.header2}>
                สถานะ
              </TableCell>
              <TableCell align="center" rowSpan={2} className={classes.header2}>
                หมายเลขรายการ
              </TableCell>
              <TableCell align="left" rowSpan={2} className={classes.header2}>
                ช่องทาง
              </TableCell>
              <TableCell align="center" className={classes.header2}>
                double lidar
              </TableCell>
              <TableCell align="center" colSpan={3} className={classes.header2}>
                อุปกรณ์ตรวจจับ
              </TableCell>
              <TableCell align="center" colSpan={6} className={classes.header2}>
                กรมการขนส่งทางบก
              </TableCell>
              <TableCell
                align="center"
                colSpan={5}
                className={classes.headerPK2}
              >
                ระดับช่องจราจร (Lane)
              </TableCell>
              <TableCell
                align="center"
                colSpan={5}
                className={classes.headerPK2}
              >
                ระดับแม่ข่าย (HQ)
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center" className={classes.header3}>
                เวลา
              </TableCell>
              <TableCell align="center" className={classes.header3}>
                เวลา
              </TableCell>
              <TableCell align="center" className={classes.header3}>
                ประเภท
              </TableCell>
              <TableCell align="center" className={classes.header3}>
                กล้อง Audit
              </TableCell>
              <TableCell
                align="center"
                className={classes.header3}
                style={{ width: 50 }}
              >
                เวลา
              </TableCell>
              <TableCell align="center" className={classes.header3}>
                ประเภทรถ
              </TableCell>
              <TableCell align="center" className={classes.header3}>
                ทะเบียน
              </TableCell>
              <TableCell align="center" className={classes.header3}>
                หมวดจังหวัด
              </TableCell>
              <TableCell align="center" className={classes.header3}>
                ยี่ห้อรถ
              </TableCell>
              <TableCell align="center" className={classes.header3}>
                สีรถ
              </TableCell>
              <TableCell align="center" className={classes.headerPK3}>
                เวลา
              </TableCell>
              <TableCell align="center" className={classes.headerPK3}>
                ประเภทรถ
              </TableCell>
              <TableCell align="center" className={classes.headerPK3}>
                ทะเบียน
              </TableCell>
              <TableCell align="center" className={classes.headerPK3}>
                หมวดจังหวัด
              </TableCell>
              <TableCell align="center" className={classes.headerPK3}>
                กล้อง
              </TableCell>
              <TableCell align="center" className={classes.headerPK3}>
                เวลา
              </TableCell>
              <TableCell align="center" className={classes.headerPK3}>
                ประเภทรถ
              </TableCell>
              <TableCell align="center" className={classes.headerPK3}>
                ทะเบียน
              </TableCell>
              <TableCell align="center" className={classes.headerPK3}>
                หมวดจังหวัด
              </TableCell>
              <TableCell align="center" className={classes.headerPK3}>
                กล้อง
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!!dataList.resultsDisplay
              ? dataList.resultsDisplay.map((data, index) => (
                  <StyledTableRow key={index}>
                    <TableCell align="center">
                      <FiberManualRecordIcon
                        fontSize="small"
                        style={{
                          color:
                            data.state === 1
                              ? "lightgray"
                              : data.state === 2
                              ? "#FF2400"
                              : data.state === 3
                              ? "blue"
                              : data.state === 4
                              ? "orange"
                              : data.state === 5
                              ? "black"
                              : data.state === 6
                              ? "darkviolet"
                              : data.state === 7
                              ? "lightblue"
                              : data.state === 8
                              ? "lightgreen"
                              : "rgba(0,0,0,0)",
                        }}
                      />
                      {/* {row.match_id} */}
                    </TableCell>
                    <TableCell align="center" className={classes.bodyData}>
                      {!!data.transactionId ? data.transactionId : "-"}
                    </TableCell>
                    <TableCell align="center" className={classes.bodyData}>
                      {!!data.match_gate ? [...data.match_gate].pop() : "-"}
                    </TableCell>
                    <TableCell align="center" className={classes.bodyData}>
                      -
                    </TableCell>
                    <TableCell align="center" className={classes.bodyData}>
                      -
                    </TableCell>
                    <TableCell align="center" className={classes.bodyData}>
                      -
                    </TableCell>
                    <TableCell
                      align="center"
                      className={classes.bodyData}
                      onClick={() => {
                        fetchData(data.transactionId, 1);
                      }}
                      style={{ cursor: "pointer" }}
                    >
                      <CameraAltIcon />
                    </TableCell>
                    <TableCell align="center" className={classes.bodyData}>
                      {!!data.transactionDate
                        ? data.transactionDate.split(" ").pop()
                        : "-"}
                    </TableCell>
                    <TableCell align="center" className={classes.bodyData}>
                      {!!data.vehicleClass ? data.vehicleClass : "-"}
                    </TableCell>
                    <TableCell align="center" className={classes.bodyData}>
                      {!!data.cameras_plateNo1 ? data.cameras_plateNo1 : "-"}
                    </TableCell>
                    <TableCell align="center" className={classes.bodyData}>
                      {!!data.province_description
                        ? data.province_description
                        : "-"}
                    </TableCell>
                    <TableCell align="center" className={classes.bodyData}>
                      {!!data.brand_description ? data.brand_description : "-"}
                    </TableCell>
                    <TableCell align="center" className={classes.bodyData}>
                      {!!data.colors_description
                        ? data.colors_description
                        : "-"}
                    </TableCell>
                    <TableCell align="center" className={classes.bodyData}>
                      {!!data.mf_lane_tranDatetime
                        ? data.mf_lane_tranDatetime
                        : "-"}
                    </TableCell>
                    <TableCell align="center" className={classes.bodyData}>
                      {!!data.mf_lane_vehicleClass
                        ? `C${data.mf_lane_vehicleClass}`
                        : "-"}
                    </TableCell>
                    <TableCell align="center" className={classes.bodyData}>
                      {!!data.mf_lane_plateNo1 ? data.mf_lane_plateNo1 : "-"}
                    </TableCell>
                    <TableCell align="center" className={classes.bodyData}>
                      {data.province_description}
                    </TableCell>
                    <TableCell
                      align="center"
                      className={classes.bodyData}
                      onClick={() => {
                        fetchData(data.transactionId, 2);
                      }}
                      style={{ cursor: "pointer" }}
                    >
                      <CameraAltIcon />
                    </TableCell>
                    <TableCell align="center" className={classes.bodyData}>
                      {!!data.transactionDate
                        ? data.transactionDate.split(" ").pop()
                        : "-"}
                    </TableCell>
                    <TableCell align="center" className={classes.bodyData}>
                      {!!data.vehicleClass ? `C${data.vehicleClass}` : "-"}
                    </TableCell>
                    <TableCell align="center" className={classes.bodyData}>
                      {!!data.cameras_plateNo1 ? data.cameras_plateNo1 : "-"}
                    </TableCell>
                    <TableCell align="center" className={classes.bodyData}>
                      {!!data.province_description
                        ? data.province_description
                        : "-"}
                    </TableCell>
                    <TableCell
                      align="center"
                      className={classes.bodyData}
                      onClick={() => {
                        fetchData(data.transactionId, 3);
                      }}
                      style={{ cursor: "pointer" }}
                    >
                      <CameraAltIcon />
                    </TableCell>
                  </StyledTableRow>
                ))
              : []}
          </TableBody>
        </Table>
      </TableContainer>

      <ImageModal
        dataList={dataForActivity}
        open={open}
        onClick={handleClose}
        onFetchData={onFetchData}
        onClose={handleClose}
      />
    </div>
  );
}
