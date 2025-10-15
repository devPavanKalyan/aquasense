import { Clear } from "@mui/icons-material";
import { BellRing, Home, MonitorCog, Moon, Search } from "lucide-react";
import React, { useContext, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import UserSidebarMenu from "../components/home/UserSidebarMenu";
import { AuthContext } from "../context/AuthContext";
import Logo from "../hooks/Logo";

interface NavItemProps {
  link: string;
  Icon: React.ElementType;
  name: string;
}

const ReportsIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="24px"
    viewBox="0 -960 960 960"
    width="24px"
    fill="currentColor"
    {...props}
  >
    <path d="M320-480v-80h320v80H320Zm0-160v-80h320v80H320Zm-80 240h300q29 0 54 12.5t42 35.5l84 110v-558H240v400Zm0 240h442L573-303q-6-8-14.5-12.5T540-320H240v160Zm480 80H240q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h480q33 0 56.5 23.5T800-800v640q0 33-23.5 56.5T720-80Zm-480-80v-640 640Zm0-160v-80 80Z" />
  </svg>
);

const NavItemIconName: React.FC<NavItemProps> = ({ link, Icon, name }) => {
  const location = useLocation();
  const isActive = location.pathname === link;

  return (
    <Link
      to={link}
      className={`flex flex-col items-center justify-center w-full transition-all duration-200 ease-in-out ${
        isActive ? "text-[#4B0082]" : "text-gray-700 hover:text-[#4B0082]"
      }`}
    >
      <span
        className={`rounded-full px-4 py-2 transition-all duration-200 ease-in-out ${
          isActive
            ? "bg-[#E6E6FA]" // a soft lavender tone to match #4B0082
            : "hover:bg-[#E6E6FA]"
        }`}
      >
        <Icon
          className={`w-5 h-5 transition-colors duration-200 ${
            isActive ? "text-[#4B0082]" : "text-gray-800"
          }`}
        />
      </span>

      {name && (
        <span
          className={`text-xs text-center mt-1 transition-all duration-200 ease-in-out ${
            isActive
              ? "text-[#4B0082] font-bold"
              : "text-gray-700 font-semibold"
          }`}
        >
          {name}
        </span>
      )}
    </Link>
  );
};

const SideAndBottomBarIcons: React.FC = () => {
  const navItems = [
    { label: "Home", path: "/", icon: Home },
    { label: "Monitoring", path: "/monitoring", icon: MonitorCog },
    { label: "Alerts", path: "/alerts", icon: BellRing },
    {
      label: "Reports",
      path: "/reports",
      icon: ReportsIcon
    }
  ];
  const { logout } = useContext(AuthContext);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div className="fixed bottom-0 w-full md:w-24 md:h-screen flex md:flex-col flex-row justify-between items-center border-t md:border-r border-gray-200 py-2 md:py-5 px-0 bg-white z-50 shadow-lg md:shadow-none">
        <div className="flex md:flex-col flex-row w-full md:gap-5">
          {navItems.map((item) => (
            <div className="flex-1 h-full" key={item.path}>
              <NavItemIconName
                link={item.path}
                Icon={item.icon}
                name={item.label}
              />
            </div>
          ))}
        </div>

        <div className="hidden md:flex flex-col w-full items-center justify-end mt-auto mb-5">
          <NavItemIconName link="" Icon={Moon} name="" />
        </div>
      </div>

      <div className="flex-1 md:ml-24">
        <div className="px-4 sm:px-6 md:px-8 py-4 flex flex-row items-center justify-between gap-4">
          <Logo />

          <div className="flex items-center flex-1 w-full max-w-full relative backdrop-blur-sm border border-2 border-[#4B0082]  py-1 rounded-full transition-all duration-300 md:max-w-lg md:px-2 px-1 gap-2">
            <button
              onClick={() => navigate(`/?query=${search}`)}
              className="bg-[#4B0082] text-white h-9 w-9 rounded-full flex items-center justify-center transition-colors flex-shrink-0"
            >
              <Search className="w-5 h-5" />
            </button>

            <div className="flex-1">
              <input
                type="text"
                value={search}
                placeholder="Search"
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") navigate(`/?query=${search}`);
                }}
                className="w-full bg-transparent md:px-2 text-gray-800 placeholder-gray-500 focus:outline-none"
              />
            </div>

            {search && (
              <button
                onClick={() => setSearch("")}
                className="text-gray-500 hover:text-[#4B0082] h-9 w-9 rounded-full flex items-center justify-center transition-colors flex-shrink-0"
              >
                <Clear className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 sm:gap-4 md:gap-6">
            <button
              type="button"
              className="md:hidden p-2 rounded-full hover:bg-gray-100 active:bg-gray-200 transition-all duration-200"
            >
              <Moon className="w-6 h-6 text-gray-700" />
            </button>

            <div className="flex-shrink-0">
              <UserSidebarMenu logout={logout} />
            </div>
          </div>
        </div>

        <div className="flex-1 mb-20">
          <Outlet context={{ search }} />
        </div>
      </div>
    </div>
  );
};

export default SideAndBottomBarIcons;
