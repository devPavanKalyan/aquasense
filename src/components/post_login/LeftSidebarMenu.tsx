import { X } from "lucide-react";
import { useEffect, useRef } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const LeftSidebarMenu = ({ isOpen, onClose }: Props) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    };
    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  return (
    <div
      className={`fixed top-0 left-0 h-full w-72 z-50 p-6 bg-white/80 backdrop-blur-md border-r border-gray-200 shadow-xl transition-transform duration-300 ease-in-out overflow-y-auto
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
      `}
      ref={ref}
    >
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-extrabold text-blue-700 tracking-wide">
          Explore
        </h3>
        <button onClick={onClose}>
          <X
            size={20}
            className="text-gray-500 hover:text-red-500 transition"
          />
        </button>
      </div>

      <div className="space-y-8 text-sm text-gray-700 font-medium">
        {/* Intelligence & Support */}
        <div>
          <h4 className="text-gray-600 font-semibold uppercase text-xs mb-3 tracking-widest">
            🧠 Intelligence & Support
          </h4>
          <ul className="space-y-2 pl-1">
            <li>
              <a
                href="/aqua-sense/recommendations"
                className="hover:text-blue-600 transition"
              >
                Recommendations
              </a>
            </li>
            <li>
              <a
                href="/aqua-sense/success-stories"
                className="hover:text-blue-600 transition"
              >
                Success Stories
              </a>
            </li>
            <li>
              <a
                href="/aqua-sense/help"
                className="hover:text-blue-600 transition"
              >
                Help Center
              </a>
            </li>
            <li>
              <a
                href="/aqua-sense/support"
                className="hover:text-blue-600 transition"
              >
                Contact Support
              </a>
            </li>
          </ul>
        </div>

        {/* Account & Management */}
        <div>
          <h4 className="text-gray-600 font-semibold uppercase text-xs mb-3 tracking-widest">
            🧑‍💼 Account & Management
          </h4>
          <ul className="space-y-2 pl-1">
            <li>
              <a
                href="/aqua-sense/my-business"
                className="hover:text-blue-600 transition"
              >
                My Business
              </a>
            </li>
            <li>
              <a
                href="/aqua-sense/user-management"
                className="hover:text-blue-600 transition"
              >
                User Management
              </a>
            </li>
            <li>
              <a
                href="/aqua-sense/subscriptions"
                className="hover:text-blue-600 transition"
              >
                Subscription Plans
              </a>
            </li>
            <li>
              <a
                href="/aqua-sense/billing"
                className="hover:text-blue-600 transition"
              >
                Billing & Invoices
              </a>
            </li>
            <li>
              <a
                href="/aqua-sense/profile"
                className="hover:text-blue-600 transition"
              >
                Profile & Preferences
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LeftSidebarMenu;
