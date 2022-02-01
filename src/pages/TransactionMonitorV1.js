import {
  Box,
  Container,
  Grid,
  makeStyles,
  Paper,
  Tab,
  Tabs,
  Typography,
} from "@material-ui/core";
import { format } from "date-fns";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import FilterSectionMonitorPage from "../components/FilterSectionMonitorPage";
import ImageSectionMonitorPage from "../components/ImageSectionMonitorPage";
import TableSectionMonitorPage from "../components/TableSectionMonitorPage";
import axios from "axios";
import TableAWMonitorPage from "../components/TableAWMonitorPage";
import ImageAWMonitorPage from "../components/ImageAWMonitorPage";
import FilterAWMonitorPage from "../components/FilterAWMonitorPage";
import FilterSectionSearch from "../components/FilterSectionSearch";
import ImageSearchAudit from "../components/ImageSearchAudit";
import MatchTable from "../components/MatchTable";
import TableBillingMonitorPage from "../components/TableBillingMonitorV1";
import TableFETC from "../components/TableFETC";
import {
  getDataFullAudit,
  getDataHQ,
  getDataLane,
  getImageFullAudit,
  getImageHQ,
  getImageLane,
} from "../service/allService";
import Swal from "sweetalert2";

const apiURL = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? `${process.env.REACT_APP_BASE_URL_PROD_V1}`
      : `${process.env.REACT_APP_BASE_URL_V1}`,
});

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

const useStyles = makeStyles((theme) => {
  return {};
});

export default function TransactionMonitorV1() {
  const classes = useStyles;

  const [value, setValue] = useState(0);
  const [dropdown, setDropdown] = useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [dataAudit, setDataAudit] = useState({
    date: new Date().setDate(new Date().getDate() - 1),
    checkpointList: [],
    checkpointValue: "0",
    imageCrop: 0,
    imageFull: 0,
    tableHeaderData: [
      { id: "0", label: "No." },
      { id: "1", label: "trg_id" },
      { id: "3", label: "ts_timestamp" },
      { id: "2", label: "em_record_ts" },
    ],
    tableBodyData: [],
    gateValue: "0",
    gateList: [],
  });

  const [dataAW, setDataAW] = useState({
    date: new Date().setDate(new Date().getDate() - 1),
    checkpointList: [],
    checkpointValue: "0",
    imageCrop: 0,
    imageFull: 0,
    tableHeaderData: [
      { id: "0", label: "No." },
      { id: "1", label: "transactionId" },
      { id: "2", label: "refTransactionId" },
      { id: "3", label: "เวลาเข้าด่าน" },
      { id: "4", label: "เวลามาถึง" },
    ],

    tableBodyData: [],
    gateValue: "0",
    gateList: [],
  });

  const [dataFetc, setDataFETC] = useState({
    date: new Date().setDate(new Date().getDate() - 1),
    checkpointList: [],
    checkpointValue: "0",
    imageCrop: 0,
    imageFull: 0,
    tableHeaderData: [
      { id: "0", label: "No." },
      { id: "1", label: "transactionId" },
      { id: "2", label: "เวลาเข้าด่าน" },
      { id: "3", label: "เวลามาถึง" },
    ],
    tableBodyData: [],
    gateValue: "0",
    gateList: [],
  });

  const [dataBilling, setDataBilling] = useState({
    date: new Date().setDate(new Date().getDate() - 1),
    checkpointList: [],
    checkpointValue: 0,
    tableHeaderBilling: [
      { id: "0", label: "No." },
      { id: "1", label: "transactionId" },
      { id: "2", label: "เวลาเข้าด่าน" },
      { id: "3", label: "ค่าผ่านทาง" },
      { id: "4", label: "ค่าปรับ" },
      { id: "5", label: "ค้างจ่าย" },
      { id: "6", label: "รวม" },
      { id: "7", label: "เวลามาถึง" },
    ],
    tableBodyData: [],
    gateValue: 0,
    gateList: [],
  });

  const [auditSearch, setAuditSearch] = useState({
    date: new Date().setDate(new Date().getDate() - 1),
    transactionId: "",
    imageCrop: 0,
    imageFull: 0,
  });
  const [awSearch, setAwSearch] = useState({
    date: new Date().setDate(new Date().getDate() - 1),
    transactionId: "",
    imageCrop: 0,
    imageFull: 0,
  });
  const [fetcSearch, setFetcSearch] = useState({
    date: new Date().setDate(new Date().getDate() - 1),
    transactionId: "",
    imageCrop: 0,
    imageFull: 0,
  });

  const [matchTab, setMatchTab] = useState({
    date: new Date().setDate(new Date().getDate() - 1),
    checkpointList: [],
    checkpointValue: 0,
    auditImageCrop: 0,
    auditImageFull: 0,
    awImageCrop: 0,
    awImageFull: 0,
    tableHeaderData: [
      { id: "0", label: "No." },
      { id: "1", label: "transactionId" },
      { id: "2", label: "timestamp" },
    ],
    tableBodyData: [],
    gateValue: 0,
    gateList: [],
    allTsTable: [],
  });

  const [pagination1, setPagination1] = useState({
    page: 1,
    countPage: 1,
  });
  const [pagination2, setPagination2] = useState({
    page: 1,
    countPage: 1,
  });
  const [pagination3, setPagination3] = useState({
    page: 1,
    countPage: 1,
  });
  const [paginationMatchTab, setPaginationMatchTab] = useState({
    page: 1,
    countPage: 1,
  });
  const [paginationBilling, setPaginationBilling] = useState({
    page: 1,
    countPage: 1,
  });

  const getDropdown = () => {
    apiURL.post("/dropdown").then((res) => {
      console.log(res.data);
      setDropdown(res.data);
    });
  };

  const filter = async (pageId = 1, selectDate, checkpoint, gate) => {
    if (pageId === 1) {
      setPagination1({ ...pagination1, page: 1 });
    } else {
      setPagination1({ ...pagination1, page: pageId });
    }
    Swal.fire({
      title: "Loading",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    const date = format(selectDate, "yyyy-MM-dd");
    const sendData = {
      page: pageId.toString(),
      date: date,
      checkpoint: checkpoint.toString(),
      gate: gate.toString(),
    };
    console.log(`sendData:${JSON.stringify(sendData)}`);

    const res = await getDataFullAudit(sendData);
    if (!!res) {
      setDataAudit({
        ...dataAudit,
        checkpointList: res.data.dropdown_Checkpoint,
        gateList: res.data.dropdown_Gate,
        tableBodyData: res.data,
      });
      setPagination1({
        countPage: res.data.totalPages,
        page: res.data.currentPage,
      });
      Swal.close();
    }
    if (!!res && !res.data.status) {
      Swal.fire({
        icon: "error",
        text: "ไม่มีข้อมูล",
      });
    }
    if (!!res && res.data.status !== false) {
      Swal.close();
    }
  };

  const filter2 = async (pageId = 1, selectDate, checkpoint, gate) => {
    if (pageId === 1) {
      setPagination2({ ...pagination2, page: 1 });
    } else {
      setPagination2({ ...pagination2, page: pageId });
    }

    Swal.fire({
      title: "Loading",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    const date = format(selectDate, "yyyy-MM-dd");

    const sendData = {
      page: pageId,
      date: date,
      checkpoint_id: checkpoint.toString(),
      gate_id: gate.toString(),
    };
    console.log(`sendData:${JSON.stringify(sendData)}`);

    const res = await getDataHQ(sendData);
    if (!!res) {
      setDataAW({
        ...dataAW,
        checkpointList: dataAW.checkpointList,
        gateList: dataAW.gateList,
        tableBodyData: res.data,
      });
      setPagination2({
        countPage: res.data.totalPages,
        page: res.data.currentPage,
      });
      Swal.close();
    }

    if (!!res && !res.data.status) {
      Swal.fire({
        icon: "error",
        text: "ไม่มีข้อมูล",
      });
    }
    if (!!res && res.data.status !== false) {
      Swal.close();
    }
  };

  const filter3 = async (pageId = 1, selectDate, checkpoint, gate) => {
    if (pageId === 1) {
      setPagination3({ ...pagination3, page: 1 });
    } else {
      setPagination3({ ...pagination3, page: pageId });
    }

    Swal.fire({
      title: "Loading",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    const date = format(selectDate, "yyyy-MM-dd");

    const sendData = {
      page: pageId,
      date: date,
      checkpoint_id: checkpoint.toString(),
      gate_id: gate.toString(),
    };
    console.log(`sendData:${JSON.stringify(sendData)}`);

    const res = await getDataLane(sendData);
    if (!!res) {
      setDataFETC({
        ...dataFetc,
        checkpointList: res.data.dropdown_Checkpoint,
        gateList: res.data.dropdown_Gate,
        tableBodyData: res.data,
      });

      setPagination3({
        countPage: res.data.totalPages,
        page: res.data.currentPage,
      });
    }
    Swal.close();
    if (!!res && !res.data.status) {
      Swal.fire({
        icon: "error",
        text: "ไม่มีข้อมูล",
      });
    }
    if (!!res && res.data.status !== false) {
      Swal.close();
    }
  };

  const filterMatchTab = (pageId = 1, selectDate, checkpoint, gate) => {
    if (pageId === 1) {
      setPaginationMatchTab({ ...paginationMatchTab, page: 1 });
    } else {
      setPaginationMatchTab({ ...paginationMatchTab, page: pageId });
    }

    const date = format(selectDate, "yyyy-MM-dd");
    const sendData = {
      page: pageId.toString(),
      date: date,
      checkpoint_id: checkpoint.toString(),
      gate_id: gate.toString(),
    };
    console.log(`sendData:${JSON.stringify(sendData)}`);

    apiURL.post("/match-data-monitor", sendData).then((res) => {
      setMatchTab({
        ...matchTab,
        checkpointList: res.data.dropdown_Checkpoint,
        gateList: res.data.dropdown_Gate,
        tableBodyData: res.data,
      });
      setPaginationMatchTab({
        countPage: res.data.currentCount,
        page: res.data.currentPage,
      });
    });
  };

  const filterBilling = (pageId = 1, selectDate, checkpoint, gate) => {
    console.log(pageId);
    if (pageId === 1) {
      setPaginationBilling({ ...paginationBilling, page: 1 });
    } else {
      setPaginationBilling({ ...paginationBilling, page: pageId });
    }

    const date = format(selectDate, "yyyy-MM-dd");
    const sendData = {
      page: pageId.toString(),
      date: date,
      checkpoint_id: checkpoint.toString(),
      gate_id: gate.toString(),
    };
    console.log(`sendData:${JSON.stringify(sendData)}`);

    apiURL.post("/billing-monitor", sendData).then((res) => {
      console.log(res.data.total_page);
      console.log(res.data.currentPage);
      setDataBilling({
        ...dataBilling,
        checkpointList: dataBilling.checkpointList,
        gateList: dataBilling.gateList,
        tableBodyData: res.data,
      });
      setPaginationBilling({
        countPage: res.data.total_page,
        page: parseInt(res.data.currentPage),
      });
    });
  };

  const pageOnChange1 = (e, value) => {
    const sendData = {
      value: value,
      date: format(dataAudit.date, "yyyy-MM-dd"),
      checkpoint: dataAudit.checkpointValue,
      gate: dataAudit.gateValue,
    };
    console.log(sendData);
    filter(
      value,
      dataAudit.date,
      dataAudit.checkpointValue,
      dataAudit.gateValue
    );

    console.log(`${pagination1.page}`);
  };

  const pageOnChange2 = (e, value) => {
    setPagination2({ page: value });
    filter2(value, dataAW.date, dataAW.checkpointValue, dataAW.gateValue);

    console.log(`${pagination2.page}`);
  };

  const pageOnChange3 = (e, value) => {
    setPagination3({ page: value });
    filter3(value, dataFetc.date, dataFetc.checkpointValue, dataFetc.gateValue);

    console.log(`${pagination3.page}`);
  };
  const pageOnChangeMatchTab = (e, value) => {
    setPaginationMatchTab({ page: value });
    filterMatchTab(
      value,
      matchTab.date,
      matchTab.checkpointValue,
      matchTab.gateValue
    );

    console.log(`${paginationMatchTab.page}`);
  };

  const pageOnChangeBilling = (e, value) => {
    console.log(value);
    setPaginationBilling({ page: value });
    filterBilling(
      value,
      dataBilling.date,
      dataBilling.checkpointValue,
      dataBilling.gateValue
    );

    console.log(`${paginationBilling.page}`);
  };

  const getImage1 = async (item) => {
    const date = item.em_record_ts.split(" ").shift();
    const sendData = {
      id: item.id.toString(),
      date: date,
    };

    Swal.fire({
      title: "Loading",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    const res = await getImageFullAudit(sendData);
    if (!!res) {
      setDataAudit({
        ...dataAudit,
        imageCrop: res.data.imgBW,
        imageFull: res.data.imgRGB,
      });
      Swal.close();
    }
    if (!!res && res.data.imgBW === 0 && res.data.imgRGB === 0) {
      Swal.fire({
        icon: "error",
        text: "ไม่พบรูป",
      });
    }
    if (!!res && !res.data.status) {
      Swal.fire({
        icon: "error",
        text: "ไม่มีข้อมูล",
      });
    }
    // if (!!res && res.data.status !== false) {
    //   Swal.close();
    // }
  };
  const getImage2 = async (item) => {
    const date = item.cameras_cameraTimestamp.split(" ").shift().split("/");
    const date2 = `${date[2]}-${date[1]}-${date[0]}`;
    const sendData = {
      headerTransactionId: item.headerTransactionId,
      date: date2,
    };
    Swal.fire({
      title: "Loading",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    const res = await getImageHQ(sendData);
    if (!!res) {
      setDataAW({
        ...dataAW,
        imageCrop: res.data.imageFileCrop,
        imageFull: res.data.imageFile,
      });
      Swal.close();
    }
    if (!!res && res.data.imageFile === 0 && res.data.imageFileCrop === 0) {
      Swal.fire({
        icon: "error",
        text: "ไม่พบรูป",
      });
    }

    if (!!res && !res.data.status) {
      Swal.fire({
        icon: "error",
        text: "ไม่มีข้อมูล",
      });
    }
  };
  const getImage3 = async (item) => {
    const sendData = {
      tranId: item.tranId,
      date: format(dataFetc.date, "yyyy-MM-dd"),
    };

    Swal.fire({
      title: "Loading",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    const res = await getImageLane(sendData);
    if (!!res) {
      setDataFETC({
        ...dataFetc,
        imageCrop: res.data.mf_lane_picFull,
        imageFull: res.data.mf_lane_picCrop,
      });
      Swal.close();
    }
    if (
      !!res &&
      res.data.mf_lane_picCrop === 0 &&
      res.data.mf_lane_picFull === 0
    ) {
      Swal.fire({
        icon: "error",
        text: "ไม่พบรูป",
      });
    }
    if (!!res && !res.data.status) {
      Swal.fire({
        icon: "error",
        text: "ไม่มีข้อมูล",
      });
    }
  };

  const MatchTabGetImage = (
    audit_transactionId,
    pk3_transactionId_header,
    page
  ) => {
    const date = format(matchTab.date, "yyyy-MM-dd");
    setMatchTab({
      ...matchTab,
      auditImageCrop: 0,
      auditImageFull: 0,
      awImageCrop: 0,
      awImageFull: 0,
    });
    const sendData = {
      page: 1,
      date: date,
      audit_transactionId: audit_transactionId,
      pk3_transactionId_header: pk3_transactionId_header,
    };
    console.log(audit_transactionId, pk3_transactionId_header, page);
    apiURL.post("/match-data-monitor-activity", sendData).then((res) => {
      setMatchTab({
        ...matchTab,
        auditImageCrop: res.data.imageCrop,
        auditImageFull: res.data.imageFull,
        awImageCrop: res.data.awImageCrop,
        awImageFull: res.data.awImageFull,
      });
    });
  };

  const search = (selectDate, transactionId) => {
    const date = format(selectDate, "yyyy-MM-dd");
    const sendData = {
      date: date,
      audit_transactionId: transactionId,
    };
    apiURL.post("/audit-transaction-monitor-activity", sendData).then((res) => {
      console.log(res.data);
      setAuditSearch({
        ...auditSearch,
        imageCrop: res.data.imageCrop,
        imageFull: res.data.imageFull,
      });
    });
  };
  const search2 = (selectDate, transactionId) => {
    const date = format(selectDate, "yyyy-MM-dd");
    const sendData = {
      date: date,
      headerTransactionId: transactionId,
    };
    apiURL.post("/hq-transaction-monitor-activity", sendData).then((res) => {
      console.log(res.data);
      setAwSearch({
        ...awSearch,
        imageCrop: res.data.imageFile,
        imageFull: res.data.imageFileCrop,
      });
    });
  };
  const search3 = (selectDate, transactionId) => {
    const date = format(selectDate, "yyyy-MM-dd");
    const sendData = {
      date: date,
      tranId: transactionId,
    };
    apiURL.post("/lane-transaction-monitor-activity", sendData).then((res) => {
      console.log(res.data);
      setFetcSearch({
        ...fetcSearch,
        imageCrop: res.data.mf_lane_picCrop,
        imageFull: res.data.mf_lane_picFull,
      });
    });
  };

  useEffect(() => {
    getDropdown();
  }, []);
  return (
    <>
      <Container maxWidth>
        <Typography>transaction monitor</Typography>

        <div className={classes.tabs}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="simple tabs example"
          >
            <Tab label="Monitor" {...a11yProps(0)} className={classes.tab} />
            <Tab label="Search" {...a11yProps(1)} className={classes.tab} />
            <Tab label="Match" {...a11yProps(2)} className={classes.tab} />
            <Tab
              label="Billing Monitor"
              {...a11yProps(3)}
              className={classes.tab}
            />
          </Tabs>

          {/* audit block */}
          <TabPanel value={value} index={0}>
            <Grid
              container
              spacing={2}
              component={Paper}
              style={{ marginTop: 10 }}
            >
              <Grid item xl={4} lg={6} md={12} sm={12} xs={12}>
                <Typography variant="h6" align="center">
                  Full Audit
                </Typography>
                <FilterSectionMonitorPage
                  dateValue={dataAudit.date}
                  dateOnChange={(date) => {
                    setDataAudit({
                      ...dataAudit,
                      date: date,
                    });
                    console.log("dateChange :", dataAudit.date);
                  }}
                  checkpointValue={dataAudit.checkpointValue}
                  checkpointList={dropdown.checkpoint}
                  checkpointOnChange={(e) => {
                    setDataAudit({
                      ...dataAudit,
                      checkpointValue: e.target.value,
                    });
                  }}
                  gateValue={dataAudit.gateValue}
                  gateList={dropdown.gate}
                  gateOnChange={(e) => {
                    setDataAudit({ ...dataAudit, gateValue: e.target.value });
                  }}
                  buttonOnClick={() => {
                    filter(
                      1,
                      dataAudit.date,
                      dataAudit.checkpointValue,
                      dataAudit.gateValue
                    );
                  }}
                  color={"red"}
                />
                <ImageSectionMonitorPage
                  imageCrop={dataAudit.imageCrop}
                  imageFull={dataAudit.imageFull}
                />
                <TableSectionMonitorPage
                  header={dataAudit.tableHeaderData}
                  body={dataAudit.tableBodyData}
                  tableOnClick={getImage1}
                  countPage={pagination1.countPage}
                  page={pagination1.page}
                  pageOnChange={pageOnChange1}
                  // style={?inActiveAudit:activeAudit}
                  color={"red"}
                  onFetchData={filter}
                  selectedDate={dataAudit.date}
                  checkpoint={dataAudit.checkpointValue}
                  gate={dataAudit.gateValue}
                />
              </Grid>

              {/* transaction block */}
              <Grid item xl={4} lg={6} md={12} sm={12} xs={12}>
                <Typography variant="h6" align="center">
                  HQ Transaction
                </Typography>
                <FilterAWMonitorPage
                  dateValue={dataAW.date}
                  dateOnChange={(date) => {
                    setDataAW({
                      ...dataAW,
                      date: date,
                    });
                    console.log("dateChange :", dataAW.date);
                  }}
                  checkpointValue={dataAW.checkpointValue}
                  checkpointList={dropdown.checkpoint}
                  checkpointOnChange={(e) => {
                    setDataAW({ ...dataAW, checkpointValue: e.target.value });
                  }}
                  gateValue={dataAW.gateValue}
                  gateList={dropdown.gate}
                  gateOnChange={(e) => {
                    setDataAW({ ...dataAW, gateValue: e.target.value });
                  }}
                  buttonOnClick={() => {
                    filter2(
                      1,
                      dataAW.date,
                      dataAW.checkpointValue,
                      dataAW.gateValue
                    );
                  }}
                  color={"green"}
                />
                <ImageAWMonitorPage
                  imageCrop={dataAW.imageCrop}
                  imageFull={dataAW.imageFull}
                />
                <TableAWMonitorPage
                  header={dataAW.tableHeaderData}
                  body={dataAW.tableBodyData}
                  tableOnClick={(item) => {
                    getImage2(item);
                  }}
                  countPage={pagination2.countPage}
                  page={pagination2.page}
                  pageOnChange={pageOnChange2}
                  color={"green"}
                  onFetchData={filter2}
                  selectedDate={dataAW.date}
                  checkpoint={dataAW.checkpointValue}
                  gate={dataAW.gateValue}
                />
              </Grid>

              {/* lane block */}
              <Grid item xl={4} lg={6} md={12} sm={12} xs={12}>
                <Typography variant="h6" align="center">
                  Lane Transaction
                </Typography>
                <FilterSectionMonitorPage
                  dateValue={dataFetc.date}
                  dateOnChange={(date) => {
                    setDataFETC({
                      ...dataFetc,
                      date: date,
                    });
                    console.log("dateChange :", dataFetc.date);
                  }}
                  checkpointValue={dataFetc.checkpointValue}
                  checkpointList={dropdown.checkpoint}
                  checkpointOnChange={(e) => {
                    setDataFETC({
                      ...dataFetc,
                      checkpointValue: e.target.value,
                    });
                  }}
                  gateValue={dataFetc.gateValue}
                  gateList={dropdown.gate}
                  gateOnChange={(e) => {
                    setDataFETC({ ...dataFetc, gateValue: e.target.value });
                  }}
                  buttonOnClick={() => {
                    filter3(
                      1,
                      dataFetc.date,
                      dataFetc.checkpointValue,
                      dataFetc.gateValue
                    );
                  }}
                  color={"blue"}
                />
                <ImageSectionMonitorPage
                  imageCrop={dataFetc.imageCrop}
                  imageFull={dataFetc.imageFull}
                />
                <TableFETC
                  header={dataFetc.tableHeaderData}
                  body={dataFetc.tableBodyData}
                  tableOnClick={(item) => {
                    getImage3(item);
                  }}
                  countPage={pagination3.countPage}
                  page={pagination3.page}
                  pageOnChange={pageOnChange3}
                  color={"blue"}
                  onFetchData={filter3}
                  selectedDate={dataFetc.date}
                  checkpoint={dataFetc.checkpointValue}
                  gate={dataFetc.gateValue}
                />
              </Grid>
            </Grid>
          </TabPanel>

          {/* Search Tab */}
          <TabPanel value={value} index={1}>
            <Grid
              container
              spacing={2}
              component={Paper}
              style={{ marginTop: 10 }}
            >
              {/* audit block */}
              <Grid item xl={4} lg={6} md={12} sm={12} xs={12}>
                <Typography variant="h6" align="center">
                  audit sensor
                </Typography>
                <FilterSectionSearch
                  dateValue={auditSearch.date}
                  dateOnChange={(date) => {
                    setAuditSearch({
                      ...auditSearch,
                      date: date,
                    });
                    console.log("dateChange :", auditSearch.date);
                  }}
                  transactionValue={auditSearch.transactionId}
                  transactionOnChange={(e) => {
                    setAuditSearch({
                      ...auditSearch,
                      transactionId: e.target.value,
                    });
                  }}
                  buttonOnClick={() => {
                    search(auditSearch.date, auditSearch.transactionId);
                  }}
                  color={"red"}
                />
                <ImageSearchAudit
                  imageCrop={auditSearch.imageCrop}
                  imageFull={auditSearch.imageFull}
                />
              </Grid>

              {/* transaction block */}
              <Grid item xl={4} lg={6} md={12} sm={12} xs={12}>
                <Typography variant="h6" align="center">
                  transaction
                </Typography>
                <FilterSectionSearch
                  dateValue={awSearch.date}
                  dateOnChange={(date) => {
                    setAwSearch({
                      ...awSearch,
                      date: date,
                    });
                    console.log("dateChange :", awSearch.date);
                  }}
                  transactionValue={awSearch.transactionId}
                  transactionOnChange={(e) => {
                    setAwSearch({ ...awSearch, transactionId: e.target.value });
                  }}
                  buttonOnClick={() => {
                    search2(awSearch.date, awSearch.transactionId);
                  }}
                  color={"green"}
                />
                <ImageAWMonitorPage
                  imageCrop={awSearch.imageCrop}
                  imageFull={awSearch.imageFull}
                />
              </Grid>

              {/* lane block */}
              <Grid item xl={4} lg={6} md={12} sm={12} xs={12}>
                <Typography variant="h6" align="center">
                  lane (FETC)
                </Typography>
                <FilterSectionSearch
                  dateValue={fetcSearch.date}
                  dateOnChange={(date) => {
                    setFetcSearch({
                      ...fetcSearch,
                      date: date,
                    });
                    console.log("dateChange :", fetcSearch.date);
                  }}
                  transactionValue={fetcSearch.transactionId}
                  transactionOnChange={(e) => {
                    setFetcSearch({
                      ...fetcSearch,
                      transactionId: e.target.value,
                    });
                  }}
                  buttonOnClick={() => {
                    search3(fetcSearch.date, fetcSearch.transactionId);
                  }}
                  color={"blue"}
                />
                <ImageSectionMonitorPage
                  imageCrop={fetcSearch.imageCrop}
                  imageFull={fetcSearch.imageFull}
                />
              </Grid>
            </Grid>
          </TabPanel>

          {/* Match Tab */}
          <TabPanel value={value} index={2}>
            <Grid
              container
              spacing={2}
              component={Paper}
              style={{ marginTop: 10 }}
            >
              <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                <FilterSectionMonitorPage
                  dateValue={matchTab.date}
                  dateOnChange={(date) => {
                    setMatchTab({
                      ...matchTab,
                      date: date,
                    });
                    console.log("dateChange :", matchTab.date);
                  }}
                  checkpointValue={matchTab.checkpointValue}
                  checkpointList={dropdown.checkpoint}
                  checkpointOnChange={(e) => {
                    setMatchTab({
                      ...matchTab,
                      checkpointValue: e.target.value,
                    });
                  }}
                  gateValue={matchTab.gateValue}
                  gateList={dropdown.gate}
                  gateOnChange={(e) => {
                    setMatchTab({ ...matchTab, gateValue: e.target.value });
                  }}
                  buttonOnClick={() => {
                    filterMatchTab(
                      paginationMatchTab.page,
                      matchTab.date,
                      matchTab.checkpointValue,
                      matchTab.gateValue
                    );
                  }}
                  color={"blue"}
                />
              </Grid>
              <Grid item xl={6} lg={6} md={12} sm={12} xs={12}>
                <Typography variant="h6" align="center">
                  audit sensor
                </Typography>

                <ImageSearchAudit
                  imageCrop={matchTab.auditImageCrop}
                  imageFull={matchTab.auditImageFull}
                />
              </Grid>

              <Grid item xl={6} lg={6} md={12} sm={12} xs={12}>
                <Typography variant="h6" align="center">
                  transaction (AW)
                </Typography>
                <ImageAWMonitorPage
                  imageCrop={matchTab.awImageCrop}
                  imageFull={matchTab.awImageFull}
                />
              </Grid>
              <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                <MatchTable
                  dataList={matchTab.tableBodyData}
                  page={paginationMatchTab.page}
                  onChange={pageOnChangeMatchTab}
                  onClickRow={MatchTabGetImage}
                  // onFetchData={fetchData}
                />
              </Grid>
            </Grid>
          </TabPanel>

          {/* Billing Monitor */}
          <TabPanel value={value} index={3}>
            <Grid
              container
              spacing={3}
              component={Paper}
              style={{ marginTop: 10 }}
            >
              <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                <Typography variant="h6" align="center">
                  Billing Monitor
                </Typography>
                <FilterAWMonitorPage
                  dateValue={dataBilling.date}
                  dateOnChange={(date) => {
                    setDataBilling({
                      ...dataBilling,
                      date: date,
                    });
                    console.log("dateChange :", dataBilling.date);
                  }}
                  checkpointValue={dataBilling.checkpointValue}
                  checkpointList={dropdown.checkpoint}
                  checkpointOnChange={(e) => {
                    setDataBilling({
                      ...dataBilling,
                      checkpointValue: e.target.value,
                    });
                  }}
                  gateValue={dataBilling.gateValue}
                  gateList={dropdown.gate}
                  gateOnChange={(e) => {
                    setDataBilling({
                      ...dataBilling,
                      gateValue: e.target.value,
                    });
                  }}
                  buttonOnClick={() => {
                    filterBilling(
                      paginationBilling.page,
                      dataBilling.date,
                      dataBilling.checkpointValue,
                      dataBilling.gateValue
                    );
                  }}
                  color={"#46005E"}
                />

                <TableBillingMonitorPage
                  header={dataBilling.tableHeaderBilling}
                  body={dataBilling.tableBodyData}
                  countPage={paginationBilling.countPage}
                  page={paginationBilling.page}
                  pageOnChange={pageOnChangeBilling}
                  color={"#46005E"}
                />
              </Grid>
            </Grid>
          </TabPanel>
        </div>
      </Container>
    </>
  );
}
