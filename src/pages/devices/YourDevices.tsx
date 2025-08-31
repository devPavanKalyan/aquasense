import { useState } from "react";

const YourDevices = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);

  const devices = [
    {
      id: 1,
      name: "Device A",
      status: "Running",
      type: "Fish Farming",
      location: ""
    },
    { id: 2, name: "Device B", status: "Stopped", type: "Irrigation" },
    { id: 3, name: "Device C", status: "Running", type: "Drinking Water" }
  ];

  const filteredDevices = devices.filter((device) => {
    return (
      device.name.toLowerCase().includes(search.toLowerCase()) &&
      (!statusFilter || device.status === statusFilter)
    );
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 text-gray-800">
      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="🔍 Search your devices..."
          className="w-full md:w-96 px-4 py-2 rounded-md border border-gray-300 bg-white text-sm font-medium shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
        />
      </div>

      {/* Grid layout */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Left Filters */}
        <aside className="md:col-span-1">
          <h3 className="text-lg font-semibold text-blue-600 mb-3">
            Filter by Status
          </h3>
          <div className="flex flex-col gap-2 text-sm font-medium text-gray-700">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="status"
                checked={statusFilter === null}
                onChange={() => setStatusFilter(null)}
                className="accent-blue-500"
              />
              All
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="status"
                checked={statusFilter === "Running"}
                onChange={() => setStatusFilter("Running")}
                className="accent-green-500"
              />
              Running
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="status"
                checked={statusFilter === "Stopped"}
                onChange={() => setStatusFilter("Stopped")}
                className="accent-red-500"
              />
              Not Running
            </label>
          </div>
        </aside>

        {/* Right Device List */}
        <section className="md:col-span-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDevices.map((device) => (
              <div
                key={device.id}
                className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition"
              >
                <h4 className="text-lg font-semibold text-gray-800 mb-1">
                  {device.name}
                </h4>
                <p className="text-sm text-gray-600">
                  <span className="font-medium text-gray-700">Status:</span>{" "}
                  <span
                    className={`font-semibold ${
                      device.status === "Running"
                        ? "text-green-600"
                        : "text-red-500"
                    }`}
                  >
                    {device.status}
                  </span>
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium text-gray-700">Type:</span>{" "}
                  {device.type}
                </p>
              </div>
            ))}

            {filteredDevices.length === 0 && (
              <p className="col-span-full text-center text-gray-500 font-medium">
                🚫 No devices match your filter.
              </p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default YourDevices;
