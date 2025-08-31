/* Updated MultiLevelMenu with improved scroll arrow detection */
import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

const ScrollableTabs = ({ children }: { children: React.ReactNode }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollStatus = () => {
    const el = containerRef.current;
    if (!el) return;
    const scrollLeft = el.scrollLeft;
    const scrollWidth = el.scrollWidth;
    const clientWidth = el.clientWidth;
    const buffer = 5; // Small buffer to avoid float rounding
    setCanScrollLeft(scrollLeft > buffer);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - buffer);
  };

  const scroll = (dir: "left" | "right") => {
    const el = containerRef.current;
    if (!el) return;
    const amount = el.clientWidth / 2;
    el.scrollBy({
      left: dir === "left" ? -amount : amount,
      behavior: "smooth"
    });
    setTimeout(updateScrollStatus, 300); // Ensure status updates after animation
  };

  useEffect(() => {
    updateScrollStatus();
    const el = containerRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateScrollStatus);
    window.addEventListener("resize", updateScrollStatus);
    return () => {
      el.removeEventListener("scroll", updateScrollStatus);
      window.removeEventListener("resize", updateScrollStatus);
    };
  }, []);

  return (
    <div className="relative w-full">
      <div className="flex items-center w-full">
        {canScrollLeft && (
          <button
            onClick={() => scroll("left")}
            className="z-10 p-1 bg-white shadow rounded-full mr-2"
          >
            <ChevronLeft className="w-4 h-4 text-gray-700" />
          </button>
        )}
        <div
          ref={containerRef}
          className="overflow-x-auto no-scrollbar whitespace-nowrap scroll-smooth flex-1"
        >
          <div className="inline-flex items-center gap-3 px-1">{children}</div>
        </div>
        {canScrollRight && (
          <button
            onClick={() => scroll("right")}
            className="z-10 p-1 bg-white shadow rounded-full ml-2"
          >
            <ChevronRight className="w-4 h-4 text-gray-700" />
          </button>
        )}
      </div>
    </div>
  );
};

export default ScrollableTabs;
