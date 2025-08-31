// Overview.tsx
import { AlertTriangle, Clock3, LineChart, SatelliteDish } from "lucide-react";
import React from "react";

const features = [
  {
    title: "Real-Time Monitoring",
    desc: "Get up-to-the-minute updates on pH, temperature, turbidity, and more.",
    icon: <Clock3 className="h-8 w-8 text-blue-600" />
  },
  {
    title: "Predictive Analytics",
    desc: "Forecast water demands, leak risks, and optimal irrigation schedules.",
    icon: <LineChart className="h-8 w-8 text-blue-600" />
  },
  {
    title: "Smart Alerts",
    desc: "Automated alerts when parameters deviate from safe thresholds.",
    icon: <AlertTriangle className="h-8 w-8 text-blue-600" />
  },
  {
    title: "Remote Access",
    desc: "Manage water systems anytime, anywhere through our secure cloud dashboard.",
    icon: <SatelliteDish className="h-8 w-8 text-blue-600" />
  }
];

const Overview: React.FC = () => {
  return (
    <section className="bg-white py-28 px-4 sm:px-8 lg:px-12 font-sans">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6">
          <span className="text-blue-600">AquaSense</span>: The Future of Water
          Intelligence
        </h2>
        <p className="text-lg sm:text-xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed">
          AquaSense seamlessly integrates AI, IoT, and data analytics to deliver
          real-time insights into your water systems. From aquaculture to city
          utilities, our platform empowers smarter, faster, and more sustainable
          decisions.
        </p>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 max-w-5xl mx-auto">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-blue-50 border border-blue-100 rounded-2xl p-6 text-left shadow hover:shadow-md transition duration-300"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-blue-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Overview;
