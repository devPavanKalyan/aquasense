import React, { useEffect, useState } from "react";

const domainDetails = [
  {
    name: "Fish Farming",
    title: "Optimize Aquaculture with Smart Monitoring",
    description:
      "Track oxygen, pH, temperature, and feeding in real-time. Reduce fish loss and improve yield with AI-driven insights tailored for aquafarms.",
    impact:
      "Boost yield by 38%, minimize disease outbreaks, and automate water quality checks with IoT sensors.",
    stat: "38% Yield Increase",
    icon: "🐟"
  },
  {
    name: "Drinking Water Monitoring",
    title: "Ensure Safe and Clean Drinking Water",
    description:
      "Monitor turbidity, contaminants, and supply pressure. Get real-time alerts for quality deviations and infrastructure issues.",
    impact:
      "Real-time compliance tracking ensures public safety and regulatory adherence.",
    stat: "99.9% Quality Compliance",
    icon: "🚰"
  },
  {
    name: "Agro-based Irrigation Systems",
    title: "Precision Irrigation for Agriculture",
    description:
      "Leverage moisture, climate, and crop data to optimize irrigation schedules, saving water and increasing productivity.",
    impact:
      "Farmers report up to 25% water savings with smart irrigation alerts and automation.",
    stat: "25% Water Saved",
    icon: "🌾"
  },
  {
    name: "Government Water Boards",
    title: "Empower Governance with Real-Time Data",
    description:
      "Provide centralized visibility of water infrastructure for better decision-making and citizen services.",
    impact:
      "Reduce leak response time by 60% and improve transparency in urban water delivery.",
    stat: "60% Faster Response",
    icon: "🏛️"
  },
  {
    name: "Industrial Wastewater",
    title: "Automate Effluent Compliance",
    description:
      "Continuously monitor pH, COD, and TDS to meet discharge norms. Reduce manual testing with round-the-clock reporting.",
    impact:
      "Meet environmental standards with automated alerts and performance dashboards.",
    stat: "24/7 Regulation Monitoring",
    icon: "🏭"
  },
  {
    name: "Smart Cities",
    title: "Build Water-Wise Smart Cities",
    description:
      "Enable integrated data across reservoirs, distribution lines, and citizen feedback for optimized urban utilities.",
    impact:
      "Reduce non-revenue water and energy costs with sensor-driven infrastructure.",
    stat: "30% Leak Reduction",
    icon: "🏙️"
  },
  {
    name: "Water Supply Chain",
    title: "End-to-End Supply Chain Transparency",
    description:
      "Track water from source to tap. Detect inefficiencies, forecast demand, and plan maintenance proactively.",
    impact:
      "Improve service uptime and reduce wastage across decentralized systems.",
    stat: "Full Pipeline Visibility",
    icon: "📦"
  },
  {
    name: "Environmental Research",
    title: "Support Research with Reliable Data",
    description:
      "Access high-resolution sensor data for ecosystem modeling, pollution tracking, and environmental policy insights.",
    impact:
      "Accelerate discoveries with granular, historical, and real-time data sets.",
    stat: "High-Fidelity Data",
    icon: "🔬"
  }
];

const SmartSolutions: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [manualSelection, setManualSelection] = useState(false);
  //   const [names, setNames] = useState<string[]>([]);

  useEffect(() => {
    if (manualSelection) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % domainDetails.length);
    }, 10000);

    return () => clearInterval(interval);
  }, [manualSelection]);

  const handleSelect = (index: number) => {
    setActiveIndex(index);
    setManualSelection(true);
    setTimeout(() => setManualSelection(false), 30000);
  };

  const activeItem = domainDetails[activeIndex];

  //   useEffect(() => {
  //     setNames(domainDetails.map((domain) => domain.name));
  //   }, [domainDetails]);

  return (
    <section className="bg-gradient-to-br from-blue-50 to-white py-24 px-6">
      <div className="max-w-7xl mx-auto grid gap-20 lg:grid-cols-2 items-start">
        {/* Left Column */}
        <div>
          <h2 className="text-4xl font-extrabold text-gray-900 leading-tight mb-6">
            Smarter Solutions for a{" "}
            <span className="text-blue-600">Water-Intelligent World</span>
          </h2>
          <p className="text-lg text-gray-600 mb-6 leading-relaxed">
            Whether it’s aquaculture, irrigation, or smart city infrastructure —
            Versewave evolves with your needs, delivering real-time insights and
            tangible impact.
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg shadow-lg transition duration-300">
            Request a Demo
          </button>

          <div className="mt-10">
            <h4 className="text-md font-semibold text-gray-800 mb-3">
              Domains We Serve
            </h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm font-medium">
              {domainDetails.map((item, index) => (
                <li
                  key={item.name}
                  onClick={() => handleSelect(index)}
                  className={`px-4 py-2 rounded-lg border transition shadow-sm cursor-pointer text-center ${
                    activeIndex === index
                      ? "bg-blue-600 text-white border-blue-600 shadow-md"
                      : "bg-white hover:bg-blue-50 text-blue-700 border-gray-200"
                  }`}
                >
                  {item.name}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Column */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 space-y-6 transition-all duration-500 ease-in-out">
          <div className="flex items-center gap-4">
            <div className="text-4xl">{activeItem.icon}</div>
            <div>
              <h3 className="text-2xl font-bold text-blue-800">
                {activeItem.title}
              </h3>
              <p className="text-sm text-blue-600 font-medium">
                {activeItem.stat}
              </p>
            </div>
          </div>
          <p className="text-gray-700 text-base leading-relaxed">
            {activeItem.description}
          </p>
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg">
            <p className="text-sm italic text-gray-700">{activeItem.impact}</p>
          </div>
          <a
            href="#"
            className="inline-block mt-2 text-blue-600 hover:text-blue-800 font-medium text-sm"
          >
            Learn more about {activeItem.name} →
          </a>
        </div>
      </div>
    </section>
  );
};

export default SmartSolutions;

{
  /* <div className="bg-white rounded-2xl shadow-2xl overflow-hidden transition animate-fade-in">
          <div className="h-56 bg-gradient-to-tr from-blue-100 via-blue-200 to-cyan-100 flex items-center justify-center text-gray-700 text-sm font-semibold animate-pulse">
            Live Dashboard Simulation Preview
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x">
            <div className="bg-gray-900 text-white p-6 flex flex-col items-center justify-center text-center">
              <p className="text-3xl font-bold">6 / Top 10</p>
              <p className="text-sm mt-2">
                Top aquaculture firms trust AquaSense
              </p>
            </div>
            <div className="bg-gray-50 p-6 text-sm text-gray-700 flex flex-col justify-between">
              <div>
                <h4 className="font-bold text-gray-900 mb-2">
                  BlueOcean Farms 🌊
                </h4>
                <p>
                  AquaSense enabled a{" "}
                  <span className="text-green-600 font-semibold">
                    38% boost
                  </span>{" "}
                  in yield. Health alerts and predictive insights reduced fish
                  mortality dramatically.
                </p>
              </div>
              <p className="mt-4 text-blue-600 font-medium">
                Smarter aquafarming starts here.
              </p>
            </div>
          </div>

          <div className="bg-white border-t px-6 py-4 text-right sm:text-left">
            <a
              href="#"
              className="text-blue-600 text-sm font-medium hover:underline"
            >
              Explore aquaculture solutions →
            </a>
          </div>
        </div> */
}
