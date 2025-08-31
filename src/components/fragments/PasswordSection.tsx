import axios from "axios";
import { Lock, ShieldCheck } from "lucide-react";
import React, { useState } from "react";
import { preparePkceAndRedirect } from "../../utils/authRedirects";

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
      .put(`http://localhost:9091/api/register/credentials`, data, {
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
    <div className={`${isOpen ? "block" : "hidden"} w-full`}>
      <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center">
        Secure your <span className="text-blue-600">AquaSense</span> account
      </h2>
      <p className="text-sm text-gray-600 text-center">
        Set a strong password to protect your data.
      </p>

      {globalError && (
        <p className="text-sm text-red-600 font-medium text-center">
          {globalError}
        </p>
      )}
      {globalSuccess && (
        <p className="text-sm text-green-600 font-medium text-center">
          {globalSuccess}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-6 p-5">
        {/* Password Input */}
        <label className="block">
          <span className="text-gray-700 text-sm font-medium">
            Create a password
          </span>
          <div className="relative mt-1">
            <Lock className="absolute top-3 left-3 w-5 h-5 text-gray-400" />
            <input
              type="password"
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              placeholder="Enter a strong password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isSubmitting}
            />
          </div>
          {passwordError && (
            <p className="text-sm text-red-600 mt-1">{passwordError}</p>
          )}
        </label>

        {/* Confirm Password Input */}
        <label className="block">
          <span className="text-gray-700 text-sm font-medium">
            Confirm password
          </span>
          <div className="relative mt-1">
            <ShieldCheck className="absolute top-3 left-3 w-5 h-5 text-gray-400" />
            <input
              type="password"
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              placeholder="Re-enter your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={isSubmitting}
            />
          </div>
          {confirmPasswordError && (
            <p className="text-sm text-red-600 mt-1">{confirmPasswordError}</p>
          )}
        </label>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg transition-all flex items-center justify-center gap-2 shadow-md mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isSubmitting}
        >
          <Lock className="w-5 h-5" />
          Continue
        </button>
      </form>
    </div>
  );
};

export default PasswordSection;
