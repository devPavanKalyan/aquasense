import { motion } from "framer-motion";
import React from "react";
import { redirectToSignup } from "../../../utils/authRedirects";
import { scrollToSection } from "../../../utils/refs";

const HeroSection: React.FC = () => {
  return (
    <section className="font-sans bg-gradient-to-br from-white to-blue-100 py-24 px-6 sm:px-10 lg:px-20">
      <div className="max-w-4xl mx-auto text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="font-sans text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-6 tracking-tight"
        >
          <span className="text-blue-700">Smarter Monitoring</span> for a{" "}
          <span className="text-green-600">Sustainable Tomorrow</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="text-lg sm:text-xl text-gray-600 font-medium mb-10"
        >
          Experience the fusion of{" "}
          <span className="text-blue-600 font-semibold">AI</span>,{" "}
          <span className="text-green-600 font-semibold">IoT</span>, and{" "}
          <span className="text-cyan-600 font-semibold">Data Science</span> — in
          real-time, to grow and protect your business.
        </motion.p>

        <motion.div
          className="flex flex-wrap justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
        >
          <button
            className="px-8 py-4 bg-blue-600 text-white rounded-xl shadow-md hover:bg-blue-700 transition-all duration-300 font-semibold text-base sm:text-lg"
            onClick={() => {
              redirectToSignup();
            }}
          >
            Start Free Trial
          </button>

          {/* Attach the ref correctly here */}
          <button
            onClick={() => {
              scrollToSection("contact");
            }}
            className="px-8 py-4 border-2 border-blue-600 text-blue-600 rounded-xl hover:bg-blue-50 transition-all duration-300 font-semibold text-base sm:text-lg"
          >
            Contact Sales
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
