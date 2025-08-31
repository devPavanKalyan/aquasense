// import { Settings, ShieldCheck } from "lucide-react";

// export default function IamManagementLayout() {
//   return (
//     <div className="px-6 py-8 max-w-7xl mx-auto">
//       {/* Page Header */}
//       <div className="mb-10">
//         <h2 className="text-3xl font-extrabold text-gray-800 mb-2">
//           IAM Management
//         </h2>
//         <p className="text-gray-600 text-sm max-w-xl">
//           Manage roles, permissions, and access control across your
//           organization. Assign roles to staff, monitor user activity, and ensure
//           data security.
//         </p>
//       </div>

//       {/* Roles and Permissions Summary */}
//       <section className="mb-12">
//         <h3 className="text-xl font-bold text-gray-700 mb-4 flex items-center gap-2">
//           <ShieldCheck className="text-blue-500" size={20} /> Role Overview
//         </h3>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           {[
//             { label: "Admins", count: 3 },
//             { label: "Staff", count: 12 },
//             { label: "Viewers", count: 7 }
//           ].map((item, idx) => (
//             <div
//               key={idx}
//               className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition"
//             >
//               <h4 className="text-lg font-semibold text-gray-800 mb-1">
//                 {item.label}
//               </h4>
//               <p className="text-sm text-gray-500">{item.count} active users</p>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Action Center */}
//       <section>
//         <h3 className="text-xl font-bold text-gray-700 mb-4 flex items-center gap-2">
//           <Settings className="text-green-500" size={20} /> Actions &
//           Configuration
//         </h3>
//         <ul className="space-y-3 text-sm text-gray-700">
//           <li className="hover:text-blue-600 cursor-pointer transition">
//             ➕ Add a new user
//           </li>
//           <li className="hover:text-blue-600 cursor-pointer transition">
//             🔁 Modify role assignments
//           </li>
//           <li className="hover:text-blue-600 cursor-pointer transition">
//             🔒 Configure multi-factor authentication
//           </li>
//           <li className="hover:text-blue-600 cursor-pointer transition">
//             📜 Audit user access logs
//           </li>
//         </ul>
//       </section>
//     </div>
//   );
// }

import { Construction } from "lucide-react";

const IamManagementLayout: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center py-10 px-4">
      <Construction className="w-12 h-12 text-yellow-500 animate-bounce mb-4" />
      <h2 className="text-xl font-semibold text-gray-800">
        IamManagementLayout is Coming Soon
      </h2>
      <p className="text-gray-600 mt-2 max-w-md">
        We're working hard to bring you powerful IamManagementLayout features.
        Stay tuned for updates!
      </p>
    </div>
  );
};

export default IamManagementLayout;
