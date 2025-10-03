// pages/Home.tsx
import { motion } from "framer-motion";
import React, {
  useEffect,
  useState,
  type ChangeEvent,
  type FormEvent
} from "react";
import { redirectToSignup } from "../../utils/authRedirects";
import { refs } from "../../utils/refs";

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

import {
  Activity,
  AlertTriangle,
  Clock3,
  Cloud,
  Cpu,
  Droplet,
  LineChart,
  SatelliteDish,
  Settings2,
  ShieldCheck
} from "lucide-react";

import { KeyboardReturn } from "@mui/icons-material";
import { Mail, MessageSquareText, Phone } from "lucide-react";

const supportOptions = [
  {
    title: "Call Us",
    desc: "Reach our 24/7 support line for urgent issues or quick guidance.",
    icon: <Phone className="h-8 w-8 text-blue-600" />,
    value: "+91 7995797366"
  },
  {
    title: "Email Support",
    desc: "Send us detailed questions, and we’ll respond within 1 business day.",
    icon: <Mail className="h-8 w-8 text-blue-600" />,
    value: "aquasensethefuture@gmail.com"
  },
  {
    title: "Live Chat",
    desc: "Talk to our support team directly from the AquaSense dashboard.",
    icon: <MessageSquareText className="h-8 w-8 text-blue-600" />,
    // value: "Available in-app"
    value: "Coming soon..."
  }
];
const features = [
  {
    title: "Real-Time Monitoring",
    desc: "Get up-to-the-minute updates on pH, temperature, turbidity, and more.",
    icon: <Clock3 className="h-8 w-8 text-blue-600" />
  },
  {
    title: "Predictive Analytics",
    desc: "Forecast water demands, leak risks, and optimal irrigation schedules.",
    icon: <LineChart className="h-8 w-8 text-blue-600" />
  },
  {
    title: "Smart Alerts",
    desc: "Automated alerts when parameters deviate from safe thresholds.",
    icon: <AlertTriangle className="h-8 w-8 text-blue-600" />
  },
  {
    title: "Remote Access",
    desc: "Manage water systems anytime, anywhere through our secure cloud dashboard.",
    icon: <SatelliteDish className="h-8 w-8 text-blue-600" />
  }
];

const featureSection = [
  {
    title: "AI-Driven Insights",
    desc: "Leverage machine learning to detect anomalies and optimize resource usage.",
    icon: <Cpu className="h-8 w-8 text-blue-600" />
  },
  {
    title: "Cloud Integration",
    desc: "Securely sync and access your data across platforms and teams in real time.",
    icon: <Cloud className="h-8 w-8 text-blue-600" />
  },
  {
    title: "Custom Configurations",
    desc: "Define triggers, alerts, and workflows tailored to your unique operations.",
    icon: <Settings2 className="h-8 w-8 text-blue-600" />
  },
  {
    title: "Water Quality Index",
    desc: "Comprehensive scoring system based on turbidity, pH, temperature & more.",
    icon: <Droplet className="h-8 w-8 text-blue-600" />
  },
  {
    title: "System Health Monitoring",
    desc: "Track device status, battery levels, and network connectivity.",
    icon: <Activity className="h-8 w-8 text-blue-600" />
  },
  {
    title: "Data Privacy & Security",
    desc: "End-to-end encryption and secure access controls to protect your data.",
    icon: <ShieldCheck className="h-8 w-8 text-blue-600" />
  }
];

type Payload = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  message: string;
};
const Home: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [manualSelection, setManualSelection] = useState(false);

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

  const [payload, setPayload] = useState<Payload>({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    message: ""
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setPayload((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", payload);
  };
  const activeItem = domainDetails[activeIndex];
  return (
    <div>
      <section ref={refs.home} className="scroll-mt-20">
        <section className="bg-gradient-to-br from-white to-blue-50 py-15 px-6 sm:px-10 lg:px-20">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="font-extrabold text-4xl sm:text-5xl md:text-6xl text-gray-900 mb-6 leading-tight tracking-tight"
            >
              <span className="text-blue-700">Smarter Monitoring</span> for a{" "}
              <span className="text-green-600">Sustainable Tomorrow</span>
            </motion.h1>

            <motion.div
              className="flex flex-wrap justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <button className="px-8 py-4 bg-blue-600 text-white rounded-xl shadow-md hover:bg-blue-700 transition duration-300 font-semibold text-base sm:text-lg">
                Start Free Trial
              </button>
              <button className="px-8 py-4 border-2 border-blue-600 text-blue-600 rounded-xl hover:bg-blue-50 transition duration-300 font-semibold text-base sm:text-lg">
                Contact Sales
              </button>
            </motion.div>
          </div>
        </section>

        <section className="py-15 px-6 max-w-7xl mx-auto grid gap-24 lg:grid-cols-2 items-start">
          <div>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight mb-6">
              Smarter Solutions for a{" "}
              <span className="text-blue-600">Water-Intelligent World</span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-700 mb-10 leading-relaxed max-w-2xl">
              Whether it’s aquaculture, irrigation, or smart city infrastructure
              — Versewave evolves with your needs, delivering real-time insights
              and tangible impact.
            </p>

            <div className="mt-12">
              <h4 className="text-md font-semibold text-gray-900 mb-4">
                Domains We Serve
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                {domainDetails.map((item, index) => (
                  <li
                    key={item.name}
                    onClick={() => handleSelect(index)}
                    className={`cursor-pointer px-5 py-4 rounded-3xl border transition-all font-medium shadow-sm hover:shadow-lg transform hover:-translate-y-1 duration-300 ${
                      activeIndex === index
                        ? "bg-blue-600 text-white border-blue-600 shadow-lg"
                        : "bg-white text-blue-700 border-gray-200 hover:bg-blue-50"
                    }`}
                  >
                    {item.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-white p-10 space-y-8 transition-all duration-500 ease-in-out hover:shadow-3xl">
            <div className="flex items-center gap-5">
              <div className="text-5xl text-blue-600">{activeItem.icon}</div>
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold text-blue-800">
                  {activeItem.title}
                </h3>
                <p className="text-sm sm:text-base text-blue-600 font-medium mt-1">
                  {activeItem.stat}
                </p>
              </div>
            </div>
            <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
              {activeItem.description}
            </p>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-5 rounded-2xl">
              <p className="text-sm sm:text-base italic text-gray-700">
                {activeItem.impact}
              </p>
            </div>
          </div>
        </section>
      </section>

      <section
        ref={refs.overview}
        className="scroll-mt-20 bg-white py-32 px-6 sm:px-12 lg:px-20 font-sans"
      >
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
            <span className="text-blue-600">AquaSense</span>: The Future of
            Water Intelligence
          </h2>
          <p className="text-lg sm:text-xl text-gray-700 mb-16 max-w-4xl mx-auto leading-relaxed">
            AquaSense seamlessly integrates AI, IoT, and data analytics to
            deliver real-time insights into your water systems. From aquaculture
            to city utilities, our platform empowers smarter, faster, and more
            sustainable decisions.
          </p>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 max-w-5xl mx-auto">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="bg-white border border-gray-100 rounded-3xl p-8 text-left shadow-sm hover:shadow-lg hover:-translate-y-2 transition-all duration-300 ease-in-out"
              >
                <div className="mb-4 text-4xl text-blue-600">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        ref={refs.features}
        className="scroll-mt-20 bg-gray-50 py-32 px-6 sm:px-12 lg:px-20 font-sans"
      >
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
            Platform <span className="text-blue-600">Features</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-700 mb-16 max-w-4xl mx-auto leading-relaxed">
            AquaSense offers an end-to-end platform for intelligent water system
            management with rich features that scale with your needs.
          </p>

          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
            {featureSection.map((feature) => (
              <div
                key={feature.title}
                className="bg-white border border-gray-100 rounded-3xl p-8 text-left shadow-sm hover:shadow-lg hover:-translate-y-2 transition-all duration-300 ease-in-out"
              >
                <div className="mb-4 text-4xl text-blue-600">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        ref={refs.support}
        className="scroll-mt-20 bg-blue-50 py-32 px-6 sm:px-12 lg:px-20 font-sans"
      >
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
            Need <span className="text-blue-600">Help?</span> We’ve Got You
            Covered
          </h2>
          <p className="text-lg sm:text-xl text-gray-700 mb-16 max-w-3xl mx-auto leading-relaxed">
            Whether you’re just getting started or need technical assistance,
            our support team is here for you every step of the way.
          </p>

          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {supportOptions.map((option) => (
              <div
                key={option.title}
                className="bg-white border border-gray-100 rounded-3xl p-8 text-left shadow-sm hover:shadow-lg hover:-translate-y-2 transition-all duration-300 ease-in-out"
              >
                <div className="mb-4 text-4xl text-blue-600">{option.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {option.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-4">
                  {option.desc}
                </p>
                <p className="text-sm font-semibold text-blue-700">
                  {option.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        ref={refs.contact}
        className="scroll-mt-20 bg-white py-15 px-4 sm:px-8 lg:px-12 font-sans"
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6">
            Request <span className="text-[#4B0082]">Callback</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
            Got questions, suggestions, or partnership opportunities? Reach out
            and we’ll get back to you as soon as we can.
          </p>

          <form
            className="border border-2 border-[#4B0082] p-8 rounded-3xl space-y-6 text-left"
            onSubmit={handleSubmit}
          >
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={payload.firstName}
                  onChange={handleChange}
                  placeholder="John"
                  className="w-full px-5 py-3 rounded-full border border-gray-300 focus:ring-2 focus:ring-[#4B0082] focus:outline-none transition"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={payload.lastName}
                  onChange={handleChange}
                  placeholder="Doe"
                  className="w-full px-5 py-3 rounded-full border border-gray-300 focus:ring-2 focus:ring-[#4B0082] focus:outline-none transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone
              </label>
              <input
                type="tel"
                name="phone"
                value={payload.phone}
                onChange={handleChange}
                placeholder="9876543210"
                className="w-full px-5 py-3 rounded-full border border-gray-300 focus:ring-2 focus:ring-[#4B0082] focus:outline-none transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={payload.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full px-5 py-3 rounded-full border border-gray-300 focus:ring-2 focus:ring-[#4B0082] focus:outline-none transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Message
              </label>
              <textarea
                name="message"
                value={payload.message}
                onChange={handleChange}
                rows={5}
                placeholder="How can we help you?"
                className="w-full px-5 py-3 rounded-2xl border border-gray-300 focus:ring-2 focus:ring-[#4B0082] focus:outline-none resize-none transition"
              />
            </div>

            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-3 bg-[#4B0082] text-white font-semibold rounded-full hover:bg-[#6F00FF] transition-all"
            >
              <KeyboardReturn className="h-5 w-5" />
              Request Callback
            </button>
          </form>
        </div>
      </section>

      <section className="text-gray-900 py-15 px-6 sm:px-12 lg:px-20">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight tracking-tight">
            Ready to <span className="text-indigo-600">optimize</span> and{" "}
            <span className="text-emerald-600">scale</span> your operations?
          </h2>

          <p className="mt-6 text-lg sm:text-xl text-gray-700 font-medium max-w-3xl mx-auto">
            Unlock intelligent monitoring and actionable insights with our
            cutting-edge tools built for water management, IoT, and real-time
            analytics.
          </p>

          <div className="mt-10 flex justify-center gap-6 flex-wrap">
            <button
              onClick={() => redirectToSignup()}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-purple-600 hover:to-indigo-600 text-white px-10 py-4 rounded-full text-lg font-bold transition-all duration-300 shadow-md transform hover:scale-105"
            >
              Go to Dashboard
            </button>
          </div>

          <div className="mt-16 grid grid-cols-4 gap-4 max-w-lg mx-auto">
            <div className="h-2 w-full rounded-full bg-gradient-to-r from-indigo-400 via-indigo-500 to-indigo-600 animate-pulse" />
            <div className="h-2 w-full rounded-full bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-600 animate-pulse delay-75" />
            <div className="h-2 w-full rounded-full bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 animate-pulse delay-150" />
            <div className="h-2 w-full rounded-full bg-gradient-to-r from-pink-400 via-rose-400 to-rose-500 animate-pulse delay-200" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
