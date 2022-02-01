import {
  Container,
  Grid,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => {
  return {
    root: {
      fontFamily: "Sarabun",
      padding: 20,
    },
    th: {
      fontWeight: 400,
      borderTop: "1px solid black",
      borderLeft: "1px solid black",
      borderRight: "1px solid black",
      width: 150,
      fontSize: 11,
      padding: "0px",
    },
    th2: {
      fontWeight: 400,
      borderBottom: "1px solid black",
      borderLeft: "1px solid black",
      borderRight: "1px solid black",
      width: 150,
      padding: "0px",
      fontSize: 11,
    },
    td: {
      fontWeight: 400,
      border: "1px solid black",
      width: 150,
      fontSize: 11,
      padding: "0px",
      textAlign: "center",
    },
    table: {
      borderCollapse: "collapse",
    },
  };
});

export default function TableReportDaily(props) {
  const { dataList } = props;
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <table className={classes.table}>
        <tr>
          <th
            className={classes.th}
            rowSpan="2"
            style={{ borderBottom: "1px solid black" }}
          >
            ประเภทรถ
          </th>
          <th className={classes.th}>จำนวนรถทั้งหมด</th>
          <th className={classes.th}>จำนวนรถที่ผิดพลาด</th>
          <th className={classes.th}>รถยกเว้น</th>
          <th className={classes.th}>รถที่คงค้าง</th>
        </tr>
        <tr>
          <th className={classes.th2}>(คัน)</th>
          <th className={classes.th2}>(คัน)</th>
          <th className={classes.th2}>(คัน)</th>
          <th className={classes.th2}>(คัน)</th>
        </tr>
        {!!dataList
          ? dataList.map((item) => (
              <tr key={item.id}>
                <td className={classes.td}>{item.label} </td>
                <td className={classes.td}>{item.sumCar}</td>
                <td className={classes.td}>{item.miss}</td>
                <td className={classes.td}>{item.except}</td>
                <td className={classes.td}>{item.remain}</td>
              </tr>
            ))
          : dataList}
      </table>
    </div>
  );
}
