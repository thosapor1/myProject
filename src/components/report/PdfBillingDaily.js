import axios from "axios";
import { format } from "date-fns";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import Swal from "sweetalert2";
import { image } from "../../image/logo_base64";

pdfMake.vfs = pdfFonts.pdfMake.vfs;
pdfMake.fonts = {
  THSarabun: {
    normal: "THSarabunNew.ttf",
    bold: "THSarabunNew Bold.ttf",
    italics: "THSarabunNew Italic.ttf",
    bolditalics: "THSarabunNew Bold Italic.ttf",
  },
};

export default async function PdfBillingDaily(selectedDate, checkpoint) {
  // let win = window.open("", "_blank");
  const date = format(new Date(), "dd MMMM yyyy");
  const getDate = !!selectedDate ? format(selectedDate, "yyyy-MM-dd") : "";
  const ck = checkpoint;
  console.log(getDate, ck);
  const url =
    "http://1d32-45-117-208-162.ap.ngrok.io/audit/api/v1/expect-pdf-billing";
  let sendData = { date: getDate, checkpoint: ck.toString() };

  Swal.fire({
    title: `กำลังสร้างรายงาน`,
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading();
    },
  });
  const res = await axios.post(url, sendData);

  console.log(res);

  setTimeout(async () => {
    await pdfGenDownload(docDefinition);
    Swal.close();
  }, 1000);

  const pdfGenDownload = (docDefinition) => {
    return new Promise((resolve, reject) => {
      try {
        console.log("generate");
        pdfMake
          .createPdf(docDefinition)
          .download("รายงานสรุปBillingประจำวัน.pdf", () => {
            resolve();
          });
      } catch (err) {
        reject(err);
      }
    });
  };

  let docDefinition = {
    footer: function (currentPage, pageCount) {
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
              x2: 555,
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
    content: [
      {
        columns: [
          { image: `data:image/png;base64,${image}`, width: 60 },
          //   { text: `test`, width: 60 },
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
                    x2: 455,
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
        text: "รายงานประจำวัน",
        alignment: "center",
        fontSize: 20,
        bold: true,
        margin: [0, 10, 0, 0],
      },
      {
        text: `${format(selectedDate, "dd MMMM yyyy")}`,
        alignment: "center",
        fontSize: 14,
      },
      {
        text: `หน่วยงานรับการตรวจสอบ 902 - ${
          checkpoint === 0
            ? "ทุกด่าน"
            : checkpoint === 1
            ? "ด่านทับช้าง 1"
            : checkpoint === 2
            ? "ด่านทับช้าง 2"
            : checkpoint === 3
            ? "ด่านธัญบุรี 1"
            : checkpoint === 4
            ? "ด่านธัญบุรี 2"
            : ""
        }`,
        fontSize: 14,
        margin: [0, 10, 0, 0],
      },
      {
        text: "เอกสาร ตรวจสอบความถูกต้องของ Billing ประจำวัน",
        fontSize: 14,
      },
      {
        columns: [
          {
            margin: [0, 20, 0, 0],
            fontSize: 11,
            style: "table",
            table: {
              widths: [100, 100],
              body: [
                [
                  {
                    text: "รายการใบแจ้งหนี้",
                  },
                  { text: "จำนวน" },
                ],
                [
                  {
                    text: "จำนวนใบแจ้งหนี้สมาชิก",
                  },
                  {
                    text: !!res.data.result_billing[0].billing_member
                      ? res.data.result_billing[0].billing_member.toLocaleString()
                      : "-",
                  },
                ],
                [
                  {
                    text: "จำนวนใบแจ้งหนี้ไม่ใช่สมาชิก",
                  },
                  {
                    text: !!res.data.result_billing[0].billing_nonemember
                      ? res.data.result_billing[0].billing_nonemember.toLocaleString()
                      : "-",
                  },
                ],
              ],
            },
          },

          {
            fontSize: 11,
            style: "table",
            margin: [-20, 20, 0, 0],
            table: {
              widths: [80, 80, 80],
              body: [
                [
                  {
                    text: "รายการใบแจ้งหนี้",
                  },
                  {
                    text: "จำนวนรถ",
                  },
                  {
                    text: "จำนวนเงิน(บาท)",
                  },
                ],
                [
                  {
                    text: "มีมูลค่า",
                  },
                  {
                    text: res.data.result_billing_value[0].count_value.toLocaleString(),
                  },
                  {
                    text: res.data.result_billing_value[0].count_value.toLocaleString(),
                  },
                ],
                [
                  {
                    text: "ไม่มีมูลค่า",
                  },
                  {
                    text: res.data.result_billing_value[0].count_no_value.toLocaleString(),
                  },
                  {
                    text: "0",
                  },
                ],
              ],
            },
          },
        ],
      },

      //page2
    ],
    styles: {
      table: { marginTop: 20, alignment: "center", fontSize: 11 },
      table2: { marginTop: 20, alignment: "center", fontSize: 11 },
    },
    defaultStyle: { font: "THSarabun" },
  };
  // await pushToBody(res);
  // console.log(body1, body2);

  // pdfMake.createPdf(docDefinition).open({}, win);
}
