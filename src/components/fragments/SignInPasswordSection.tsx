import axios from "axios";
import { Lock } from "lucide-react";
import React, { useState } from "react";

interface SignInPasswordSectionProps {
  signType: string;
  shownEmail: string;
}

const SignInPasswordSection: React.FC<SignInPasswordSectionProps> = ({
  signType,
  shownEmail
}) => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => setShowPassword((prev) => !prev);

  const handleSubmit = async () => {
    try {
      // Extract query params from current URL
      const searchParams = new URLSearchParams(window.location.search);

      // Build the DTO object with all required fields
      const authDTO = {
        email: shownEmail,
        password: password,
        clientId: searchParams.get("client_id") || "",
        responseType: searchParams.get("response_type") || "",
        codeChallenge: searchParams.get("code_challenge") || "",
        codeChallengeMethod: searchParams.get("code_challenge_method") || "",
        from: searchParams.get("from") || "",
        state: searchParams.get("state") || "",
        page: searchParams.get("page") || "",
        backwardsCompatible:
          searchParams.get("backwards_compatible") === "true",
        redirectUri: searchParams.get("redirect_uri") || ""
      };

      const response = await axios.post(
        "http://localhost:9091/api/login/authenticate",
        authDTO,
        {
          withCredentials: true
        }
      );

      console.log("Login response:", response.data);
      window.location.href = response.data.redirectUrl;
      // handle success or redirect
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  return (
    <div className="space-y-4 flex flex-1 flex-col">
      {/* Title */}
      <h3 className="text-xl font-semibold text-gray-700">
        {signType
          .slice(0, 1)
          .toLocaleUpperCase()
          .concat(signType.slice(1).toLocaleLowerCase())}{" "}
        Sign-In
      </h3>

      {/* Email display */}
      <div className="text-sm text-gray-700">
        <span className="font-medium text-gray-600">Email</span>
        <div className="mt-0.5 text-base font-semibold text-green-700 break-all">
          {shownEmail}
        </div>
      </div>

      {/* Password input */}
      {/* <div>
        <div className="relative mt-1">
          <input
            autoComplete="off"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            id={`${signType}-password`}
            minLength={6}
            name="current-password"
            required
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="absolute top-1/2 right-3 -translate-y-1/2 text-xs text-blue-600 hover:underline focus:outline-none"
            type="button"
            onClick={toggleShowPassword}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
      </div> */}

      <label className="block">
        <div className="flex items-center justify-between mb-2">
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor={`${signType}-password`}
          >
            Password:
          </label>
          <button
            type="button"
            className="text-sm text-blue-600 hover:underline"
            onClick={() => {}}
          >
            Forgot password?
          </button>
        </div>
        <div className="relative mt-1">
          <Lock className="absolute top-3 left-3 w-5 h-5 text-gray-400" />
          <input
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            id={`${signType}-password`}
            minLength={6}
            name="current-password"
            required
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password here."
          />
          <button
            className="absolute top-1/2 right-3 -translate-y-1/2 text-xs text-blue-600 hover:underline focus:outline-none"
            type="button"
            onClick={toggleShowPassword}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
      </label>

      {/* Continue button */}
      <button
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
        type="submit"
        onClick={handleSubmit}
      >
        Continue
      </button>
    </div>
  );
};

export default SignInPasswordSection;
