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

export default async function TransactionDaily(selectedDate, checkpoint) {
  // let win = window.open("", "_blank");
  const date = format(new Date(), "dd MMMM yyyy");
  const getDate = !!selectedDate ? format(selectedDate, "yyyy-MM-dd") : "";
  const ck = checkpoint;
  console.log(getDate, ck);
  const url = "http://1d32-45-117-208-162.ap.ngrok.io/audit/api/v1/display-ts";
  let sendData = { date: getDate, checkpoint: ck.toString() };

  let body1 = [
    [
      {
        text: "ประเภทรถ",
        rowSpan: 2,
        border: [true, true, true, true],
        margin: [0, 5, 0, 0],
      },
      { text: "จำนวนรถทั้งหมด", border: [true, true, true, false] },
      {
        text: "จำนวนรถที่ผิดพลาด",
        border: [true, true, true, false],
      },
      { text: "รถยกเว้น", border: [true, true, true, false] },
      { text: "รถที่คงค้าง", border: [true, true, true, false] },
    ],
    [
      {},
      {
        text: "(คัน)",
        border: [true, false, true, true],
        margin: [0, -5, 0, 0],
      },
      {
        text: "(คัน)",
        border: [true, false, true, true],
        margin: [0, -5, 0, 0],
      },
      {
        text: "(คัน)",
        border: [true, false, true, true],
        margin: [0, -5, 0, 0],
      },
      {
        text: "(คัน)",
        border: [true, false, true, true],
        margin: [0, -5, 0, 0],
      },
    ],
  ];

  const pushToBody1 = (res) => {
    return new Promise((resolve, reject) => {
      try {
        for (let index = 1; index < res.length; index++) {
          body1.push([
            !!res[index].class ? `C${res[index].class}` : "-",
            !!res[index].count ? res[index].count.toLocaleString() : "-",
            !!res[index].normal ? res[index].normal.toLocaleString() : "-",
            !!res[index].reject ? res[index].reject.toLocaleString() : "-",
            !!res[index].illegal ? res[index].illegal.toLocaleString() : "-",
          ]);
          resolve();
        }
      } catch (err) {
        reject(err);
      }
    });
  };

  Swal.fire({
    title: `กำลังสร้างรายงาน`,
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading();
      return axios.post(url, sendData).then(async (res) => {
        pushToBody1(res.data.result_hq);

        // setTimeout(async () => {
        //   await pdfGenDownload(docDefinition);
        //   Swal.close();
        // }, 1000);
        console.log(body1);
      });
    },
  });

  const pdfGenDownload = (docDefinition) => {
    return new Promise((resolve, reject) => {
      try {
        console.log("generate");
        pdfMake
          .createPdf(docDefinition)
          .download("รายงานสรุปTrasactionประจำวัน.pdf", () => {
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
      { text: `${date}`, alignment: "center", fontSize: 14 },
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
        text: "เอกสาร ตรวจสอบความถูกต้องของการตรวจรายได้ประจำวัน",
        fontSize: 14,
      },
      {
        margin: [55, 20, 0, 0],
        fontSize: 11,
        style: "table",
        table: {
          widths: [70, 70, 70, 70, 70],
          body: body1,
          // [
          //   [
          //     { text: `C${res.data.result_hq[0].class}` },
          //     { text: res.data.result_hq[0].count.toLocaleString() },
          //     { text: res.data.result_hq[0].normal.toLocaleString() },
          //     { text: res.data.result_hq[0].reject.toLocaleString() },
          //     { text: res.data.result_hq[0].illegal.toLocaleString() },
          //   ],
          //   [
          //     { text: `C${res.data.result_hq[1].class}` },
          //     { text: res.data.result_hq[1].count.toLocaleString() },
          //     { text: res.data.result_hq[1].normal.toLocaleString() },
          //     { text: res.data.result_hq[1].reject.toLocaleString() },
          //     { text: res.data.result_hq[1].illegal.toLocaleString() },
          //   ],
          //   [
          //     { text: `C${res.data.result_hq[2].class}` },
          //     { text: res.data.result_hq[2].count.toLocaleString() },
          //     { text: res.data.result_hq[2].normal.toLocaleString() },
          //     { text: res.data.result_hq[2].reject.toLocaleString() },
          //     { text: res.data.result_hq[2].illegal.toLocaleString() },
          //   ],
          //   [
          //     { text: `รวมทั้งหมด` },
          //     {
          //       text: res.data.result_hq[
          //         res.data.result_hq.length - 1
          //       ].count.toLocaleString(),
          //     },
          //     {
          //       text: res.data.result_hq[
          //         res.data.result_hq.length - 1
          //       ].normal.toLocaleString(),
          //     },
          //     {
          //       text: res.data.result_hq[
          //         res.data.result_hq.length - 1
          //       ].reject.toLocaleString(),
          //     },
          //     {
          //       text: res.data.result_hq[
          //         res.data.result_hq.length - 1
          //       ].illegal.toLocaleString(),
          //     },
          //   ],
          // ],
        },
      },
      {
        columns: [
          {
            fontSize: 11,
            style: "table",
            margin: [54, 20, 0, 450],
            table: {
              widths: [90, 90],
              body: [
                [
                  {
                    text: "ประเภทรถ",
                    rowSpan: 2,
                    margin: [0, 5, 0, 0],
                  },
                  {
                    text: "จำนวนรถทั้งหมด",
                    border: [true, true, true, false],
                  },
                ],
                [
                  {},
                  {
                    text: "(คัน)",
                    border: [true, false, true, true],
                    margin: [0, -5, 0, 0],
                  },
                ],
                // [
                //   { text: `C${res.data.result_hq[0].class}` },
                //   { text: res.data.result_hq[0].count.toLocaleString() },
                // ],
                // [
                //   { text: `C${res.data.result_hq[1].class}` },
                //   { text: res.data.result_hq[1].count.toLocaleString() },
                // ],
                // [
                //   { text: `C${res.data.result_hq[2].class}` },
                //   { text: res.data.result_hq[2].count.toLocaleString() },
                // ],
                // [
                //   { text: `รวมทั้งหมด` },
                //   {
                //     text: res.data.result_hq[
                //       res.data.result_hq.length - 1
                //     ].count.toLocaleString(),
                //   },
                // ],
              ],
            },
          },
          {
            fontSize: 11,
            style: "table",
            // margin: [35, 20, 0, 450],
            table: {
              widths: [60, 60, 45],
              body: [
                [
                  {
                    text: `รายได้ด่าน${
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
                    }`,
                    border: [true, true, true, false],
                    colSpan: 3,
                    bold: true,
                  },
                  {},
                  {},
                ],
                // [
                //   {
                //     text: "รายได้ที่พึงได้",
                //     border: [true, false, false, false],
                //     alignment: "left",
                //   },
                //   {
                //     text: res.data.result_revenue[0].revenue.toLocaleString(),
                //     border: [false, false, false, false],
                //     alignment: "right",
                //   },
                //   {
                //     text: "บาท",
                //     border: [false, false, true, false],
                //   },
                // ],
                // [
                //   {
                //     text: "รายได้ที่พึงได้ (HQ)",
                //     border: [true, false, false, true],
                //     alignment: "left",
                //     margin: [0, 0, 0, 52],
                //   },
                //   {
                //     text: res.data.result_revenue[0].revenue_mFlow.toLocaleString(),
                //     alignment: "right",
                //     border: [false, false, false, true],
                //     margin: [0, 0, 0, 52],
                //   },
                //   {
                //     text: "บาท",
                //     border: [false, false, true, true],
                //     margin: [0, 0, 0, 52],
                //   },
                // ],
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
