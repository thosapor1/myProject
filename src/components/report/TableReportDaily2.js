import { makeStyles, Paper } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => {
  return {
    root: {
      fontFamily: "Sarabun",
      padding: 20,
      marginTop: 20,
    },
    th: {
      fontWeight: 600,
      border: "1px solid black",
      width: 150,
      fontSize: 12,
    },
    th2: {
      fontWeight: 600,
      borderBottom: "1px solid black",
      borderLeft: "1px solid black",
      borderRight: "1px solid black",
      width: 150,
      // padding: "0px",
      fontSize: 12,
    },
    td: {
      fontWeight: 400,
      border: "1px solid black",
      width: 150,
      fontSize: 12,
      padding: "0px",
      textAlign: "center",
    },
    table: {
      borderCollapse: "collapse",
    },
  };
});

export default function TableReportDaily2(props) {
  const { dataList } = props;
  const classes = useStyles();
  return (
    <>
      <div component={Paper} className={classes.root}>
        <table className={classes.table}>
          <tr>
            <th className={classes.th} rowSpan="2">
              ด่าน
            </th>
            <th className={classes.th} rowSpan="2">
              transaction
            </th>
            <th className={classes.th} colSpan="2">
              เข้าด่าน
            </th>
            <th className={classes.th} rowSpan="2">
              ประเภทรถ
            </th>
            <th className={classes.th} style={{ borderBottom: "0px" }}>
              ค่าผ่านทาง
            </th>
            <th className={classes.th} style={{ borderBottom: "0px" }}>
              ค่าปรับ
            </th>
            <th className={classes.th} colSpan="2">
              จัดเก็บ
            </th>
            <th className={classes.th} style={{ borderBottom: "0px" }}>
              ชำระแล้ว
            </th>
            <th className={classes.th} rowSpan="2">
              ทะเบียน
            </th>
            <th className={classes.th} rowSpan="2">
              จังหวัด
            </th>
          </tr>
          <tr>
            <th className={classes.th2}>วันที่</th>
            <th className={classes.th2}>เวลา</th>
            <th className={classes.th2}>(บาท)</th>
            <th className={classes.th2}>(บาท)</th>
            <th className={classes.th2}>วันที่</th>
            <th className={classes.th2}>เวลา</th>
            <th className={classes.th2}>(บาท)</th>
          </tr>
          {!!dataList
            ? dataList.map((item) => (
                <tr key={item.id}>
                  <td className={classes.td}>{item.gate} </td>
                  <td className={classes.td}>{item.transaction}</td>
                  <td className={classes.td}>{item.entryDate}</td>
                  <td className={classes.td}>{item.entryTime}</td>
                  <td className={classes.td}>{item.carType}</td>
                  <td className={classes.td}>{item.fee}</td>
                  <td className={classes.td}>{item.fine}</td>
                  <td className={classes.td}>{item.storeDate}</td>
                  <td className={classes.td}>{item.storeTime}</td>
                  <td className={classes.td}>{item.paid}</td>
                  <td className={classes.td}>{item.license}</td>
                  <td className={classes.td}>{item.province}</td>
                </tr>
              ))
            : dataList}
        </table>
      </div>
    </>
  );
}
