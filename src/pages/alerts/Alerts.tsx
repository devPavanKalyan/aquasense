import { Tune } from "@mui/icons-material";
import { useState } from "react";
import { useOutletContext } from "react-router-dom";

const alerts = [
  {
    id: 1,
    title: "Low DO Level",
    message: "Device A in Nellore has detected Dissolved Oxygen below 3 mg/L.",
    severity: "High",
    time: "2025-04-16 11:20 AM"
  },
  {
    id: 2,
    title: "High pH Value",
    message: "Device B in Siddipet recorded a pH level of 9.2.",
    severity: "Moderate",
    time: "2025-04-15 04:55 PM"
  },
  {
    id: 3,
    title: "Sensor Offline",
    message: "Device C in Udupi has not sent data in the last 30 minutes.",
    severity: "Critical",
    time: "2025-04-14 10:00 AM"
  }
];

const severityColors: Record<string, string> = {
  High: "bg-orange-100 text-orange-700",
  Moderate: "bg-yellow-100 text-yellow-700",
  Critical: "bg-red-100 text-red-700"
};
type AlertContext = {
  search: string;
};

const Alerts = () => {
  const [filter, setFilter] = useState("All");

  const { search } = useOutletContext<AlertContext>();

  const filteredAlerts = alerts.filter((alert) => {
    const matchesSearch =
      alert.title.toLowerCase().includes(search.toLowerCase()) ||
      alert.message.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "All" || alert.severity === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="max-w-7xl mx-auto p-5 text-gray-800">
      <h2 className="text-2xl font-semibold mb-4">Alerts</h2>

      <div className="flex flex-wrap gap-3 items-center mb-6">
        <button className="flex items-center gap-2 px-5 py-2 border border-2 border-blue-600 text-blue-600 font-bold hover:text-white hover:bg-blue-600 rounded-full text-sm hover:bg-blue-50">
          <Tune className="w-4 h-4" />
          Filter
        </button>

        <aside className="md:col-span-1">
          <h3 className="text-lg font-semibold mb-3 text-gray-800">
            Filter by Severity
          </h3>
          <div className="flex flex-col gap-2 text-sm">
            {["All", "High", "Moderate", "Critical"].map((level) => (
              <label
                key={level}
                className="flex items-center gap-2 text-gray-700 cursor-pointer"
              >
                <input
                  type="radio"
                  name="severity"
                  value={level}
                  checked={filter === level}
                  onChange={() => setFilter(level)}
                  className="accent-blue-500"
                />
                <span className="font-medium">{level}</span>
              </label>
            ))}
          </div>
        </aside>
      </div>

      {filteredAlerts.length === 0 ? (
        <p className="text-gray-500 italic">No alerts found.</p>
      ) : (
        <div className="space-y-4">
          {filteredAlerts.map((alert) => (
            <div
              key={alert.id}
              className="p-4 bg-white rounded-lg border border-gray-200 transform transition-transform duration-300 ease-in-out hover:scale-101"
            >
              <div className="flex justify-between items-start mb-1">
                <h4 className="font-semibold text-gray-900">{alert.title}</h4>
                <span className="text-xs text-gray-500">{alert.time}</span>
              </div>
              <p className="text-sm text-gray-700 mb-2">{alert.message}</p>
              <span
                className={`inline-block text-xs font-medium px-2 py-1 rounded-full ${
                  severityColors[alert.severity]
                }`}
              >
                {alert.severity}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Alerts;
