import React from "react";

export const VersewaveLogo: React.FC = () => {
  return (
    <div className="text-center">
      {/* Logo Text */}
      <h1 className="text-2xl sm:text-3xl md:text-3xl font-semibold tracking-wider font-orbitron lowercase bg-gradient-to-r from-teal-400 via-cyan-500 to-indigo-500 text-transparent bg-clip-text drop-shadow-[0_2px_10px_rgba(34,211,238,0.3)]">
        versewave
      </h1>

      {/* Static Sine Wave */}
      <svg
        viewBox="0 0 100 10"
        className="w-30 mx-auto stroke-cyan-400 stroke-[1.5] fill-none"
      >
        <path d="M0 5 Q 10 0, 20 5 T 40 5 T 60 5 T 80 5 T 100 5" />
      </svg>
    </div>
  );
};
