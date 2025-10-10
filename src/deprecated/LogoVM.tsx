// import React from "react";

// /**
//  * VLogoApp.tsx
//  * Single-file React component showcasing a premium, modern "V" logo
//  * with an enhanced, multi-stop radial background gradient.
//  */
// const VLogo: React.FC<{
//   size?: number;
//   bgStart?: string;
//   bgMid?: string;
//   bgEnd?: string;
//   strokeStart?: string;
//   strokeMid?: string;
//   strokeEnd?: string;
// }> = ({
//   size = 200,
//   bgStart = "#FFFFFF", // Center color
//   bgMid = "#E0E7FF", // Mid-tone
//   bgEnd = "#CBD5E1", // Edge shade
//   strokeStart = "#4F46E5",
//   strokeMid = "#A855F7",
//   strokeEnd = "#EC4899"
// }) => (
//   <svg
//     width={size}
//     height={size}
//     viewBox="0 0 100 100"
//     xmlns="http://www.w3.org/2000/svg"
//   >
//     <defs>
//       {/* Multi-stop radial gradient for dynamic backdrop */}
//       <radialGradient id="bgGrad" cx="50%" cy="50%" r="50%">
//         <stop offset="0%" stopColor={bgStart} />
//         <stop offset="60%" stopColor={bgMid} />
//         <stop offset="100%" stopColor={bgEnd} />
//       </radialGradient>
//       {/* Diagonal multi-stop gradient for 'V' stroke */}
//       <linearGradient id="gradV" x1="0%" y1="0%" x2="100%" y2="100%">
//         <stop offset="0%" stopColor={strokeStart} />
//         <stop offset="50%" stopColor={strokeMid} />
//         <stop offset="100%" stopColor={strokeEnd} />
//       </linearGradient>
//       {/* Soft ambient drop shadow */}
//       <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
//         <feDropShadow
//           dx="0"
//           dy="4"
//           stdDeviation="8"
//           floodColor="rgba(0,0,0,0.15)"
//         />
//       </filter>
//     </defs>

//     {/* Apply radial background to full circle */}
//     <circle cx="50" cy="50" r="48" fill="url(#bgGrad)" />

//     {/* 'V' shape with sharp edges and drop-shadow */}
//     <g filter="url(#shadow)">
//       <path
//         d="M20,20 L50,80 L80,20"
//         fill="none"
//         stroke="url(#gradV)"
//         strokeWidth="15"
//         strokeLinecap="butt"
//         strokeLinejoin="miter"
//       />
//     </g>
//   </svg>
// );

// export default VLogo;
