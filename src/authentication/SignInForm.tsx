import {
  Building2,
  KeyRound,
  CircleCheckBig as LucideCircleCheckBig,
  User
} from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  toggleLoginType: () => void;
}
const SignInForm: React.FC<Props> = ({ toggleLoginType }) => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: "",
    remember: false,
    showPassword: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const toggleShowPassword = () => {
    setForm((prev) => ({
      ...prev,
      showPassword: !prev.showPassword
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Submitted:", form);
    // TODO: Add backend logic or validation
  };

  return (
    <form onSubmit={handleSubmit} className="">
      <div className="space-y-5">
        {/* Account ID / Alias */}
        <label className="block mb-2">
          <span className="text-gray-700 text-sm font-medium">
            Account ID or alias
          </span>
          <div className="relative mt-1">
            <Building2 className="absolute top-3 left-3 w-5 h-5 text-gray-400" />
            <input
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              placeholder="123456789012 or alias"
              type="email"
              name="account"
            />
          </div>
        </label>

        {/* Remember */}
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="remember"
            checked={form.remember}
            onChange={handleChange}
            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <span className="text-gray-700 text-sm font-medium">
            Remember this account
          </span>
        </label>

        {/* Username */}
        <label className="block mb-2">
          <span className="text-gray-700 text-sm font-medium">
            AquaSense Username
          </span>
          <div className="relative mt-1">
            <User className="absolute top-3 left-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="Your AquaSense username"
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>
        </label>

        {/* Password */}
        <label className="block w-full mb-2">
          <span className="text-gray-700 text-sm font-medium">Password</span>
          <div className="relative mt-1">
            <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type={form.showPassword ? "text" : "password"}
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full pl-10 pr-16 py-2.5 text-sm text-gray-800 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400 transition-all duration-200"
            />
            <button
              type="button"
              onClick={toggleShowPassword}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
            >
              {form.showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </label>

        {/* Help Link */}
        <p className="text-sm font-semibold text-blue-600 hover:underline cursor-pointer text-center sm:text-left">
          Having trouble?
        </p>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2.5 rounded-lg transition-all flex items-center justify-center gap-2 shadow-md mt-6"
        >
          <LucideCircleCheckBig className="w-5 h-5" />
          Sign In
        </button>

        {/* Additional Options */}
        <div className="text-center text-sm text-gray-600 space-y-1 mt-4">
          <p
            className="hover:underline cursor-pointer text-blue-600 font-medium"
            role="button"
            onClick={toggleLoginType}
          >
            Sign in using root user email
          </p>
          <p
            className="hover:underline cursor-pointer text-blue-600 font-medium"
            role="button"
            onClick={() => navigate("/register")}
          >
            Create a new AquaSense account
          </p>
        </div>
      </div>
    </form>
  );
};

export default SignInForm;
