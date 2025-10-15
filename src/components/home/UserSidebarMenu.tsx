import {
  BookOpen,
  HelpCircle,
  LifeBuoy,
  LogOut,
  Settings,
  Star,
  User,
  Users
} from "lucide-react";
import React, { useContext, useEffect, useRef, useState } from "react";
import profile from "../../assets/profile.png";
import { AuthContext } from "../../context/AuthContext";

const UserSidebarMenu: React.FC<{ logout: () => void }> = ({ logout }) => {
  const [open, setOpen] = useState(false);
  const { authState } = useContext(AuthContext);
  const user = authState.user;
  const menuRef = useRef<HTMLDivElement>(null);

  //   if (!user) return null;

  const toggleMenu = () => setOpen((prev) => !prev);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={toggleMenu}
        className="flex items-center justify-center focus:outline-none hover:cursor-pointer transition-transform hover:scale-105"
      >
        <img
          src={profile}
          alt="User"
          className="hidden md:block w-12 h-12 rounded-full border border-gray-300 shadow-sm object-cover"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#1f1f1f"
          className="md:hidden"
        >
          <path d="M480-160q-33 0-56.5-23.5T400-240q0-33 23.5-56.5T480-320q33 0 56.5 23.5T560-240q0 33-23.5 56.5T480-160Zm0-240q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm0-240q-33 0-56.5-23.5T400-720q0-33 23.5-56.5T480-800q33 0 56.5 23.5T560-720q0 33-23.5 56.5T480-640Z" />
        </svg>
      </button>

      {open && (
        <aside className="absolute right-0 w-72 bg-white shadow-xl rounded-3xl border border-gray-200 z-50 animate-fadeIn">
          <div className="flex justify-between items-center px-5 pt-5 pb-4 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden">
                <img
                  src={profile}
                  alt="User"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="leading-tight">
                <p className="text-medium font-bold text-gray-800">
                  {user?.name || "Suddala Pavan Kalyan"}
                </p>
                <p className="text-xs text-gray-500">
                  {user?.email || "pavankalyan@gmail.com"}
                </p>
              </div>
            </div>
          </div>

          <nav className="px-5 py-4 text-xs font-medium text-gray-700 space-y-5">
            <div>
              <h3 className="text-[14px] uppercase text-gray-500 mb-1.5 tracking-wider">
                Account
              </h3>
              <ul className="space-y-0.5">
                <NavLink href="/settings/profile" icon={<User size={16} />}>
                  Your Profile
                </NavLink>
                <NavLink href="/settings/iam" icon={<Users size={16} />}>
                  User Management
                </NavLink>
                <NavLink href="/settings" icon={<Settings size={16} />}>
                  Settings
                </NavLink>
              </ul>
            </div>

            <div>
              <h3 className="text-[14px] uppercase text-gray-500 mb-1.5 tracking-wider">
                Resources
              </h3>
              <ul className="space-y-0.5">
                <NavLink href="/testimonials" icon={<Star size={16} />}>
                  Success Stories
                </NavLink>
                <NavLink href="/recommendations" icon={<BookOpen size={16} />}>
                  Recommendations
                </NavLink>
                <NavLink href="/help" icon={<LifeBuoy size={16} />}>
                  Help Center
                </NavLink>
                <NavLink href="/support" icon={<HelpCircle size={16} />}>
                  Contact Support
                </NavLink>
              </ul>
            </div>

            <button
              onClick={() => {
                logout();
                setOpen(false);
              }}
              className="flex items-center gap-2 px-2 py-1.5 w-full rounded-md text-red-600 hover:bg-red-50 transition font-semibold text-xs"
            >
              <LogOut size={16} /> Sign Out
            </button>
          </nav>
        </aside>
      )}

      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-6px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fadeIn {
            animation: fadeIn 0.2s ease-out;
          }
        `}
      </style>
    </div>
  );
};

export default UserSidebarMenu;

const NavLink: React.FC<{
  href: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}> = ({ href, icon, children }) => (
  <li>
    <a
      href={href}
      className="flex items-center gap-2 px-2 py-2 rounded-md hover:bg-gray-100 hover:text-gray-900 transition"
    >
      <span className="text-gray-600">{icon}</span>
      <span className="text-[12px]">{children}</span>
    </a>
  </li>
);
