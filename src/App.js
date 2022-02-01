import {
  HashRouter,
  Switch,
  Route,
  // Redirect,
  // BrowserRouter,
} from "react-router-dom";
import DashBoard from "./pages/DashBoard";
import RawTransaction from "./pages/RawTransaction";
import { createTheme, ThemeProvider } from "@material-ui/core";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import User from "./pages/User";
import AuditDisplay from "./pages/AuditDisplay";
import Pk3Display from "./pages/Pk3Display";
import SuperAuditDisplay from "./pages/SuperAuditDisplay";
import UserLogs from "./pages/UserLogs";
import Config from "./pages/Config";
import Report from "./pages/Report";
import TransactionMonitorV1 from "./pages/TransactionMonitorV1";
import DashBoard2 from "./pages/DashBoard2";
import SuperAuditDisplay2 from "./pages/SuperAuditDisplay2";
import DataVolume from "./pages/DataVolume";
import MandatoryItem from "./pages/MandatoryItem";
import ExpectIncome from "./pages/ExpectIncome";
import CollectFromPk3 from "./pages/CollectFromPk3";
import MenuDataMonitor from "./pages/MenuDataMonitor";
import MonitorData from "./pages/MonitorData";
import ExpectIncomeV2 from "./pages/ExpectIncomeV2";
import Payment from "./pages/Payment";


// import { useEffect, useState } from "react";
// import Cookies from "js-cookie";

const theme = createTheme({
  typography: {
    fontFamily: "Prompt",
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 600,
    fontWeightBold: 700,
  },
});

function App() {
  // const isAuth = !!localStorage.getItem("isAuth");

  return (
    <ThemeProvider theme={theme}>
      <HashRouter>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/audit_dev" component={Login} />
          <Layout>
            <Route path="/dashboard" component={DashBoard} />
            <Route path="/dashboard2" component={DashBoard2} />
            <Route path="/rawTransaction" component={RawTransaction} />
            <Route path="/collectFromPk3" component={CollectFromPk3} />
            <Route path="/expectIncome" component={ExpectIncome} />
            <Route path="/expectIncomeV2" component={ExpectIncomeV2} />
            <Route path="/auditDisplay" component={AuditDisplay} />
            <Route path="/pk3Display" component={Pk3Display} />
            <Route path="/superAuditDisplay" component={SuperAuditDisplay} />
            <Route path="/superAuditDisplay2" component={SuperAuditDisplay2} />
            <Route path="/user" component={User} />
            <Route path="/config" component={Config} />
            <Route path="/userLogs" component={UserLogs} />
            <Route path="/report" component={Report} />
            <Route path="/dataVolume" component={DataVolume} />
            <Route path="/mandatoryItem" component={MandatoryItem} />
            <Route path="/MonitorData" component={MonitorData} />
            <Route path="/MenuDataMonitor" component={MenuDataMonitor} />
            <Route
              path="/transactionMonitorV1"
              component={TransactionMonitorV1}
            />
            <Route path="/Payment" component={Payment} />
          </Layout>
        </Switch>
      </HashRouter>
    </ThemeProvider>
  );
}

export default App;
