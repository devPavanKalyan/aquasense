import clsx from "clsx";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function Footer() {
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <footer className="bg-gray-50 pt-16 pb-12 px-6 text-gray-800">
      <div
        className={clsx(
          isAuthenticated
            ? "max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12"
            : "flex items-center justify-center"
        )}
      >
        <div className="flex flex-col items-start">
          <div
            onClick={() => navigate("/")}
            className="flex cursor-pointer text-3xl font-extrabold text-[#4B0082] mb-2 hover:text-[#6F00FF] transition-colors"
            style={{ fontFamily: "'Pacifico', cursive" }}
          >
            AquaSense
          </div>
          <p className="text-sm text-gray-600 leading-relaxed">
            Empowering smart water systems with{" "}
            <span className="font-semibold text-[#4B0082]">AI</span>,{" "}
            <span className="font-semibold text-teal-600">IoT</span>, and{" "}
            <span className="font-semibold text-cyan-600">Data Science</span>.
            Designed for aquaculture, agriculture, and urban utilities.
          </p>
        </div>

        {isAuthenticated && (
          <>
            <div>
              <h4 className="text-sm font-bold mb-4 text-[#4B0082] uppercase tracking-wide">
                Navigation
              </h4>
              <ul className="space-y-3 text-sm">
                {["Home", "Monitoring", "Devices", "Reports", "Alerts"].map(
                  (item) => (
                    <li key={item}>
                      <a
                        href={`/${item.toLowerCase()}`}
                        className="hover:text-[#6F00FF] transition-colors font-medium"
                      >
                        {item}
                      </a>
                    </li>
                  )
                )}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-bold mb-4 text-[#4B0082] uppercase tracking-wide">
                Support
              </h4>
              <ul className="space-y-3 text-sm">
                {[
                  { name: "Insights", link: "/insights" },
                  { name: "Best Practices", link: "/best-practices" },
                  { name: "IAM Management", link: "/iam-management" },
                  {
                    name: "Contact Support",
                    link: "mailto:support@aquasense.com"
                  }
                ].map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.link}
                      className="hover:text-[#6F00FF] transition-colors font-medium"
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-bold mb-4 text-[#4B0082] uppercase tracking-wide">
                Legal
              </h4>
              <ul className="space-y-3 text-sm">
                {[
                  { name: "Privacy Policy", link: "/privacy" },
                  { name: "Terms of Service", link: "/terms" },
                  { name: "Cookie Policy", link: "/cookies" }
                ].map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.link}
                      className="hover:text-[#6F00FF] transition-colors font-medium"
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </div>

      <div className="pt-10 text-center text-xs text-gray-500 border-t border-gray-200 mt-10">
        <p>
          &copy; {new Date().getFullYear()} AquaSense Inc. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
