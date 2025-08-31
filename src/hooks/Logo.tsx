import { useNavigate } from "react-router-dom";

function Logo() {
  const navigate = useNavigate();
  return (
    <h4
      className="text-[24px] md:text-2xl font-bold tracking-tight antialiased font-sans bg-gradient-to-r from-blue-900 via-cyan-800 to-teal-700 bg-clip-text text-transparent max-[870px]:text-[20px] max-[870px]:ml-1 cursor-pointer"
      onClick={() => {
        navigate("/");
      }}
    >
      AquaSenze
    </h4>
  );
}

export default Logo;
