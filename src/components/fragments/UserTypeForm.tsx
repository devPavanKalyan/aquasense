import axios from "axios";
import { Mail, UserCog } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  goToCaptcha: () => void;
  email: string;
  handleChangeEmail: (e: string) => void;
}

const UserTypeForm: React.FC<Props> = ({
  goToCaptcha,
  email,
  handleChangeEmail
}) => {
  const [userType, setUserType] = useState<"owner" | "staff">("owner");
  const [staffId, setStaffId] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState<string>("");

  const handleUserTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserType(e.target.value as "owner" | "staff");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    axios
      .get(`http://localhost:9091/api/login/check`, {
        params: { email: email }
      })
      .then(async (result) => {
        if (result.status === 200) {
          const response = await axios.post(
            `http://localhost:9091/api/notifications/otp?email=${email}`,
            null,
            {
              headers: {
                "X-Session-ID": "stateParam"
              }
            }
          );

          if (response.status === 201) {
            goToCaptcha();
          } else {
            setError("Something went wrong! Please try again!!");
          }
        } else {
          setError("We don't find any account with this email");
        }
      })
      .catch((err) => {
        console.error(err);
        setError("We don't find any account with this email");
      });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-2xl mx-auto bg-white
          px-6 sm:px-8 py-8 sm:py-10 
          transition-all duration-300"
    >
      <h2 className="text-2xl sm:text-3xl font-bold text-zinc-800 mb-10">
        Sign in to <span className="text-[#4B0082]">AquaSense</span>
      </h2>

      <div id="user_type_input" className="mb-5">
        <p className="text-zinc-700 font-medium mb-2">Select User Type:</p>
        <div className="flex gap-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              className="form-radio text-[#4B0082]"
              type="radio"
              name="user_type"
              value="owner"
              checked={userType === "owner"}
              onChange={handleUserTypeChange}
            />
            <span className="text-zinc-700 text-sm">Root User</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              className="form-radio text-[#4B0082]"
              type="radio"
              name="user_type"
              value="staff"
              checked={userType === "staff"}
              onChange={handleUserTypeChange}
            />
            <span className="text-zinc-700 text-sm">Staff</span>
          </label>
        </div>

        {error && (
          <div className="flex justify-center items-center text-red-800 font-semibold text-[14px] mt-3 bg-orange-100 p-2 rounded">
            {error}
          </div>
        )}
      </div>

      {userType === "owner" && (
        <label className="block">
          <span className="text-zinc-700 text-sm font-medium">
            Email (for Owner)
          </span>
          <div className="relative mt-1">
            <Mail className="absolute top-3 left-3 w-5 h-5 text-zinc-400" />
            <input
              className="w-full pl-10 pr-4 py-2.5 border border-zinc-300 rounded-lg 
                     focus:outline-none focus:border-2 focus:border-[#4B0082] text-sm"
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => handleChangeEmail(e.target.value)}
              placeholder="owner@example.com"
              required
            />
          </div>
        </label>
      )}

      {userType === "staff" && (
        <label className="block">
          <span className="text-zinc-700 text-sm font-medium">
            Staff ID (12-digit)
          </span>
          <div className="relative mt-1">
            <UserCog className="absolute top-3 left-3 w-5 h-5 text-zinc-400" />
            <input
              className="w-full pl-10 pr-4 py-2.5 border border-zinc-300 rounded-lg 
                     focus:outline-none focus:border-2 focus:border-[#4B0082] text-sm"
              id="staffId"
              name="staffId"
              type="text"
              pattern="\d{12}"
              maxLength={12}
              value={staffId}
              onChange={(e) => setStaffId(e.target.value)}
              placeholder="123456789012"
              required
            />
          </div>
        </label>
      )}

      <button
        type="submit"
        className="mt-6 px-6 py-3 bg-[#4B0082] text-white font-semibold rounded-lg 
               hover:bg-[#3A0066] transition shadow-md"
        onClick={handleSubmit}
      >
        Continue
      </button>

      <div className="flex items-center gap-2 my-6">
        <hr className="flex-grow border-zinc-300" />
        <span className="text-zinc-400 text-sm font-medium">OR</span>
        <hr className="flex-grow border-zinc-300" />
      </div>

      <div className="text-center">
        <p className="text-sm text-zinc-600 mb-2 font-medium">
          Create AquaSense account
        </p>
        <button
          type="button"
          className="inline-block bg-[#FFC312] text-[#4B0082] font-semibold text-sm px-5 py-2 
                 rounded-md hover:bg-[#E0B00F] transition-all duration-300 ease-in-out"
          onClick={() => navigate("/signup?request_type=register")}
        >
          Sign Up
        </button>
      </div>

      <p className="text-xs text-zinc-500 text-center leading-relaxed mt-5">
        By continuing, you agree to the AquaSense Customer Agreement and the{" "}
        <a className="text-[#4B0082] hover:underline font-medium" href="#">
          Privacy Notice
        </a>
        . This site uses essential cookies. See our{" "}
        <a className="text-[#4B0082] hover:underline font-medium" href="#">
          Cookie Notice
        </a>
        .
      </p>
    </form>
  );
};

export default UserTypeForm;
