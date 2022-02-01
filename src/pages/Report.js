import {
  Box,
  Container,
  makeStyles,
  Paper,
  Tab,
  Tabs,
  Typography,
} from "@material-ui/core";

import React, { useEffect, useState } from "react";
import BlockDailyReport from "../components/report/BlockDailyReport";
import FilterSection from "../components/report/FilterSection";
import FilterSection2 from "../components/report/FilterSection2";
import TableReportDaily from "../components/report/TableReportDaily";
import TableReportTrafficMonthly from "../components/report/TableReportTrafficMonthly";
import BlockTrafficReport from "../components/report/BlockTrafficReport";
import PdfTraffic from "../components/report/PdfTraffic";
import BlockTestPDF from "../components/report/BlockTestPDF";
import TestPDF from "../components/report/TestPDF";
import exportExcel from "../components/report/exportExcel";
import FilterSection3 from "../components/report/FilterSection3";
import TableNumberOfCar from "../components/report/TableNumberOfCar";
import axios from "axios";
import {
  getDataReportBilling,
  getDataReportDisplay,
  getDataReportPayment,
  getDataReportTS,
} from "../service/allService";
import format from "date-fns/format";
import Swal from "sweetalert2";
import TransactionDaily from "../components/report/TransactionDaily";
import TableBillingDaily from "../components/report/TableBillingDaily";
import TableBillingDaily2 from "../components/report/TableBillingDaily2";
import TablePaymentDaily from "../components/report/TablePaymentDaily";
import PdfBillingDaily from "../components/report/PdfBillingDaily";
import PdfPaymentDaily from "../components/report/PdfPaymentDaily";
import BillingTSPdf from "../components/report/BillingTSPdf";
import PaymentTSPdf from "../components/report/PaymentTSPdf";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#f9f9f9",
    paddingTop: 20,
  },
  tabs: {
    flexGrow: 1,
    backgroundColor: "#f9f9f9",
    "& .MuiBox-root": {
      padding: "0px",
    },
  },
  tab: {
    borderRadius: "10px 10px 0px 0px",
    border: "1px solid lightgray",
    borderBottom: "0px",
    backgroundColor: "white",
  },
  inTab: {
    backgroundColor: "white",
    paddingTop: "1rem",
  },
}));

const data1 = [
  {
    id: "1",
    label: "C1",
    sumCar: 15,
    miss: 5,
    except: 4,
    remain: 3,
  },
  {
    id: "2",
    label: "C2",
    sumCar: 20,
    miss: 9,
    except: 0,
    remain: 1,
  },
  {
    id: "3",
    label: "C3",
    sumCar: 5,
    miss: 6,
    except: 1,
    remain: 1,
  },
  {
    id: "4",
    label: "รวมทั้งหมด",
    sumCar: 40,
    miss: 20,
    except: 5,
    remain: 5,
  },
];

export default function Report() {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [dailyTransaction, setDailyTransaction] = useState([]);
  const [dailyBilling, setDailyBilling] = useState([]);
  const [dailyPayment, setDailyPayment] = useState([]);
  const [allTsTable2, setAllTsTable2] = useState("");
  const [allTsTable3, setAllTsTable3] = useState("");
  const [selectedDate, setSelectedDate] = useState(
    new Date().setDate(new Date().getDate() - 1)
  );
  const [checkpoint, setCheckpoint] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const fetchData = async () => {
    Swal.fire({
      title: "Loading",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    const date = format(selectedDate, "yyyy-MM-dd");
    const sendData = {
      date: date,
      checkpoint: checkpoint.toString(),
    };
    const res = await getDataReportDisplay(sendData);

    if (!!res && !!res.data.status) {
      setDailyTransaction(res.data);
    }

    if (!!res && !res.data.status) {
      Swal.fire({
        icon: "error",
        text: "ไม่มีข้อมูล",
      });
      console.log("test");
    }
    if (!!res && res.data.status !== false) {
      Swal.close();
    }

    // console.log(res.data);
  };

  const fetchData2 = async () => {
    Swal.fire({
      title: "Loading",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    const date = format(selectedDate, "yyyy-MM-dd");
    const sendData = {
      date: date,
      checkpoint: checkpoint.toString(),
    };
    const res = await getDataReportBilling(sendData);

    if (!!res && !!res.data.status) {
      setDailyBilling(res.data);
    }
    Swal.close();

    // console.log(res.data);
  };

  const fetchData3 = async () => {
    Swal.fire({
      title: "Loading",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    const date = format(selectedDate, "yyyy-MM-dd");
    const sendData = {
      date: date,
      checkpoint: checkpoint.toString(),
    };
    const res = await getDataReportPayment(sendData);

    if (!!res && !!res.data.status) {
      setDailyPayment(res.data);
    }
    Swal.close();

    // console.log(res.data);
  };

  useEffect(() => {
    // fetchData();
  }, []);

  return (
    <>
      <Container maxWidth="xl" className={classes.root}>
        <Typography
          variant="h6"
          style={{ marginBottom: "1rem", fontSize: "0.9rem" }}
        >
          ตรวจสอบ (DOH) : รายงาน
        </Typography>
        <div className={classes.tabs}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="simple tabs example"
          >
            <Tab
              label="สรปุ TS ประจำวัน"
              {...a11yProps(0)}
              className={classes.tab}
            />
            <Tab
              label="สรุป Billing ประจำวัน"
              {...a11yProps(1)}
              className={classes.tab}
            />
            <Tab
              label="สรุป Payment ประจำวัน"
              {...a11yProps(2)}
              className={classes.tab}
            />
            {/* <Tab
              label="รายงานสรุปจราจร"
              {...a11yProps(3)}
              className={classes.tab}
            /> */}
            {/* <Tab label="testPDF" {...a11yProps(4)} className={classes.tab} /> */}
          </Tabs>

          <TabPanel value={value} index={0}>
            <Container maxWidth="xl" className={classes.inTab}>
              <FilterSection
                onFetchData={fetchData}
                report={TransactionDaily}
                transactionReport={BillingTSPdf}
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                checkpoint={checkpoint}
                setCheckpoint={setCheckpoint}
              />
              <Paper style={{ marginTop: 20 }}>
                <div>
                  <Box>
                    <Typography
                      style={{
                        paddingTop: 20,
                        paddingLeft: 20,
                        fontWeight: 600,
                        fontFamily: "sarabun",
                      }}
                    >
                      {checkpoint === 0
                        ? "ทุกด่าน"
                        : checkpoint === 1
                        ? "ด่านทับช้าง1"
                        : checkpoint === 2
                        ? "ด่านทับช้าง2"
                        : checkpoint === 3
                        ? "ด่านธัญบุรี1"
                        : checkpoint === 4
                        ? "ด่านธัญบุรี2"
                        : ""}
                    </Typography>
                    <Typography
                      style={{
                        paddingLeft: 20,
                        fontWeight: 600,
                        fontFamily: "sarabun",
                      }}
                    >
                      {`เอกสาร สรุป Transaction ประจำวันที่ ${format(
                        selectedDate,
                        "dd/MM/yyyy"
                      )}`}
                    </Typography>
                  </Box>
                </div>
                <div
                  style={{
                    display: "flex",
                    marginTop: 20,
                    justifyContent: "center",
                  }}
                >
                  <div>
                    <TableNumberOfCar dataList={dailyTransaction} />
                  </div>
                  <div>
                    <TableReportDaily dataList={dailyTransaction} />
                  </div>
                  <div>
                    <BlockDailyReport
                      dataList={dailyTransaction}
                      checkpoint={checkpoint}
                    />
                  </div>
                </div>

                {/* <TableReportDaily2 dataList={allTsTable2} /> */}
              </Paper>
            </Container>
          </TabPanel>

          <TabPanel value={value} index={1}>
            <Container maxWidth="xl" className={classes.inTab}>
              <FilterSection
                onFetchData={fetchData2}
                report={PdfBillingDaily}
                transactionReport={BillingTSPdf}
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                checkpoint={checkpoint}
                setCheckpoint={setCheckpoint}
              />
              <Paper style={{ marginTop: 20 }}>
                <div>
                  <Box>
                    <Typography
                      style={{
                        paddingTop: 20,
                        paddingLeft: 20,
                        fontWeight: 600,
                        fontFamily: "sarabun",
                      }}
                    >
                      {checkpoint === 0
                        ? "ทุกด่าน"
                        : checkpoint === 1
                        ? "ด่านทับช้าง1"
                        : checkpoint === 2
                        ? "ด่านทับช้าง2"
                        : checkpoint === 3
                        ? "ด่านธัญบุรี1"
                        : checkpoint === 4
                        ? "ด่านธัญบุรี2"
                        : ""}
                    </Typography>
                    <Typography
                      style={{
                        paddingLeft: 20,
                        fontWeight: 600,
                        fontFamily: "sarabun",
                      }}
                    >
                      {`เอกสาร สรุป Billing ประจำวันที่ ${format(
                        selectedDate,
                        "dd/MM/yyyy"
                      )}`}
                    </Typography>
                  </Box>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: 20,
                  }}
                >
                  <div>
                    <TableBillingDaily dataList={dailyBilling} />
                  </div>
                  <div>
                    <TableBillingDaily2 dataList={dailyBilling} />
                  </div>
                </div>
                {/* <TableReportSumMonthly dataList={allTsTable3} /> */}
              </Paper>
            </Container>
          </TabPanel>

          <TabPanel value={value} index={2}>
            <Container maxWidth="xl" className={classes.inTab}>
              <FilterSection
                onFetchData={fetchData3}
                report={PdfPaymentDaily}
                transactionReport={PaymentTSPdf}
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                checkpoint={checkpoint}
                setCheckpoint={setCheckpoint}
              />
              <Paper style={{ marginTop: 20 }}>
                <div>
                  <Box>
                    <Typography
                      style={{
                        paddingTop: 20,
                        paddingLeft: 20,
                        fontWeight: 600,
                        fontFamily: "sarabun",
                      }}
                    >
                      {checkpoint === 0
                        ? "ทุกด่าน"
                        : checkpoint === 1
                        ? "ด่านทับช้าง1"
                        : checkpoint === 2
                        ? "ด่านทับช้าง2"
                        : checkpoint === 3
                        ? "ด่านธัญบุรี1"
                        : checkpoint === 4
                        ? "ด่านธัญบุรี2"
                        : ""}
                    </Typography>
                    <Typography
                      style={{
                        paddingLeft: 20,
                        fontWeight: 600,
                        fontFamily: "sarabun",
                      }}
                    >
                      {`เอกสาร สรุป Payment ประจำวันที่ ${format(
                        selectedDate,
                        "dd/MM/yyyy"
                      )}`}
                    </Typography>
                  </Box>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: 20,
                  }}
                >
                  <div>
                    <TablePaymentDaily dataList={dailyPayment} />
                  </div>
                </div>

                {/* <TableReportRemainMonthly dataList={allTsTable3} /> */}
              </Paper>
            </Container>
          </TabPanel>
          <TabPanel value={value} index={3}>
            <Container maxWidth="xl" className={classes.inTab}>
              <FilterSection2 onFetchData={fetchData} report={PdfTraffic} />
              <Paper style={{ marginTop: 20 }}>
                <Typography
                  style={{
                    paddingTop: 20,
                    paddingLeft: 20,
                    fontWeight: 600,
                    fontFamily: "sarabun",
                  }}
                >
                  ทับช้าง1
                </Typography>
                <Typography
                  style={{
                    paddingLeft: 20,
                    fontWeight: 600,
                    fontFamily: "sarabun",
                  }}
                >
                  เอกสาร ตรวจสอบความถูกต้องของการตรวจสอบรายได้ประจำเดือน
                </Typography>

                <BlockTrafficReport />

                <TableReportTrafficMonthly dataList={allTsTable3} />
              </Paper>
            </Container>
          </TabPanel>
          <TabPanel value={value} index={4}>
            <Container maxWidth="xl" className={classes.inTab}>
              <FilterSection3
                onFetchData={fetchData}
                report={TestPDF}
                exportExcel={exportExcel}
              />
              <Paper style={{ marginTop: 20 }}>
                <Typography
                  style={{
                    paddingTop: 20,
                    paddingLeft: 20,
                    fontWeight: 600,
                    fontFamily: "sarabun",
                  }}
                >
                  ทับช้าง1
                </Typography>
                <Typography
                  style={{
                    paddingLeft: 20,
                    fontWeight: 600,
                    fontFamily: "sarabun",
                  }}
                >
                  เอกสาร ตรวจสอบความถูกต้องของการตรวจสอบรายได้ประจำเดือน
                </Typography>

                <BlockTestPDF />

                {/* <TableReportTrafficMonthly dataList={allTsTable3} /> */}
              </Paper>
            </Container>
          </TabPanel>
        </div>
      </Container>
    </>
  );
}
