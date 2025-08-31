// import {
//   SettingsSuggest as AutomationIcon,
//   Lightbulb as BestPracticesIcon,
//   ArrowBackIosNew as CollapseIcon,
//   ArrowForwardIos as ExpandIcon,
//   Home as HomeIcon,
//   Analytics as InsightsIcon,
//   Inventory2 as InventoryIcon,
//   BarChart as ReportsIcon,
//   People as UsersIcon
// } from "@mui/icons-material";

// import React, { type ReactNode, useEffect, useState } from "react";
// import { Link, useLocation } from "react-router-dom";
// interface OverviewLayoutProps {
//   children: ReactNode;
// }
// export default function OverviewLayout({ children }: OverviewLayoutProps) {
//   const [open, setOpen] = useState(true);
//   const [isMobile, setIsMobile] = useState(false);
//   const location = useLocation();

//   useEffect(() => {
//     const handleResize = () => {
//       const mobile = window.innerWidth < 768;
//       setIsMobile(mobile);
//       if (mobile) setOpen(false);
//     };
//     window.addEventListener("resize", handleResize);
//     handleResize();
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   const nav = [
//     { label: "Home", path: "/", icon: <HomeIcon /> },
//     { label: "User Management", path: "/user-management", icon: <UsersIcon /> },
//     { label: "Automation", path: "/automation", icon: <AutomationIcon /> },
//     { label: "Inventory", path: "/inventory", icon: <InventoryIcon /> },
//     { label: "Reports", path: "/reports", icon: <ReportsIcon /> },
//     { label: "Insights", path: "/insights", icon: <InsightsIcon /> },
//     {
//       label: "Best Practices",
//       path: "/best-practices",
//       icon: <BestPracticesIcon />
//     }
//   ];

//   return (
//     <main
//       className={`flex-1 bg-gray-50 overflow-auto transition-all duration-300 ease-in-out ${
//         isMobile && open ? "blur-sm pointer-events-none" : ""
//       }`}
//     >
//       <div className="flex h-screen bg-white text-gray-800 overflow-hidden relative">
//         {/* Sidebar */}
//         <aside
//           className={`bg-white shadow-[2px_0_4px_-1px_rgba(0,0,0,0.1)] shadow-md transition-all duration-300 ease-in-out
//             ${open ? "w-64" : "w-16"} ${
//             isMobile && open ? "fixed z-50" : "relative"
//           } flex flex-col h-full`}
//         >
//           <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
//             {/* Logo or branding - you can keep your logo component here */}
//             <div className="flex items-center gap-2 min-w-0">
//               {/* Example logo or text */}
//               <span
//                 className={`text-lg font-semibold text-blue-600 transition-all duration-300 origin-left ${
//                   open
//                     ? "opacity-100 scale-100"
//                     : "opacity-0 scale-0 w-0 overflow-hidden"
//                 }`}
//               >
//                 VerseWave
//               </span>
//             </div>

//             {/* Toggle Button */}
//             <button
//               onClick={() => setOpen(!open)}
//               className="p-2 bg-white border border-gray-300 rounded-full shadow-sm
//                hover:shadow-md hover:bg-gray-100 focus:outline-none
//                transition-shadow duration-300 ease-in-out flex items-center justify-center"
//               title={open ? "Collapse sidebar" : "Expand sidebar"}
//               aria-label={open ? "Collapse sidebar" : "Expand sidebar"}
//               type="button"
//             >
//               {open ? (
//                 <CollapseIcon fontSize="small" className="text-gray-600" />
//               ) : (
//                 <ExpandIcon fontSize="small" className="text-gray-600" />
//               )}
//             </button>
//           </div>

//           {/* Navigation and Footer Wrapper */}
//           <div className="flex-1 flex flex-col justify-between overflow-hidden pt-2 transition-all duration-300">
//             {/* Navigation */}
//             <nav className="flex flex-col gap-1.5 px-2">
//               {nav.map(({ label, path, icon }) => (
//                 <Link
//                   key={label}
//                   to={path}
//                   className={`flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-blue-50 transition ${
//                     location.pathname === path
//                       ? "bg-blue-50 text-blue-600 font-semibold"
//                       : ""
//                   }`}
//                 >
//                   <span className="text-gray-600">
//                     {React.cloneElement(icon, { fontSize: "medium" })}
//                   </span>
//                   <span
//                     className={`text-sm font-medium text-gray-800 whitespace-nowrap transition-all duration-300 ${
//                       open ? "opacity-100" : "opacity-0 hidden"
//                     }`}
//                   >
//                     {label}
//                   </span>
//                 </Link>
//               ))}
//             </nav>

//             {/* Profile Section */}
//             <div
//               className={`border-t border-gray-200 px-4 py-4 flex items-center gap-3 transition-all duration-300
//                 ${open ? "opacity-100" : "opacity-0 hidden"}`}
//             >
//               <div className="w-10 h-10 rounded-full bg-gradient-to-r from-teal-400 via-blue-500 to-purple-600 flex items-center justify-center">
//                 <span className="text-white font-semibold">P</span>
//               </div>
//               <span className="text-sm font-medium text-gray-700">
//                 Pavan Kalyan
//               </span>
//             </div>
//           </div>
//         </aside>

//         {/* Main Content */}
//         <main
//           className={`flex-1 bg-gray-50 overflow-auto transition-all duration-300 ease-in-out ${
//             isMobile && open ? "blur-sm pointer-events-none" : ""
//           }`}
//         >
//           <div className="p-4 md:p-6">{children}</div>
//         </main>
//       </div>
//     </main>
//   );
// }

import {
  BarChart2,
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  Lightbulb,
  LineChart,
  Package,
  Settings,
  Users
} from "lucide-react";
import { type ReactNode, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

interface OverviewLayoutProps {
  children: ReactNode;
}

const navItems = [
  { label: "Home", path: "/", icon: LayoutDashboard },
  { label: "User Management", path: "/user-management", icon: Users },
  { label: "Automation", path: "/automation", icon: Settings },
  { label: "Inventory", path: "/inventory", icon: Package },
  { label: "Reports", path: "/reports", icon: BarChart2 },
  { label: "Insights", path: "/insights", icon: LineChart },
  { label: "Best Practices", path: "/best-practices", icon: Lightbulb }
];

export default function OverviewLayout({ children }: OverviewLayoutProps) {
  const [open, setOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) setOpen(false);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <main className="flex h-screen bg-white text-gray-800">
      <aside
        className={`transition-all duration-300 ease-in-out ${
          open ? "w-64" : "w-16"
        } ${isMobile && open ? "fixed z-50" : "relative"}
    border-r border-gray-200 flex flex-col h-full bg-white`}
      >
        {/* Top Bar */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
          <button
            onClick={() => setOpen(!open)}
            className="p-2 border border-gray-300 rounded-full hover:shadow-md"
            title={open ? "Collapse" : "Expand"}
          >
            {open ? (
              <ChevronLeft className="w-4 h-4 text-gray-600" />
            ) : (
              <ChevronRight className="w-4 h-4 text-gray-600" />
            )}
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
          {navItems.map(({ label, path, icon: Icon }) => {
            const isActive = location.pathname === path;
            return (
              <Link
                key={label}
                to={path}
                className={`flex items-center px-3 py-2 rounded-lg transition-colors duration-200 hover:bg-blue-50 cursor-default ${
                  isActive
                    ? "bg-blue-50 text-blue-600 font-semibold"
                    : "text-gray-700"
                }`}
              >
                <Icon className="w-4 h-4 min-w-[20px] text-gray-600" />
                <span
                  className={`ml-3 text-sm overflow-hidden transition-all duration-300 ease-in-out ${
                    open ? "opacity-100 w-auto" : "opacity-0 w-0"
                  }`}
                  style={{ whiteSpace: "nowrap" }}
                >
                  {label}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        {open && (
          <div className="border-t border-gray-200 px-4 py-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-teal-400 via-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
              P
            </div>
            <span className="text-sm font-medium">Pavan Kalyan</span>
          </div>
        )}
      </aside>

      <section
        className={`flex-1 overflow-auto transition-all duration-300 ${
          isMobile && open ? "blur-sm pointer-events-none" : ""
        }`}
      >
        <div className="p-5">{children}</div>
      </section>
    </main>
  );
}
