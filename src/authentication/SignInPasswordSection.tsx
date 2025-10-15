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
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleShowPassword = () => setShowPassword((prev) => !prev);

  const handleSubmit = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const searchParams = new URLSearchParams(window.location.search);

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
        "http://localhost:9090/api/login/authenticate",
        authDTO,
        { withCredentials: true }
      );

      console.log("Login response:", response.data);
      window.location.href = response.data.redirectUrl;
    } catch (err) {
      console.error("Login failed:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className={`${
        true ? "block" : "hidden"
      } w-full max-w-2xl mx-auto bg-white px-6 sm:px-8 py-8 sm:py-10 transition-all duration-300`}
    >
      <h2 className="text-2xl sm:text-3xl font-bold mb-5 text-center">
        {signType
          .slice(0, 1)
          .toUpperCase()
          .concat(signType.slice(1).toLowerCase())}{" "}
        Sign-In
      </h2>

      <div className="block mb-5 text-center">
        <span className="text-zinc-700 text-sm font-medium">Email</span>
        <div className="mt-1 text-base font-semibold text-green-700 break-all">
          {shownEmail}
        </div>
      </div>

      <div className="block mb-5">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Password
        </label>
        <div className="relative">
          <Lock className="absolute top-3 left-3 w-5 h-5 text-zinc-400" />
          <input
            className="w-full pl-10 pr-4 py-2.5 border border-zinc-300 rounded-lg
                       focus:outline-none focus:border-2 focus:border-[#4B0082] text-sm"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isSubmitting}
          />
          <button
            type="button"
            className="absolute top-1/2 right-3 -translate-y-1/2 text-xs text-blue-600 hover:underline focus:outline-none"
            onClick={toggleShowPassword}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
      </div>

      <button
        className="mt-6 px-6 py-3 w-full bg-[#4B0082] text-white font-semibold rounded-lg
                   hover:bg-[#3A0066] transition shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={handleSubmit}
        disabled={isSubmitting}
      >
        {isSubmitting ? "Signing In..." : "Continue"}
      </button>
    </div>
  );
};

export default SignInPasswordSection;
