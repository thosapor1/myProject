import axios from "axios";
import { format } from "date-fns";
import React from "react";
import XLSX from "xlsx";

export default function exportExcel(selectedDate, checkpoint) {
  //   console.log(fileType);
  let endpoint =
    "http://1d32-45-117-208-162.ap.ngrok.io/audit/api/v1/export-xlsx";
  const header = {
    "Content-Type": "application",
    responseType: "arraybuffer",
  };
  const sendData = {
    date: selectedDate,
    checkpoint: checkpoint.toString(),
  };

  axios.post(endpoint, sendData).then((res) => {
    console.log(res.data.results);

    const ws = XLSX.utils.json_to_sheet(res.data.results);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "รายงานประจำวัน");
    /* generate XLSX file and send to client */
    XLSX.writeFile(wb, "sheetjs.xlsx");
  });

  return <></>;
}
