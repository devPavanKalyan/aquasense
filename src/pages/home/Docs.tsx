// const Docs = () => {
//   return (
//     <div className="bg-white px-6 py-20 min-h-screen font-sans text-gray-800">
//       <div className="max-w-4xl mx-auto">
//         <h1 className="text-4xl font-bold text-gray-900 mb-6 text-center">
//           Developer Documentation
//         </h1>
//         <p className="text-lg text-gray-600 mb-12 text-center">
//           Everything you need to integrate, configure, and extend AquaSense APIs
//           and tools.
//         </p>
//         <ul className="space-y-6">
//           {[
//             "Getting Started",
//             "API Reference",
//             "WebSocket Streaming",
//             "Authentication & Security",
//             "Device Setup",
//             "FAQ"
//           ].map((item, idx) => (
//             <li
//               key={idx}
//               className="bg-blue-50 hover:bg-blue-100 rounded-md px-5 py-4 transition shadow-sm cursor-pointer"
//             >
//               <h3 className="text-lg font-semibold text-blue-700">{item}</h3>
//               <p className="text-sm text-gray-600 mt-1">
//                 Click to explore {item.toLowerCase()}.
//               </p>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default Docs;

// Docs.tsx
import { BookOpenText, Code, ExternalLink, ServerCog } from "lucide-react";
import React from "react";

const docsLinks = [
  {
    title: "Getting Started",
    desc: "Learn how to install, configure, and deploy AquaSense in minutes.",
    icon: <BookOpenText className="h-8 w-8 text-blue-600" />,
    href: "#"
  },
  {
    title: "API Reference",
    desc: "Detailed REST API documentation with examples and authentication flows.",
    icon: <Code className="h-8 w-8 text-blue-600" />,
    href: "#"
  },
  {
    title: "Deployment Guide",
    desc: "Set up AquaSense on-premise or in cloud environments with Docker/Kubernetes.",
    icon: <ServerCog className="h-8 w-8 text-blue-600" />,
    href: "#"
  }
];

const Docs: React.FC = () => {
  return (
    <section className="bg-white py-28 px-4 sm:px-8 lg:px-12 font-sans">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6">
          Developer <span className="text-blue-600">Docs</span>
        </h2>
        <p className="text-lg sm:text-xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed">
          Dive into AquaSense's developer resources to build powerful
          integrations, manage deployments, and explore our APIs.
        </p>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
          {docsLinks.map((doc) => (
            <a
              key={doc.title}
              href={doc.href}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-50 border border-blue-100 rounded-2xl p-6 text-left shadow hover:shadow-md hover:bg-blue-100/30 transition duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                {doc.icon}
                <ExternalLink className="h-4 w-4 text-gray-500" />
              </div>
              <h3 className="text-xl font-semibold text-blue-900 mb-2">
                {doc.title}
              </h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                {doc.desc}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Docs;
