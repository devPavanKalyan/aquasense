// src/App.js
import { useContext } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

import { AuthContext, AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./routes/PrivateRoute";

import NotFound from "./components/not_found/NotFound";
import ContactUs from "./components/pre_login/ContactUs";
import Docs from "./components/pre_login/Docs";
import Features from "./components/pre_login/Features";
import HelpUs from "./components/pre_login/HelpUs";
import Home from "./components/pre_login/Home";
import Overview from "./components/pre_login/Overview";
import Support from "./components/pre_login/Support";

import "./App.css";
import SignInPage from "./authentication/SignIn";
import Test from "./authentication/Test";
import NoGoalSetUp from "./components/business/NoGoalSetUp";
import Footer from "./components/post_login/PostSignInFooter";
import ProfilePage from "./components/post_login/ProfilePage";
import SettingsLayout from "./components/post_login/SettingsLayout";
import YourComponent from "./components/post_login/YourComponent";
import Callback from "./components/pre_login/Callback";
import CallbackBackend from "./components/pre_login/CallbackBackend";
import Header from "./components/pre_login/Header";
import AppShellLayout from "./layouts/AppShellLayout";
import OverviewLayout from "./layouts/OverviewLayout";
import Alerts from "./pages/alerts/Alerts";
import Analytics from "./pages/analytics/Analytics";
import Register from "./pages/auth/Register";
import ConnectSensorPage from "./pages/devices/ConnectSensorPage";
import DevicesLayout from "./pages/devices/DeviceLayout";
import Devices from "./pages/devices/Devices";
import Shopping from "./pages/devices/Shopping";
import YourDevices from "./pages/devices/YourDevices";
import LiveMonitoring from "./pages/monitoring/LiveMonitoring";
import Automation from "./pages/overview/Automation";
import BestPractices from "./pages/overview/BestPractices";
import PostHome from "./pages/overview/Dashboard";
import IamManagementLayout from "./pages/overview/IamManagementLayout";
import InsightsAndBestPractices from "./pages/overview/InsightsAndBestPractices";
import Inventory from "./pages/overview/Inventory";
import Reports from "./pages/overview/Reports";

export default function AppContent() {
  const { isAuthenticated, loading } = useContext(AuthContext);

  const excluded = ["/oauth/authorize", "/signup"];
  const location = useLocation();

  const shouldShowHeaderFooter =
    !isAuthenticated && !excluded.includes(location.pathname);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {shouldShowHeaderFooter && <Header />}
      <div className="flex-grow">
        <Routes>
          {/* PUBLIC ROUTES */}
          {!isAuthenticated && (
            <>
              <Route path="/signup" element={<Register />} />
              <Route path="/" element={<Home />} />
              <Route path="/callback" element={<Callback />} />
              <Route path="/contact" element={<ContactUs />} />
              <Route path="/redirect" element={<CallbackBackend />} />
              <Route path="/helpus" element={<HelpUs />} />
              <Route path="/overview" element={<Overview />} />
              <Route path="/features" element={<Features />} />
              <Route path="/docs" element={<Docs />} />
              <Route path="/support" element={<Support />} />
              <Route path="/oauth/authorize" element={<SignInPage />} />
              <Route path="/test" element={<Test />} />
            </>
          )}

          <Route path="/create" element={<NoGoalSetUp />} />

          {/* PROTECTED ROUTES */}
          {isAuthenticated && (
            <>
              {/* AppShell for Main Pages */}
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <AppShellLayout />
                  </ProtectedRoute>
                }
              >
                <Route
                  index
                  element={
                    <OverviewLayout>
                      <PostHome />
                    </OverviewLayout>
                  }
                />

                <Route
                  path="reports"
                  element={
                    <OverviewLayout>
                      <Reports />
                    </OverviewLayout>
                  }
                />
                <Route
                  path="inventory"
                  element={
                    <OverviewLayout>
                      <Inventory />
                    </OverviewLayout>
                  }
                />
                <Route
                  path="automation"
                  element={
                    <OverviewLayout>
                      <Automation />
                    </OverviewLayout>
                  }
                />
                <Route
                  path="user-management"
                  element={
                    <OverviewLayout>
                      <IamManagementLayout />
                    </OverviewLayout>
                  }
                />

                <Route
                  path="insights"
                  element={
                    <OverviewLayout>
                      <InsightsAndBestPractices />
                    </OverviewLayout>
                  }
                />
                <Route
                  path="best-practices"
                  element={
                    <OverviewLayout>
                      <BestPractices />
                    </OverviewLayout>
                  }
                />

                {/* Devices Section */}
                <Route path="devices" element={<DevicesLayout />}>
                  <Route index element={<YourDevices />} />
                  <Route path="purchased" element={<Devices />} />
                  <Route path="connect" element={<ConnectSensorPage />} />{" "}
                  {/* ✅ Correct */}
                </Route>

                {/* <Route path="shopping/:productId" element={<Product />} /> */}

                {/* Live monitoring */}
                <Route path="monitoring" element={<LiveMonitoring />} />

                <Route path="alerts" element={<Alerts />} />

                <Route path="component" element={<YourComponent />} />

                {/* Analytics */}
                <Route path="analytics" element={<Analytics />} />
              </Route>

              {/* Settings Section */}
              <Route
                path="/settings"
                element={
                  <ProtectedRoute>
                    <SettingsLayout />
                  </ProtectedRoute>
                }
              >
                <Route path="profile" element={<ProfilePage />} />
              </Route>

              {/* <Route path="/" element={<UpdatedOverviewLayout />}></Route> */}

              <Route path="shopping.versewave.in" element={<Shopping />} />
            </>
          )}

          {/* COMMON ROUTE FOR ALL */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      {!shouldShowHeaderFooter ? <></> : <Footer />}
    </div>
  );
}

export function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
