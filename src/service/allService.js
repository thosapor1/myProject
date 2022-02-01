import axios from "axios";
import Swal from "sweetalert2";

const apiURLv1 = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? `${process.env.REACT_APP_BASE_URL_PROD_V1}`
      : `${process.env.REACT_APP_BASE_URL_V1}`,
});
const apiURLv2 = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? `${process.env.REACT_APP_BASE_URL_PROD_V2}`
      : `${process.env.REACT_APP_BASE_URL_V2}`,
});
const apiURLv3 = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? `${process.env.REACT_APP_BASE_URL_PROD_V3}`
      : `${process.env.REACT_APP_BASE_URL_V3}`,
});

const cannotConnectNetWork = {
  icon: "error",
  text: "ไม่สามารถเชื่อมต่อเซิฟเวอร์ได้ในขณะนี้",
};

export const getDropdown = () => {
  const response = apiURLv1.post("/dropdown").catch((error) => {
    Swal.fire(cannotConnectNetWork);
  });
  return response;
};

export const operation = (sendData) => {
  const response = apiURLv2.post("/operation", sendData).catch((error) => {
    Swal.fire(cannotConnectNetWork);
  });
  return response;
};

//DashBoard page
export const getDataDashBoard = (sendData) => {
  const response = apiURLv3
    .post("/dashboard-month", sendData)
    .catch((error) => {
      Swal.fire(cannotConnectNetWork);
    });
  return response;
};

//RawData page
export const getDataRawTransaction = (sendData) => {
  const response = apiURLv1.post("/raw-data", sendData).catch((error) => {
    Swal.fire(cannotConnectNetWork);
  });
  return response;
};

export const getDataRawTransactionActivity = (sendData) => {
  const response = apiURLv1
    .post("/display-activity2", sendData)
    .catch((error) => {
      Swal.fire(cannotConnectNetWork);
    });
  return response;
};

//ExpertIncome page
export const getDataExpectIncome = (sendData) => {
  const response = apiURLv1.post("/expect-income", sendData).catch((error) => {
    Swal.fire(cannotConnectNetWork);
  });
  return response;
};

export const getDataExpectIncomeActivity = (sendData) => {
  const response = apiURLv2
    .post("/expect-income-activity", sendData)
    .catch((error) => {
      Swal.fire(cannotConnectNetWork);
    });
  return response;
};

export const searchOnExpectIncome = (endpoint, sendData) => {
  const response = apiURLv1.post(endpoint, sendData).catch((error) => {
    Swal.fire(cannotConnectNetWork);
  });
  return response;
};

export const searchByMatchTS = (endpoint, sendData) => {
  const response = apiURLv2.post(endpoint, sendData).catch((error) => {
    Swal.fire(cannotConnectNetWork);
  });
  return response;
};

export const searchByPlate = (sendData) => {
  const response = apiURLv1
    .post("/search-plate-mflow", sendData)
    .catch((error) => {
      Swal.fire(cannotConnectNetWork);
    });
  return response;
};

//ExpertIncomeV2 page
export const getDataExpectIncomeV2 = (sendData) => {
  const response = apiURLv2.post("/expect-income", sendData).catch((error) => {
    Swal.fire(cannotConnectNetWork);
  });
  return response;
};

export const getDataExpectIncomeActivityV2 = (sendData) => {
  const response = apiURLv3
    .post("/expect-income-activity", sendData)
    .catch((error) => {
      Swal.fire(cannotConnectNetWork);
    });
  return response;
};

//CollectFromPK3 page
export const getDataCollectFromPk3 = (sendData) => {
  const response = apiURLv1
    .post("/display-pk3-storage_list", sendData)
    .catch((error) => {
      Swal.fire(cannotConnectNetWork);
    });

  return response;
};

//SuperAuditDisplay page
export const downLoadFileAuditDisplay = (sendData, header) => {
  const response = apiURLv1
    .post("/daily-income/pdf", sendData, header)
    .catch((error) => {
      Swal.fire(cannotConnectNetWork);
    });

  return response;
};
export const getDataAuditDisplay = (sendData) => {
  const response = apiURLv1.post("/daily-income", sendData).catch((error) => {
    Swal.fire(cannotConnectNetWork);
  });
  return response;
};

export const getDataSuperaudit = (sendData) => {
  const response = apiURLv1
    .post("/display-super-audit", sendData)
    .catch((error) => {
      Swal.fire(cannotConnectNetWork);
    });
  return response;
};

export const getDataSuperauditActivity = (sendData) => {
  const response = apiURLv2
    .post("/display-super-audit-activity", sendData)
    .catch((error) => {
      Swal.fire(cannotConnectNetWork);
    });
  return response;
};

//DataVolume page
export const getDataVolume = (sendData) => {
  const response = apiURLv3.post("/data-monitor", sendData).catch((error) => {
    Swal.fire(cannotConnectNetWork);
  });
  return response;
};

//User page
export const updateUsers = (sendData) => {
  const response = apiURLv2
    .post("/update-user-status", sendData)
    .catch((error) => {
      Swal.fire(cannotConnectNetWork);
    });
  return response;
};

export const getDataUsers = () => {
  const response = apiURLv2.post("/user-list").catch((error) => {
    Swal.fire(cannotConnectNetWork);
  });
  return response;
};

export const deleteUsers = (sendData) => {
  const response = apiURLv2.post("/delete-user", sendData).catch((error) => {
    Swal.fire(cannotConnectNetWork);
  });
  return response;
};

//Config page
export const getDataConfig = (sendData) => {
  const response = apiURLv1.post("/system-config", sendData).catch((error) => {
    Swal.fire(cannotConnectNetWork);
  });
  return response;
};

export const deleteHighway = (sendData) => {
  const response = apiURLv1.post("/delete-highway", sendData).catch((error) => {
    Swal.fire(cannotConnectNetWork);
  });
  return response;
};

export const addHighway = (sendData) => {
  const response = apiURLv1.post("/add-highway", sendData).catch((error) => {
    Swal.fire(cannotConnectNetWork);
  });
  return response;
};

export const updateHighway = (sendData) => {
  const response = apiURLv1.post("/update-highway", sendData).catch((error) => {
    Swal.fire(cannotConnectNetWork);
  });
  return response;
};

export const exportExcel = (sendData) => {
  const response = apiURLv1.post("/export-csv", sendData).catch((error) => {
    Swal.fire(cannotConnectNetWork);
  });
  return response;
};

//TransactionMonitor page
export const getDataFullAudit = (sendData) => {
  const response = apiURLv1
    .post("/fullaudit-monitor", sendData)
    .catch((error) => {
      Swal.fire(cannotConnectNetWork);
    });
  return response;
};

export const getImageFullAudit = (sendData) => {
  const response = apiURLv1
    .post("/fullaudit-monitor-activity", sendData)
    .catch((error) => {
      Swal.fire(cannotConnectNetWork);
    });
  return response;
};

export const getDataHQ = (sendData) => {
  const response = apiURLv1
    .post("/hq-transaction-monitor", sendData)
    .catch((error) => {
      Swal.fire(cannotConnectNetWork);
    });
  return response;
};

export const getImageHQ = (sendData) => {
  const response = apiURLv1
    .post("/hq-transaction-monitor-activity", sendData)
    .catch((error) => {
      Swal.fire(cannotConnectNetWork);
    });
  return response;
};

export const getDataLane = (sendData) => {
  const response = apiURLv1
    .post("/lane-transaction-monitor", sendData)
    .catch((error) => {
      Swal.fire(cannotConnectNetWork);
    });
  return response;
};

export const getImageLane = (sendData) => {
  const response = apiURLv1
    .post("/lane-transaction-monitor-activity", sendData)
    .catch((error) => {
      Swal.fire(cannotConnectNetWork);
    });
  return response;
};

//Report page
export const getDataReportDisplay = (sendData) => {
  const response = apiURLv1.post("/display-ts", sendData).catch((error) => {
    Swal.fire(cannotConnectNetWork);
  });
  return response;
};
export const getDataReportTS = (sendData) => {
  const response = apiURLv1.post("/export-pdf-ts", sendData).catch((error) => {
    Swal.fire(cannotConnectNetWork);
  });
  return response;
};

export const getDataReportBilling = (sendData) => {
  const response = apiURLv1
    .post("/export-pdf-billing", sendData)
    .catch((error) => {
      Swal.fire(cannotConnectNetWork);
    });
  return response;
};

export const getDataReportPayment = (sendData) => {
  const response = apiURLv1
    .post("/expect-pdf-payment", sendData)
    .catch((error) => {
      Swal.fire(cannotConnectNetWork);
    });
  return response;
};

export const getDataMonitor = (sendData) => {
  const response = apiURLv1
    .post("/payment-monitor", sendData)
    .catch((error) => {
      Swal.fire(cannotConnectNetWork);
    });
  return response;
};
