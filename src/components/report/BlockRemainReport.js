import { makeStyles } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => {
  return {
    root: {
      fontFamily: "Sarabun",
      padding: 20,
    },
    th: {
      fontWeight: 600,
      borderLeft: "1px solid black",
      borderTop: "1px solid black",
      borderRight: "1px solid black",
      width: 150,
      fontSize: 13,
    },
    th2: {
      fontWeight: 400,
      borderBottom: "1px solid black",
      borderLeft: "1px solid black",
      borderRight: "1px solid black",
      width: 130,
      // padding: "0px",
      fontSize: 11,
    },
    td: {
      fontWeight: 400,
      textAlign: "left",
      padding: "0px 10px",
    },

    table: {
      borderCollapse: "collapse",
      border: "1px solid black",
      fontSize: 11,
      paddingLeft: 10,
      paddingRight: 10,
      // margin: "0px auto",
    },
    tr: {},
  };
});

export default function BlockRemainReport() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <table className={classes.table}>
        <tr>
          <th
            className={classes.th}
            colSpan="3"
            style={{
              textAlign: "left",
              paddingLeft: 10,
              paddingBottom: 5,
            }}
          >
            สรุปรายละเอียดรายได้คงค้างรายเดือน
          </th>
        </tr>
        <tr>
          <td className={classes.td} colSpan="3">
            รายละเอียด ด่านทับช้าง 1
          </td>
        </tr>
        <tr className={classes.tr}>
          <td className={`${classes.td} ${classes.td3}`} colSpan="3">
            ตั้งแต่ วันที่ 1 ธันวาคม 2563 - 31 ธันวาคม 2563(รายเดือน)
          </td>
        </tr>
        <tr className={classes.tr}>
          <td className={classes.td} style={{ width: 300 }}>
            จำนวนรถทั้งหมด
          </td>
          <td className={classes.td} style={{ width: 100 }}>
            49,600
          </td>
          <td className={classes.td}>คัน</td>
        </tr>
        <tr className={classes.tr}>
          <td className={classes.td}>เงินพึงได้ทั้งหมด</td>
          <td className={classes.td}>49,600,000</td>
          <td className={classes.td}>
            บาท
          </td>
        </tr>
        <tr className={classes.tr}>
          <td className={classes.td}>เงินที่จัดเก็บได้ทั้งหมด</td>
          <td className={classes.td}>7,409,000</td>
          <td className={classes.td}>
            บาท
          </td>
        </tr>
        <tr className={classes.tr}>
          <td className={classes.td}>คงค้างทั้งหมด</td>
          <td className={classes.td}>42,191,000</td>
          <td className={classes.td}>
            บาท
          </td>
        </tr>
        <tr className={classes.tr}>
          <td className={classes.td}>ค่าปรับทั้งหมด</td>
          <td className={classes.td}>4,960,000</td>
          <td className={classes.td}>
            บาท
          </td>
        </tr>
      </table>
    </div>
  );
}
