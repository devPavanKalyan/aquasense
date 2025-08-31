// import {
//   FaEnvelope,
//   FaGithub,
//   FaInstagram,
//   FaLinkedin,
//   FaTwitter
// } from "react-icons/fa";

// const Footer = () => {
//   return (
//     <footer className="bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#1e40af] text-white px-6 py-16">
//       <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
//         {/* Company Info */}
//         <div>
//           <h2 className="text-2xl font-bold mb-4">Versewave</h2>
//           <p className="text-gray-300 text-sm leading-relaxed">
//             Revolutionizing water quality monitoring through{" "}
//             <span className="text-blue-400 font-medium">AI</span>,{" "}
//             <span className="text-emerald-400 font-medium">IoT</span>, and{" "}
//             <span className="text-cyan-400 font-medium">Data Science</span>.
//             Built for aquaculture, agriculture, and smart cities.
//           </p>
//         </div>

//         {/* Quick Links */}
//         <div>
//           <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
//           <ul className="space-y-2 text-sm text-gray-300">
//             {[
//               "Dashboard",
//               "Industries",
//               "Solutions",
//               "Contact Us",
//               "Get Started"
//             ].map((item) => (
//               <li key={item}>
//                 <a
//                   href={`/${item.toLowerCase().replace(/\s+/g, "")}`}
//                   className="hover:text-blue-400 hover:underline transition duration-200"
//                 >
//                   {item}
//                 </a>
//               </li>
//             ))}
//           </ul>
//         </div>

//         {/* Resources */}
//         <div>
//           <h4 className="text-lg font-semibold mb-4">Resources</h4>
//           <ul className="space-y-2 text-sm text-gray-300">
//             {["Docs", "Pricing", "Blog", "Case Studies", "Support"].map(
//               (item) => (
//                 <li key={item}>
//                   <a
//                     href={`/${item.toLowerCase().replace(/\s+/g, "-")}`}
//                     className="hover:text-blue-400 hover:underline transition duration-200"
//                   >
//                     {item}
//                   </a>
//                 </li>
//               )
//             )}
//           </ul>
//         </div>

//         {/* Social Media */}
//         <div>
//           <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
//           <ul className="space-y-2 text-sm text-gray-300">
//             <li className="flex items-center gap-2">
//               <FaTwitter className="text-blue-400" />
//               <a
//                 href="https://twitter.com"
//                 target="_blank"
//                 className="hover:text-blue-400 transition"
//               >
//                 Twitter
//               </a>
//             </li>
//             <li className="flex items-center gap-2">
//               <FaLinkedin className="text-blue-300" />
//               <a
//                 href="https://linkedin.com"
//                 target="_blank"
//                 className="hover:text-blue-400 transition"
//               >
//                 LinkedIn
//               </a>
//             </li>
//             <li className="flex items-center gap-2">
//               <FaInstagram className="text-pink-400" />
//               <a
//                 href="https://instagram.com"
//                 target="_blank"
//                 className="hover:text-blue-400 transition"
//               >
//                 Instagram
//               </a>
//             </li>
//             <li className="flex items-center gap-2">
//               <FaGithub className="text-gray-400" />
//               <a
//                 href="https://github.com"
//                 target="_blank"
//                 className="hover:text-blue-400 transition"
//               >
//                 GitHub
//               </a>
//             </li>
//             <li className="flex items-center gap-2">
//               <FaEnvelope className="text-yellow-300" />
//               <a
//                 href="mailto:support@aquasense.com"
//                 className="hover:text-blue-400 transition"
//               >
//                 Email Support
//               </a>
//             </li>
//           </ul>
//         </div>
//       </div>

//       {/* Divider */}
//       <div className="mt-12 border-t border-gray-700 pt-6 text-center text-sm text-gray-400">
//         <p>
//           &copy; {new Date().getFullYear()}{" "}
//           <span className="text-white font-medium">Versewave Inc.</span> All
//           rights reserved.
//         </p>
//         <div className="mt-2 flex justify-center gap-4">
//           <a href="/privacy" className="hover:text-blue-400 transition">
//             Privacy Policy
//           </a>
//           <span>|</span>
//           <a href="/terms" className="hover:text-blue-400 transition">
//             Terms
//           </a>
//           <span>|</span>
//           <a href="/cookies" className="hover:text-blue-400 transition">
//             Cookies
//           </a>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;

import {
  FaEnvelope,
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaTwitter
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#1e40af] text-white px-6 py-16 font-sans">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Company Info */}
        <div>
          <h2 className="text-2xl font-bold mb-4">AquaSense</h2>
          <p className="text-gray-300 text-sm leading-relaxed">
            Revolutionizing water quality monitoring through{" "}
            <span className="text-blue-400 font-medium">AI</span>,{" "}
            <span className="text-emerald-400 font-medium">IoT</span>, and{" "}
            <span className="text-cyan-400 font-medium">Data Science</span>.
            Designed for aquaculture, agriculture, and smart cities.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Explore</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            {[
              { label: "Home", href: "/" },
              { label: "Overview", href: "/overview" },
              { label: "Features", href: "/features" },
              { label: "Docs", href: "/docs" },
              { label: "Support", href: "/support" }
            ].map(({ label, href }) => (
              <li key={label}>
                <a
                  href={href}
                  className="hover:text-blue-400 hover:underline transition duration-200"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Get Involved */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Get Involved</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            {[
              {
                label: "GitHub",
                icon: FaGithub,
                href: "https://github.com/aquasense"
              },
              { label: "Community Forum", icon: FaLinkedin, href: "#" },
              {
                label: "Contribute",
                icon: FaEnvelope,
                href: "mailto:team@aquasense.com"
              }
            ].map(({ label, icon: Icon, href }) => (
              <li key={label} className="flex items-center gap-2">
                <Icon className="text-blue-400" />
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-400 transition"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            {[
              {
                label: "Twitter",
                icon: FaTwitter,
                href: "https://twitter.com"
              },
              {
                label: "Instagram",
                icon: FaInstagram,
                href: "https://instagram.com"
              },
              {
                label: "LinkedIn",
                icon: FaLinkedin,
                href: "https://linkedin.com"
              }
            ].map(({ label, icon: Icon, href }) => (
              <li key={label} className="flex items-center gap-2">
                <Icon className="text-blue-400" />
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-400 transition"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Divider */}
      <div className="mt-12 border-t border-gray-700 pt-6 text-center text-sm text-gray-400">
        <p>
          &copy; {new Date().getFullYear()}{" "}
          <span className="text-white font-medium">AquaSense</span>. All rights
          reserved.
        </p>
        <div className="mt-2 flex justify-center gap-4">
          <a href="/privacy" className="hover:text-blue-400 transition">
            Privacy Policy
          </a>
          <span>|</span>
          <a href="/terms" className="hover:text-blue-400 transition">
            Terms
          </a>
          <span>|</span>
          <a href="/cookies" className="hover:text-blue-400 transition">
            Cookies
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
