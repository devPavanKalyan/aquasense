import { Mail, User } from "lucide-react";
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
    if (isSubmitting) return;
    if (validate()) {
      setIsSubmitting(true);
      onSubmit();
    }
  };

  return (
    <div
      className={`${isOpen ? "block" : "hidden"} 
          w-full max-w-2xl mx-auto bg-white
          px-6 sm:px-8 py-8 sm:py-10 
          transition-all duration-300`}
    >
      <h2 className="text-2xl sm:text-3xl font-bold text-zinc-800 mb-10">
        Sign in to <span className="text-[#4B0082]">AquaSense</span>
      </h2>

      <label className="block mb-5">
        <span className="text-zinc-700 text-sm font-medium">
          What should we call you?
        </span>
        <div className="relative mt-1">
          <User className="absolute top-3 left-3 w-5 h-5 text-zinc-400" />
          <input
            className="w-full pl-10 pr-4 py-2.5 border border-zinc-300 rounded-lg 
                   focus:outline-none focus:border-2 focus:border-[#4B0082] text-sm"
            placeholder="Your name"
            value={fullName}
            onChange={(e) => handleFullChange(e.target.value)}
            disabled={isSubmitting}
          />
        </div>
        {errors.fullName && (
          <p className="text-sm text-[#FFC312] mt-1">{errors.fullName}</p>
        )}
      </label>

      <label className="block mb-5">
        <span className="text-zinc-700 text-sm font-medium">Email address</span>
        <div className="relative mt-1">
          <Mail className="absolute top-3 left-3 w-5 h-5 text-zinc-400" />
          <input
            className="w-full pl-10 pr-4 py-2.5 border border-zinc-300 rounded-lg 
                   focus:outline-none focus:border-2 focus:border-[#4B0082] text-sm"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => handleEmailChange(e.target.value)}
            disabled={isSubmitting}
          />
        </div>
        {errors.email && (
          <p className="text-sm text-[#FFC312] mt-1">{errors.email}</p>
        )}
      </label>

      <div className="flex items-start sm:items-center gap-2 text-sm text-zinc-700 m-1">
        <input
          className="h-4 w-4 text-[#4B0082] border-zinc-300 rounded focus:ring-[#4B0082]"
          type="checkbox"
          checked={agreed}
          onChange={(e) => handleAgreedChange(e.target.checked)}
          disabled={isSubmitting}
        />
        <span>
          I agree to the{" "}
          <a href="#" className="text-[#4B0082] hover:underline font-medium">
            terms and privacy policy
          </a>
        </span>
      </div>
      {errors.agreed && (
        <p className="text-sm text-[#FFC312] m-1 mb-5">{errors.agreed}</p>
      )}

      <button
        className="mt-6 px-6 py-3 bg-[#4B0082] text-white font-semibold rounded-lg 
               hover:bg-[#3A0066] transition shadow-md"
        onClick={handleSubmit}
        disabled={isSubmitting}
      >
        Verify Email Address
      </button>

      <div className="flex items-center gap-2 my-4">
        <hr className="flex-grow border-zinc-300" />
        <span className="text-zinc-400 text-sm font-medium">OR</span>
        <hr className="flex-grow border-zinc-300" />
      </div>

      <div className="text-center">
        <p className="text-sm text-zinc-600 mb-2 font-medium">
          Already have an AquaSense account?
        </p>
        <button
          className="inline-block bg-[#FFC312] text-[#4B0082] font-semibold text-sm px-5 py-2 
                 rounded-md hover:bg-[#E0B00F] transition-all duration-300 ease-in-out"
          onClick={() => preparePkceAndRedirect()}
          disabled={isSubmitting}
        >
          Sign In
        </button>
      </div>
    </div>
  );
};

export default RegisterForm;
