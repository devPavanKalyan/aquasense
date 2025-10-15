import { useNavigate } from "react-router-dom";
import { CompanyLogo } from "./CompanyLogo";

const Logo = () => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate("/")}
      className="flex items-center cursor-pointer text-3xl font-extrabold text-[#4B0082] transition-colors"
      style={{ fontFamily: "'Pacifico', cursive" }}
    >
      <div className="hidden max-[800px]:hidden md:block">AquaSense</div>

      <div className="block max-[800px]:block md:hidden w-12 h-12">
        <CompanyLogo />
      </div>
    </div>
  );
};

export default Logo;
