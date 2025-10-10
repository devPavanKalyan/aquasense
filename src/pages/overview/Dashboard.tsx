import { BarChart2, Bell, Cpu, FileText } from "lucide-react";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

const Dashboard = () => {
  const { authState } = useContext(AuthContext);
  const user = authState.user;
  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight">
          Welcome back,
          <span className="text-indigo-600 ml-2">
            {user?.name.split(" ").slice(1).join(" ") || "Pavan Kalyan"}
          </span>
        </h1>
        <p className="mt-3 text-gray-500 text-base sm:text-lg max-w-xl">
          Here’s a quick overview of your system, metrics, and insights.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-10 mb-10">
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
            className="bg-blue-50 px-4 py-6 rounded-xl hover:bg-gray-50"
          >
            <div className="flex items-center justify-between">
              <div className="flex flex-col items-start justify-between">
                <p className="text-[16px] text-gray-700">{label}</p>
                <h3 className="text-lg text-gray-500">{value}</h3>
              </div>
              <div className="text-blue-600 bg-blue-100 hover:bg-blue-200 px-4 py-2 rounded-3xl">
                {icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* <div className="mb-10">
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
      </div> */}

      <SystemsGrid />

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

const SystemsGrid = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const systems = [
    {
      name: "Aquaculture Monitoring",
      location: "Coastal Zone A",
      sensor: "pH & DO Sensor",
      status: "Active",
      metrics: { temperature: "27°C", pH: "7.2", oxygen: "6.8 mg/L" }
    },
    {
      name: "Irrigation Control",
      location: "Farm Block B",
      sensor: "Soil Moisture Sensor",
      status: "Idle",
      metrics: { moisture: "62%", temperature: "31°C", humidity: "48%" }
    },
    {
      name: "Smart Greenhouse",
      location: "Zone C",
      sensor: "Multi-Parameter Sensor",
      status: "Active",
      metrics: { temp: "26°C", humidity: "60%", co2: "410 ppm" }
    }
  ];

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Systems</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-10">
        {systems.map((system, i) => {
          const isExpanded = expandedIndex === i;

          return (
            <div
              key={i}
              className="relative h-fit flex flex-col justify-between bg-white border border-gray-200 rounded-xl hover:scale-105 transition-all duration-300 p-5"
            >
              {/* Expand/Collapse button */}
              <div className="absolute top-3 right-3 cursor-pointer">
                {!isExpanded ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="22px"
                    viewBox="0 -960 960 960"
                    width="22px"
                    fill="#1f1f1f"
                    onClick={() => setExpandedIndex(i)}
                  >
                    <path d="M200-200v-240h80v160h160v80H200Zm480-320v-160H520v-80h240v240h-80Z" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="22px"
                    viewBox="0 -960 960 960"
                    width="22px"
                    fill="#1f1f1f"
                    onClick={() => setExpandedIndex(null)}
                  >
                    <path d="M440-440v240h-80v-160H200v-80h240Zm160-320v160h160v80H520v-240h80Z" />
                  </svg>
                )}
              </div>

              {/* Card Header */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  {system.name}
                </h3>

                <div className="space-y-2 text-sm text-gray-700">
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Location</span>
                    <span>{system.location}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Sensor</span>
                    <span>{system.sensor}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Status</span>
                    <span
                      className={`${
                        system.status === "Active"
                          ? "text-green-600 font-medium"
                          : "text-gray-500"
                      }`}
                    >
                      {system.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Expanded Section */}
              {isExpanded && (
                <div className="mt-4 border-t border-gray-100 pt-3 text-sm text-gray-700 space-y-1">
                  <p>
                    <span className="font-medium">Temperature:</span>{" "}
                    {system.metrics.temperature || system.metrics.temp}
                  </p>
                  {system.metrics.pH && (
                    <p>
                      <span className="font-medium">pH Level:</span>{" "}
                      {system.metrics.pH}
                    </p>
                  )}
                  {system.metrics.oxygen && (
                    <p>
                      <span className="font-medium">Oxygen:</span>{" "}
                      {system.metrics.oxygen}
                    </p>
                  )}
                  {system.metrics.moisture && (
                    <p>
                      <span className="font-medium">Moisture:</span>{" "}
                      {system.metrics.moisture}
                    </p>
                  )}
                  {system.metrics.humidity && (
                    <p>
                      <span className="font-medium">Humidity:</span>{" "}
                      {system.metrics.humidity}
                    </p>
                  )}
                  {system.metrics.co2 && (
                    <p>
                      <span className="font-medium">CO₂:</span>{" "}
                      {system.metrics.co2}
                    </p>
                  )}
                </div>
              )}

              {/* Button */}
              <div className="mt-5">
                <button className="w-full border border-blue-600 text-blue-600 rounded-lg py-2 text-sm font-medium hover:bg-blue-600 hover:text-white transition-colors duration-200">
                  View Details
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
