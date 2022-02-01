import { Box, makeStyles, Typography } from "@material-ui/core";
import format from "date-fns/format";
import React from "react";

const useStyles = makeStyles((theme) => {
  return {
    root: {
      fontFamily: "Sarabun",
      padding: 20,
    },
    th: {
      fontWeight: 700,
      border: "1px solid black",
      width: 150,
      fontSize: 14,
      padding: "5px",
    },
    th2: {
      fontWeight: 700,
      border: "1px solid black",
      width: 150,
      padding: "5px",
      fontSize: 14,
    },
    td: {
      fontWeight: 400,
      border: "1px solid black",
      width: 150,
      fontSize: 14,
      padding: "5px",
      textAlign: "center",
    },
    table: {
      borderCollapse: "collapse",
    },
  };
});

export default function TablePaymentDaily(props) {
  const { dataList } = props;

  const classes = useStyles();
  return (
    <>
      <Box>
        <div className={classes.root}>
          <table className={classes.table}>
            <tr>
              <th className={classes.th}>รายการใบแจ้งหนี้</th>
              <th className={classes.th}>จำนวน</th>
              <th className={classes.th}>จำนวนเงิน(บาท)</th>
            </tr>

            <tr>
              <td className={classes.td}>จำนวนใบแจ้งหนี้สมาชิก</td>
              <td className={classes.td}>
                {!!dataList.result_payment
                  ? dataList.result_payment[0].count_payment.toLocaleString()
                  : ""}
              </td>
              <td className={classes.td}>
                {!!dataList.result_payment
                  ? dataList.result_payment[0].sum_fee_totalAmount.toLocaleString()
                  : ""}
              </td>
            </tr>
          </table>
        </div>
      </Box>
    </>
  );
}
