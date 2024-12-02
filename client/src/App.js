import { CssBaseline, createTheme, ThemeProvider } from "@mui/material";
import { useMemo, useContext } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { themeSettings } from "theme";
import { AuthProvider } from "./context/AuthContext";
// context
// import { AuthContext } from "./context/AuthContext";
import {
  Dashboard,
  Layout,
  Products,
  Users,
  Merchants,
  Numbers,
  Bkash,
  Payment,
  Payout,
  Geography,
  Overview,
  Daily,
  Monthly,
  Breakdown,
  Admin,
  Performance,
  Pointofsale,
  Profile,
  Checkout,
  Checkoutdemo,
  Callbackbkash,
  Login,
  PageNotFound
} from "scenes";
import Nagad from "scenes/nagad/Nagad";
import Home from "../src/scenes/pages/Home"
import "./index.css"
import Depositsystem from "scenes/pament-system/Depositsystem";
import Bkashpament from "scenes/pament-system/Bkashpament";
import Nagadpament from "scenes/pament-system/Nagadpament";
import Agentlogin from "agent/Agentlogin";
import { Appprovider } from "context/Appcontext";
import AgentDashboard from "agent/agent-dashboard/AgentDashboard";
import Agentregistretion from "agent/Agentregistretion";
import Depositpage from "agent/agent-dashboard/Depositpage";
import Ageentapproval from "agent/Ageentapproval";
import Depositandtopup from "agent/agent-dashboard/Depositandtopup";
import Report from "agent/agent-dashboard/Report";
import Ticket from "agent/agent-dashboard/Ticket";
import Agentprofile from "agent/agent-dashboard/Agentprofile";
import Agent from "scenes/pages/Agent";
import Agentdetails from "scenes/pages/Agentdetails";
import Pendingaggent from "scenes/pages/Pendingaggent";
import Agentdepositpage from "scenes/pages/Agentdepositpage";
import Depositinvoice from "scenes/pages/Depositinvoice";
function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <div className="app">
      <BrowserRouter>
        <AuthProvider>
          <Appprovider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Routes>
              <Route element={<Layout />}>
                {/* <Route
                  path="/"
                  element={<Navigate to="/dashboard" replace />}
                /> */}
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/products" element={<Products />} />
                <Route path="/users" element={<Users />} />
                <Route path="/merchants" element={<Merchants />} />
                <Route path="/numbers" element={<Numbers />} />
                <Route path="/bkash_api" element={<Bkash />} />
                <Route path="/nagad_api" element={<Nagad />} />
                <Route path="/payment" element={<Payment />} />
                <Route path="/payout" element={<Payout />} />
                <Route path="/point_of_sale" element={<Pointofsale />} />
                <Route path="/setting" element={<Profile />} />
                <Route path="/geography" element={<Geography />} />
                <Route path="/overview" element={<Overview />} />
                <Route path="/daily" element={<Daily />} />
                <Route path="/monthly" element={<Monthly />} />
                <Route path="/breakdown" element={<Breakdown />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/performance" element={<Performance />} />
              </Route>
              <Route path="/checkout/:paymentId" element={<Checkout />} />
              <Route path="/depositdemo" element={<Checkoutdemo />} />
              <Route path="/callbackbkash" element={<Callbackbkash />} />
              <Route path="/deposit-system" element={<Depositsystem/>} />
              <Route path="/deposit-system/bkash" element={<Bkashpament/>} />
              <Route path="/deposit-system/nagad" element={<Nagadpament/>} />
              {/* -------------------outside page----------------- */}
              {/* <Route path="/" element={<Home />} /> */}
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<PageNotFound />} />
              {/* --------------------my code----------- */}
              {/* -------------------agent dashboard--------------- */}
              <Route path="/agent-registration" element={<Agentregistretion />} />
              <Route path="/agent-login" element={<Agentlogin />} />
              <Route path="/agent/waiting-for-approval"element={<Ageentapproval/>}/>
              <Route path="/agent-dashboard" element={<AgentDashboard />} />
              <Route path="/agent-deposit-page" element={<Depositpage />} />
              <Route path="/agent-deposit-and-topup" element={<Depositandtopup />} />
              <Route path="/agent-report-and-analize" element={<Report />} />
              <Route path="/agent-create-ticket" element={<Ticket />} />
              <Route path="/agent-profile" element={<Agentprofile />} />
              <Route path="/agent" element={<Agent />} />
              <Route path="/agent-details/:id" element={<Agentdetails />} />
              <Route path="/request_agent" element={<Pendingaggent />} />
              <Route path="/agent_deposit" element={<Agentdepositpage />} />
              <Route path="/agent-deposit-invoice/:id" element={<Depositinvoice />} />

            </Routes>
          </ThemeProvider>
          </Appprovider>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
