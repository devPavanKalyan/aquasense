import { Clear } from "@mui/icons-material";
import {
  AlertOctagon,
  BarChart2,
  Home,
  MonitorCogIcon,
  Moon,
  Search
} from "lucide-react";
import React, { useContext, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Logo from "../components/Logo";
import UserMenu from "../components/UserMenu";
import { AuthContext } from "../context/AuthContext";

interface NavItemProps {
  link: string;
  Icon: React.ElementType;
  name: string;
}

const NavItemIconName: React.FC<NavItemProps> = ({ link, Icon, name }) => {
  return (
    <Link
      to={link}
      className="flex flex-col items-center justify-center w-full transition hover:text-blue-700"
    >
      <span className="hover:bg-blue-50 rounded-full px-5 py-2">
        <Icon className="w-5 h-5 text-gray-500 hover:text-blue-700 transition" />
      </span>
      {name && (
        <span className="text-gray-700 text-xs text-center font-medium mt-1">
          {name}
        </span>
      )}
    </Link>
  );
};

const SideAndBottomBarIcons: React.FC = () => {
  const navItems = [
    { label: "Home", path: "/", icon: Home },
    { label: "Monitoring", path: "/monitoring", icon: MonitorCogIcon },
    { label: "Alerts", path: "/alerts", icon: AlertOctagon },
    { label: "Reports", path: "/reports", icon: BarChart2 }
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
        <div className="px-6 sm:px-8 py-4 flex flex-row items-center justify-between gap-4">
          <Logo />
          <div className="w-full hidden md:flex items-center justify-between md:max-w-lg relative backdrop-blur-sm border border-2 border-blue-100 px-4 py-2 rounded-full transition-all duration-300">
            <button
              onClick={() => navigate(`?query=${search}`)}
              className="text-gray-500 hover:text-[#4B0082] h-9 w-9 rounded-full flex items-center justify-center transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>

            <input
              type="text"
              value={search}
              placeholder="Search"
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") navigate(`/search?query=${search}`);
              }}
              className="flex-1 bg-transparent px-2 text-gray-800 placeholder-gray-500 focus:outline-none"
            />

            {search && (
              <button
                onClick={() => setSearch("")}
                className="text-gray-500 hover:text-[#4B0082] h-9 w-9 rounded-full flex items-center justify-center transition-colors"
              >
                <Clear className="w-5 h-5" />
              </button>
            )}
          </div>

          <UserMenu logout={logout} />
        </div>
        <div className="flex-1 mb-20">
          <Outlet context={{ search }} />
        </div>
      </div>
    </div>
  );
};

export default SideAndBottomBarIcons;
