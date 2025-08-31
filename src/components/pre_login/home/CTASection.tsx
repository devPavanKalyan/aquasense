import React from "react";
import { redirectToSignup } from "../../../utils/authRedirects";

const CTASection: React.FC = () => {
  return (
    <section className="bg-white text-gray-900 py-24 px-6 sm:px-12 lg:px-20">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight tracking-tight">
          Ready to <span className="text-indigo-600">optimize</span> and{" "}
          <span className="text-emerald-600">scale</span> your operations?
        </h2>

        <p className="mt-6 text-lg sm:text-xl text-gray-600 font-medium max-w-3xl mx-auto">
          Unlock intelligent monitoring and actionable insights with our
          cutting-edge tools built for water management, IoT, and real-time
          analytics.
        </p>

        <div className="mt-10 flex justify-center gap-6 flex-wrap">
          <button
            onClick={() => {
              redirectToSignup();
            }}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-xl text-base font-semibold transition duration-300 shadow-lg"
          >
            Go to Dashboard
          </button>
          {/* <a
            href="/contact"
            className="border-2 border-cyan-600 text-cyan-600 hover:bg-cyan-50 px-8 py-4 rounded-xl text-base font-semibold transition duration-300"
          >
            Talk to Sales
          </a> */}
        </div>

        <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-lg mx-auto">
          <div className="h-2 rounded-full bg-gradient-to-r from-indigo-400 to-indigo-600" />
          <div className="h-2 rounded-full bg-gradient-to-r from-emerald-400 to-emerald-600" />
          <div className="h-2 rounded-full bg-gradient-to-r from-yellow-300 to-yellow-500" />
          <div className="h-2 rounded-full bg-gradient-to-r from-pink-400 to-rose-500" />
        </div>
      </div>
    </section>
  );
};

export default CTASection;
