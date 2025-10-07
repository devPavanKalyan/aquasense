import { useNavigate } from "react-router-dom";

const Logo = () => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate("/")}
      className="flex cursor-pointer text-3xl font-extrabold mb-2 text-[#4B0082] transition-colors"
      style={{ fontFamily: "'Pacifico', cursive" }}
    >
      AquaSense
    </div>
  );
};

export default Logo;
