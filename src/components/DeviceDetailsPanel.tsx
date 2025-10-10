import React from "react";

interface DeviceDetailsPanelProps {
  l1: string;
  l2: string;
  l3: string;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  level2Label: string;
}

const DeviceDetailsPanel: React.FC<DeviceDetailsPanelProps> = ({
  l1,
  l2,
  l3,
  activeTab,
  setActiveTab,
  level2Label
}) => {
  const tabs = [
    "Device Details",
    "Configuration",
    "Live Metrics",
    "Alerts",
    "Reports",
    "Diagnostics",
    "Firmware",
    "Control"
  ];

  return (
    <div className="w-full max-w-full xl:max-w-sm bg-white rounded-xl shadow-lg border border-gray-200 p-6">
      <h4 className="text-xl font-semibold text-gray-800 mb-4">Device Tools</h4>

      <div className="flex flex-wrap gap-2 mb-5">
        {tabs.map((tab) => (
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
      <div className="text-sm text-gray-700 space-y-3 leading-relaxed">
        {activeTab === "Device Details" && (
          <ul className="space-y-1 pl-4 list-disc marker:text-blue-500">
            <li>
              <b>Device ID:</b> AQ-{l1}
              {l2}
              {l3}
            </li>
            <li>
              <b>Battery:</b> 86%
            </li>
            <li>
              <b>Location:</b> {level2Label}
            </li>
            <li>
              <b>Last Sync:</b> 3 mins ago
            </li>
          </ul>
        )}
        {activeTab === "Configuration" && (
          <ul className="space-y-1 pl-4 list-disc marker:text-green-500">
            <li>
              <b>Mode:</b> Auto
            </li>
            <li>
              <b>Sync Time:</b> 04:30 AM
            </li>
            <li>
              <b>Sampling Rate:</b> 10s
            </li>
          </ul>
        )}
        {activeTab === "Live Metrics" && (
          <ul className="space-y-1 pl-4 list-disc marker:text-purple-500">
            <li>pH Level</li>
            <li>Dissolved Oxygen</li>
            <li>Temperature</li>
            <li>Conductivity</li>
            <li>Turbidity</li>
          </ul>
        )}
        {activeTab === "Alerts" && (
          <p className="pl-4 text-red-600 font-medium">Configured for pH, DO</p>
        )}
        {activeTab === "Reports" && (
          <p className="pl-4 text-blue-600 hover:underline cursor-pointer">
            ⬇ Download CSV (Last 100 Records)
          </p>
        )}
        {activeTab === "Diagnostics" && (
          <ul className="space-y-1 pl-4 list-disc marker:text-yellow-500">
            <li>
              <b>Battery:</b> 86%
            </li>
            <li>
              <b>Last Sync:</b> 3 mins ago
            </li>
            <li>
              <b>Signal:</b> Good
            </li>
          </ul>
        )}
        {activeTab === "Firmware" && (
          <p className="pl-4">
            v1.2.3{" "}
            <span className="text-gray-500">• Last updated: Mar 2025</span>
          </p>
        )}
        {activeTab === "Control" && (
          <ul className="space-y-2 pl-4 list-disc marker:text-indigo-500">
            {["Restart Device", "Force Sync", "Switch Mode"].map((label) => (
              <li key={label}>
                <button className="text-indigo-600 hover:underline">
                  {label}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default DeviceDetailsPanel;
