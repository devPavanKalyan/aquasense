import { Tune } from "@mui/icons-material";
import { Download } from "lucide-react";

const Reports = () => {
  return (
    <div className="flex flex-col gap-10 min-h-screen text-gray-800 max-w-7xl mx-auto p-5">
      <div className="flex flex-wrap gap-4 items-center">
        <button className="flex items-center gap-2 px-5 py-2 border border-2 border-blue-600 text-blue-600 font-bold hover:text-white hover:bg-blue-600 rounded-full text-sm hover:bg-blue-50">
          <Tune className="w-4 h-4" />
          Filter
        </button>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          Summary
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: "Reports Generated", value: 12 },
            { label: "CSV Downloads", value: 20 }
          ].map((item, idx) => (
            <div key={idx} className="bg-blue-50 rounded-2xl p-6">
              <p className="text-sm text-gray-500 mb-1 font-medium">
                {item.label}
              </p>
              <h3 className="text-2xl font-bold text-gray-800">{item.value}</h3>
            </div>
          ))}
        </div>
      </div>

      {/* <div>
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          Visual Analytics
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {["Device Activity", "Water Metrics"].map((title, idx) => (
            <div
              key={idx}
              className="h-64 rounded-2xl flex items-center justify-center text-gray-400 text-sm font-medium bg-blue-50"
            >
              {title} (Coming Soon)
            </div>
          ))}
        </div>
      </div> */}

      <div>
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          Recent Reports
        </h3>
        <div className="overflow-x-auto bg-white border border-gray-200">
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
        <button className="flex items-center gap-2 px-4 py-2 hover:bg-blue-50 rounded-full border border-2 border-blue-600 text-sm font-semibold transition">
          <Download size={16} />
          Export All Reports (CSV)
        </button>
      </div>
    </div>
  );
};

export default Reports;
