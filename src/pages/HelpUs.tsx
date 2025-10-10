// import { motion } from "framer-motion";

// const HelpUs = () => {
//   return (
//     <section className="min-h-screen bg-gradient-to-br from-white to-blue-50 py-24 px-6 sm:px-12">
//       <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
//         <motion.div
//           initial={{ opacity: 0, x: -40 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.6 }}
//           className="text-center lg:text-left"
//         >
//           <h1 className="text-4xl sm:text-5xl font-extrabold text-blue-700 mb-6">
//             Help Us Improve <br className="hidden sm:block" /> AquaSense 💬
//           </h1>
//           <p className="text-gray-600 text-lg leading-relaxed mb-8">
//             We’re on a mission to revolutionize how water quality is monitored
//             and managed using technology. Your feedback helps us shape the
//             future.
//           </p>
//           <div className="space-y-4">
//             <p className="flex items-start text-gray-700">
//               <span className="text-blue-600 mr-2 text-lg">✔</span> What
//               challenges are you facing in your workflow?
//             </p>
//             <p className="flex items-start text-gray-700">
//               <span className="text-blue-600 mr-2 text-lg">✔</span> What can we
//               improve or simplify in our platform?
//             </p>
//             <p className="flex items-start text-gray-700">
//               <span className="text-blue-600 mr-2 text-lg">✔</span> Are there
//               any features you’d love to see?
//             </p>
//             <p className="flex items-start text-gray-700">
//               <span className="text-blue-600 mr-2 text-lg">✔</span> What has
//               helped you the most so far?
//             </p>
//           </div>
//         </motion.div>

//         <motion.form
//           initial={{ opacity: 0, y: 40 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.2, duration: 0.6 }}
//           className="bg-white rounded-2xl shadow-xl p-10 w-full"
//         >
//           <div className="mb-5">
//             <label className="block mb-2 font-medium text-gray-800">Name</label>
//             <input
//               type="text"
//               placeholder="Your full name"
//               className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-300 outline-none"
//             />
//           </div>

//           <div className="mb-5">
//             <label className="block mb-2 font-medium text-gray-800">
//               Email
//             </label>
//             <input
//               type="email"
//               placeholder="your@email.com"
//               className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-300 outline-none"
//             />
//           </div>

//           <div className="mb-5">
//             <label className="block mb-2 font-medium text-gray-800">
//               Your Feedback
//             </label>
//             <textarea
//               rows={5}
//               placeholder="We’d love to hear your thoughts..."
//               className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-300 outline-none"
//             />
//           </div>

//           <div className="mb-6">
//             <label className="block mb-2 font-medium text-gray-800">
//               Which feature do you use most?
//             </label>
//             <select className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-300 outline-none">
//               <option>Real-time Monitoring</option>
//               <option>AI Insights & Recommendations</option>
//               <option>Device Management</option>
//               <option>Alerts & Notifications</option>
//               <option>Reports & Visualizations</option>
//               <option>Other</option>
//             </select>
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
//           >
//             🚀 Submit Feedback
//           </button>
//         </motion.form>
//       </div>
//     </section>
//   );
// };

// export default HelpUs;

// HelpUs.tsx
import { Github, HeartHandshake, Users } from "lucide-react";
import React from "react";

const helpOptions = [
  {
    title: "Contribute on GitHub",
    desc: "Help improve AquaSense by contributing code, reporting bugs, or submitting feature requests.",
    icon: <Github className="h-8 w-8 text-blue-600" />,
    href: "https://github.com/aquasense"
  },
  {
    title: "Join Our Community",
    desc: "Collaborate with fellow developers, share insights, and grow together.",
    icon: <Users className="h-8 w-8 text-blue-600" />,
    href: "#"
  },
  {
    title: "Support the Mission",
    desc: "Help us expand access to clean water technology by supporting AquaSense’s initiatives.",
    icon: <HeartHandshake className="h-8 w-8 text-blue-600" />,
    href: "#"
  }
];

const HelpUs: React.FC = () => {
  return (
    <section className="bg-blue-50 py-28 px-4 sm:px-8 lg:px-12 font-sans">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6">
          Help <span className="text-blue-600">Us</span> Grow
        </h2>
        <p className="text-lg sm:text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
          AquaSense is built with the support of a passionate community. Here’s
          how you can contribute to the mission.
        </p>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {helpOptions.map((item) => (
            <a
              key={item.title}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white border border-blue-100 rounded-2xl p-6 text-left shadow hover:shadow-md hover:bg-blue-100/30 transition duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                {item.icon}
              </div>
              <h3 className="text-xl font-semibold text-blue-900 mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                {item.desc}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HelpUs;
