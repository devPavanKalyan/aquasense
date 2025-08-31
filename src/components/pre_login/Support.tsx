// const Support = () => {
//   const supportItems = [
//     {
//       title: "Knowledge Base",
//       desc: "Browse tutorials, FAQs, and guides."
//     },
//     {
//       title: "Submit a Ticket",
//       desc: "Reach out directly to our support team."
//     },
//     {
//       title: "Community Forum",
//       desc: "Ask questions and learn from others."
//     },
//     {
//       title: "Live Chat",
//       desc: "Get real-time help from our experts."
//     }
//   ];

//   return (
//     <section className="bg-gradient-to-br from-white to-blue-50 px-6 py-24 min-h-screen font-sans text-gray-800">
//       <div className="max-w-3xl mx-auto text-center mb-16">
//         <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
//           Need Help?
//         </h2>
//         <p className="text-lg text-gray-600">
//           Our support team is here to help you with any AquaSense-related
//           queries, issues, or feedback.
//         </p>
//       </div>

//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
//         {supportItems.map((item, idx) => (
//           <div
//             key={idx}
//             className="bg-white p-6 rounded-2xl border border-gray-100 shadow-md hover:bg-blue-50 transition"
//           >
//             <h3 className="font-semibold text-blue-700 mb-2 text-lg">
//               {item.title}
//             </h3>
//             <p className="text-sm text-gray-600">{item.desc}</p>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default Support;

// Support.tsx
import { Mail, MessageSquareText, Phone } from "lucide-react";
import React from "react";

const supportOptions = [
  {
    title: "Call Us",
    desc: "Reach our 24/7 support line for urgent issues or quick guidance.",
    icon: <Phone className="h-8 w-8 text-blue-600" />,
    value: "+1 (800) 555-1234"
  },
  {
    title: "Email Support",
    desc: "Send us detailed questions, and we’ll respond within 1 business day.",
    icon: <Mail className="h-8 w-8 text-blue-600" />,
    value: "support@aquasense.io"
  },
  {
    title: "Live Chat",
    desc: "Talk to our support team directly from the AquaSense dashboard.",
    icon: <MessageSquareText className="h-8 w-8 text-blue-600" />,
    value: "Available in-app"
  }
];

const Support: React.FC = () => {
  return (
    <section className="bg-blue-50 py-28 px-4 sm:px-8 lg:px-12 font-sans">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6">
          Need <span className="text-blue-600">Help?</span> We’ve Got You
          Covered
        </h2>
        <p className="text-lg sm:text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
          Whether you’re just getting started or need technical assistance, our
          support team is here for you every step of the way.
        </p>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {supportOptions.map((option) => (
            <div
              key={option.title}
              className="bg-white border border-blue-100 rounded-2xl p-6 text-left shadow hover:shadow-md transition duration-300"
            >
              <div className="mb-4">{option.icon}</div>
              <h3 className="text-xl font-semibold text-blue-900 mb-2">
                {option.title}
              </h3>
              <p className="text-sm text-gray-700 leading-relaxed mb-2">
                {option.desc}
              </p>
              <p className="text-sm font-medium text-blue-700">
                {option.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Support;
