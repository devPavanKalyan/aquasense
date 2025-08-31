import React from "react";

/**
 * VerseWaveLogo.tsx
 * A simple React component using Tailwind CSS for a modern, responsive logo.
 * Ensure you have Poppins added in your global styles (e.g., via index.html or global.css):
 *   @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600;900&display=swap');
 */

const VerseWaveLogo: React.FC = () => (
  <h1
    className={[
      "font-extrabold",
      "text-transparent",
      "bg-clip-text",
      "bg-gradient-to-r from-purple-700 via-pink-500 to-red-500",
      "text-[clamp(1.5rem,0.5vw,0.5rem)]",
      "drop-shadow-md",
      "font-sans"
    ].join(" ")}
  >
    VerseWave
  </h1>
);

export default VerseWaveLogo;
