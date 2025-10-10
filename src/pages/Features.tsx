// const Features = () => {
//   const featureList = [
//     "Sensor Data Visualization",
//     "Predictive Maintenance",
//     "Custom Alert Rules",
//     "Cloud Sync & Offline Access",
//     "Device Control & Automation",
//     "Multi-Tenant Organization Management",
//     "Exportable Reports",
//     "Interactive Dashboards",
//     "Threshold-based Notification System"
//   ];

//   return (
//     <section className="bg-gradient-to-br from-white to-blue-50 px-6 py-24 min-h-screen font-sans text-gray-800">
//       <div className="max-w-6xl mx-auto text-center mb-16">
//         <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
//           Key Features
//         </h2>
//         <p className="text-lg text-gray-600">
//           Explore the powerful modules that make AquaSense the most intuitive
//           and flexible water analytics platform.
//         </p>
//       </div>

//       <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
//         {featureList.map((feature, idx) => (
//           <div
//             key={idx}
//             className="p-6 rounded-2xl bg-white hover:bg-blue-50 shadow-md border border-gray-100 transition"
//           >
//             <h3 className="text-blue-800 font-semibold text-lg mb-2">
//               {feature}
//             </h3>
//             <p className="text-sm text-gray-700">
//               Learn how this feature improves your operations.
//             </p>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default Features;

// Features.tsx
import {
  Activity,
  Cloud,
  Cpu,
  Droplet,
  Settings2,
  ShieldCheck
} from "lucide-react";
import React from "react";

const features = [
  {
    title: "AI-Driven Insights",
    desc: "Leverage machine learning to detect anomalies and optimize resource usage.",
    icon: <Cpu className="h-8 w-8 text-blue-600" />
  },
  {
    title: "Cloud Integration",
    desc: "Securely sync and access your data across platforms and teams in real time.",
    icon: <Cloud className="h-8 w-8 text-blue-600" />
  },
  {
    title: "Custom Configurations",
    desc: "Define triggers, alerts, and workflows tailored to your unique operations.",
    icon: <Settings2 className="h-8 w-8 text-blue-600" />
  },
  {
    title: "Water Quality Index",
    desc: "Comprehensive scoring system based on turbidity, pH, temperature & more.",
    icon: <Droplet className="h-8 w-8 text-blue-600" />
  },
  {
    title: "System Health Monitoring",
    desc: "Track device status, battery levels, and network connectivity.",
    icon: <Activity className="h-8 w-8 text-blue-600" />
  },
  {
    title: "Data Privacy & Security",
    desc: "End-to-end encryption and secure access controls to protect your data.",
    icon: <ShieldCheck className="h-8 w-8 text-blue-600" />
  }
];

const Features: React.FC = () => {
  return (
    <section className="bg-gray-50 py-28 px-4 sm:px-8 lg:px-12 font-sans">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6">
          Platform <span className="text-blue-600">Features</span>
        </h2>
        <p className="text-lg sm:text-xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed">
          AquaSense offers an end-to-end platform for intelligent water system
          management with rich features that scale with your needs.
        </p>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-white border border-gray-200 rounded-2xl p-6 text-left shadow-sm hover:shadow-md transition duration-300"
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

export default Features;
