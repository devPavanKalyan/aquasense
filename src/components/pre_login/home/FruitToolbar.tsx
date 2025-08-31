import { useEffect, useRef, useState } from "react";

const fruits = [
  "Apple",
  "Banana",
  "Cherry",
  "Date",
  "Grape",
  "Mango",
  "Orange",
  "Strawberry",
  "Watermelon",
  "Pineapple",
  "Blueberry"
];

const fruitDescriptions: Record<string, string> = {
  Apple: "A sweet, crisp fruit. Great for pies.",
  Banana: "A soft, sweet yellow fruit rich in potassium.",
  Cherry: "A small, juicy, red fruit perfect for desserts.",
  Date: "A sweet, chewy fruit from the date palm.",
  Grape: "Tiny, juicy fruit often used in wine.",
  Mango: "A tropical fruit with a rich, juicy flavor.",
  Orange: "Citrusy and refreshing, full of Vitamin C.",
  Strawberry: "Red, heart-shaped and sweet — perfect with cream.",
  Watermelon: "A large fruit with refreshing red flesh.",
  Pineapple: "Spiky outside, sweet and tangy inside.",
  Blueberry: "Small, sweet, and antioxidant-rich berries."
};

export default function FruitRollerWithDetails() {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [paused, setPaused] = useState(false);
  const [currentFruitIndex, setCurrentFruitIndex] = useState(0);

  const duplicatedFruits = [...fruits, ...fruits];

  // Auto-scrolling
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const scrollSpeed = 1;
    const intervalMs = 20;
    let intervalId: NodeJS.Timeout;

    const startScrolling = () => {
      intervalId = setInterval(() => {
        if (!paused && el) {
          const maxScroll = el.scrollHeight / 2;
          el.scrollTop += scrollSpeed;

          if (el.scrollTop >= maxScroll) {
            el.scrollTop = 0;
          }
        }
      }, intervalMs);
    };

    startScrolling();

    return () => clearInterval(intervalId);
  }, [paused]);

  // Pause scrolling on user interaction
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let timeout: NodeJS.Timeout;

    const pauseScroll = () => {
      setPaused(true);
      clearTimeout(timeout);
      timeout = setTimeout(() => setPaused(false), 2000);
    };

    el.addEventListener("wheel", pauseScroll, { passive: true });
    el.addEventListener("touchstart", pauseScroll, { passive: true });

    return () => {
      el.removeEventListener("wheel", pauseScroll);
      el.removeEventListener("touchstart", pauseScroll);
    };
  }, []);

  // Auto-change current fruit every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFruitIndex((prev) => (prev + 1) % fruits.length);
    }, 10000); // 10 seconds
    return () => clearInterval(interval);
  }, []);

  const currentFruit = fruits[currentFruitIndex];

  return (
    <section className="flex justify-center items-start min-h-screen bg-gray-100 p-10 gap-10">
      {/* Left: Scrolling List */}
      <div
        ref={scrollRef}
        className="relative w-64 h-64 overflow-y-auto px-2 py-3 scrollbar-hide"
        style={{
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)",
          maskImage:
            "linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)"
        }}
      >
        <ul className="space-y-4">
          {duplicatedFruits.map((fruit, i) => (
            <li
              key={`${fruit}-${i}`}
              className="rounded-full bg-gradient-to-r from-green-400 via-blue-500 to-purple-600"
            >
              <button
                onClick={() => setSelected(fruit)}
                className={`w-full text-left px-6 py-3 text-white rounded-full transition-all duration-300 ${
                  selected === fruit ||
                  (i % fruits.length === currentFruitIndex && !selected)
                    ? "bg-opacity-90 font-bold ring-2 ring-white"
                    : "bg-opacity-70 hover:bg-opacity-100"
                }`}
              >
                {fruit}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Right: Fruit Details */}
      <div className="w-80 p-6 bg-white rounded-2xl shadow-lg border border-gray-200">
        <h2 className="text-2xl font-bold text-purple-600 mb-2">
          {currentFruit}
        </h2>
        <p className="text-gray-600 text-md">
          {fruitDescriptions[currentFruit]}
        </p>
      </div>
    </section>
  );
}
