import { makeStyles, Paper } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => {
  return {
    root: {
      fontFamily: "Sarabun",
      padding: 20,
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

export default function TableReportSumMonthly(props) {
  const { dataList } = props;
  const classes = useStyles();
  return (
    <div component={Paper} className={classes.root}>
      <table className={classes.table}>
        <tr>
          <th className={classes.th} rowSpan="2">
            ด่าน
          </th>
          <th className={classes.th} rowSpan="2">
            transaction
          </th>
          <th className={classes.th} rowSpan="2">
            วันเดือนปีการเก็บ
          </th>
          <th className={classes.th}>เงินพึงได้ทั้งหมด</th>
          <th className={classes.th} style={{ borderBottom: "0px" }}>
            เงินที่จัดเก็บได้
          </th>
          <th className={classes.th} style={{ borderBottom: "0px" }}>
            จำนวนเงินคงค้าง
          </th>
          <th className={classes.th} style={{ borderBottom: "0px" }}>
            ค่าปรับทั้งหมด
          </th>
          <th className={classes.th} style={{ borderBottom: "0px" }}>
            ชำระแล้ว
          </th>
          <th className={classes.th} style={{ borderBottom: "0px" }}>
            จำนวนรถทั้งหมด
          </th>
          <th className={classes.th} colSpan="4">
            ประเภทรถ
          </th>
          <th className={classes.th}>จำนวนรถคงค้าง</th>
        </tr>
        <tr>
          <th className={classes.th2}>(บาท)</th>
          <th className={classes.th2}>(บาท)</th>
          <th className={classes.th2}>(บาท)</th>
          <th className={classes.th2}>(บาท)</th>
          <th className={classes.th2}>(บาท)</th>
          <th className={classes.th2}>(คัน)</th>
          <th className={classes.th2}>C1</th>
          <th className={classes.th2}>C2</th>
          <th className={classes.th2}>C3</th>
          <th className={classes.th2}>รถยกเว้น</th>
          <th className={classes.th2}>(คัน)</th>
        </tr>
        {!!dataList
          ? dataList.map((item) => (
              <tr key={item.id}>
                <td className={classes.td}>{item.gate} </td>
                <td className={classes.td}>{item.transaction}</td>
                <td className={classes.td}>{item.entryDate}</td>
                <td className={classes.td}>{item.storeTime}</td>
                <td className={classes.td}>{item.fee}</td>
                <td className={classes.td}>{item.fee}</td>
                <td className={classes.td}>{item.fine}</td>
                <td className={classes.td}>{item.fine}</td>
                <td className={classes.td}>{item.paid}</td>
                <td className={classes.td}>{item.paid}</td>
                <td className={classes.td}>{item.fee}</td>
                <td className={classes.td}>{item.fee}</td>
                <td className={classes.td}>{item.fee}</td>
                <td className={classes.td}>{item.fee}</td>
              </tr>
            ))
          : dataList}
      </table>
    </div>
  );
}
