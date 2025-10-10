// type MenuNode = {
//   label: string;
//   children?: Record<string, MenuNode>;
// };

// const MENU: Record<string, MenuNode> = {};

// export default function MultiLevelMenu() {
//   // Level 1 initialization
//   const level1Keys = Object.keys(MENU);
//   const firstL1 = level1Keys[0];
//   const [level1, setLevel1] = useState<string>(firstL1);

//   // Level 2 derived + init
//   const level2Keys = Object.keys(MENU[level1].children ?? {});
//   const firstL2 = level2Keys[0];
//   const [level2, setLevel2] = useState<string>(firstL2);

//   // Level 3 derived + init
//   const level3Keys = MENU[level1].children![level2].children
//     ? Object.keys(MENU[level1].children![level2].children!)
//     : [];
//   const firstL3 = level3Keys[0] ?? null;
//   const [level3, setLevel3] = useState<string | null>(firstL3);

//   // Handlers that reset deeper levels on change
//   const onSelectLevel1 = (key: string) => {
//     const newL2Keys = Object.keys(MENU[key].children ?? {});
//     const newL2 = newL2Keys[0];
//     const newL3Keys = MENU[key].children![newL2].children
//       ? Object.keys(MENU[key].children![newL2].children!)
//       : [];
//     setLevel1(key);
//     setLevel2(newL2);
//     setLevel3(newL3Keys[0] ?? null);
//   };

//   const onSelectLevel2 = (key: string) => {
//     const newL3Keys = MENU[level1].children![key].children
//       ? Object.keys(MENU[level1].children![key].children!)
//       : [];
//     setLevel2(key);
//     setLevel3(newL3Keys[0] ?? null);
//   };

//   return (
//     <div className="p-4 space-y-4">
//       {/* Level 1 */}
//       <div className="flex space-x-4 border-b pb-2">
//         {level1Keys.map((key) => (
//           <button
//             key={key}
//             className={`px-3 py-1 font-medium ${
//               level1 === key
//                 ? "text-blue-600 border-b-2 border-blue-600"
//                 : "hover:text-blue-400"
//             }`}
//             onClick={() => onSelectLevel1(key)}
//           >
//             {MENU[key].label}
//           </button>
//         ))}
//       </div>

//       {/* Level 2 */}
//       {level2Keys.length > 0 && (
//         <div className="flex space-x-4 border-b pb-2 pl-4">
//           {level2Keys.map((key) => (
//             <button
//               key={key}
//               className={`px-3 py-1 ${
//                 level2 === key
//                   ? "text-green-600 border-b-2 border-green-600"
//                   : "hover:text-green-400"
//               }`}
//               onClick={() => onSelectLevel2(key)}
//             >
//               {MENU[level1].children![key].label}
//             </button>
//           ))}
//         </div>
//       )}

//       {/* Level 3 */}
//       {level3Keys.length > 0 && (
//         <div className="flex space-x-4 pl-8">
//           {level3Keys.map((key) => (
//             <button
//               key={key}
//               className={`px-3 py-1 ${
//                 level3 === key
//                   ? "text-purple-600 border-b-2 border-purple-600"
//                   : "hover:text-purple-400"
//               }`}
//               onClick={() => setLevel3(key)}
//             >
//               {MENU[level1].children![level2].children![key].label}
//             </button>
//           ))}
//         </div>
//       )}

//       {/* Summary panel when a device is selected */}
//       {level3 && (
//         <div className="mt-4 p-4 bg-gray-100 rounded-md">
//           {`${
//             MENU[level1].children![level2].children![level3].label
//           } assigned ${MENU[level1].children![level2].label} metrics`}
//         </div>
//       )}
//     </div>
//   );
// }

// type MenuNode = {
//   label: string;
//   children?: Record<string, MenuNode>;
// };

// // Initial static menu
// const INITIAL_MENU: Record<string, MenuNode> = {
//   "1": {
//     label: "Fish Farming",
//     children: {
//       "1": {
//         label: "Pond A",
//         children: {
//           "1": { label: "Device 01" },
//           "2": { label: "Device 02" }
//         }
//       },
//       "2": {
//         label: "Pond B",
//         children: {
//           "1": { label: "Device 01" }
//         }
//       },
//       "3": {
//         label: "Pond C",
//         children: {
//           "1": { label: "Device 01" }
//         }
//       }
//     }
//   },
//   "2": {
//     label: "Agriculture",
//     children: {
//       "1": {
//         label: "East Field",
//         children: {
//           "1": { label: "East Device" }
//         }
//       },
//       "2": {
//         label: "West Field",
//         children: {
//           "1": { label: "West Device" }
//         }
//       }
//     }
//   },
//   "3": {
//     label: "Water Tanks",
//     children: {
//       "1": {
//         label: "First Floor Tank",
//         children: {
//           "1": { label: "Tank 1" }
//         }
//       },
//       "2": {
//         label: "Second Floor Tank",
//         children: {
//           "1": { label: "Tank 2" }
//         }
//       }
//     }
//   }
// };

// export default function MultiLevelMenu() {
//   // 1️⃣ Keep menu data and top‑level order in state
//   const [menu] = useState<Record<string, MenuNode>>(INITIAL_MENU);
//   const [level1Order, setLevel1Order] = useState<string[]>(
//     Object.keys(INITIAL_MENU)
//   );

//   // Selected keys
//   const [level1, setLevel1] = useState<string>(level1Order[0]);
//   const [level2, setLevel2] = useState<string>(
//     Object.keys(menu[level1].children!)[0]
//   );
//   const [level3, setLevel3] = useState<string | null>(
//     Object.keys(menu[level1].children![level2].children!)[0]
//   );

//   // Helper to reorder level1
//   function moveLevel1(from: number, to: number) {
//     const updated = [...level1Order];
//     const [moved] = updated.splice(from, 1);
//     updated.splice(to, 0, moved);
//     setLevel1Order(updated);
//   }

//   // Derive level2 & level3 orders from current selection
//   const level2Order = level1 ? Object.keys(menu[level1].children!) : [];
//   const level3Order =
//     level1 && level2
//       ? Object.keys(menu[level1].children![level2].children!)
//       : [];

//   return (
//     <div className="p-4 space-y-4">
//       {/* Level 1 with reorder controls */}
//       <div className="flex items-center space-x-2 border-b pb-2">
//         {level1Order.map((key, idx) => (
//           <div key={key} className="flex items-center">
//             <button
//               onClick={() => setLevel1(key)}
//               className={`px-3 py-1 font-medium ${
//                 level1 === key
//                   ? "text-blue-600 border-b-2 border-blue-600"
//                   : "hover:text-blue-400"
//               }`}
//             >
//               {menu[key].label}
//             </button>
//             <div className="flex flex-col ml-1">
//               <button
//                 disabled={idx === 0}
//                 onClick={() => moveLevel1(idx, idx - 1)}
//                 className="p-1 hover:bg-gray-100 rounded"
//               >
//                 <ArrowUp size={12} />
//               </button>
//               <button
//                 disabled={idx === level1Order.length - 1}
//                 onClick={() => moveLevel1(idx, idx + 1)}
//                 className="p-1 hover:bg-gray-100 rounded"
//               >
//                 <ArrowDown size={12} />
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Level 2 (similar pattern without reorder for brevity) */}
//       {level2Order.length > 0 && (
//         <div className="flex space-x-4 border-b pb-2 pl-4">
//           {level2Order.map((key) => (
//             <button
//               key={key}
//               className={`px-3 py-1 ${
//                 level2 === key
//                   ? "text-green-600 border-b-2 border-green-600"
//                   : "hover:text-green-400"
//               }`}
//               onClick={() => setLevel2(key)}
//             >
//               {menu[level1].children![key].label}
//             </button>
//           ))}
//         </div>
//       )}

//       {/* Level 3 */}
//       {level3Order.length > 0 && (
//         <div className="flex space-x-4 pl-8">
//           {level3Order.map((key) => (
//             <button
//               key={key}
//               className={`px-3 py-1 ${
//                 level3 === key
//                   ? "text-purple-600 border-b-2 border-purple-600"
//                   : "hover:text-purple-400"
//               }`}
//               onClick={() => setLevel3(key)}
//             >
//               {menu[level1].children![level2].children![key].label}
//             </button>
//           ))}
//         </div>
//       )}

//       {/* Summary panel */}
//       {level3 && (
//         <div className="mt-4 p-4 bg-gray-100 rounded-md">
//           {`${
//             menu[level1].children![level2].children![level3].label
//           } assigned ${menu[level1].children![level2].label} metrics`}
//         </div>
//       )}
//     </div>
//   );
// }

// import React, { useEffect, useRef, useState } from "react";

// type MenuNode = {
//   label: string;
//   children?: Record<string, MenuNode>;
// };

// // Your menu structure
// const INITIAL_MENU: Record<string, MenuNode> = {
//   "1": {
//     label: "Fish Farming",
//     children: {
//       "1": {
//         label: "Pond A",
//         children: {
//           "1": { label: "Device 01" },
//           "2": { label: "Device 02" }
//         }
//       },
//       "2": {
//         label: "Pond B",
//         children: { "1": { label: "Device 01" } }
//       },
//       "3": {
//         label: "Pond C",
//         children: { "1": { label: "Device 01" } }
//       }
//     }
//   },
//   "2": {
//     label: "Agriculture",
//     children: {
//       "1": {
//         label: "East Field",
//         children: { "1": { label: "East Device" } }
//       },
//       "2": {
//         label: "West Field",
//         children: { "1": { label: "West Device" } }
//       }
//     }
//   },
//   "3": {
//     label: "Water Tanks",
//     children: {
//       "1": {
//         label: "First Floor Tank",
//         children: { "1": { label: "Tank 1" } }
//       },
//       "2": {
//         label: "Second Floor Tank",
//         children: { "1": { label: "Tank 2" } }
//       }
//     }
//   }
// };

// export default function MultiLevelMenu() {
//   const [menu] = useState(INITIAL_MENU);
//   const [level1Order, setLevel1Order] = useState<string[]>(
//     Object.keys(INITIAL_MENU)
//   );
//   const [level1, setLevel1] = useState<string>(level1Order[0]);
//   const [level2, setLevel2] = useState<string>(
//     Object.keys(menu[level1].children!)[0]
//   );
//   const [level3, setLevel3] = useState<string | null>(
//     Object.keys(menu[level1].children![level2].children!)[0]
//   );

//   // Sync level2 & level3 when level1 changes
//   useEffect(() => {
//     const l2Keys = Object.keys(menu[level1].children!);
//     const newL2 = l2Keys[0];
//     setLevel2(newL2);
//     const l3Keys = menu[level1].children![newL2].children
//       ? Object.keys(menu[level1].children![newL2].children!)
//       : [];
//     setLevel3(l3Keys[0] ?? null);
//   }, [level1, menu]);

//   // Sync level3 when level2 changes
//   useEffect(() => {
//     const l3Keys = menu[level1].children![level2].children
//       ? Object.keys(menu[level1].children![level2].children!)
//       : [];
//     setLevel3(l3Keys[0] ?? null);
//   }, [level2, level1, menu]);

//   // Drag-and-drop refs & handlers
//   const draggedKey = useRef<string | null>(null);

//   const onDragStart = (key: string) => {
//     draggedKey.current = key;
//   };
//   const onDragOver = (e: React.DragEvent) => {
//     e.preventDefault();
//   };
//   const onDrop = (targetKey: string) => {
//     if (!draggedKey.current) return;
//     const fromIdx = level1Order.indexOf(draggedKey.current);
//     const toIdx = level1Order.indexOf(targetKey);
//     const updated = [...level1Order];
//     updated.splice(fromIdx, 1);
//     updated.splice(toIdx, 0, draggedKey.current);
//     setLevel1Order(updated);
//     draggedKey.current = null;
//   };

//   const level2Keys = Object.keys(menu[level1].children!);
//   const level3Keys = level3
//     ? Object.keys(menu[level1].children![level2].children!)
//     : [];

//   return (
//     <div className="p-4 space-y-4">
//       {/* Level 1 with drag-and-drop */}
//       <div className="flex space-x-2 border-b pb-2">
//         {level1Order.map((key) => (
//           <div
//             key={key}
//             draggable
//             onDragStart={() => onDragStart(key)}
//             onDragOver={onDragOver}
//             onDrop={() => onDrop(key)}
//             className="flex items-center"
//           >
//             <button
//               className={`px-3 py-1 font-medium ${
//                 level1 === key
//                   ? "text-blue-600 border-b-2 border-blue-600"
//                   : "hover:text-blue-400"
//               }`}
//               onClick={() => setLevel1(key)}
//             >
//               {menu[key].label}
//             </button>
//           </div>
//         ))}
//       </div>

//       {/* Level 2 */}
//       {level2Keys.length > 0 && (
//         <div className="flex space-x-4 border-b pb-2 pl-4">
//           {level2Keys.map((key) => (
//             <button
//               key={key}
//               className={`px-3 py-1 ${
//                 level2 === key
//                   ? "text-green-600 border-b-2 border-green-600"
//                   : "hover:text-green-400"
//               }`}
//               onClick={() => setLevel2(key)}
//             >
//               {menu[level1].children![key].label}
//             </button>
//           ))}
//         </div>
//       )}

//       {/* Level 3 */}
//       {level3Keys.length > 0 && (
//         <div className="flex space-x-4 pl-8">
//           {level3Keys.map((key) => (
//             <button
//               key={key}
//               className={`px-3 py-1 ${
//                 level3 === key
//                   ? "text-purple-600 border-b-2 border-purple-600"
//                   : "hover:text-purple-400"
//               }`}
//               onClick={() => setLevel3(key)}
//             >
//               {menu[level1].children![level2].children![key].label}
//             </button>
//           ))}
//         </div>
//       )}

//       {/* Summary panel */}
//       {level3 && (
//         <div className="mt-4 p-4 bg-gray-100 rounded-md">
//           {`${
//             menu[level1].children![level2].children![level3].label
//           } assigned ${menu[level1].children![level2].label} metrics`}
//         </div>
//       )}
//     </div>
//   );
// }

// import React, { useEffect, useRef, useState } from "react";

// type MenuNode = {
//   label: string;
//   children?: Record<string, MenuNode>;
// };

// // Your menu structure
// const INITIAL_MENU: Record<string, MenuNode> = {
//   "1": {
//     label: "Fish Farming",
//     children: {
//       "1": {
//         label: "Pond A",
//         children: {
//           "1": { label: "Device 01" },
//           "2": { label: "Device 02" }
//         }
//       },
//       "2": {
//         label: "Pond B",
//         children: { "1": { label: "Device 01" } }
//       },
//       "3": {
//         label: "Pond C",
//         children: { "1": { label: "Device 01" } }
//       }
//     }
//   },
//   "2": {
//     label: "Agriculture",
//     children: {
//       "1": {
//         label: "East Field",
//         children: { "1": { label: "East Device" } }
//       },
//       "2": {
//         label: "West Field",
//         children: { "1": { label: "West Device" } }
//       }
//     }
//   },
//   "3": {
//     label: "Water Tanks",
//     children: {
//       "1": {
//         label: "First Floor Tank",
//         children: { "1": { label: "Tank 1" } }
//       },
//       "2": {
//         label: "Second Floor Tank",
//         children: { "1": { label: "Tank 2" } }
//       }
//     }
//   }
// };

// export default function MultiLevelMenu() {
//   const [menu] = useState(INITIAL_MENU);

//   // Top-level order and selection
//   const [level1Order, setLevel1Order] = useState<string[]>(
//     Object.keys(INITIAL_MENU)
//   );
//   const [level1, setLevel1] = useState<string>(level1Order[0]);

//   // Second-level order and selection
//   const [level2Order, setLevel2Order] = useState<string[]>(
//     Object.keys(menu[level1].children!)
//   );
//   const [level2, setLevel2] = useState<string>(level2Order[0]);

//   // Third-level order and selection
//   const [level3Order, setLevel3Order] = useState<string[]>(
//     Object.keys(menu[level1].children![level2].children!)
//   );
//   const [level3, setLevel3] = useState<string | null>(level3Order[0]);

//   // Sync level2 order and selection when level1 changes
//   useEffect(() => {
//     const newL2Order = Object.keys(menu[level1].children!);
//     setLevel2Order(newL2Order);
//     setLevel2(newL2Order[0]);
//   }, [level1, menu]);

//   // Sync level3 order and selection when level2 changes
//   useEffect(() => {
//     const newL3Order = menu[level1].children![level2].children
//       ? Object.keys(menu[level1].children![level2].children!)
//       : [];
//     setLevel3Order(newL3Order);
//     setLevel3(newL3Order[0] ?? null);
//   }, [level2, level1, menu]);

//   // Utility drag refs and handlers
//   const draggedLevel1 = useRef<string | null>(null);
//   const draggedLevel2 = useRef<string | null>(null);
//   const draggedLevel3 = useRef<string | null>(null);

//   const onDragStart = (level: number, key: string) => {
//     if (level === 1) draggedLevel1.current = key;
//     if (level === 2) draggedLevel2.current = key;
//     if (level === 3) draggedLevel3.current = key;
//   };

//   const onDragOver = (e: React.DragEvent) => {
//     e.preventDefault();
//   };

//   const onDrop = (level: number, targetKey: string) => {
//     if (level === 1 && draggedLevel1.current) {
//       const from = level1Order.indexOf(draggedLevel1.current);
//       const to = level1Order.indexOf(targetKey);
//       const arr = [...level1Order];
//       arr.splice(from, 1);
//       arr.splice(to, 0, draggedLevel1.current);
//       setLevel1Order(arr);
//       draggedLevel1.current = null;
//     }
//     if (level === 2 && draggedLevel2.current) {
//       const from = level2Order.indexOf(draggedLevel2.current);
//       const to = level2Order.indexOf(targetKey);
//       const arr = [...level2Order];
//       arr.splice(from, 1);
//       arr.splice(to, 0, draggedLevel2.current);
//       setLevel2Order(arr);
//       draggedLevel2.current = null;
//     }
//     if (level === 3 && draggedLevel3.current) {
//       const from = level3Order.indexOf(draggedLevel3.current!);
//       const to = level3Order.indexOf(targetKey);
//       const arr = [...level3Order];
//       arr.splice(from, 1);
//       arr.splice(to, 0, draggedLevel3.current!);
//       setLevel3Order(arr);
//       draggedLevel3.current = null;
//     }
//   };

//   return (
//     <div className="p-4 space-y-4">
//       {/* Level 1 */}
//       <div className="flex space-x-2 border-b pb-2">
//         {level1Order.map((key) => (
//           <div
//             key={key}
//             draggable
//             onDragStart={() => onDragStart(1, key)}
//             onDragOver={onDragOver}
//             onDrop={() => onDrop(1, key)}
//             className="flex items-center"
//           >
//             <button
//               className={`px-3 py-1 font-medium ${
//                 level1 === key
//                   ? "text-blue-600 border-b-2 border-blue-600"
//                   : "hover:text-blue-400"
//               }`}
//               onClick={() => setLevel1(key)}
//             >
//               {menu[key].label}
//             </button>
//           </div>
//         ))}
//       </div>

//       {/* Level 2 */}
//       {level2Order.length > 0 && (
//         <div className="flex space-x-2 border-b pb-2 pl-4">
//           {level2Order.map((key) => (
//             <div
//               key={key}
//               draggable
//               onDragStart={() => onDragStart(2, key)}
//               onDragOver={onDragOver}
//               onDrop={() => onDrop(2, key)}
//               className="flex items-center"
//             >
//               <button
//                 className={`px-3 py-1 ${
//                   level2 === key
//                     ? "text-green-600 border-b-2 border-green-600"
//                     : "hover:text-green-400"
//                 }`}
//                 onClick={() => setLevel2(key)}
//               >
//                 {menu[level1].children![key].label}
//               </button>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* Level 3 */}
//       {level3Order.length > 0 && (
//         <div className="flex space-x-2 pl-8">
//           {level3Order.map((key) => (
//             <div
//               key={key}
//               draggable
//               onDragStart={() => onDragStart(3, key)}
//               onDragOver={onDragOver}
//               onDrop={() => onDrop(3, key)}
//               className="flex items-center"
//             >
//               <button
//                 className={`px-3 py-1 ${
//                   level3 === key
//                     ? "text-purple-600 border-b-2 border-purple-600"
//                     : "hover:text-purple-400"
//                 }`}
//                 onClick={() => setLevel3(key)}
//               >
//                 {menu[level1].children![level2].children![key].label}
//               </button>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* Summary panel */}
//       {level3 && (
//         <div className="mt-4 p-4 bg-gray-100 rounded-md">
//           {`${
//             menu[level1].children![level2].children![level3].label
//           } assigned ${menu[level1].children![level2].label} metrics`}
//         </div>
//       )}
//     </div>
//   );
// }

// import React, { useRef, useState } from "react";

// type MenuNode = { label: string; children?: Record<string, MenuNode> };

// const MENU: Record<string, MenuNode> = {
//   "1": {
//     label: "Fish Farming",
//     children: {
//       "1": {
//         label: "Pond A",
//         children: { "1": { label: "Device 0A1" }, "2": { label: "Device 0A2" } }
//       },
//       "2": { label: "Pond B", children: { "1": { label: "Device 0B" } } },
//       "3": { label: "Pond C", children: { "1": { label: "Device 0C" } } }
//     }
//   },
//   "2": {
//     label: "Agriculture",
//     children: {
//       "1": { label: "East Field", children: { "1": { label: "East Device" } } },
//       "2": { label: "West Field", children: { "1": { label: "West Device" } } }
//     }
//   },
//   "3": {
//     label: "Water Tanks",
//     children: {
//       "1": {
//         label: "First Floor Tank",
//         children: { "1": { label: "Tank 1" } }
//       },
//       "2": {
//         label: "Second Floor Tank",
//         children: { "1": { label: "Tank 2" } }
//       }
//     }
//   }
// };

// export default function MultiLevelMenu() {
//   const [menu] = useState(MENU);

//   // Orders
//   const [l1Order, setL1Order] = useState(Object.keys(menu));
//   const [l2Order, setL2Order] = useState<string[]>(
//     menu[l1Order[0]].children ? Object.keys(menu[l1Order[0]].children!) : []
//   );
//   const [l3Order, setL3Order] = useState<string[]>(
//     menu[l1Order[0]].children?.[l2Order[0]]?.children
//       ? Object.keys(menu[l1Order[0]].children![l2Order[0]].children!)
//       : []
//   );

//   // Selections
//   const [l1, setL1] = useState(l1Order[0]);
//   const [l2, setL2] = useState(l2Order[0]);
//   const [l3, setL3] = useState<string | null>(l3Order[0] || null);

//   // Drag refs
//   const dragL1 = useRef<string | null>(null);
//   const dragL2 = useRef<string | null>(null);
//   const dragL3 = useRef<string | null>(null);

//   // Handlers: reset dependent levels on select
//   const handleSelectL1 = (key: string) => {
//     setL1(key);
//     const newL2 = menu[key].children ? Object.keys(menu[key].children!) : [];
//     setL2Order(newL2);
//     setL2(newL2[0] || "");
//     const newL3 = newL2[0]
//       ? menu[key].children![newL2[0]].children
//         ? Object.keys(menu[key].children![newL2[0]].children!)
//         : []
//       : [];
//     setL3Order(newL3);
//     setL3(newL3[0] || null);
//   };

//   const handleSelectL2 = (key: string) => {
//     setL2(key);
//     const newL3 = menu[l1].children![key].children
//       ? Object.keys(menu[l1].children![key].children!)
//       : [];
//     setL3Order(newL3);
//     setL3(newL3[0] || null);
//   };

//   // Drag-n-drop
//   const onDragStart = (lvl: number, key: string) => {
//     if (lvl === 1) dragL1.current = key;
//     if (lvl === 2) dragL2.current = key;
//     if (lvl === 3) dragL3.current = key;
//   };
//   const onDragOver = (e: React.DragEvent) => e.preventDefault();
//   const onDrop = (lvl: number, target: string) => {
//     if (lvl === 1 && dragL1.current) {
//       const arr = [...l1Order];
//       const from = arr.indexOf(dragL1.current);
//       arr.splice(from, 1);
//       const to = arr.indexOf(target);
//       arr.splice(to, 0, dragL1.current);
//       setL1Order(arr);
//       dragL1.current = null;
//     }
//     if (lvl === 2 && dragL2.current) {
//       const arr = [...l2Order];
//       const from = arr.indexOf(dragL2.current);
//       arr.splice(from, 1);
//       const to = arr.indexOf(target);
//       arr.splice(to, 0, dragL2.current);
//       setL2Order(arr);
//       dragL2.current = null;
//     }
//     if (lvl === 3 && dragL3.current) {
//       const arr = [...l3Order];
//       const from = arr.indexOf(dragL3.current!);
//       arr.splice(from, 1);
//       const to = arr.indexOf(target);
//       arr.splice(to, 0, dragL3.current!);
//       setL3Order(arr);
//       dragL3.current = null;
//     }
//   };

//   // Derived maps for safe access
//   const mapL2 = menu[l1].children || {};
//   const mapL3 = mapL2[l2]?.children || {};

//   return (
//     <div className="p-4 space-y-4">
//       {/* Level 1 */}
//       <div className="flex space-x-2 border-b pb-2">
//         {l1Order.map((key) => (
//           <div
//             key={key}
//             draggable
//             onDragStart={() => onDragStart(1, key)}
//             onDragOver={onDragOver}
//             onDrop={() => onDrop(1, key)}
//           >
//             <button
//               className={`px-3 py-1 font-medium ${
//                 l1 === key
//                   ? "text-blue-600 border-b-2 border-blue-600"
//                   : "hover:text-blue-400"
//               }`}
//               onClick={() => handleSelectL1(key)}
//             >
//               {menu[key].label}
//             </button>
//           </div>
//         ))}
//       </div>

//       {/* Level 2 */}
//       {l2Order.length > 0 && (
//         <div className="flex space-x-2 border-b pb-2 pl-4">
//           {l2Order.map((key) => (
//             <div
//               key={key}
//               draggable
//               onDragStart={() => onDragStart(2, key)}
//               onDragOver={onDragOver}
//               onDrop={() => onDrop(2, key)}
//             >
//               <button
//                 className={`px-3 py-1 ${
//                   l2 === key
//                     ? "text-green-600 border-b-2 border-green-600"
//                     : "hover:text-green-400"
//                 }`}
//                 onClick={() => handleSelectL2(key)}
//               >
//                 {mapL2[key].label}
//               </button>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* Level 3 */}
//       {l3Order.length > 0 && (
//         <div className="flex space-x-2 pl-8">
//           {l3Order.map((key) => (
//             <div
//               key={key}
//               draggable
//               onDragStart={() => onDragStart(3, key)}
//               onDragOver={onDragOver}
//               onDrop={() => onDrop(3, key)}
//             >
//               <button
//                 className={`px-3 py-1 ${
//                   l3 === key
//                     ? "text-purple-600 border-b-2 border-purple-600"
//                     : "hover:text-purple-400"
//                 }`}
//                 onClick={() => setL3(key)}
//               >
//                 {mapL3[key].label}
//               </button>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* Summary */}
//       {l3 && (
//         <div className="mt-4 p-4 bg-gray-100 rounded-md">
//           {`${mapL3[l3].label} assigned ${mapL2[l2].label} metrics`}
//         </div>
//       )}
//     </div>
//   );
// }

// import React, { useEffect, useRef, useState } from "react";

// type MenuNode = {
//   label: string;
//   status?: string;
//   children?: Record<string, MenuNode>;
// };

// const MENU: Record<string, MenuNode> = {
//   "1": {
//     label: "Fish Farming",
//     children: {
//       "1": {
//         label: "Pond A",
//         children: {
//           "1": { label: "Device 01", status: "Active" },
//           "2": { label: "Device 02", status: "Inactive" }
//         }
//       },
//       "2": {
//         label: "Pond B",
//         children: { "1": { label: "Device 01", status: "Stopped" } }
//       },
//       "3": {
//         label: "Pond C",
//         children: { "1": { label: "Device 01", status: "Active" } }
//       }
//     }
//   },
//   "2": {
//     label: "Agriculture",
//     children: {
//       "1": {
//         label: "East Field",
//         children: { "1": { label: "East Device", status: "Inactive" } }
//       },
//       "2": {
//         label: "West Field",
//         children: { "1": { label: "West Device", status: "Active" } }
//       }
//     }
//   },
//   "3": {
//     label: "Water Tanks",
//     children: {
//       "1": {
//         label: "First Floor Tank",
//         children: { "1": { label: "Tank 1", status: "Active" } }
//       },
//       "2": {
//         label: "Second Floor Tank",
//         children: { "1": { label: "Tank 2", status: "Stopped" } }
//       }
//     }
//   }
// };

// export default function MultiLevelMenu() {
//   const [menu] = useState(MENU);

//   // Orders for levels
//   const [l1Order, setL1Order] = useState(Object.keys(menu));
//   const [l2Order, setL2Order] = useState<string[]>(
//     menu[l1Order[0]].children ? Object.keys(menu[l1Order[0]].children!) : []
//   );
//   const [l3Order, setL3Order] = useState<string[]>(
//     menu[l1Order[0]].children?.[l2Order[0]]?.children
//       ? Object.keys(menu[l1Order[0]].children![l2Order[0]].children!)
//       : []
//   );

//   // Selected keys
//   const [l1, setL1] = useState(l1Order[0]);
//   const [l2, setL2] = useState(l2Order[0]);
//   const [l3, setL3] = useState<string | null>(l3Order[0] || null);

//   // Reset dependent selections on change
//   useEffect(() => {
//     const newL2 = menu[l1].children ? Object.keys(menu[l1].children!) : [];
//     setL2Order(newL2);
//     setL2(newL2[0] || "");
//   }, [l1, menu]);

//   useEffect(() => {
//     const newL3 = menu[l1].children![l2]?.children
//       ? Object.keys(menu[l1].children![l2].children!)
//       : [];
//     setL3Order(newL3);
//     setL3(newL3[0] || null);
//   }, [l2, l1, menu]);

//   // Drag refs
//   const dragL1 = useRef<string | null>(null);
//   const dragL2 = useRef<string | null>(null);
//   const dragL3 = useRef<string | null>(null);

//   // Drag handlers
//   const onDragStart = (lvl: number, key: string) => {
//     if (lvl === 1) dragL1.current = key;
//     if (lvl === 2) dragL2.current = key;
//     if (lvl === 3) dragL3.current = key;
//   };
//   const onDragOver = (e: React.DragEvent) => e.preventDefault();
//   const onDrop = (lvl: number, target: string) => {
//     if (lvl === 1 && dragL1.current) {
//       const arr = [...l1Order];
//       const from = arr.indexOf(dragL1.current);
//       arr.splice(from, 1);
//       const to = arr.indexOf(target);
//       arr.splice(to, 0, dragL1.current);
//       setL1Order(arr);
//       dragL1.current = null;
//     }
//     if (lvl === 2 && dragL2.current) {
//       const arr = [...l2Order];
//       const from = arr.indexOf(dragL2.current);
//       arr.splice(from, 1);
//       const to = arr.indexOf(target);
//       arr.splice(to, 0, dragL2.current);
//       setL2Order(arr);
//       dragL2.current = null;
//     }
//     if (lvl === 3 && dragL3.current) {
//       const arr = [...l3Order];
//       const from = arr.indexOf(dragL3.current!);
//       arr.splice(from, 1);
//       const to = arr.indexOf(target);
//       arr.splice(to, 0, dragL3.current!);
//       setL3Order(arr);
//       dragL3.current = null;
//     }
//   };

//   // Maps for rendering
//   const level2Map = menu[l1].children || {};
//   const level3Map = level2Map[l2]?.children || {};

//   return (
//     <div className="flex p-4 space-x-8">
//       <div className="flex-1 space-y-4">
//         {/* Level 1 */}
//         <div className="flex space-x-2 border-b pb-2">
//           {l1Order.map((key) => (
//             <div
//               key={key}
//               draggable
//               onDragStart={() => onDragStart(1, key)}
//               onDragOver={onDragOver}
//               onDrop={() => onDrop(1, key)}
//             >
//               <button
//                 className={`px-3 py-1 font-medium ${
//                   l1 === key
//                     ? "text-blue-600 border-b-2 border-blue-600"
//                     : "hover:text-blue-400"
//                 }`}
//                 onClick={() => setL1(key)}
//               >
//                 {menu[key].label}
//               </button>
//             </div>
//           ))}
//         </div>

//         {/* Level 2 */}
//         {l2Order.length > 0 && (
//           <div className="flex space-x-2 border-b pb-2 pl-4">
//             {l2Order.map((key) => (
//               <div
//                 key={key}
//                 draggable
//                 onDragStart={() => onDragStart(2, key)}
//                 onDragOver={onDragOver}
//                 onDrop={() => onDrop(2, key)}
//               >
//                 <button
//                   className={`px-3 py-1 ${
//                     l2 === key
//                       ? "text-green-600 border-b-2 border-green-600"
//                       : "hover:text-green-400"
//                   }`}
//                   onClick={() => setL2(key)}
//                 >
//                   {level2Map[key].label}
//                 </button>
//               </div>
//             ))}
//           </div>
//         )}

//         {/* Level 3 */}
//         {l3Order.length > 0 && (
//           <div className="flex space-x-2 pl-8">
//             {l3Order.map((key) => (
//               <div
//                 key={key}
//                 draggable
//                 onDragStart={() => onDragStart(3, key)}
//                 onDragOver={onDragOver}
//                 onDrop={() => onDrop(3, key)}
//               >
//                 <button
//                   className={`px-3 py-1 ${
//                     l3 === key
//                       ? "text-purple-600 border-b-2 border-purple-600"
//                       : "hover:text-purple-400"
//                   }`}
//                   onClick={() => setL3(key)}
//                 >
//                   {level3Map[key].label}
//                 </button>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       {/* Detail panel */}
//       <div className="w-1/3 p-4 bg-gray-50 rounded-lg shadow">
//         {l3 && (
//           <>
//             <h3 className="text-lg font-semibold mb-2">
//               {level3Map[l3].label}
//             </h3>
//             <p className="mb-1">
//               <strong>Location:</strong> {level2Map[l2].label}
//             </p>
//             <p>
//               <strong>Status:</strong> {level3Map[l3].status || "Unknown"}
//             </p>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

// Error code
// import React, { useEffect, useRef, useState } from "react";

// type MenuNode = {
//   label: string;
//   status?: string;
//   children?: Record<string, MenuNode>;
// };

// const MENU: Record<string, MenuNode> = {
//   "1": {
//     label: "Fish Farming",
//     children: {
//       "1": {
//         label: "Pond A",
//         children: {
//           "1": { label: "Device 01", status: "Active" },
//           "2": { label: "Device 02", status: "Inactive" }
//         }
//       },
//       "2": {
//         label: "Pond B",
//         children: { "1": { label: "Device 01", status: "Stopped" } }
//       },
//       "3": {
//         label: "Pond C",
//         children: { "1": { label: "Device 01", status: "Active" } }
//       }
//     }
//   },
//   "2": {
//     label: "Agriculture",
//     children: {
//       "1": {
//         label: "East Field",
//         children: { "1": { label: "East Device", status: "Inactive" } }
//       },
//       "2": {
//         label: "West Field",
//         children: { "1": { label: "West Device", status: "Active" } }
//       }
//     }
//   },
//   "3": {
//     label: "Water Tanks",
//     children: {
//       "1": {
//         label: "First Floor Tank",
//         children: { "1": { label: "Tank 1", status: "Active" } }
//       },
//       "2": {
//         label: "Second Floor Tank",
//         children: { "1": { label: "Tank 2", status: "Stopped" } }
//       }
//     }
//   }
// };

// export default function MultiLevelMenu() {
//   const [menu] = useState(MENU);

//   // Orders for levels
//   const [l1Order, setL1Order] = useState(Object.keys(menu));
//   const [l2Order, setL2Order] = useState<string[]>(
//     menu[l1Order[0]].children ? Object.keys(menu[l1Order[0]].children!) : []
//   );
//   const [l3Order, setL3Order] = useState<string[]>(
//     menu[l1Order[0]].children?.[l2Order[0]]?.children
//       ? Object.keys(menu[l1Order[0]].children![l2Order[0]].children!)
//       : []
//   );

//   // Selected keys
//   const [l1, setL1] = useState(l1Order[0]);
//   const [l2, setL2] = useState(l2Order[0]);
//   const [l3, setL3] = useState<string | null>(l3Order[0] || null);

//   // Reset dependent selections on change
//   useEffect(() => {
//     const newL2 = menu[l1].children ? Object.keys(menu[l1].children!) : [];
//     setL2Order(newL2);
//     setL2(newL2[0] || "");
//   }, [l1, menu]);

//   useEffect(() => {
//     const newL3 = menu[l1].children![l2]?.children
//       ? Object.keys(menu[l1].children![l2].children!)
//       : [];
//     setL3Order(newL3);
//     setL3(newL3[0] || null);
//   }, [l2, l1, menu]);

//   // Drag refs
//   const dragL1 = useRef<string | null>(null);
//   const dragL2 = useRef<string | null>(null);
//   const dragL3 = useRef<string | null>(null);

//   // Drag handlers
//   const onDragStart = (lvl: number, key: string) => {
//     if (lvl === 1) dragL1.current = key;
//     if (lvl === 2) dragL2.current = key;
//     if (lvl === 3) dragL3.current = key;
//   };
//   const onDragOver = (e: React.DragEvent) => e.preventDefault();
//   const onDrop = (lvl: number, target: string) => {
//     if (lvl === 1 && dragL1.current) {
//       const arr = [...l1Order];
//       const from = arr.indexOf(dragL1.current);
//       arr.splice(from, 1);
//       const to = arr.indexOf(target);
//       arr.splice(to, 0, dragL1.current);
//       setL1Order(arr);
//       dragL1.current = null;
//     }
//     if (lvl === 2 && dragL2.current) {
//       const arr = [...l2Order];
//       const from = arr.indexOf(dragL2.current);
//       arr.splice(from, 1);
//       const to = arr.indexOf(target);
//       arr.splice(to, 0, dragL2.current);
//       setL2Order(arr);
//       dragL2.current = null;
//     }
//     if (lvl === 3 && dragL3.current) {
//       const arr = [...l3Order];
//       const from = arr.indexOf(dragL3.current!);
//       arr.splice(from, 1);
//       const to = arr.indexOf(target);
//       arr.splice(to, 0, dragL3.current!);
//       setL3Order(arr);
//       dragL3.current = null;
//     }
//   };

//   // Maps for rendering
//   const level2Map = menu[l1].children || {};
//   const level3Map = level2Map[l2]?.children || {};

//   return (
//     <div className="flex p-4">
//       <div className="flex-1 space-y-4">
//         {/* Level 1 */}
//         <div className="flex space-x-2 border-b pb-2">
//           {l1Order.map((key) => (
//             <div
//               key={key}
//               draggable
//               onDragStart={() => onDragStart(1, key)}
//               onDragOver={onDragOver}
//               onDrop={() => onDrop(1, key)}
//             >
//               <button
//                 className={`px-3 py-1 font-medium ${
//                   l1 === key
//                     ? "text-blue-600 border-b-2 border-blue-600"
//                     : "hover:text-blue-400"
//                 }`}
//                 onClick={() => setL1(key)}
//               >
//                 {menu[key].label}
//               </button>
//             </div>
//           ))}
//         </div>

//         {/* Level 2 */}
//         {l2Order.length > 0 && (
//           <div className="flex space-x-2 border-b pb-2 pl-4">
//             {l2Order.map((key) => (
//               <div
//                 key={key}
//                 draggable
//                 onDragStart={() => onDragStart(2, key)}
//                 onDragOver={onDragOver}
//                 onDrop={() => onDrop(2, key)}
//               >
//                 <button
//                   className={`px-3 py-1 ${
//                     l2 === key
//                       ? "text-green-600 border-b-2 border-green-600"
//                       : "hover:text-green-400"
//                   }`}
//                   onClick={() => setL2(key)}
//                 >
//                   {level2Map[key].label}
//                 </button>
//               </div>
//             ))}
//           </div>
//         )}

//         {/* Level 3 with inline status */}
//         {l3Order.length > 0 && (
//           <div className="flex flex-wrap space-x-2 pl-8">
//             {l3Order.map((key) => (
//               <div
//                 key={key}
//                 draggable
//                 onDragStart={() => onDragStart(3, key)}
//                 onDragOver={onDragOver}
//                 onDrop={() => onDrop(3, key)}
//                 className="flex items-center space-x-2"
//               >
//                 <button
//                   className={`px-3 py-1 ${
//                     l3 === key
//                       ? "text-purple-600 border-b-2 border-purple-600"
//                       : "hover:text-purple-400"
//                   }`}
//                   onClick={() => setL3(key)}
//                 >
//                   {level3Map[key].label}
//                 </button>
//                 {/* Inline status badge */}
//                 <span
//                   className={`px-2 py-0.5 text-xs rounded-full ${
//                     level3Map[key].status === "Active"
//                       ? "bg-green-100 text-green-800"
//                       : level3Map[key].status === "Inactive"
//                       ? "bg-yellow-100 text-yellow-800"
//                       : "bg-red-100 text-red-800"
//                   }`}
//                 >
//                   {level3Map[key].status}
//                 </span>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// import React, { useEffect, useRef, useState } from "react";

// type MenuNode = {
//   label: string;
//   status?: string;
//   children?: Record<string, MenuNode>;
// };

// const MENU: Record<string, MenuNode> = {
//   "1": {
//     label: "Fish Farming",
//     children: {
//       "1": {
//         label: "Pond A",
//         children: {
//           "1": { label: "Device 01", status: "Active" },
//           "2": { label: "Device 02", status: "Inactive" }
//         }
//       },
//       "2": {
//         label: "Pond B",
//         children: { "1": { label: "Device 01", status: "Stopped" } }
//       },
//       "3": {
//         label: "Pond C",
//         children: { "1": { label: "Device 01", status: "Active" } }
//       }
//     }
//   },
//   "2": {
//     label: "Agriculture",
//     children: {
//       "1": {
//         label: "East Field",
//         children: { "1": { label: "East Device", status: "Inactive" } }
//       },
//       "2": {
//         label: "West Field",
//         children: { "1": { label: "West Device", status: "Active" } }
//       }
//     }
//   },
//   "3": {
//     label: "Water Tanks",
//     children: {
//       "1": {
//         label: "First Floor Tank",
//         children: { "1": { label: "Tank 1", status: "Active" } }
//       },
//       "2": {
//         label: "Second Floor Tank",
//         children: { "1": { label: "Tank 2", status: "Stopped" } }
//       }
//     }
//   }
// };

// export default function MultiLevelMenu() {
//   const [menu] = useState(MENU);

//   // Level state
//   const [l1Order, setL1Order] = useState(Object.keys(menu));
//   const [l1, setL1] = useState(l1Order[0]);
//   const [l2Order, setL2Order] = useState<string[]>([]);
//   const [l2, setL2] = useState<string>("");
//   const [l3Order, setL3Order] = useState<string[]>([]);
//   const [l3, setL3] = useState<string>("");

//   // Sync orders and selections
//   useEffect(() => {
//     const lvl2 = menu[l1]?.children ? Object.keys(menu[l1].children!) : [];
//     setL2Order(lvl2);
//     setL2(lvl2[0] || "");
//   }, [l1]);

//   useEffect(() => {
//     const lvl3 = menu[l1]?.children?.[l2]?.children
//       ? Object.keys(menu[l1].children![l2].children!)
//       : [];
//     setL3Order(lvl3);
//     setL3(lvl3[0] || "");
//   }, [l1, l2]);

//   // Derived maps
//   const level2Map = menu[l1]?.children || {};
//   const level3Map = level2Map[l2]?.children || {};

//   // Drag refs
//   const dragRef = useRef<{ lvl: number; key: string }>();

//   // Drag handlers
//   function onDragStart(lvl: number, key: string) {
//     dragRef.current = { lvl, key };
//   }
//   const onDragOver = (e: React.DragEvent) => e.preventDefault();
//   function onDrop(lvl: number, target: string) {
//     if (!dragRef.current || dragRef.current.lvl !== lvl) return;
//     const { key: fromKey } = dragRef.current;
//     const order =
//       lvl === 1 ? [...l1Order] : lvl === 2 ? [...l2Order] : [...l3Order];
//     const fromIdx = order.indexOf(fromKey);
//     const toIdx = order.indexOf(target);
//     order.splice(fromIdx, 1);
//     order.splice(toIdx, 0, fromKey);
//     if (lvl === 1) setL1Order(order);
//     else if (lvl === 2) setL2Order(order);
//     else setL3Order(order);
//   }

//   // Safe filtered orders
//   const safeL2Order = l2Order.filter((key) => level2Map[key]);
//   const safeL3Order = l3Order.filter((key) => level3Map[key]);

//   return (
//     <div className="flex p-4">
//       <div className="flex-1 space-y-4">
//         {/* Level 1 */}
//         <div className="flex space-x-2 border-b pb-2">
//           {l1Order.map((key) => (
//             <div
//               key={key}
//               draggable
//               onDragStart={() => onDragStart(1, key)}
//               onDragOver={onDragOver}
//               onDrop={() => onDrop(1, key)}
//             >
//               <button
//                 className={`px-3 py-1 font-medium ${
//                   l1 === key
//                     ? "text-blue-600 border-b-2 border-blue-600"
//                     : "hover:text-blue-400"
//                 }`}
//                 onClick={() => setL1(key)}
//               >
//                 {menu[key].label}
//               </button>
//             </div>
//           ))}
//         </div>

//         {/* Level 2 */}
//         {safeL2Order.length > 0 && (
//           <div className="flex space-x-2 border-b pb-2 pl-4">
//             {safeL2Order.map((key) => (
//               <div
//                 key={key}
//                 draggable
//                 onDragStart={() => onDragStart(2, key)}
//                 onDragOver={onDragOver}
//                 onDrop={() => onDrop(2, key)}
//               >
//                 <button
//                   className={`px-3 py-1 ${
//                     l2 === key
//                       ? "text-green-600 border-b-2 border-green-600"
//                       : "hover:text-green-400"
//                   }`}
//                   onClick={() => setL2(key)}
//                 >
//                   {level2Map[key].label}
//                 </button>
//               </div>
//             ))}
//           </div>
//         )}

//         {/* Level 3 with status badges */}
//         {safeL3Order.length > 0 && (
//           <div className="flex flex-wrap space-x-2 pl-8">
//             {safeL3Order.map((key) => (
//               <div
//                 key={key}
//                 draggable
//                 onDragStart={() => onDragStart(3, key)}
//                 onDragOver={onDragOver}
//                 onDrop={() => onDrop(3, key)}
//                 className="flex items-center space-x-2"
//               >
//                 <button
//                   className={`px-3 py-1 ${
//                     l3 === key
//                       ? "text-purple-600 border-b-2 border-purple-600"
//                       : "hover:text-purple-400"
//                   }`}
//                   onClick={() => setL3(key)}
//                 >
//                   {level3Map[key].label}
//                 </button>
//                 <span
//                   className={`px-2 py-0.5 text-xs rounded-full ${
//                     level3Map[key].status === "Active"
//                       ? "bg-green-100 text-green-800"
//                       : level3Map[key].status === "Inactive"
//                       ? "bg-yellow-100 text-yellow-800"
//                       : "bg-red-100 text-red-800"
//                   }`}
//                 >
//                   {level3Map[key].status}
//                 </span>
//               </div>
//             ))}
//           </div>
//         )}

//         {/* Selected Device Content */}
//         {l3 && (
//           <div className="mt-6 pl-8">
//             <div className="bg-white shadow-lg rounded-lg p-6 max-w-md">
//               <h3 className="text-2xl font-bold mb-4">{level3Map[l3].label}</h3>
//               <div className="grid grid-cols-2 gap-4 mb-4">
//                 <div>
//                   <p className="text-sm text-gray-500">Location</p>
//                   <p className="text-base font-medium">{level2Map[l2].label}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm text-gray-500">Status</p>
//                   <span
//                     className={`inline-block px-2 py-1 font-semibold rounded ${
//                       level3Map[l3].status === "Active"
//                         ? "bg-green-100 text-green-800"
//                         : level3Map[l3].status === "Inactive"
//                         ? "bg-yellow-100 text-yellow-800"
//                         : "bg-red-100 text-red-800"
//                     }`}
//                   >
//                     {level3Map[l3].status}
//                   </span>
//                 </div>
//               </div>
//               <div className="border-t pt-4">
//                 <p className="text-sm text-gray-500 mb-2">Metrics</p>
//                 <ul className="space-y-2">
//                   <li className="flex justify-between">
//                     <span>Temperature</span>
//                     <span className="font-medium">24°C</span>
//                   </li>
//                   <li className="flex justify-between">
//                     <span>pH Level</span>
//                     <span className="font-medium">7.2</span>
//                   </li>
//                   <li className="flex justify-between">
//                     <span>Battery</span>
//                     <span className="font-medium">85%</span>
//                   </li>
//                 </ul>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

{
  /* <div className="w-full max-w-sm bg-white rounded-xl shadow-lg p-6 border border-gray-100 transition-all self-start">
                <h4 className="text-2xl font-semibold text-blue-900 mb-6">
                  Device Tools
                </h4>
                <div className="space-y-4 text-gray-800 text-sm">
                  {[
                    {
                      title: "Device Details",
                      content: (
                        <ul className="ml-3 text-xs text-gray-600 space-y-1">
                          <li>
                            Device ID: AQ-{l1}
                            {l2}
                            {l3}
                          </li>
                          <li>Battery: 86%</li>
                          <li>Location: {level2Map[l2]?.label}</li>
                          <li>Last Sync: 3 mins ago</li>
                        </ul>
                      )
                    },
                    {
                      title: "Configuration",
                      content: (
                        <ul className="ml-3 text-xs text-gray-600 space-y-1">
                          <li>Mode: Auto</li>
                          <li>Sync Time: 04:30 AM</li>
                          <li>Sampling Rate: 10s</li>
                        </ul>
                      )
                    },
                    {
                      title: "Live Metrics",
                      content: (
                        <ul className="ml-3 text-xs text-gray-600 space-y-1">
                          <li>pH Level</li>
                          <li>Dissolved Oxygen</li>
                          <li>Temperature</li>
                          <li>Conductivity</li>
                          <li>Turbidity</li>
                        </ul>
                      )
                    },
                    {
                      title: "Alerts & Thresholds",
                      content: (
                        <p className="ml-3 text-xs text-gray-600">
                          Configured for pH, DO
                        </p>
                      )
                    },
                    {
                      title: "Reports",
                      content: (
                        <p className="ml-3 text-xs text-blue-600 cursor-pointer hover:underline">
                          Download CSV (Last 100 Records)
                        </p>
                      )
                    },
                    {
                      title: "Diagnostics",
                      content: (
                        <ul className="ml-3 text-xs text-gray-600 space-y-1">
                          <li>Battery: 86%</li>
                          <li>Last Sync: 3 mins ago</li>
                          <li>Signal: Good</li>
                        </ul>
                      )
                    },
                    {
                      title: "Firmware & Updates",
                      content: (
                        <p className="ml-3 text-xs text-gray-600">
                          v1.2.3 • Last updated: Mar 2025
                        </p>
                      )
                    },
                    {
                      title: "Control Panel",
                      content: (
                        <ul className="ml-3 text-xs text-blue-600 space-y-1">
                          <li className="cursor-pointer hover:underline">
                            Restart Device
                          </li>
                          <li className="cursor-pointer hover:underline">
                            Force Sync
                          </li>
                          <li className="cursor-pointer hover:underline">
                            Switch Mode
                          </li>
                        </ul>
                      )
                    }
                  ].map((section, idx) => (
                    <details
                      key={idx}
                      className="bg-gray-50 rounded-md px-4 py-3 transition hover:shadow-sm"
                    >
                      <summary className="cursor-pointer font-medium text-gray-700 hover:text-gray-900">
                        {section.title}
                      </summary>
                      <div className="mt-2">{section.content}</div>
                    </details>
                  ))}
                </div>
              </div> */
}


// import axios from "axios";
// import React, { useContext, useEffect, useRef, useState } from "react";
// import { AuthContext } from "../../context/AuthContext";
// import MenuLevelTabs from "../../hooks/MultiLevelTabs";
// import SensorLayout from "../../layouts/sensors/SensorLayout";
// import NoGoalSetUp from "../business/NoGoalSetUp";

// type MenuNode = {
//   label: string;
//   status?: string;
//   children?: Record<string, MenuNode>;
// };

// type GoalTypes = {
//   id: string;
//   name: string;
// };

// export default function MultiLevelMenu() {
//   const [menu, setMenu] = useState<Record<string, MenuNode>>({});
//   const [l1Order, setL1Order] = useState<string[]>([]);
//   const [l1, setL1] = useState<string>("");
//   const [l2Order, setL2Order] = useState<string[]>([]);
//   const [l2, setL2] = useState<string>("");
//   const [l3Order, setL3Order] = useState<string[]>([]);
//   const [l3, setL3] = useState<string>("");
//   const [loading, setLoading] = useState<boolean>(true);

//   const dragRef = useRef<{ lvl: number; key: string } | null>(null);
//   const { authState } = useContext(AuthContext);
//   const user = authState.user;

//   function formatGoalType(goalType: string): string {
//     return goalType
//       .toLowerCase()
//       .split("_")
//       .map((word) => word[0].toUpperCase() + word.slice(1))
//       .join(" ");
//   }

//   useEffect(() => {
//     async function fetchMenu() {
//       try {
//         const userId = user?.email;
//         if (!userId) return;

//         // 1. Goal types
//         const goalTypesResponse = await axios.get<GoalTypes[]>(
//           `http://localhost:9095/api/tabs/goals/${userId}`
//         );
//         const types = goalTypesResponse.data;
//         console.log("Types", types);

//         // 2. Allocated sensors
//         const sensorsResponse = await axios.post<
//           Record<
//             string,
//             { location: string; sensorName: string; status: string }[]
//           >
//         >(`http://localhost:9095/api/tabs`, types);
//         const sensorsData = sensorsResponse.data;

//         console.log("sensorsData", sensorsData);

//         // 3. Build Menu
//         const builtMenu: Record<string, MenuNode> = {};
//         let goalCounter = 1;
//         for (const { name } of types) {
//           // use 'types' directly here
//           const formattedGoalType = formatGoalType(name);
//           const sensors = sensorsData[name] || [];

//           const locationMap = new Map<string, MenuNode>();

//           for (const sensor of sensors) {
//             if (!locationMap.has(sensor.location)) {
//               locationMap.set(sensor.location, {
//                 label: sensor.location,
//                 children: {}
//               });
//             }
//             const locationNode = locationMap.get(sensor.location)!;
//             const sensorChildrenCount =
//               Object.keys(locationNode.children || {}).length + 1;
//             locationNode.children![String(sensorChildrenCount)] = {
//               label: sensor.sensorName,
//               status: sensor.status
//             };
//           }

//           const locationChildren: Record<string, MenuNode> = {};
//           let locationCounter = 1;
//           for (const locationNode of locationMap.values()) {
//             locationChildren[String(locationCounter++)] = locationNode;
//           }

//           builtMenu[String(goalCounter++)] = {
//             label: formattedGoalType,
//             children: locationChildren
//           };
//         }

//         setMenu(builtMenu);

//         // Initialize selection
//         const l1Keys = Object.keys(builtMenu);
//         setL1Order(l1Keys);
//         setL1(l1Keys[0] || "");
//         setLoading(false);
//       } catch (error) {
//         // console.error("Failed to fetch menu:", error);
//         setLoading(false);
//       }
//     }

//     fetchMenu();
//   }, [user?.email]);

//   useEffect(() => {
//     const lvl2 = menu[l1]?.children ? Object.keys(menu[l1].children!) : [];
//     setL2Order(lvl2);
//     setL2(lvl2[0] || "");
//   }, [l1, menu]);

//   useEffect(() => {
//     const lvl3 = menu[l1]?.children?.[l2]?.children
//       ? Object.keys(menu[l1].children![l2].children!)
//       : [];
//     setL3Order(lvl3);
//     setL3(lvl3[0] || "");
//   }, [l1, l2, menu]);

//   const level2Map = menu[l1]?.children || {};
//   const level3Map = level2Map[l2]?.children || {};

//   function onDragStart(lvl: number, key: string) {
//     dragRef.current = { lvl, key };
//   }

//   const onDragOver = (e: React.DragEvent) => e.preventDefault();

//   function onDrop(lvl: number, target: string) {
//     if (!dragRef.current || dragRef.current.lvl !== lvl) return;
//     const fromKey = dragRef.current.key;
//     const order =
//       lvl === 1 ? [...l1Order] : lvl === 2 ? [...l2Order] : [...l3Order];
//     const fromIdx = order.indexOf(fromKey);
//     const toIdx = order.indexOf(target);
//     order.splice(fromIdx, 1);
//     order.splice(toIdx, 0, fromKey);
//     if (lvl === 1) setL1Order(order);
//     else if (lvl === 2) setL2Order(order);
//     else setL3Order(order);
//   }

//   const safeL2Order = l2Order.filter((key) => level2Map[key]);
//   const safeL3Order = l3Order.filter((key) => level3Map[key]);

//   // Get selected labels
//   const l1Label = menu[l1]?.label || "";
//   const l2Label = menu[l1]?.children?.[l2]?.label || "";
//   const l3Label = menu[l1]?.children?.[l2]?.children?.[l3]?.label || "";
//   const l3Status = menu[l1]?.children?.[l2]?.children?.[l3]?.status || "";

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-screen">
//         <div className="w-16 h-16 border-4 border-blue-300 border-t-blue-600 rounded-full animate-spin"></div>
//       </div>
//     );
//   }

//   console.log("menu", menu);

//   return (
//     <div className="flex flex-col h-full pt-4 space-y-[1px] text-sm md:text-base bg-white">
//       {Object.keys(menu).length > 0 ? (
//         <>
//           {/* Level 1 Tabs */}
//           <div className="">
//             <MenuLevelTabs
//               order={l1Order}
//               selected={l1}
//               onSelect={setL1}
//               onDragStart={onDragStart}
//               onDragOver={onDragOver}
//               onDrop={onDrop}
//               level={1}
//               labelMap={menu}
//               parentChild={""}
//             />
//           </div>

//           {/* Level 2 Tabs */}
//           {safeL2Order.length > 0 && (
//             <div className=" pl-4 md:pl-6">
//               <MenuLevelTabs
//                 order={safeL2Order}
//                 selected={l2}
//                 onSelect={setL2}
//                 onDragStart={onDragStart}
//                 onDragOver={onDragOver}
//                 onDrop={onDrop}
//                 level={2}
//                 labelMap={level2Map}
//                 parentChild={""}
//               />
//             </div>
//           )}

//           {/* Level 3 Tabs */}
//           {safeL3Order.length > 0 && (
//             <div className=" space-x-2 md:space-x-4 pl-6 md:pl-12">
//               <MenuLevelTabs
//                 order={safeL3Order}
//                 selected={l3}
//                 onSelect={setL3}
//                 onDragStart={onDragStart}
//                 onDragOver={onDragOver}
//                 onDrop={onDrop}
//                 level={3}
//                 labelMap={level3Map}
//                 parentChild={""}
//               />
//             </div>
//           )}

//           {/* Charts and Device Details */}
//           {/* Charts and Device Details */}
//           {l3 && (
//             <div className="flex flex-col xl:flex-row flex-1 p-3 space-y-6 xl:space-y-0 xl:space-x-8">
//               <SensorLayout
//                 goalType={l1Label}
//                 location={l2Label}
//                 sensorName={l3Label}
//                 status={l3Status}
//               />
//             </div>
//           )}
//         </>
//       ) : (
//         <NoGoalSetUp />
//       )}
//     </div>
//   );
// }

// import { Plus } from "lucide-react";
// import React, { useState } from "react";
// import CreateGoalSetupModal from "../components/business/CreateGoalSetup";

// interface MenuLevelTabsProps {
//   order: string[];
//   selected: string;
//   onSelect: (key: string) => void;
//   onDragStart: (lvl: number, key: string) => void;
//   onDragOver: (e: React.DragEvent) => void;
//   onDrop: (lvl: number, target: string) => void;
//   level: number;
//   labelMap: Record<string, { label: string; status?: string; children?: any }>;
//   onAddTab?: () => void;
//   parentChild: any;
// }

// const MenuLevelTabs: React.FC<MenuLevelTabsProps> = ({
//   order,
//   selected,
//   onSelect,
//   onDragStart,
//   onDragOver,
//   onDrop,
//   level,
//   labelMap
// }) => {
//   const [showCreateModal, setShowCreateModal] = useState<boolean>(false);
//   const [showCreateActivityModal, setShowCreateActivityModal] =
//     useState<boolean>(false);
//   const [showAddSensorModal, setShowAddSensorModal] = useState<boolean>(false);

//   return (
//     <>
//       <div className="flex items-center gap-4 px-4 py-2 border-b border-gray-200">
//         {order.map((key) => {
//           const isActive = selected === key;
//           return (
//             <div
//               key={key}
//               className={`flex items-center cursor-pointer rounded-t-lg transition-colors duration-200 
//               ${
//                 isActive
//                   ? "bg-[#4a90e2] text-white" // brighter and more distinct active
//                   : "bg-[#c0dffb] hover:bg-[#7bb8ff] text-gray-900" // lighter default, noticeable hover
//               }`}
//               onClick={() => onSelect(key)}
//               draggable
//               onDragStart={() => onDragStart(level, key)}
//               onDragOver={onDragOver}
//               onDrop={() => onDrop(level, key)}
//             >
//               <div className="flex items-center justify-between gap-2 p-1 px-2 rounded-md transition-colors w-full">
//                 {/* Left side: dot + label */}
//                 <div className="flex items-center gap-2">
//                   {/* <div className="w-4 h-4 bg-[#004a73] rounded-full"></div> */}
//                   <span className="text-sm font-semibold truncate text-[#002b40]">
//                     {labelMap[key]?.label}
//                   </span>
//                 </div>

//                 {/* Right side: close button */}
//                 {/* <button
//                 onClick={(e) => {
//                   e.stopPropagation();
//                 }}
//                 aria-label="Close tab"
//                 className="p-1 rounded-full hover:bg-gray-300 hover:text-red-500 transition-colors"
//               >
//                 <X size={14} />
//               </button> */}
//               </div>
//             </div>
//           );
//         })}

//         {/* Plus button at the end */}
//         <button
//           onClick={() => {
//             setShowCreateModal(true);
//           }}
//           aria-label="Add new tab"
//           className="flex items-center justify-center p-1 rounded-full bg-[#e2f0ff] hover:bg-[#b5d6ff] transition-colors duration-200"
//         >
//           <Plus size={20} stroke="#002b40" strokeWidth={2} />
//         </button>
//       </div>
//       <CreateGoalSetupModal
//         isOpen={showCreateModal}
//         type={level === 1 ? "goal" : level === 2 ? "activity" : "sensor"}
//         onClose={() => {
//           setShowCreateModal(false);
//         }}
//       />
//     </>
//   );
// };

// export default MenuLevelTabs;