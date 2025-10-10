import { Search } from "lucide-react";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Logo from "./Logo";
import UserMenu from "./UserMenu";

const TopNavBar: React.FC = () => {
  const { logout } = useContext(AuthContext);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  return (
    <header className="bg-white w-full z-50">
      <div className="px-6 sm:px-8 py-4 flex flex-row items-center justify-between gap-4">
        <Logo />

        <div className="w-full hidden md:block md:max-w-lg relative">
          <input
            type="text"
            value={search}
            placeholder="Search sensors, hubs, alerts..."
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                navigate(`/search?query=${search}`);
              }
            }}
            className="w-full pl-10 pr-4 py-2.5 border border-2 border-zinc-300 rounded-full
                       focus:outline-none focus:border-2 focus:border-[#4B0082] text-sm font-medium placeholder:text-gray-500 placeholder:font-medium"
          />
          <button
            className="absolute top-1/2 right-1 -translate-y-1/2 bg-[#4B0082] hover:bg-[#3A0066] 
                       text-white h-9 w-9 rounded-full flex items-center justify-center transition"
            onClick={() => navigate(`/search?query=${search}`)}
          >
            <Search className="w-4 h-4" />
          </button>
        </div>

        <UserMenu logout={logout} />
      </div>
    </header>
  );
};

export default TopNavBar;
