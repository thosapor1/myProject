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
      fontSize: 14,
      padding: "5px",
    },
    th2: {
      fontWeight: 400,
      borderBottom: "1px solid black",
      borderLeft: "1px solid black",
      borderRight: "1px solid black",
      width: 130,
      padding: "5px",
      fontSize: 14,
    },
    td: {
      fontWeight: 400,
      border: "1px solid black",
      width: 130,
      fontSize: 14,
      padding: "0px",
      textAlign: "left",
    },
    td2: {
      fontWeight: 400,
      borderLeft: "1px solid black",
      width: 130,
      fontSize: 14,
      padding: "5px",
      textAlign: "left",
    },
    td3: {
      fontWeight: 400,
      borderRight: "1px solid black",
      width: 150,
      fontSize: 14,
      padding: "0px",
      paddingRight: "10px",
      textAlign: "right",
    },
    td4: {
      fontWeight: 400,
      //   borderRight: "1px solid black",
      width: 150,
      fontSize: 14,
      padding: "0px",
      textAlign: "right",
    },
    table: {
      borderCollapse: "collapse",
    },
    tr: {
      marginTop: "-20px",
    },
  };
});

export default function BlockDailyReport(props) {
  const { dataList, checkpoint } = props;
  const classes = useStyles();
  return (
    <>
      <div className={classes.root}>
        <table className={classes.table}>
          <tr>
            <th className={classes.th} colSpan="3">
              {`รายได้ด่าน${
                checkpoint === 0
                  ? "ทุกด่าน"
                  : checkpoint === 1
                  ? "ด่านทับช้าง1"
                  : checkpoint === 2
                  ? "ด่านทับช้าง2"
                  : checkpoint === 3
                  ? "ด่านธัญบุรี1"
                  : checkpoint === 4
                  ? "ด่านธัญบุรี2"
                  : ""
              }`}
            </th>
            {/* <th className={classes.th} colSpan="3">
              ค่าปรับด่านทับช้าง 1
            </th>
            <th className={classes.th} colSpan="3">
              สรุปข้อมูลรถ
            </th> */}
          </tr>
          <tr>
            <td className={classes.td2}>รายได้ที่พึงได้</td>
            <td className={classes.td4}>
              {!!dataList.result_revenue
                ? dataList.result_revenue[0].revenue.toLocaleString()
                : ""}
            </td>
            <td className={classes.td3}>บาท</td>
            {/* <td className={classes.td2}>ค่าปรับที่เกิดขึ้น</td>
            <td className={classes.td4}>300,000</td>
            <td className={classes.td3}>บาท</td>
            <td className={classes.td2}>จำนวนรถทั้งหมด</td>
            <td className={classes.td4}>40</td>
            <td className={classes.td3}>คัน</td> */}
          </tr>
          <tr>
            <td
              className={classes.td2}
              style={{ paddingBottom: 102, borderBottom: "1px solid black" }}
            >
              รายได้ที่พึงได้ (HQ)
            </td>
            <td
              className={classes.td4}
              style={{ paddingBottom: 102, borderBottom: "1px solid black" }}
            >
              {!!dataList.result_revenue
                ? dataList.result_revenue[0].revenue_mFlow.toLocaleString()
                : ""}
            </td>
            <td
              className={classes.td3}
              style={{ paddingBottom: 102, borderBottom: "1px solid black" }}
            >
              บาท
            </td>
          </tr>
        </table>
      </div>
    </>
  );
}
