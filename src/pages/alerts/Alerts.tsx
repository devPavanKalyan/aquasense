import { useState } from "react";

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
  High: "bg-orange-100 text-orange-800",
  Moderate: "bg-yellow-100 text-yellow-800",
  Critical: "bg-red-100 text-red-800"
};

const Alerts = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const filteredAlerts = alerts.filter((alert) => {
    const matchesSearch =
      alert.title.toLowerCase().includes(search.toLowerCase()) ||
      alert.message.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "All" || alert.severity === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 text-gray-800">
      <h2 className="text-2xl font-semibold text-blue-600 mb-6">Alerts</h2>

      {/* Search Box */}
      <div className="mb-6">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search alerts..."
          className="w-full md:w-96 px-4 py-2 rounded-md border border-gray-300 bg-white text-sm font-medium shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Left Filters */}
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

        {/* Right Section: Notifications */}
        <section className="md:col-span-3">
          {filteredAlerts.length === 0 ? (
            <p className="text-gray-600 italic">
              ✅ No alerts match your filters.
            </p>
          ) : (
            <div className="space-y-4">
              {filteredAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className={`rounded-xl p-5 border border-gray-200 bg-white shadow-sm hover:shadow-md transition ${
                    severityColors[alert.severity]
                  }`}
                >
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="text-lg font-semibold">{alert.title}</h4>
                    <span className="text-xs font-medium text-gray-600">
                      {alert.time}
                    </span>
                  </div>
                  <p className="text-sm mb-2 text-gray-700">{alert.message}</p>
                  <span
                    className={`text-xs font-semibold uppercase px-2 py-0.5 rounded-full inline-block shadow-sm ${
                      severityColors[alert.severity]
                    }`}
                  >
                    {alert.severity}
                  </span>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Alerts;
