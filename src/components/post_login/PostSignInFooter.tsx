import { VLogoLoading } from "../../hooks/VLogoLoading";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-blue-50 via-white to-cyan-100 border-t border-blue-100 pt-16 pb-12 px-6 text-gray-800">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Company Info */}
        <div>
          <div className="flex items-center gap-3 mb-5">
            <div className="w-9 h-9 flex items-center justify-center">
              <VLogoLoading />
            </div>
            <h3 className="text-xl font-extrabold text-blue-700 tracking-wide">
              AquaSense
            </h3>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed">
            Empowering smart water systems with AI, IoT, and Data Science.
            Designed for aquaculture, agriculture, and urban utilities.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h4 className="text-sm font-semibold mb-4 text-blue-700 uppercase tracking-wide">
            Navigation
          </h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="/" className="hover:text-blue-600 transition">
                Home
              </a>
            </li>
            <li>
              <a href="/monitoring" className="hover:text-blue-600 transition">
                Monitoring
              </a>
            </li>
            <li>
              <a href="/devices" className="hover:text-blue-600 transition">
                Devices
              </a>
            </li>
            <li>
              <a href="/reports" className="hover:text-blue-600 transition">
                Reports
              </a>
            </li>
            <li>
              <a href="/alerts" className="hover:text-blue-600 transition">
                Alerts
              </a>
            </li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h4 className="text-sm font-semibold mb-4 text-blue-700 uppercase tracking-wide">
            Support
          </h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="/insights" className="hover:text-blue-600 transition">
                Insights
              </a>
            </li>
            <li>
              <a
                href="/best-practices"
                className="hover:text-blue-600 transition"
              >
                Best Practices
              </a>
            </li>
            <li>
              <a
                href="/iam-management"
                className="hover:text-blue-600 transition"
              >
                IAM Management
              </a>
            </li>
            <li>
              <a
                href="mailto:support@aquasense.com"
                className="hover:text-blue-600 transition"
              >
                Contact Support
              </a>
            </li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h4 className="text-sm font-semibold mb-4 text-blue-700 uppercase tracking-wide">
            Legal
          </h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="/privacy" className="hover:text-blue-600 transition">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="/terms" className="hover:text-blue-600 transition">
                Terms of Service
              </a>
            </li>
            <li>
              <a href="/cookies" className="hover:text-blue-600 transition">
                Cookie Policy
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-blue-100 mt-14 pt-6 text-center text-xs text-gray-500">
        <p>&copy; {new Date().getFullYear()} Inc. All rights reserved.</p>
      </div>
    </footer>
  );
}
