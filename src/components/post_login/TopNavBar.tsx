import { Bell, Search } from "lucide-react";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import UserMenu from "./UserMenu";

const TopNavBar: React.FC = () => {
  const { logout } = useContext(AuthContext);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  return (
    <header className="bg-white w-full z-50">
      <div className="px-4 md:px-8 lg:px-10 py-4 flex flex-row items-center justify-between gap-4">
        {/* Left: Logo */}
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <span className="hidden sm:block text-xl md:text-2xl font-bold text-blue-600">
            AquaSense
          </span>
        </div>

        {/* Center: Search */}
        <div className="w-full hidden md:block md:max-w-lg relative">
          <input
            type="text"
            value={search}
            placeholder="Search sensors, hubs, alerts..."
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-2 border-2 font-medium text-gray-600 placeholder:text-gray-500 placeholder:font-medium border-gray-300 rounded-full focus:outline-none focus:border-blue-500"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                navigate(`/search?query=${search}`);
              }
            }}
          />
          <button className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white h-8 w-8 rounded-full flex items-center justify-center hover:bg-blue-700">
            <Search className="w-4 h-4" />
          </button>
        </div>

        {/* Right: Icons + Profile */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => console.log("Notifications clicked")}
            className="text-gray-600 hover:text-blue-600 transition"
          >
            <Bell className="w-5 h-5" />
          </button>

          {/* Profile Dropdown */}
          <UserMenu logout={logout} />
        </div>
      </div>
    </header>
  );
};

export default TopNavBar;
