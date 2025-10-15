import React from "react";

// export const CompanyLogo: React.FC = () => {
//   const prismOffset = 10;

//   // Prism points
//   const A = { x: 15, y: 20 };
//   const B = { x: 50, y: 85 };
//   const C = { x: 85, y: 20 };
//   const A2 = { x: A.x, y: A.y - prismOffset };
//   const B2 = { x: B.x, y: B.y - prismOffset };
//   const C2 = { x: C.x, y: C.y - prismOffset };

//   return (
//     <>
//       <style>{`
//         @keyframes bounce {
//           0%, 100% { transform: translateY(0); }
//           50%      { transform: translateY(-10px); }
//         }
//         .logo-bounce {
//           animation: bounce 1.5s ease-in-out infinite;
//         }
//       `}</style>

//       <svg
//         width="80%"
//         height="80%"
//         viewBox="0 0 100 100"
//         xmlns="http://www.w3.org/2000/svg"
//       >
//         <defs>
//           <linearGradient id="faceFront" x1="0%" y1="0%" x2="0%" y2="100%">
//             <stop offset="0%" stopColor="#EC4899" />
//             <stop offset="100%" stopColor="#8B5CF6" />
//           </linearGradient>
//           <linearGradient id="faceSide" x1="100%" y1="0%" x2="0%" y2="100%">
//             <stop offset="0%" stopColor="#9333EA" />
//             <stop offset="100%" stopColor="#7C3AED" />
//           </linearGradient>
//           <linearGradient id="edgeGlow" x1="0%" y1="0%" x2="100%" y2="0%">
//             <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8" />
//             <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
//           </linearGradient>
//           <filter id="prismShadow" x="-20%" y="-20%" width="140%" height="140%">
//             <feDropShadow
//               dx="0"
//               dy="4"
//               stdDeviation="4"
//               floodColor="rgba(0,0,0,0.4)"
//             />
//           </filter>
//         </defs>

//         {/* Black background circle */}
//         <circle cx="50" cy="50" r="50" fill="#000" />

//         {/* Bouncing V prism group */}
//         <g className="logo-bounce" filter="url(#prismShadow)">
//           {/* Left face */}
//           <polygon
//             points={`${A.x},${A.y} ${B.x},${B.y} ${B2.x},${B2.y} ${A2.x},${A2.y}`}
//             fill="url(#faceSide)"
//           />
//           {/* Right face */}
//           <polygon
//             points={`${B.x},${B.y} ${C.x},${C.y} ${C2.x},${C2.y} ${B2.x},${B2.y}`}
//             fill="url(#faceSide)"
//           />
//           {/* Front face */}
//           <polygon
//             points={`${A.x},${A.y} ${B.x},${B.y} ${C.x},${C.y}`}
//             fill="url(#faceFront)"
//           />
//           {/* Edge highlights */}
//           <line
//             x1={A.x}
//             y1={A.y}
//             x2={A2.x}
//             y2={A2.y}
//             stroke="url(#edgeGlow)"
//             strokeWidth="2"
//           />
//           <line
//             x1={C.x}
//             y1={C.y}
//             x2={C2.x}
//             y2={C2.y}
//             stroke="url(#edgeGlow)"
//             strokeWidth="2"
//           />
//         </g>
//       </svg>
//     </>
//   );
// };

// export const CompanyLogo: React.FC = () => {
//   const prismOffset = 10;

//   const A = { x: 15, y: 20 };
//   const B = { x: 50, y: 85 };
//   const C = { x: 85, y: 20 };
//   const A2 = { x: A.x, y: A.y - prismOffset };
//   const B2 = { x: B.x, y: B.y - prismOffset };
//   const C2 = { x: C.x, y: C.y - prismOffset };

//   return (
//     <>
//       <style>{`
//             @keyframes bounce {
//               0%, 100% { transform: translateY(0); }
//               50%      { transform: translateY(-10px); }
//             }
//             .logo-bounce {
//               animation: bounce 1.5s ease-in-out infinite;
//             }
//           `}</style>

//       <svg
//         width="80%"
//         height="80%"
//         viewBox="0 0 100 100"
//         xmlns="http://www.w3.org/2000/svg"
//       >
//         <defs>
//           <linearGradient id="faceFront" x1="0%" y1="0%" x2="0%" y2="100%">
//             <stop offset="0%" stopColor="#EC4899" />
//             <stop offset="100%" stopColor="#8B5CF6" />
//           </linearGradient>
//           <linearGradient id="faceSide" x1="100%" y1="0%" x2="0%" y2="100%">
//             <stop offset="0%" stopColor="#9333EA" />
//             <stop offset="100%" stopColor="#7C3AED" />
//           </linearGradient>
//           <linearGradient id="edgeGlow" x1="0%" y1="0%" x2="100%" y2="0%">
//             <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8" />
//             <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
//           </linearGradient>
//           <filter id="prismShadow" x="-20%" y="-20%" width="140%" height="140%">
//             <feDropShadow
//               dx="0"
//               dy="4"
//               stdDeviation="4"
//               floodColor="rgba(0,0,0,0.4)"
//             />
//           </filter>
//         </defs>

//         <g className="logo-bounce" filter="url(#prismShadow)">
//           <polygon
//             points={`${A.x},${A.y} ${B.x},${B.y} ${B2.x},${B2.y} ${A2.x},${A2.y}`}
//             fill="url(#faceSide)"
//           />
//           <polygon
//             points={`${B.x},${B.y} ${C.x},${C.y} ${C2.x},${C2.y} ${B2.x},${B2.y}`}
//             fill="url(#faceSide)"
//           />
//           <polygon
//             points={`${A.x},${A.y} ${B.x},${B.y} ${C.x},${C.y}`}
//             fill="url(#faceFront)"
//           />
//           <line
//             x1={A.x}
//             y1={A.y}
//             x2={A2.x}
//             y2={A2.y}
//             stroke="url(#edgeGlow)"
//             strokeWidth="2"
//           />
//           <line
//             x1={C.x}
//             y1={C.y}
//             x2={C2.x}
//             y2={C2.y}
//             stroke="url(#edgeGlow)"
//             strokeWidth="2"
//           />
//         </g>
//       </svg>
//     </>
//   );
// };

export const CompanyLogo: React.FC = () => {
  const prismOffset = 10;

  const A = { x: 15, y: 20 };
  const B = { x: 50, y: 85 };
  const C = { x: 85, y: 20 };
  const A2 = { x: A.x, y: A.y - prismOffset };
  const B2 = { x: B.x, y: B.y - prismOffset };
  const C2 = { x: C.x, y: C.y - prismOffset };

  return (
    <>
      {/* <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(-10px); }
        }
        .logo-bounce {
          animation: bounce 1.5s ease-in-out infinite;
        }
      `}</style> */}

      <svg
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid meet"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="prismShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow
              dx="0"
              dy="4"
              stdDeviation="4"
              floodColor="rgba(0,0,0,0.4)"
            />
          </filter>
        </defs>

        <g className="logo-bounce" filter="url(#prismShadow)">
          <polygon
            points={`${A.x},${A.y} ${B.x},${B.y} ${C.x},${C.y}`}
            fill="#4B0082"
          />
          <polygon
            points={`${A.x},${A.y} ${B.x},${B.y} ${B2.x},${B2.y} ${A2.x},${A2.y}`}
            fill="#4B0082"
          />
          <polygon
            points={`${B.x},${B.y} ${C.x},${C.y} ${C2.x},${C2.y} ${B2.x},${B2.y}`}
            fill="#4B0082"
          />
          <line
            x1={A.x}
            y1={A.y}
            x2={A2.x}
            y2={A2.y}
            stroke="#4B0082"
            strokeWidth="2"
          />
          <line
            x1={C.x}
            y1={C.y}
            x2={C2.x}
            y2={C2.y}
            stroke="#4B0082"
            strokeWidth="2"
          />
        </g>
      </svg>
    </>
  );
};
