// import { motion } from "framer-motion";

// const ContactUs = () => {
//   return (
//     <section className="min-h-screen bg-gradient-to-tr from-blue-50 to-white py-24 px-6 sm:px-12">
//       <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
//         <motion.div
//           initial={{ opacity: 0, x: -30 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.5 }}
//         >
//           <h2 className="text-4xl sm:text-5xl font-extrabold text-blue-700 mb-4">
//             Contact Our Team 🤝
//           </h2>
//           <p className="text-lg text-gray-600 leading-relaxed mb-6">
//             Whether you have questions about features, pricing, demos, or
//             anything else, our team is here to help.
//           </p>
//           <div className="text-gray-700 space-y-2">
//             <p>
//               <strong>Email:</strong> support@aquasense.com
//             </p>
//             <p>
//               <strong>Phone:</strong> +1 (234) 567-890
//             </p>
//             <p>
//               <strong>Hours:</strong> Mon - Fri, 9:00am - 6:00pm
//             </p>
//           </div>
//         </motion.div>

//         <motion.form
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.3, duration: 0.5 }}
//           className="bg-white shadow-xl rounded-2xl p-10"
//         >
//           <div className="mb-5">
//             <label className="block mb-2 font-medium text-gray-800">
//               Full Name
//             </label>
//             <input
//               type="text"
//               placeholder="Jane Doe"
//               className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
//             />
//           </div>
//           <div className="mb-5">
//             <label className="block mb-2 font-medium text-gray-800">
//               Email Address
//             </label>
//             <input
//               type="email"
//               placeholder="you@example.com"
//               className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
//             />
//           </div>
//           <div className="mb-5">
//             <label className="block mb-2 font-medium text-gray-800">
//               Message
//             </label>
//             <textarea
//               rows={5}
//               placeholder="Tell us how we can help you..."
//               className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
//             ></textarea>
//           </div>
//           <button
//             type="submit"
//             className="w-full bg-blue-600 text-white font-medium py-3 rounded-lg hover:bg-blue-700 transition"
//           >
//             ✉️ Send Message
//           </button>
//         </motion.form>
//       </div>
//     </section>
//   );
// };

// export default ContactUs;

// ContactUs.tsx
import { KeyboardReturn } from "@mui/icons-material";
import React, { useState, type ChangeEvent, type FormEvent } from "react";

type Payload = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  message: string;
};

const ContactUs: React.FC = () => {
  const [payload, setPayload] = useState<Payload>({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    message: ""
  });

  // Correct handleChange function
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

  return (
    <section className="bg-white py-28 px-4 sm:px-8 lg:px-12 font-sans">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6">
          Request <span className="text-blue-600">Callback</span>
        </h2>
        <p className="text-lg sm:text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
          Got questions, suggestions, or partnership opportunities? Reach out
          and we’ll get back to you as soon as we can.
        </p>

        <form
          className="bg-gray-50 p-8 rounded-2xl shadow-lg space-y-6 text-left"
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
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
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
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
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
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
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
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
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
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none resize-none"
            />
          </div>

          <button
            type="submit"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition"
          >
            <KeyboardReturn className="h-5 w-5" />
            Request Callback
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactUs;
