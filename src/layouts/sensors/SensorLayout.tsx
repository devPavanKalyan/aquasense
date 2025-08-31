import axios from "axios";
import { Pause, Play, RotateCcw, Square } from "lucide-react";
import { useEffect, useState } from "react";
import SensorChart from "./SensorReading";

interface TabItem {
  id: string;
  name: string;
}

interface SensorLayoutProps {
  selected?: TabItem;
  level?: number;
}

export default function SensorLayout({ selected }: SensorLayoutProps) {
  // Store status for each sensorId
  const [sensorStatuses, setSensorStatuses] = useState<
    Record<string, "idle" | "running" | "paused">
  >({});

  const [activeTab, setActiveTab] = useState("Device Details");

  // Helper to get current sensor status (default "idle")
  const currentStatus = selected
    ? sensorStatuses[selected.id] || "idle"
    : "idle";

  const updateStatus = (
    id: string,
    newStatus: "idle" | "running" | "paused"
  ) => {
    setSensorStatuses((prev) => ({
      ...prev,
      [id]: newStatus
    }));
  };

  const start = () => {
    if (!selected) return;
    axios
      .post(`http://localhost:9098/api/sensor/${selected.id}/start`)
      .then((result) => {
        if (result.status === 200) {
          alert(result.data);
          updateStatus(selected.id, "running");
        } else {
          alert("Internal server error");
        }
      })
      .catch((err) => {
        alert(err);
      });
  };

  const pause = () => {
    if (!selected) return;
    axios
      .post(`http://localhost:9098/api/sensor/${selected.id}/pause`)
      .then((result) => {
        if (result.status === 200) {
          updateStatus(selected.id, "paused");
        } else {
          alert("Internal server error");
        }
      })
      .catch((err) => {
        alert(err);
      });
  };

  const resume = () => {
    if (!selected) return;
    axios
      .post(`http://localhost:9098/api/sensor/${selected.id}/resume`)
      .then((result) => {
        if (result.status === 200) {
          updateStatus(selected.id, "running");
        } else {
          alert("Internal server error");
        }
      })
      .catch((err) => {
        alert(err);
      });
  };

  const stop = () => {
    if (!selected) return;
    axios
      .post(`http://localhost:9098/api/sensor/${selected.id}/stop`)
      .then((result) => {
        if (result.status === 200) {
          updateStatus(selected.id, "idle");
        } else {
          alert("Internal server error");
        }
      })
      .catch((err) => {
        alert(err);
      });
  };

  const [data, setData] = useState<any[]>([]);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setData((prev) => [
        ...prev,
        {
          timestamp: Date.now(),
          temperature: 20 + Math.random() * 5,
          humidity: 50 + Math.random() * 10,
          co2: 400 + Math.random() * 50
        }
      ]);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!selected) {
    return (
      <div className="flex items-center justify-center h-64 bg-gray-50 rounded-lg">
        <span className="text-gray-400 text-lg">No sensor selected</span>
      </div>
    );
  }

  return (
    <div className="bg-white flex flex-col gap-6 px-4 md:px-10 text-gray-900 w-full mb-10">
      {/* Section 1: Chart + Sidebar */}
      <div className="grid grid-cols-12 gap-4 h-auto md:h-[90vh]">
        {/* Left: Chart + Sensor Info */}
        <div className="col-span-12 lg:col-span-8 bg-white rounded-lg p-4 flex flex-col gap-4">
          {/* Sensor Info + Controls */}
          <div className="h-16 flex flex-col sm:flex-row items-start sm:items-center justify-between px-2 sm:px-4 border-b border-gray-200 gap-2 sm:gap-5">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-5">
              <span
                className="text-2xl font-bold"
                onClick={() => {
                  alert(selected.id);
                }}
              >
                {selected.name}
              </span>

              <span
                className={`px-3 py-1.5 rounded-full text-xs font-semibold shadow-inner
                  ${
                    currentStatus === "running"
                      ? "bg-green-100 text-green-700"
                      : currentStatus === "paused"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-red-100 text-red-700"
                  }`}
              >
                {currentStatus === "running"
                  ? "Active"
                  : currentStatus === "paused"
                  ? "Paused"
                  : "Inactive"}
              </span>
            </div>

            {/* Controls */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              {currentStatus === "idle" && (
                <button
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-500 rounded-lg text-white font-medium shadow-md transition transform active:scale-95"
                  onClick={start}
                >
                  <Play size={16} /> Start
                </button>
              )}

              {currentStatus === "running" && (
                <>
                  <button
                    className="flex items-center gap-2 px-4 py-2 bg-yellow-600 hover:bg-yellow-500 rounded-lg text-white font-medium shadow-md transition transform active:scale-95"
                    onClick={pause}
                  >
                    <Pause size={16} /> Pause
                  </button>
                  <button
                    className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-500 rounded-lg text-white font-medium shadow-md transition transform active:scale-95"
                    onClick={stop}
                  >
                    <Square size={16} /> Stop
                  </button>
                </>
              )}

              {currentStatus === "paused" && (
                <>
                  <button
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-500 rounded-lg text-white font-medium shadow-md transition transform active:scale-95"
                    onClick={resume}
                  >
                    <RotateCcw size={16} /> Resume
                  </button>
                  <button
                    className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-500 rounded-lg text-white font-medium shadow-md transition transform active:scale-95"
                    onClick={stop}
                  >
                    <Square size={16} /> Stop
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Chart Placeholder */}
          <div className="flex-1 flex items-center justify-center bg-gray-50 border-b border-gray-300 px-6 py-4">
            <div className="w-full max-w-5xl h-[300px] sm:h-[400px] lg:h-[500px] border border-gray-200 bg-white p-4">
              <SensorChart data={data} />
            </div>
          </div>

          {/* Time Range Selector */}
          <div className="flex flex-wrap gap-2 justify-center mt-2">
            {["1D", "1W", "1M", "3M", "6M", "1Y", "3Y", "5Y", "ALL"].map(
              (label, i) => (
                <div
                  key={i}
                  className="w-12 h-8 bg-gray-100 rounded-xl flex items-center justify-center cursor-pointer hover:bg-gray-200 transition"
                >
                  <span className="text-sm font-medium">{label}</span>
                </div>
              )
            )}
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="col-span-12 lg:col-span-4 rounded-xl border border-gray-200 p-4 flex flex-col gap-4">
          <h4 className="text-xl font-semibold mb-4 border-b pb-2">
            Device Tools
          </h4>

          {/* Tabs */}
          <div className="flex flex-wrap gap-2 mb-5">
            {[
              "Device Details",
              "Configuration",
              "Live Metrics",
              "Alerts",
              "Reports",
              "Diagnostics",
              "Firmware",
              "Control",
              "Health"
            ].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`text-xs px-3 py-1.5 rounded-md border font-medium ${
                  activeTab === tab
                    ? "bg-blue-100 text-blue-700 border-blue-300"
                    : "text-gray-600 border-gray-200 hover:bg-gray-100"
                } transition-all duration-200`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="text-sm text-gray-700 space-y-4 leading-relaxed">
            {activeTab === "Device Details" && (
              <div className="flex flex-col gap-2">
                {[
                  { label: "Device ID", value: "AQ-001A2B3" },
                  { label: "Battery", value: "86%" },
                  { label: "Location", value: "Pond 5" },
                  { label: "Last Sync", value: "3 mins ago" }
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex justify-between px-4 py-2 rounded-lg border border-gray-200 hover:shadow-md transition"
                  >
                    <span className="font-medium text-gray-500">
                      {item.label}
                    </span>
                    <span className="text-gray-500 font-semibold">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Section 2: Metrics */}
      {/* <div className="flex flex-col md:flex-row gap-4 mt-20 justify-start">
        <div className="w-full md:w-2/3 grid grid-rows-2 gap-4">
          <div className="bg-white rounded-lg p-4 flex flex-col gap-4">
            <h2 className="text-xl font-bold mb-4 border-b-2 border-gray-200">
              Sensor Performance
            </h2>

            {[
              { label: "pH Level", value: 7.2, max: 14, color: "green" },
              { label: "Turbidity (NTU)", value: 3.5, max: 10, color: "blue" },
              {
                label: "Temperature (°C)",
                value: 28.4,
                max: 50,
                color: "yellow"
              },
              {
                label: "Dissolved Oxygen (mg/L)",
                value: 6.8,
                max: 14,
                color: "yellow"
              }
            ].map((metric) => (
              <div key={metric.label} className="mb-3">
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>{metric.label}</span>
                  <span>{metric.value}</span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full">
                  <div
                    className={`h-2 rounded-full bg-${metric.color}-500`}
                    style={{ width: `${(metric.value / metric.max) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div> */}
    </div>
  );
}
