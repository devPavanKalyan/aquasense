import { lazy, Suspense, useContext } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { AuthContext, AuthProvider } from "./context/AuthContext";

import "./App.css";
import LoadingSpinner from "./common/LoadingSpinner";

const NotFound = lazy(() => import("./components/not_found/NotFound"));
const Home = lazy(() => import("./pages/home/Home"));
const SignIn = lazy(() => import("./authentication/SignIn"));
const MonitoringPage = lazy(() => import("./pages/monitoring/MonitoringPage"));
const Footer = lazy(() => import("./components/home/PostSignInFooter"));
const SettingsLayout = lazy(() => import("./layouts/SettingsLayout"));
const Alerts = lazy(() => import("./pages/alerts/Alerts"));
const Register = lazy(() => import("./authentication/Register"));
const Callback = lazy(() => import("./authentication/Callback"));
const CallbackBackend = lazy(() => import("./authentication/CallbackBackend"));
const DevicesLayout = lazy(() => import("./pages/devices/DeviceLayout"));
const Header = lazy(() => import("./pages/home/Header"));
const PostHome = lazy(() => import("./pages/overview/Dashboard"));
const Reports = lazy(() => import("./pages/overview/Reports"));
const Account = lazy(() => import("./pages/settings/Account"));
const Dashboard = lazy(() => import("./pages/settings/Dashboard"));
const IAM = lazy(() => import("./pages/settings/IAM"));
const Notifications = lazy(() => import("./pages/settings/Notifications"));
const Orgs = lazy(() => import("./pages/settings/Orgs"));
const Profile = lazy(() => import("./pages/settings/Profile"));
const ReportSettings = lazy(() => import("./pages/settings/ReportSettings"));
const Security = lazy(() => import("./pages/settings/Security"));
const Sessions = lazy(() => import("./pages/settings/Sessions"));
const ProtectedRoute = lazy(() => import("./routes/PrivateRoute"));
const NewUIUX = lazy(() => import("./uiux/NewUIUX"));

export default function AppContent() {
  const { isAuthenticated, loading: authLoading } = useContext(AuthContext);
  const excluded = ["/oauth/authorize", "/signup"];
  const location = useLocation();

  const shouldShowHeaderFooter =
    isAuthenticated && !excluded.includes(location.pathname);

  if (authLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-900">
      {shouldShowHeaderFooter && (
        <header className="fixed top-0 left-0 w-full z-50 bg-white border-b border-gray-200 shadow-sm">
          <Header />
        </header>
      )}

      <main className="flex-grow">
        <Routes>
          {isAuthenticated && (
            <>
              <ProtectedRoute>
                <Route path="/" element={<Home />} />
                <Route path="/oauth/authorize" element={<SignIn />} />
                <Route path="/signup" element={<Register />} />
                <Route path="/callback" element={<Callback />} />
                <Route path="/redirect" element={<CallbackBackend />} />
              </ProtectedRoute>
            </>
          )}

          {!isAuthenticated && (
            <>
              <Route path="/settings" element={<SettingsLayout />}>
                <Route path="profile" element={<Profile />} />
                <Route path="account" element={<Account />} />
                <Route path="iam" element={<IAM />} />
                <Route path="security" element={<Security />} />
                <Route path="sessions" element={<Sessions />} />
                <Route path="notifications" element={<Notifications />} />
                <Route path="orgs" element={<Orgs />} />
                <Route path="reports" element={<ReportSettings />} />
                <Route path="dashboard" element={<Dashboard />} />
              </Route>

              <Route path="/" element={<NewUIUX />}>
                <Route index element={<PostHome />} />
                <Route path="devices" element={<DevicesLayout />} />
                <Route path="monitoring" element={<MonitoringPage />} />
                <Route path="alerts" element={<Alerts />} />
                <Route path="reports" element={<Reports />} />
              </Route>
            </>
          )}

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      {shouldShowHeaderFooter && (
        <footer className="bg-gray-50 border-t border-gray-200">
          <Footer />
        </footer>
      )}
    </div>
  );
}

export function App() {
  return (
    <AuthProvider>
      <Suspense fallback={<LoadingSpinner />}>
        <AppContent />
      </Suspense>
    </AuthProvider>
  );
}
