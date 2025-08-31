import { BarChart2, Bell, Cpu, FileText, Settings, User } from "lucide-react";

const Dashboard = ({ user = { name: "Pavan Kalyan" } }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Welcome back, <span className="text-blue-600">{user.name}</span> 👋
        </h1>
        <p className="text-gray-500 mt-1">
          Here’s a quick look at your system.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-10">
        {[
          { label: "Active Devices", value: 0, icon: <Cpu size={20} /> },
          { label: "Total Alerts", value: 0, icon: <Bell size={20} /> },
          {
            label: "Reports Generated",
            value: 0,
            icon: <FileText size={20} />
          },
          {
            label: "Analytics Events",
            value: 0,
            icon: <BarChart2 size={20} />
          }
        ].map(({ label, value, icon }, idx) => (
          <div
            key={idx}
            className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm hover:shadow transition"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{label}</p>
                <h3 className="text-xl font-semibold text-gray-800">{value}</h3>
              </div>
              <div className="text-blue-600 bg-blue-50 p-2 rounded-lg">
                {icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mb-10">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Quick Access
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {[
            { label: "My Profile", icon: <User size={18} />, href: "/profile" },
            {
              label: "Manage Devices",
              icon: <Cpu size={18} />,
              href: "/devices"
            },
            {
              label: "Analytics",
              icon: <BarChart2 size={18} />,
              href: "/analytics"
            },
            {
              label: "Reports",
              icon: <FileText size={18} />,
              href: "/reports"
            },
            { label: "Alerts", icon: <Bell size={18} />, href: "/alerts" },
            {
              label: "Settings",
              icon: <Settings size={18} />,
              href: "/settings"
            }
          ].map(({ label, icon, href }) => (
            <a
              key={label}
              href={href}
              className="flex flex-col items-center justify-center text-sm font-medium p-4 rounded-xl border border-gray-200 bg-white hover:bg-blue-50 text-gray-700 transition"
            >
              <div className="mb-1 text-blue-600">{icon}</div>
              {label}
            </a>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Recent Alerts
        </h2>
        <ul className="divide-y divide-gray-200 bg-white border border-gray-100 rounded-xl overflow-hidden">
          {[
            {
              msg: "Low DO level detected in Device A",
              time: "Just now"
            },
            {
              msg: "Device B went offline",
              time: "10 mins ago"
            },
            {
              msg: "New report generated for Shrimp Hatchery",
              time: "Today, 8:45 AM"
            }
          ].map(({ msg, time }, idx) => (
            <li key={idx} className="p-4 hover:bg-gray-50 transition">
              <p className="text-gray-800">{msg}</p>
              <p className="text-xs text-gray-500">{time}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
