import {
  BarChart2,
  Bell,
  Building2,
  LayoutDashboard,
  Lock,
  Mail,
  Settings,
  ShieldCheck,
  User,
  Users,
  Wifi
} from "lucide-react";
import { Link, Outlet, useLocation } from "react-router-dom";
import TopNavBar from "./TopNavBar";

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
  { label: "Email", icon: <Mail size={16} />, path: "/settings/email" },
  { label: "Authentication", icon: <Lock size={16} />, path: "/settings/auth" },
  {
    label: "Organizations",
    icon: <Building2 size={16} />,
    path: "/settings/orgs"
  },
  { label: "Users", icon: <Users size={16} />, path: "/settings/users" },
  {
    label: "Reports",
    icon: <BarChart2 size={16} />,
    path: "/settings/reports"
  },
  {
    label: "Dashboard",
    icon: <LayoutDashboard size={16} />,
    path: "/versewave/dashboard"
  }
];

export default function SettingsLayout() {
  const { pathname } = useLocation();

  return (
    <>
      <TopNavBar />
      <div className="flex flex-col md:flex-row h-auto bg-white text-gray-800 border-t border-gray-200">
        <aside className="w-full md:w-64 bg-white border-r border-gray-200 p-4">
          <nav className="space-y-3">
            {settingsLinks.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-all
            ${
              pathname === item.path
                ? "bg-blue-100 text-blue-700"
                : "text-gray-700 hover:bg-blue-50"
            }`}
              >
                {item.icon}
                {item.label}
              </Link>
            ))}
          </nav>
        </aside>

        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </>
  );
}
