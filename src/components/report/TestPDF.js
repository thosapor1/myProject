import { format } from "date-fns";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { image } from "../../image/logo_base64";
import axios from "axios";
import Swal from "sweetalert2";

pdfMake.vfs = pdfFonts.pdfMake.vfs;
pdfMake.fonts = {
  THSarabun: {
    normal: "THSarabunNew.ttf",
    bold: "THSarabunNew Bold.ttf",
    italics: "THSarabunNew Italic.ttf",
    bolditalics: "THSarabunNew Bold Italic.ttf",
  },
};

export default function TestPDF(selectedDate, checkpoint) {
  const getDate = format(selectedDate, "yyyy-MM-dd");
  const ck = checkpoint;
  console.log(getDate, ck);
  const url = "http://1d32-45-117-208-162.ap.ngrok.io/audit/api/v1/export-pdf";
  let sendData = { date: getDate, checkpoint: ck.toString() };

  let body = [
    [
      { text: "transaction", rowSpan: 2, margin: [0, 5, 0, 0] },
      { text: "ด่าน", rowSpan: 2, margin: [0, 5, 0, 0] },
      { text: "ช่อง", rowSpan: 2, margin: [0, 5, 0, 0] },
      { text: "เวลาเข้าด่าน", rowSpan: 2, margin: [0, 5, 0, 0] },
      { text: "ประเภทรถ", colSpan: 4, margin: [0, 5, 0, 0] },
      { text: "ประเภท TS", rowSpan: 2, margin: [0, 5, 0, 0] },
      { text: "ค่าผ่านทาง", rowSpan: 2, margin: [0, 5, 0, 0] },
      { text: "เลขที่ใบแจ้งหนี้", rowSpan: 2, margin: [0, 5, 0, 0] },
      { text: "การชำระ", rowSpan: 2, margin: [0, 5, 0, 0] },
      { text: "หมายเหตุ", rowSpan: 2, margin: [0, 5, 0, 0] },
      { text: "สถานะ", rowSpan: 2, margin: [0, 5, 0, 0] },
    ],
    [
      {},
      {},
      {},
      {},
      { text: "จริง" },
      { text: "AD" },
      { text: "Lane" },
      { text: "HQ" },
      {},
      {},
      {},
    ],
  ];

  const pdfGenDownload = (docDefinition) => {
    return new Promise((resolve, reject) => {
      try {
        console.log("generate");
        pdfMake.createPdf(docDefinition).download("รายงานประจำวัน.pdf", () => {
          resolve();
        });
      } catch (err) {
        reject(err);
      }
    });
  };

  const pushToBody = (res) => {
    return new Promise((resolve, reject) => {
      try {
        for (let index = 0; index < res.data.length; index++) {
          // console.log(index);
          body.push([
            !!res.data[index].transactionId
              ? res.data[index].transactionId
              : "-",
            !!res.data[index].match_checkpoint
              ? res.data[index].match_checkpoint
              : "-",
            !!res.data[index].match_gate ? res.data[index].match_gate : "-",
            !!res.data[index].match_timestamp
              ? res.data[index].match_timestamp.split(" ")[1]
              : "-",
            `C${res.data[index].match_real_vehicleClass}`,
            !!res.data[index].AD ? `C${res.data[index].AD}` : "-",
            `C${res.data[index].mf_lane_vehicleClass}`,
            `C${res.data[index].vehicleClass}`,
            !!res.data[index].hasPayment ? res.data[index].hasPayment : "-",
            !!res.data[index].forceFlag ? res.data[index].forceFlag : "-",
            !!res.data[index].status ? res.data[index].status : "-",
          ]);
        }
        console.log("loop");
        return resolve();
      } catch (err) {
        reject(err);
      }
    });
  };
  const date = format(new Date(), "dd MMMM yyyy");

  let docDefinition = {
    footer: function (currentPage, pageCount) {
      pageCount = 1;
      return [
        {
          columns: [
            {},
            {
              text: `หน้า ${currentPage.toString()}`,
              alignment: "right",
              fontSize: 9,
              margin: [0, 0, 40, 10],
            },
          ],
        },
        {
          canvas: [
            {
              type: "line",
              x1: 40,
              y1: -5,
              x2: 805,
              y2: -5,
              lineWidth: 1,
            },
          ],
        },
        {
          columns: [
            {
              text: "เจ้าหน้าที่ ชื่อตัวอย่าง นามสกุลตัวอย่าง ผ่ายตรวจสอบรายได้",
              alignment: "left",
              fontSize: 9,
              margin: [40, 0, 0, 0],
            },
            {
              text: format(new Date(), "dd MMMM yyyy HH.MMน."),
              alignment: "right",
              fontSize: 9,
              margin: [0, 0, 40, 0],
            },
          ],
        },
      ];
    },

    //page1
    pageOrientation: "landscape",
    content: [
      //page2
      {
        columns: [
          { image: `data:image/png;base64,${image}`, width: 60 },
          {
            width: "auto",
            stack: [
              {
                text: "ฝ่ายตรวจสอบรายได้",
                fontSize: 20,
                bold: true,
                margin: [20, 5, 0, 0],
              },
              {
                canvas: [
                  {
                    type: "line",
                    x1: 20,
                    y1: 2,
                    x2: 700,
                    y2: 2,
                    lineWidth: 1,
                  },
                ],
              },
              {
                text: "กองทางหลวงพิเศษระหว่างเมือง กรมทางหลวง",
                fontSize: 14,
                margin: [20, 0, 0, 0],
              },
            ],
          },
        ],
      },

      {
        text: "เอกสารแนบรายงานประจำวัน",
        alignment: "center",
        fontSize: 20,
        bold: true,
        margin: [0, 10, 0, 0],
      },
      { text: `${date}`, alignment: "center", fontSize: 14 },
      {
        text: "หน่วยงานรับการตรวจสอบ 902 - ทับช้าง 1",
        fontSize: 14,
        margin: [0, 10, 0, 0],
      },
      {
        text: "เอกสาร ตรวจสอบความถูกต้องของการตรวจรายได้ประจำวัน",
        fontSize: 14,
      },

      {
        style: "table2",
        table: {
          widths: [90, 50, 40, 60, 50, 50, 50, 50, 60, 60, 70],
          headerRows: 2,
          body: body,
        },
      },
    ],
    styles: {
      table: { marginTop: 20, alignment: "center", fontSize: 9 },
      table2: {
        marginLeft: 12,
        marginTop: 20,
        alignment: "center",
        fontSize: 11,
      },
    },
    defaultStyle: { font: "THSarabun" },
  };

  Swal.fire({
    title: `กำลังดาวน์โหลดข้อมูล`,
    allowOutsideClick: false,
    didOpen: async () => {
      Swal.showLoading();
      return axios
        .post(url, sendData, {
          onDownloadProgress: (ProgressEvent) => {
            document.getElementById(
              "swal2-title"
            ).innerHTML = `กำลังดาวน์โหลดข้อมูล ${Math.ceil(
              (ProgressEvent.loaded / ProgressEvent.total) * 100
            )}%`;
          },
        })
        .then((res) => {
          Swal.close();
          return res;
        })
        .then(async (res) => {
          Swal.fire({
            title: `กำลังสร้างรายงาน ขั้นตอนนี้อาจใช้เวลานาน`,
            allowOutsideClick: false,
            didOpen: async () => {
              Swal.showLoading();
              await pushToBody(res);

              setTimeout(async () => {
                await pdfGenDownload(docDefinition);
                Swal.close();
              }, 1000);
            },
          });
        })
        .catch((error) => {
          Swal.fire({
            icon: "error",
            text: "ไม่สามารถเชื่อมต่อเซิฟเวอร์ได้ในขณะนี้",
          });
        });
    },
  });

  return <></>;
}
