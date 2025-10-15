import { Close } from "@mui/icons-material";
import {
  BarChart2,
  Bell,
  Building2,
  LayoutDashboard,
  Menu,
  Moon,
  Settings,
  ShieldCheck,
  User,
  Users,
  Wifi
} from "lucide-react";
import { useContext, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import profile from "../assets/profile.png";
import UserSidebarMenu from "../components/home/UserSidebarMenu";
import { AuthContext } from "../context/AuthContext";
import Logo from "../hooks/Logo";

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
  const { authState, logout } = useContext(AuthContext);
  const user = authState.user;
  const nameSplit = user?.name.split(" ");
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <header className="flex items-center justify-between w-full px-4 sm:px-6 md:px-10 py-3 bg-white border-b border-gray-200 shadow-sm">
        <Logo />

        <div className="flex items-center gap-3 sm:gap-5 md:gap-6">
          <button
            type="button"
            className="p-2 rounded-full hover:bg-gray-100 active:bg-gray-200 transition-all duration-200"
          >
            <Moon className="w-5 h-5 text-gray-700" />
          </button>

          <UserSidebarMenu logout={logout} />
        </div>
      </header>

      <main className="relative min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 text-gray-800 border-t border-gray-200 px-6 sm:px-16 md:px-20 py-8">
        <section className="flex flex-row sm:flex-row items-center justify-between mb-5 sm:gap-8">
          <div className="md:hidden">
            <button
              aria-label="Open menu"
              className="p-2.5 rounded-xl 
                 hover:bg-indigo-50 hover:border-indigo-200 hover:shadow-md 
                 transition-all duration-300 active:scale-95"
              onClick={() => setSidebarOpen((prev) => !prev)}
            >
              <Menu className="w-6 h-6 text-gray-800" />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <img
              src={profile}
              alt="profile"
              className="w-16 h-16 md:w-20 md:h-20 rounded-full border-4 border-blue-100 shadow-sm"
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

          <Link
            to="/dashboard"
            className="hidden md:inline text-sm font-medium text-indigo-700 hover:text-indigo-900 transition-colors"
          >
            Back to Dashboard →
          </Link>
        </section>

        <aside
          className={`md:hidden absolute top-0 left-0 h-full w-72 bg-white border border-gray-100 p-4 shadow-lg z-50 transform transition-transform duration-300 ease-in-out
    ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
    md:relative md:translate-x-0 md:block
  `}
        >
          <div className="flex flex-row items-center justify-between">
            <div className="text-xs font-bold uppercase text-gray-500 tracking-widest px-2">
              Settings Menu
            </div>
            <div className="md:hidden">
              <button
                aria-label="Open menu"
                className="p-2.5 rounded-xl 
                 hover:bg-indigo-50 hover:border-indigo-200 hover:shadow-md 
                 transition-all duration-300 active:scale-95"
                onClick={() => setSidebarOpen((prev) => !prev)}
              >
                <Close className="w-6 h-6 text-gray-800" />
              </button>
            </div>
          </div>

          <nav className="space-y-1">
            {settingsLinks.map(({ path, icon, label }) => {
              const isActive = pathname === path;
              return (
                <Link
                  key={path}
                  to={path}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-blue-50 text-[#4B0082] font-semibold"
                      : "text-gray-700 hover:bg-blue-50 hover:text-[#4B0082]"
                  }`}
                >
                  <div
                    className={`flex items-center justify-center w-7 h-7 rounded-lg ${
                      isActive ? "bg-[#4B0082]/10" : "bg-blue-100/30"
                    }`}
                  >
                    {icon}
                  </div>
                  {label}
                </Link>
              );
            })}
          </nav>
        </aside>

        <section className="flex flex-col md:flex-row gap-6">
          <aside className="hidden md:block w-full md:w-72 p-4 border border-gray-100">
            <h3 className="text-xs font-bold uppercase text-gray-500 tracking-widest mb-3 px-2">
              Settings Menu
            </h3>

            <nav className="space-y-1">
              {settingsLinks.map(({ path, icon, label }) => {
                const isActive = pathname === path;
                return (
                  <Link
                    key={path}
                    to={path}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? "bg-blue-50 text-[#4B0082] font-semibold"
                        : "text-gray-700 hover:bg-blue-50 hover:text-[#4B0082]"
                    }`}
                  >
                    <div
                      className={`flex items-center justify-center w-7 h-7 rounded-lg ${
                        isActive ? "bg-[#4B0082]/10" : "bg-blue-100/30"
                      }`}
                    >
                      {icon}
                    </div>
                    {label}
                  </Link>
                );
              })}
            </nav>
          </aside>

          <div className="flex flex-1 items-center justify-center font-bold text-5xl md:bg-white/70 md:p-6 md:border md:border-gray-100">
            <Outlet />
          </div>
        </section>
        {isSidebarOpen && (
          <div
            className="absolute inset-0 z-40 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </main>
    </>
  );
}
