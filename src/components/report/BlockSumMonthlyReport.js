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
      padding: "0px 10px",
    },
    td2: {
      padding: "0px 10px",
      borderRight: "1px solid black",
    },
    table: {
      fontWeight: 400,
      borderCollapse: "collapse",
      width: "80%",
      margin: "0px auto",
      fontSize: 11,
      border: "1px solid black",
      paddingLeft: "10px",
    },
    tr: {
      marginTop: "-20px",
    },
  };
});

export default function BlockSumMonthlyReport() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <table className={classes.table}>
        <tr>
          <th className={classes.th} colSpan="3">
            รายได้ด่านทับช้าง 1
          </th>
          <th className={classes.th} colSpan="3">
            ค่าปรับด่านทับช้าง 1
          </th>
          <th className={classes.th} colSpan="3">
            สรุปข้อมูลรถ
          </th>
        </tr>
        <tr>
          <td className={classes.td}>รายได้ที่พึงได้</td>
          <td className={classes.td}>1,000,000</td>
          <td className={classes.td2}>บาท</td>
          <td className={classes.td}>ค่าปรับที่เกิดขึ้น</td>
          <td className={classes.td}>300,000</td>
          <td className={classes.td2}>บาท</td>
          <td className={classes.td}>จำนวนรถทั้งหมด</td>
          <td className={classes.td}>132,246</td>
          <td className={classes.td2}>คัน</td>
        </tr>
        <tr className={classes.tr}>
          <td className={classes.td}>รายได้ที่ได้รับ</td>
          <td className={classes.td}>500,000</td>
          <td className={classes.td2}>บาท</td>
          <td className={classes.td}>เรทค่าปรับ</td>
          <td className={classes.td}>300</td>
          <td className={classes.td2}>บาท</td>
          <td className={classes.td} style={{ width: 250 }}>
            จำนวนรถ C1 ทั้งหมด
          </td>
          <td className={classes.td}>31,465</td>
          <td className={classes.td2}>คัน</td>
        </tr>
        <tr className={classes.tr}>
          <td className={classes.td}>รวมทั้งสิ้น</td>
          <td className={classes.td}>500,000</td>
          <td className={classes.td2}>บาท</td>
          <td className={classes.td} style={{ width: 170 }}>
            ค่าปรับที่ทำการพักชำระ
          </td>
          <td className={classes.td}>200,000</td>
          <td className={classes.td2}>บาท</td>
          <td className={classes.td}>จำนวนรถ C2 ทั้งหมด</td>
          <td className={classes.td}>31,496</td>
          <td className={classes.td2}>คัน</td>
        </tr>
        <tr className={classes.tr}>
          <td className={classes.td}>คงค้าง</td>
          <td className={classes.td}>500,000</td>
          <td className={classes.td2}>บาท</td>
          <td className={classes.td}>รวมทั้งสิ้น</td>
          <td className={classes.td}>200,000</td>
          <td className={classes.td2}>บาท</td>
          <td className={classes.td}>จำนวนรถ C3 ทั้งหมด</td>
          <td className={classes.td}>31,496</td>
          <td className={classes.td2}>คัน</td>
        </tr>
        <tr className={classes.tr}>
          <td className={classes.td2} colSpan="3"></td>
          <td className={classes.td}>คงค้าง</td>
          <td className={classes.td}>100,000</td>
          <td className={classes.td2}>บาท</td>
          <td className={classes.td}>จำนวนรถยกเว้นทั้งหมด</td>
          <td className={classes.td}>31,558</td>
          <td className={classes.td2}>คัน</td>
        </tr>
        <tr className={classes.tr}>
          <td className={classes.td2} colSpan="3"></td>
          <td className={classes.td2} colSpan="3"></td>
          <td className={classes.td}>จำนวนรถคงค้างทั้งหมด</td>
          <td className={classes.td}>6,200</td>
          <td className={classes.td2}>คัน</td>
        </tr>
        <tr className={classes.tr}>
          <td
            className={classes.td2}
            colSpan="3"
            style={{ borderBottom: "1px solid black" }}
          ></td>
          <td
            className={classes.td2}
            colSpan="3"
            style={{ borderBottom: "1px solid black" }}
          ></td>
          <td
            className={classes.td}
            style={{ borderBottom: "1px solid black" }}
          >
            ค่าปรับทั้งหมด
          </td>
          <td
            className={classes.td}
            style={{ borderBottom: "1px solid black" }}
          >
            4,960,000
          </td>
          <td
            className={classes.td2}
            style={{ borderBottom: "1px solid black" }}
          >
            บาท
          </td>
        </tr>
      </table>
    </div>
  );
}
