import React from "react";
import { Route } from "react-router-dom";
import ProtectedRoute from "./PrivateRoute";
const ProfilePage = React.lazy(
  () => import("../components/post_login/ProfilePage")
);
const AppShellLayout = React.lazy(() => import("../layouts/AppShellLayout"));
const NotFound = React.lazy(() => import("../components/not_found/NotFound"));
const PostHome = React.lazy(() => import("../pages/overview/Dashboard"));
const UserDashboard = React.lazy(
  () => import("../pages/monitoring/LiveMonitoring")
);
const Reports = React.lazy(() => import("../pages/overview/Reports"));
const Alerts = React.lazy(() => import("../pages/alerts/Alerts"));
const InsightsAndBestPractices = React.lazy(
  () => import("../pages/overview/InsightsAndBestPractices")
);
const BestPractices = React.lazy(
  () => import("../pages/overview/BestPractices")
);
const Analytics = React.lazy(() => import("../pages/analytics/Analytics"));
const DevicesLayout = React.lazy(() => import("../pages/devices/DeviceLayout"));
const YourDevices = React.lazy(() => import("../pages/devices/YourDevices"));
const Shopping = React.lazy(() => import("../pages/devices/Shopping"));
const Product = React.lazy(() => import("../pages/devices/Product"));
const SettingsLayout = React.lazy(
  () => import("../components/post_login/SettingsLayout")
);
const IamManagementLayout = React.lazy(
  () => import("../pages/overview/IamManagementLayout")
);
const OverviewLayout = React.lazy(() => import("../layouts/OverviewLayout"));

export default function ProtectedRoutes() {
  return (
    <>
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
          path="dashboard"
          element={
            <OverviewLayout>
              <UserDashboard />
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
          path="alerts"
          element={
            <OverviewLayout>
              <Alerts />
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
        <Route path="devices" element={<DevicesLayout />}>
          <Route index element={<YourDevices />} />
          <Route path="shopping" element={<Shopping />}>
            <Route path=":productId" element={<Product />} />
          </Route>
        </Route>
        <Route path="iam-management" element={<IamManagementLayout />} />
        <Route path="analytics" element={<Analytics />} />
      </Route>
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
      <Route path="*" element={<NotFound />} />
    </>
  );
}
