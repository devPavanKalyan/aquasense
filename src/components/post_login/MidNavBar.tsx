// // import { BarChart2, Cpu, Eye, Home, Menu, Users } from "lucide-react";
// // import { JSX, useEffect, useLayoutEffect, useRef, useState } from "react";
// // import { Link, useLocation } from "react-router-dom";
// // import ScrollableTabs from "./ScrollableTabs";

// // interface NavItem {
// //   id: string;
// //   label: string;
// //   slug: string;
// //   icon: JSX.Element;
// // }
// // const navItems: NavItem[] = [
// //   {
// //     id: "item1",
// //     label: "Overview",
// //     slug: "",
// //     icon: <Home className="w-5 h-5 text-gray-600" />
// //   },
// //   {
// //     id: "item2",
// //     label: "IAM management",
// //     slug: "iam-management",
// //     icon: <Users className="w-5 h-5 text-gray-600" />
// //   },
// //   {
// //     id: "item3",
// //     label: "Devices",
// //     slug: "devices",
// //     icon: <Cpu className="w-5 h-5 text-gray-600" />
// //   },
// //   {
// //     id: "item4",
// //     label: "Analytics",
// //     slug: "analytics",
// //     icon: <BarChart2 className="w-5 h-5 text-gray-600" />
// //   },
// //   {
// //     id: "item5",
// //     label: "Insights",
// //     slug: "insights",
// //     icon: <Eye className="w-5 h-5 text-gray-600" />
// //   }
// // ];

// // export const MidNavBar: React.FC = () => {
// //   const navRef = useRef<HTMLElement>(null);
// //   const itemRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
// //   const widths = useRef<Record<string, number>>({});

// //   const [visibleItems, setVisibleItems] = useState(navItems);
// //   const [overflowItems, setOverflowItems] = useState<NavItem[]>([]);
// //   const [menuOpen, setMenuOpen] = useState(false);

// //   const { pathname, search } = useLocation();
// //   const currentTab = new URLSearchParams(search).get("tab") || "";
// //   const isOverviewActive = currentTab === "" && pathname === "/versewave";

// //   useLayoutEffect(() => {
// //     navItems.forEach((it) => {
// //       const el = itemRefs.current[it.id];
// //       if (el) widths.current[it.id] = el.offsetWidth + 8;
// //     });
// //     adjustItems();
// //   }, []);

// //   useEffect(() => {
// //     window.addEventListener("resize", adjustItems);
// //     return () => window.removeEventListener("resize", adjustItems);
// //   }, [visibleItems, overflowItems]);

// //   function adjustItems() {
// //     const maxW = (navRef.current?.offsetWidth || 0) - 48;
// //     let vis = [...visibleItems],
// //       ovf = [...overflowItems];
// //     const total = () =>
// //       vis.reduce((s, it) => s + (widths.current[it.id] || 0), 0);

// //     while (vis.length && total() >= maxW) ovf.unshift(vis.pop()!);
// //     while (ovf.length && total() + (widths.current[ovf[0].id] || 0) < maxW)
// //       vis.push(ovf.shift()!);

// //     setVisibleItems(vis);
// //     setOverflowItems(ovf);
// //   }

// //   return (
// //     <div className="bg-white shadow px-4 py-2 relative min-h-[3rem]">
// //       <nav ref={navRef} className="w-full">
// //         <div className="flex gap-2 items-center">
// //           {visibleItems.map((it) => {
// //             const to = `/${it.slug ? `?tab=${it.slug}` : ""}`;
// //             const active =
// //               it.slug === "" ? isOverviewActive : currentTab === it.slug;
// //             return (
// //               <ScrollableTabs>
// //                 <Link
// //                   key={it.id}
// //                   ref={(el) => {
// //                     itemRefs.current[it.id] = el;
// //                   }}
// //                   to={to}
// //                   className={`flex items-center px-4 py-2 whitespace-nowrap rounded-md font-medium transition ${
// //                     active
// //                       ? "border-b-2 border-blue-600 text-blue-600"
// //                       : "text-gray-700 hover:bg-blue-50"
// //                   }`}
// //                 >
// //                   {it.icon}
// //                   <span className="ml-2">{it.label}</span>
// //                 </Link>
// //               </ScrollableTabs>
// //             );
// //           })}
// //         </div>

// //         {overflowItems.length > 0 && (
// //           <div className="absolute right-4 top-2">
// //             <button
// //               onClick={() => setMenuOpen((o) => !o)}
// //               className="p-2 rounded-md hover:bg-gray-100"
// //             >
// //               <Menu className="w-5 h-5 text-gray-600" />
// //             </button>
// //             {menuOpen && (
// //               <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-10">
// //                 {overflowItems.map((it) => (
// //                   <Link
// //                     key={it.id}
// //                     to={`/${it.slug ? `?tab=${it.slug}` : ""}`}
// //                     className="flex items-center px-4 py-2 hover:bg-gray-100"
// //                   >
// //                     {it.icon}
// //                     <span className="ml-2">{it.label}</span>
// //                   </Link>
// //                 ))}
// //               </div>
// //             )}
// //           </div>
// //         )}
// //       </nav>
// //     </div>
// //   );
// // };

// import {
//   NotificationsActive as AlertsIcon,
//   Dashboard as DashboardIcon
// } from "@mui/icons-material";
// import { BarChart2, Cpu, Home } from "lucide-react";
// import type { JSX } from "react";
// import { Link, useLocation } from "react-router-dom";
// import ScrollableTabs from "../hooks/ScrollableTabs";

// interface NavItem {
//   id: string;
//   label: string;
//   slug: string;
//   icon: JSX.Element;
// }

// const navItems: NavItem[] = [
//   {
//     id: "item1",
//     label: "Overview",
//     slug: "",
//     icon: <Home className="w-4 h-4 text-gray-600" />
//   },

//   {
//     id: "item2",
//     label: "Live monitoring",
//     slug: "dashboard",
//     icon: <DashboardIcon className="w-4 h-4 text-gray-600" />
//   },
//   {
//     id: "item3",
//     label: "Devices",
//     slug: "devices",
//     icon: <Cpu className="w-4 h-4 text-gray-600" />
//   },
//   {
//     id: "item4",
//     label: "Analytics",
//     slug: "analytics",
//     icon: <BarChart2 className="w-4 h-4 text-gray-600" />
//   },
//   {
//     id: "item5",
//     label: "Alerts",
//     slug: "alerts",
//     icon: <AlertsIcon className="w-4 h-4 text-gray-600" />
//   }
// ];

// export const MidNavBar: React.FC = () => {
//   const { pathname } = useLocation();

//   return (
//     <div className="bg-white shadow px-4 py-2 relative min-h-[3rem]">
//       <nav className="w-full">
//         <ScrollableTabs>
//           <div className="flex gap-1 items-center">
//             {navItems.map((it) => {
//               const to = `/${it.slug}`;
//               const active =
//                 pathname === to ||
//                 (it.slug === "" && pathname === "/versewave");
//               return (
//                 <Link
//                   key={it.id}
//                   to={to}
//                   className={`flex items-center px-4 py-2 whitespace-nowrap rounded-md transition text-sm font-medium text-gray-800 ${
//                     active
//                       ? "border-b-2 border-blue-600 text-blue-600"
//                       : "text-gray-700 hover:bg-blue-50"
//                   }`}
//                 >
//                   {it.icon}
//                   <span className="ml-2">{it.label}</span>
//                 </Link>
//               );
//             })}
//           </div>
//         </ScrollableTabs>
//       </nav>
//     </div>
//   );
// };

import {
  ActivitySquare,
  AlertCircle,
  BarChart2,
  Cpu,
  Home
} from "lucide-react";
import type { JSX } from "react";
import { Link, useLocation } from "react-router-dom";
import ScrollableTabs from "../../hooks/ScrollableTabs";

interface NavItem {
  id: string;
  label: string;
  slug: string;
  icon: JSX.Element;
}

const navItems: NavItem[] = [
  {
    id: "item1",
    label: "Overview",
    slug: "",
    icon: <Home className="w-4 h-4 text-gray-600" />
  },
  {
    id: "item2",
    label: "Live Monitoring",
    slug: "monitoring",
    icon: <ActivitySquare className="w-4 h-4 text-gray-600" />
  },
  {
    id: "item3",
    label: "Devices",
    slug: "devices",
    icon: <Cpu className="w-4 h-4 text-gray-600" />
  },
  {
    id: "item4",
    label: "Analytics",
    slug: "analytics",
    icon: <BarChart2 className="w-4 h-4 text-gray-600" />
  },
  {
    id: "item5",
    label: "Alerts",
    slug: "alerts",
    icon: <AlertCircle className="w-4 h-4 text-gray-600" />
  }
];

export const MidNavBar: React.FC = () => {
  const { pathname } = useLocation();

  return (
    <div className="bg-white relative min-h-[2rem] border-b border-gray-200 flex flex-col justify-end px-5">
      <nav className="w-full h-full">
        <ScrollableTabs>
          <div className="flex gap-5 items-center">
            {navItems.map((it) => {
              const to = `/${it.slug}`;
              const active =
                pathname === to ||
                (it.slug === "" && pathname === "/versewave");

              return (
                <Link
                  key={it.id}
                  to={to}
                  className="relative flex flex-col items-start px-2 pt-2 text-sm font-medium transition whitespace-nowrap"
                >
                  <div className="flex items-center gap-2">
                    {it.icon}
                    <span>{it.label}</span>
                  </div>

                  <span
                    className={`mt-1 h-[3px] w-full rounded-sm transition ${
                      active ? "bg-blue-600" : ""
                    }`}
                  />
                </Link>
              );
            })}
          </div>
        </ScrollableTabs>
      </nav>
    </div>
  );
};
