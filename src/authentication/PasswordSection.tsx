import axios from "axios";
import { Lock, ShieldCheck } from "lucide-react";
import React, { useState } from "react";
import { preparePkceAndRedirect } from "../utils/authRedirects";

interface Props {
  isOpen: boolean;
}

const PasswordSection: React.FC<Props> = ({ isOpen }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [globalError, setGlobalError] = useState("");
  const [globalSuccess, setGlobalSuccess] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let isValid = true;
    setPasswordError("");
    setConfirmPasswordError("");
    setGlobalError("");
    setGlobalSuccess("");

    if (password.length < 10) {
      setPasswordError("Password must be at least 10 characters long.");
      isValid = false;
    }

    if (confirmPassword !== password) {
      setConfirmPasswordError("Passwords do not match.");
      isValid = false;
    }

    if (!isValid) {
      setGlobalError("Please fix the errors above.");
      return;
    }

    setIsSubmitting(true);

    const data = {
      password: password // Send as an object, matching PasswordDTO structure
    };

    axios
      .put(`http://localhost:9090/api/register/credentials`, data, {
        headers: {
          "X-Session-ID": sessionStorage.getItem("session:signup:id") || ""
        }
      })
      .then((result) => {
        console.log(result.data);
        if (result.status === 200) {
          sessionStorage.removeItem("session:signup:id");
          setGlobalSuccess("Password successfully set!");
          // Keep disabled and redirect after a short delay
          setTimeout(() => {
            preparePkceAndRedirect();
          }, 2000);
        } else {
          setGlobalError("Unexpected response from server.");
          setIsSubmitting(false);
        }
      })
      .catch((err) => {
        console.error(err);
        setGlobalError("Failed to set password. Please try again.");
        setIsSubmitting(false);
      });
  };

  return (
    <div
      className={`${
        isOpen ? "block" : "hidden"
      } w-full max-w-2xl mx-auto bg-white px-6 sm:px-8 py-8 sm:py-10 transition-all duration-300`}
    >
      <h2 className="text-3xl font-bold text-center mb-3">
        Secure your <span className="text-[#4B0082]">AquaSense</span> account
      </h2>
      <p className="text-sm text-zinc-600 text-center mb-5">
        Set a strong password to protect your data.
      </p>

      {globalError && (
        <p className="text-sm text-[#FFC312] font-medium text-center mb-3">
          {globalError}
        </p>
      )}
      {globalSuccess && (
        <p className="text-sm text-green-600 font-medium text-center mb-3">
          {globalSuccess}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <span className="text-zinc-700 text-sm font-medium">
            Create a password
          </span>
          <div className="relative mt-1">
            <Lock className="absolute top-3 left-3 w-5 h-5 text-zinc-400" />
            <input
              type="password"
              className="w-full pl-10 pr-4 py-2.5 border border-zinc-300 rounded-lg 
                         focus:outline-none focus:border-2 focus:border-[#4B0082] text-sm"
              placeholder="Enter a strong password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isSubmitting}
            />
          </div>
          {passwordError && (
            <p className="text-sm text-[#FFC312] mt-1">{passwordError}</p>
          )}
        </div>

        <div>
          <span className="text-zinc-700 text-sm font-medium">
            Confirm password
          </span>
          <div className="relative mt-1">
            <ShieldCheck className="absolute top-3 left-3 w-5 h-5 text-zinc-400" />
            <input
              type="password"
              className="w-full pl-10 pr-4 py-2.5 border border-zinc-300 rounded-lg 
                         focus:outline-none focus:border-2 focus:border-[#4B0082] text-sm"
              placeholder="Re-enter your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={isSubmitting}
            />
          </div>
          {confirmPasswordError && (
            <p className="text-sm text-[#FFC312] mt-1">
              {confirmPasswordError}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-[#4B0082] hover:bg-[#3A0066] text-white font-semibold py-3 
                     rounded-lg transition-all duration-300 shadow-md flex items-center 
                     justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isSubmitting}
        >
          <Lock className="w-5 h-5" />
          {isSubmitting ? "Saving..." : "Continue"}
        </button>
      </form>
    </div>
  );
};

export default PasswordSection;
