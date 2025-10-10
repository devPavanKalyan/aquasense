import {
  BarChart2,
  Bell,
  Building2,
  LayoutDashboard,
  Settings,
  ShieldCheck,
  User,
  Users,
  Wifi
} from "lucide-react";
import { useContext } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import profile from "../assets/profile.png";
import TopNavBar from "../components/TopNavBar";
import { AuthContext } from "../context/AuthContext";

const settingsLinks = [
  { label: "Profile", icon: <User size={16} />, path: "/settings/profile" },
  { label: "Account", icon: <Settings size={16} />, path: "/settings/account" },
  {
    label: "Notifications",
    icon: <Bell size={16} />,
    path: "/settings/notifications"
  },
  {
    label: "Security",
    icon: <ShieldCheck size={16} />,
    path: "/settings/security"
  },
  { label: "Sessions", icon: <Wifi size={16} />, path: "/settings/sessions" },
  {
    label: "Organizations",
    icon: <Building2 size={16} />,
    path: "/settings/orgs"
  },
  {
    label: "Reports",
    icon: <BarChart2 size={16} />,
    path: "/settings/reports"
  },
  {
    label: "Dashboard",
    icon: <LayoutDashboard size={16} />,
    path: "/settings/dashboard"
  },
  {
    label: "User Management",
    icon: <Users size={16} />,
    path: "/settings/iam"
  }
];

export default function SettingsLayout() {
  const { pathname } = useLocation();
  const { authState } = useContext(AuthContext);
  const user = authState.user;
  const nameSplit = user?.name.split(" ");

  return (
    <>
      <TopNavBar />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 text-gray-800 border-t border-gray-200 px-6 sm:px-16 md:px-20 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-10">
          <div className="flex items-center gap-4">
            <img
              src={profile}
              alt="profile_pic"
              className="w-20 h-20 rounded-full border-4 border-blue-100 shadow-sm"
            />
            <div>
              <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
                {nameSplit && nameSplit.length > 1
                  ? nameSplit.slice(1).join(" ")
                  : "Pavan Kalyan"}
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Manage your account preferences
              </p>
            </div>
          </div>
          <div>
            <Link
              to="/dashboard"
              className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
            >
              Back to Dashboard →
            </Link>
          </div>
        </div>

        <div className="flex flex-col md:flex-row">
          <aside className="w-full md:w-72 bg-white/70 p-4">
            <h3 className="text-xs uppercase text-gray-500 tracking-widest mb-3 px-2">
              Settings Menu
            </h3>
            <nav className="space-y-1">
              {settingsLinks.map((item) => {
                const isActive = pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? "bg-gray-100"
                        : "text-gray-700 hover:bg-blue-50 hover:text-blue-700"
                    }`}
                  >
                    <div
                      className={`flex items-center justify-center w-7 h-7 rounded-lg ${
                        isActive ? "bg-white/20" : "bg-blue-100/30"
                      }`}
                    >
                      {item.icon}
                    </div>
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </aside>

          <main className="flex-1">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
}
