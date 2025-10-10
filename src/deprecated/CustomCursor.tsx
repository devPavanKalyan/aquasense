import { useEffect, useRef } from "react";

export default function InstantCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      const isPointer =
        el.closest(
          "button, a, input, textarea, [role='button'], .clickable"
        ) !== null;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;

        // Optional: change image or scale if hovering pointer target
        cursorRef.current.style.backgroundImage = isPointer
          ? "url('/versewave/cursor-pointer.png')"
          : "url('/versewave/cursor.png')";
      }
    };

    document.addEventListener("mousemove", moveCursor);
    return () => document.removeEventListener("mousemove", moveCursor);
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 z-[9999] pointer-events-none"
      style={{
        width: 32,
        height: 32,
        marginTop: -16,
        marginLeft: -16,
        backgroundImage: "url('/versewave/cursor.png')",
        backgroundSize: "cover"
      }}
    />
  );
}
