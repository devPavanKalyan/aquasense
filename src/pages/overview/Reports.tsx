import { Activity, BarChart2, FileDown, FileText, Filter } from "lucide-react";

const Reports = () => {
  return (
    <div className="space-y-10 bg-gray-50 min-h-screen text-gray-800 px-4 py-6 max-w-7xl mx-auto">
      <div className="flex flex-wrap gap-4 items-center">
        <select className="px-4 py-2 rounded-lg border border-gray-300 bg-white text-sm font-medium text-gray-700 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition">
          <option>This Month</option>
          <option>Last 7 Days</option>
          <option>Custom Range</option>
        </select>
        <select className="px-4 py-2 rounded-lg border border-gray-300 bg-white text-sm font-medium text-gray-700 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition">
          <option>All Devices</option>
          <option>Device 01</option>
          <option>Device 02</option>
        </select>
        <button className="flex items-center gap-2 px-5 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-medium shadow-sm transition">
          <Filter size={16} />
          Apply Filters
        </button>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-blue-600 mb-4 flex items-center gap-2">
          <FileText size={20} />
          Summary
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: "Reports Generated", value: 12 },
            { label: "Active Devices", value: 4 },
            { label: "Critical Alerts", value: 3 },
            { label: "CSV Downloads", value: 20 }
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition"
            >
              <p className="text-sm text-gray-500 mb-1 font-medium">
                {item.label}
              </p>
              <h3 className="text-2xl font-bold text-gray-800">{item.value}</h3>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-blue-600 mb-4 flex items-center gap-2">
          <BarChart2 size={20} />
          Visual Analytics
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {["Device Activity", "Water Metrics"].map((title, idx) => (
            <div
              key={idx}
              className="h-64 rounded-2xl border border-dashed border-gray-300 bg-gradient-to-br from-gray-100 to-white flex items-center justify-center text-gray-400 text-sm font-medium shadow-inner"
            >
              {title} (Coming Soon)
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-blue-600 mb-4 flex items-center gap-2">
          <Activity size={20} />
          Recent Reports
        </h3>
        <div className="overflow-x-auto bg-white rounded-2xl border border-gray-200 shadow-sm">
          <table className="min-w-full text-sm text-left text-gray-800">
            <thead className="bg-gray-100 text-gray-700 uppercase text-xs font-semibold">
              <tr>
                <th className="px-6 py-3">Date</th>
                <th className="px-6 py-3">Device</th>
                <th className="px-6 py-3">Type</th>
                <th className="px-6 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3].map((row) => (
                <tr
                  key={row}
                  className="border-t border-gray-100 hover:bg-gray-50 transition"
                >
                  <td className="px-6 py-3">2025-04-17</td>
                  <td className="px-6 py-3">Device 0{row}</td>
                  <td className="px-6 py-3">Quality Report</td>
                  <td className="px-6 py-3">
                    <span className="inline-block px-2 py-0.5 rounded-full text-green-700 bg-green-100 text-xs font-semibold">
                      Completed
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="text-right">
        <button className="flex items-center gap-2 px-5 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-semibold shadow-sm transition">
          <FileDown size={16} />
          Export All Reports (CSV)
        </button>
      </div>
    </div>
  );
};

export default Reports;
