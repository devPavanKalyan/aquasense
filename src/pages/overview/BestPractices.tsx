// export default function BestPractices() {
//   return (
//     <div className="prose max-w-none p-6">
//       <h1>Best Practices</h1>
//       <section>
//         <h2>Authentication & Authorization</h2>
//         <ul>
//           <li>Use OAuth2 with PKCE for public clients.</li>
//           <li>
//             Implement JWT with short-lived access tokens and refresh tokens.
//           </li>
//           <li>
//             Enforce role-based access control (RBAC) on protected endpoints.
//           </li>
//         </ul>
//       </section>

//       <section>
//         <h2>UI/UX</h2>
//         <ul>
//           <li>
//             Keep navigation consistent across layouts using shared components.
//           </li>
//           <li>Provide clear loading and error states for asynchronous data.</li>
//           <li>Ensure mobile responsiveness and keyboard accessibility.</li>
//         </ul>
//       </section>

//       <section>
//         <h2>Code Quality</h2>
//         <ul>
//           <li>Write self-documenting code with TypeScript interfaces.</li>
//           <li>Use linting and Prettier for consistent style enforcement.</li>
//           <li>Cover critical paths with unit and integration tests.</li>
//         </ul>
//       </section>

//       <section>
//         <h2>Performance & Scalability</h2>
//         <ul>
//           <li>
//             Lazy-load routes and components to reduce initial bundle size.
//           </li>
//           <li>
//             Cache API responses where possible (e.g., using SWR or React Query).
//           </li>
//           <li>
//             Use memoization (e.g., `React.memo`, `useMemo`) for expensive
//             renders.
//           </li>
//         </ul>
//       </section>
//     </div>
//   );
// }

import { CheckCircle, Lightbulb } from "lucide-react";

export default function BestPractices() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 text-[16px] font-inter text-gray-800">
      {/* Header */}
      <header className="text-center space-y-3">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
          Water Quality Best Practices
        </h1>
        <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto">
          Enhance your system's efficiency and reliability by applying proven
          methods for monitoring, analysis, and device management.
        </p>
      </header>

      {/* Expert Tips */}
      <section>
        <h2 className="text-xl sm:text-2xl font-bold text-blue-700 mb-6 flex items-center gap-2">
          <Lightbulb className="text-yellow-400" size={22} /> Expert Tips
        </h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-sm text-gray-700">
          {[
            "Calibrate your sensors weekly to ensure data accuracy.",
            "Configure time-based thresholds for parameters like pH and DO.",
            "Group devices by zones for improved visibility and alert control.",
            "Sync logs more frequently during peak periods.",
            "Use CSV exports for efficient compliance reporting.",
            "Review trend analytics weekly to identify slow changes."
          ].map((tip, i) => (
            <li
              key={i}
              className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow transition"
            >
              <span className="block font-semibold text-blue-700 mb-1">
                Tip {i + 1}
              </span>
              <p>{tip}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Checklist */}
      <section>
        <h2 className="text-xl sm:text-2xl font-bold text-green-700 mb-4 flex items-center gap-2">
          <CheckCircle className="text-green-500" size={22} /> Setup Checklist
        </h2>
        <ul className="list-disc list-inside text-sm text-gray-800 space-y-2 pl-2 font-medium">
          <li>Map all devices to locations and assign clear tags.</li>
          <li>Configure alert escalation paths for critical parameters.</li>
          <li>Define operational sync times based on real-world usage.</li>
          <li>Schedule team training for interpreting alerts and actions.</li>
          <li>Enable backup exports and alert forwarding to emails.</li>
        </ul>
      </section>
    </div>
  );
}
