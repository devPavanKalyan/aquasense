import { BarChart3, CheckCircle, Lightbulb } from "lucide-react";

const InsightsAndBestPractices = () => {
  return (
    <div className="px-6 py-8 max-w-7xl mx-auto text-gray-800">
      {/* Header */}
      <div className="mb-10 text-center">
        <h2 className="text-4xl font-extrabold text-blue-600 mb-2">
          Insights & Best Practices
        </h2>
        <p className="text-gray-600 text-base max-w-2xl mx-auto font-medium">
          Learn how to improve water quality monitoring, streamline device
          operations, and optimize alerts through expert tips and real-world
          success stories.
        </p>
      </div>

      {/* Tips Section */}
      <section className="mb-12">
        <h3 className="text-2xl font-bold text-blue-600 mb-6 flex items-center gap-2">
          <Lightbulb className="text-yellow-400" size={24} />
          Top Expert Tips
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            "Calibrate sensors weekly for reliable accuracy.",
            "Set thresholds based on time-based patterns (e.g. early morning pH dips).",
            "Use device zones to improve visibility and alert clarity.",
            "Review monthly trends to catch slow changes early.",
            "Enable automatic CSV exports for seamless reporting.",
            "Sync device logs hourly during critical periods."
          ].map((tip, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition"
            >
              <h4 className="text-lg font-semibold text-blue-700 mb-2">
                Tip {index + 1}
              </h4>
              <p className="text-sm text-gray-700">{tip}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Story Section */}
      <section className="mb-12">
        <h3 className="text-2xl font-bold text-blue-600 mb-4 flex items-center gap-2">
          <BarChart3 className="text-blue-500" size={22} />
          Success Spotlight
        </h3>
        <div className="bg-blue-50 border-l-4 border-blue-400 rounded-lg p-6 shadow-sm">
          <p className="text-sm text-gray-700 leading-relaxed">
            <strong className="text-gray-800">PondMax Aquaculture</strong>{" "}
            implemented AquaSense in mid-2024 and experienced a{" "}
            <span className="text-blue-700 font-semibold">37% reduction</span>{" "}
            in DO-related issues. By configuring peak-hour syncing and adaptive
            alerting during feeding, they reduced response times and improved
            yield quality across all ponds.
          </p>
        </div>
      </section>

      {/* Checklist Section */}
      <section>
        <h3 className="text-2xl font-bold text-blue-600 mb-4 flex items-center gap-2">
          <CheckCircle className="text-green-500" size={22} />
          Quick Setup Checklist
        </h3>
        <ul className="list-disc list-inside text-sm text-gray-700 space-y-2 font-medium">
          <li>Organize devices by location or farm zone</li>
          <li>Set parameter-specific alert thresholds</li>
          <li>Schedule sync based on operational hours</li>
          <li>Share weekly reports with team leads</li>
          <li>Train team on alert escalation workflow</li>
        </ul>
      </section>
    </div>
  );
};

export default InsightsAndBestPractices;
