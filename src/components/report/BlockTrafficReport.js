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
      margin: "0px auto",
    },
    tr: {},
  };
});

export default function BlockTrafficReport() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <table className={classes.table}>
        <tr>
          <th
            className={classes.th}
            colSpan="4"
            style={{
              textAlign: "left",
              paddingLeft: 10,
              paddingBottom: 5,
            }}
          >
            สรุปใบนำฝากประจำเดือน
          </th>
        </tr>
        <tr>
          <td className={classes.td} style={{ width: 300 }}>
            รายละเอียด ด่านทับช้าง 1
          </td>
          <td className={classes.td} style={{ width: 200 }}>
            จำนวนรถทั้งหมด
          </td>
          <td className={classes.td} style={{ width: 100 }}>
            132,246
          </td>
          <td className={classes.td} style={{ width: 10 }}>
            คัน
          </td>
        </tr>
        <tr className={classes.tr}>
          <td className={classes.td}>
            ตั้งแต่ วันที่ 1 ธันวาคม 2563 - 31 ธันวาคม 2563(รายเดือน)
          </td>
          <td className={classes.td}>จำนวนรถ C1 ทั้งหมด</td>
          <td className={classes.td}>31,465</td>
          <td className={classes.td}>คัน</td>
        </tr>
        <tr className={classes.tr}>
          <td className={classes.td}></td>
          <td className={classes.td}>จำนวนรถ C2 ทั้งหมด</td>
          <td className={classes.td}>31,465</td>
          <td className={classes.td}>คัน</td>
        </tr>
        <tr className={classes.tr}>
          <td className={classes.td}></td>
          <td className={classes.td}>จำนวนรถ C3 ทั้งหมด</td>
          <td className={classes.td}>31,465</td>
          <td className={classes.td}>คัน</td>
        </tr>
        <tr className={classes.tr}>
          <td className={classes.td}></td>
          <td className={classes.td}>จำนวนรถยกเว้นทั้งหมด</td>
          <td className={classes.td}>31,465</td>
          <td className={classes.td}>คัน</td>
        </tr>
        <tr className={classes.tr}>
          <td className={classes.td}></td>
          <td className={classes.td}>จำนวนรถคงค้างทั้งหมด</td>
          <td className={classes.td}>31,465</td>
          <td className={classes.td}>คัน</td>
        </tr>
        <tr className={classes.tr}>
          <td className={classes.td}></td>
          <td className={classes.td}>ค่าปรับทั้งหมด</td>
          <td className={classes.td}>4,960,000</td>
          <td className={classes.td}>บาท</td>
        </tr>
      </table>
    </div>
  );
}
