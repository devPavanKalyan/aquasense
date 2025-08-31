import { Check, Mail, User } from "lucide-react";
import { useState } from "react";
import { preparePkceAndRedirect } from "../../utils/authRedirects";

interface Props {
  isOpen: boolean;
  fullName: string;
  email: string;
  agreed: boolean;
  handleFullChange: (value: string) => void;
  handleAgreedChange: (value: boolean) => void;
  handleEmailChange: (value: string) => void;
  onSubmit: () => void;
}

const RegisterForm: React.FC<Props> = ({
  isOpen,
  fullName,
  email,
  agreed,
  handleAgreedChange,
  handleFullChange,
  handleEmailChange,
  onSubmit
}) => {
  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    agreed: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    let isValid = true;
    const newErrors = { fullName: "", email: "", agreed: "" };

    if (!fullName.trim()) {
      newErrors.fullName = "Full name is required.";
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email)) {
      newErrors.email = "Enter a valid email address.";
      isValid = false;
    }

    if (!agreed) {
      newErrors.agreed = "You must agree to continue.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = () => {
    if (isSubmitting) return; // Prevent multiple submits
    if (validate()) {
      setIsSubmitting(true);
      onSubmit();
      // You can setIsSubmitting(false) after onSubmit completes (if async)
    }
  };

  return (
    <div className={`${isOpen ? "block" : "hidden"} w-full`}>
      <h2 className="text-3xl font-bold text-gray-800 mb-10 text-center">
        Sign up for <span className="text-blue-600">AquaSense</span>
      </h2>

      {/* Full Name */}
      <label className="block mb-5">
        <span className="text-gray-700 text-sm font-medium">
          What should we call you?
        </span>
        <div className="relative mt-1">
          <User className="absolute top-3 left-3 w-5 h-5 text-gray-400" />
          <input
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            placeholder="Your name"
            name="fullName"
            autoComplete="on"
            type="text"
            value={fullName}
            onChange={(e) => handleFullChange(e.target.value)}
            disabled={isSubmitting}
          />
        </div>
        {errors.fullName && (
          <p className="text-sm text-red-600 mt-1">{errors.fullName}</p>
        )}
      </label>

      {/* Email */}
      <label className="block mb-5">
        <span className="text-gray-700 text-sm font-medium">Email address</span>
        <div className="relative mt-1">
          <Mail className="absolute top-3 left-3 w-5 h-5 text-gray-400" />
          <input
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            placeholder="you@example.com"
            type="email"
            name="email"
            autoComplete="on"
            value={email}
            onChange={(e) => handleEmailChange(e.target.value)}
            disabled={isSubmitting}
          />
        </div>
        {errors.email && (
          <p className="text-sm text-red-600 mt-1">{errors.email}</p>
        )}
      </label>

      {/* Terms */}
      <div className="flex items-start sm:items-center gap-2 text-sm text-gray-700 m-1">
        <input
          className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          type="checkbox"
          checked={agreed}
          onChange={(e) => handleAgreedChange(e.target.checked)}
          disabled={isSubmitting}
        />
        <span>
          I agree to the{" "}
          <a href="#" className="text-blue-600 hover:underline font-medium">
            terms and privacy policy
          </a>
        </span>
      </div>

      {errors.agreed && (
        <p className="text-sm text-red-600 m-1 mb-5">{errors.agreed}</p>
      )}

      {/* Submit */}
      <button
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg transition-all flex items-center justify-center gap-2 shadow-md mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={handleSubmit}
        disabled={isSubmitting}
      >
        <Check className="w-5 h-5" />
        Verify Email Address
      </button>

      {/* Separator */}
      <div className="flex items-center gap-2 my-4">
        <hr className="flex-grow border-gray-300" />
        <span className="text-gray-500 text-sm font-medium">OR</span>
        <hr className="flex-grow border-gray-300" />
      </div>

      {/* Sign In */}
      <div className="text-center">
        <p className="text-sm text-gray-600 mb-2 font-medium">
          Already have an AquaSense account?
        </p>
        <button
          className="bg-green-600 hover:bg-green-700 text-white font-semibold text-sm px-6 py-2 rounded-md w-full sm:w-auto transition-all shadow-sm"
          onClick={() => {
            preparePkceAndRedirect();
          }}
          disabled={isSubmitting}
        >
          Sign In
        </button>
      </div>
    </div>
  );
};

export default RegisterForm;
