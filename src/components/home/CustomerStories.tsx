import React from "react";

const CustomerStories: React.FC = () => {
  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight leading-snug">
          Customer Stories
        </h2>
        <p className="text-lg text-gray-600 mb-12 max-w-3xl mx-auto">
          See how AquaSense is transforming water management for farms, cities,
          and industries with real-time intelligence.
        </p>
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, idx) => (
            <div
              key={idx}
              className="rounded-xl border border-gray-100 shadow-md p-4 hover:shadow-lg transition bg-white flex flex-col gap-3"
            >
              <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 text-xs font-semibold">
                Video Preview
              </div>
              <h3 className="text-lg font-semibold text-gray-900">
                Customer {idx + 1}
              </h3>
              <p className="text-sm text-gray-600">
                AquaSense helped reduce water waste and improved reporting
                accuracy.
              </p>
              <a
                href="#"
                className="text-sm text-blue-600 font-medium hover:underline mt-auto"
              >
                Watch the story ↗
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CustomerStories;
