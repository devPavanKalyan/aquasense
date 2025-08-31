import {
  BookOpen,
  CreditCard,
  Folder,
  HelpCircle,
  LayoutDashboard,
  LifeBuoy,
  LogOut,
  Settings,
  Star,
  User,
  Users,
  X
} from "lucide-react";
import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

const UserMenu: React.FC<{ logout: () => void }> = ({ logout }) => {
  const [open, setOpen] = useState(false);
  const { authState } = useContext(AuthContext); // get authState properly
  const user = authState.user; // extract user safely

  //   console.log("User:", user);

  const toggle = () => setOpen((o) => !o);

  if (!user) {
    return null; // or loading spinner
  }

  return (
    <>
      <button
        onClick={toggle}
        className="focus:outline-none hover:cursor-pointer"
      >
        <div className="w-11 h-11 rounded-full bg-gradient-to-br from-pink-500 via-pink-400 to-rose-400 text-white flex items-center justify-center text-base font-bold shadow-md hover:scale-105 transform transition-transform duration-200">
          {user?.email?.[0]?.toUpperCase()}
        </div>
      </button>

      {open && (
        <div onClick={toggle} className="fixed inset-0 bg-opacity-30  z-40" />
      )}

      <aside
        className={`fixed top-0 right-0 h-full w-full sm:w-80 bg-white shadow-md border-l border-gray-200 z-50 transform ${
          open ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 overflow-y-auto`}
      >
        <div className="flex justify-between items-center px-5 pt-6 pb-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 text-white flex items-center justify-center text-xl font-bold shadow-md">
              {user?.name?.[0]?.toUpperCase()}
            </div>

            <div className="leading-tight">
              <p className="font-semibold text-gray-800">{user?.name}</p>
              <div className="relative max-w-[200px] overflow-hidden group">
                <p
                  className="text-sm text-gray-500 whitespace-nowrap pr-8 inline-block group-hover:animate-scroll-once"
                  style={{
                    maskImage:
                      "linear-gradient(to right, black 80%, transparent)",
                    WebkitMaskImage:
                      "linear-gradient(to right, black 80%, transparent)",
                    overflowX: "hidden"
                  }}
                >
                  {user?.email}
                </p>

                <style>
                  {`
      @keyframes scroll-once {
        0% {
          transform: translateX(0);
        }
        50% {
          transform: translateX(-60%);
        }
        100% {
          transform: translateX(0);
        }
      }

      .group-hover\\:animate-scroll-once:hover {
        animation: scroll-once 4s ease-in-out 1;
      }

      p::-webkit-scrollbar {
        display: none;
      }
    `}
                </style>
              </div>
            </div>
          </div>
          <button
            onClick={toggle}
            className="p-2 hover:bg-gray-100 rounded-full transition"
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        <nav className="px-5 py-6 text-sm font-medium text-gray-700 space-y-8">
          <ul className="space-y-2">
            <li>
              <a
                href="/settings/profile"
                className="flex items-center gap-3 px-2 py-2 rounded-md hover:bg-blue-50"
              >
                <User size={16} />
                Your profile
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center gap-3 px-2 py-2 rounded-md hover:bg-blue-50"
              >
                <Folder size={16} />
                Your Address
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center gap-3 px-2 py-2 rounded-md hover:bg-blue-50"
              >
                <Users size={16} />
                User Management
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center gap-3 px-2 py-2 rounded-md hover:bg-blue-50"
              >
                <LayoutDashboard size={16} />
                Dashboard
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center gap-3 px-2 py-2 rounded-md hover:bg-blue-50"
              >
                <CreditCard size={16} />
                Billing & Invoices
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center gap-3 px-2 py-2 rounded-md hover:bg-blue-50"
              >
                <Settings size={16} />
                Settings
              </a>
            </li>
          </ul>

          <ul className="space-y-2">
            <li>
              <a
                href="#"
                className="flex items-center gap-3 px-2 py-2 rounded-md hover:bg-blue-50"
              >
                <Star size={16} />
                Success Stories
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center gap-3 px-2 py-2 rounded-md hover:bg-blue-50"
              >
                <BookOpen size={16} />
                Recommendations
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center gap-3 px-2 py-2 rounded-md hover:bg-blue-50"
              >
                <LifeBuoy size={16} />
                Help Center
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center gap-3 px-2 py-2 rounded-md hover:bg-blue-50"
              >
                <HelpCircle size={16} />
                Contact Support
              </a>
            </li>
          </ul>

          <button
            onClick={() => {
              logout();
              toggle();
            }}
            className="flex items-center gap-3 px-2 py-2 w-full rounded-md text-red-600 hover:bg-red-50 transition"
          >
            <LogOut size={16} /> Sign out
          </button>
        </nav>
      </aside>
    </>
  );
};

export default UserMenu;
