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
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto px-4 py-6">
      <div id="user_type_input">
        <p className="text-md font-medium text-gray-700 mb-2">
          Select User Type:
        </p>

        <div className="flex gap-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              className="form-radio text-blue-600"
              type="radio"
              name="user_type"
              value="owner"
              checked={userType === "owner"}
              onChange={handleUserTypeChange}
            />
            <span className="text-gray-700 text-sm">Root User</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              className="form-radio text-blue-600"
              type="radio"
              name="user_type"
              value="staff"
              checked={userType === "staff"}
              onChange={handleUserTypeChange}
            />
            <span className="text-gray-700 text-sm">Staff</span>
          </label>
        </div>

        {error && (
          <div className="flex justify-center items-center text-red-800 font-semibold text-[14px] mt-3 bg-orange-100 p-2">
            {error}
          </div>
        )}

        {userType === "owner" && (
          <div className="mt-4" id="ownerInput">
            <label className="block">
              <span className="text-gray-700 text-sm font-medium">
                Email (for Owner)
              </span>
              <div className="relative mt-1">
                <Mail className="absolute top-3 left-3 w-5 h-5 text-gray-400" />
                <input
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
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
          </div>
        )}

        {userType === "staff" && (
          <div className="mt-4" id="staffInput">
            <label className="block">
              <span className="text-gray-700 text-sm font-medium">
                Staff ID (12-digit)
              </span>
              <div className="relative mt-1">
                <UserCog className="absolute top-3 left-3 w-5 h-5 text-gray-400" />
                <input
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
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
          </div>
        )}

        <button
          type="submit"
          className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          onClick={handleSubmit}
        >
          Continue
        </button>
      </div>

      {/* Divider */}
      <div className="flex items-center my-6">
        <hr className="flex-grow border-gray-300" />
        <span className="mx-2 text-gray-500 text-sm font-medium">OR</span>
        <hr className="flex-grow border-gray-300" />
      </div>

      {/* Signup Section */}
      <div className="text-center">
        <p className="text-sm text-gray-600 mb-2 font-medium">
          Create AquaSense account
        </p>
        <a href="/signup?request_type=register">
          <button
            type="button"
            className="inline-block bg-green-600 text-white font-semibold text-sm px-5 py-2 rounded-md hover:bg-green-700 transition-all duration-300 ease-in-out"
            onClick={() => {
              navigate("/signup?request_type=register");
            }}
          >
            Sign Up
          </button>
        </a>
      </div>
    </form>
  );
};

export default UserTypeForm;
{
  /* <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="email"
            >
              Email (for Owner)
            </label>
            <input
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="owner@example.com"
              required
            />
             */
}
