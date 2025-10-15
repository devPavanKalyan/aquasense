import axios from "axios";
import { AlertCircle, MailCheck } from "lucide-react";
import React, { useEffect, useState, type ChangeEvent } from "react";
import { useSearchParams } from "react-router-dom";

type Type = "LOGIN" | "REGISTER";

interface VerificationUIProps {
  type: Type;
  isOpen: boolean;
  onClose: () => void;
  userEmail?: string;
  onSubmit: () => void;
}

const VerificationUI: React.FC<VerificationUIProps> = ({
  type,
  isOpen,
  onClose,
  userEmail = "your@email.com",
  onSubmit
}) => {
  const [searchParams] = useSearchParams();
  const stateParam = searchParams.get("state");
  const [otp, setOtp] = useState("");
  const [countDown, setCountDown] = useState(0);
  const [errors, setErrors] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResending, setIsResending] = useState(false);

  useEffect(() => {
    if (countDown <= 0) return;
    const timer = setInterval(() => {
      setCountDown((prev) => (prev > 1 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [countDown]);

  const validate = () => {
    if (!otp.trim()) {
      setErrors("Please enter the 6-digit verification code.");
      return false;
    }
    setErrors("");
    return true;
  };

  const handleSubmit = async () => {
    if (isSubmitting) return;
    if (!validate()) return;

    setIsSubmitting(true);
    setErrors("");

    try {
      const url =
        type === "LOGIN"
          ? "http://localhost:9090/api/notifications/otp/validate"
          : "http://localhost:9090/api/register/verify/otp";

      const config =
        type === "LOGIN"
          ? {
              headers: { "X-Session-ID": stateParam },
              params: { email: userEmail, otp }
            }
          : {
              headers: {
                "X-Session-ID":
                  sessionStorage.getItem("session:signup:id") || ""
              }
            };

      const result =
        type === "LOGIN"
          ? await axios.get(url, config)
          : await axios.post(url, { otp }, config);

      if (result.status === 200) {
        onSubmit();
      }
    } catch (err) {
      console.error(err);
      setErrors("Something went wrong! Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResendOtp = async () => {
    if (isResending || countDown > 0) return;
    setIsResending(true);
    setErrors("");

    try {
      const result = await axios.post(
        "http://localhost:9090/api/notifications/otp",
        null,
        {
          headers: {
            "X-Session-ID": sessionStorage.getItem("session:signup:id") || ""
          }
        }
      );

      if (result.status === 200) {
        setCountDown(60);
        alert("A new code has been sent to your email.");
      }
    } catch (err) {
      console.error(err);
      setErrors("Failed to resend code. Please try again.");
    } finally {
      setIsResending(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className={`${
        isOpen ? "block" : "hidden"
      } w-full max-w-2xl mx-auto bg-white px-6 sm:px-8 py-8 sm:py-10`}
    >
      <h2 className="text-2xl sm:text-3xl font-bold mb-5 flex items-center gap-2">
        <MailCheck className="text-[#4B0082] w-6 h-6" />
        Verify Your Email
      </h2>

      <p className="text-sm text-zinc-600 mb-5 leading-relaxed">
        We've sent a 6-digit verification code to{" "}
        <span className="font-semibold text-zinc-800">{userEmail}</span>.{" "}
        <button
          onClick={onClose}
          className="text-[#4B0082] hover:underline text-sm ml-1 bg-transparent border-0 cursor-pointer"
        >
          (not you?)
        </button>
      </p>

      <div className="mb-5">
        <span className="text-zinc-700 text-sm font-medium">
          Verification Code
        </span>
        <div className="relative mt-1">
          <input
            className="w-full pl-4 pr-4 py-2.5 border border-zinc-300 rounded-lg 
                     focus:outline-none focus:border-2 focus:border-[#4B0082] text-sm"
            placeholder="Enter 6-digit code"
            value={otp}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setOtp(e.target.value)
            }
            disabled={isSubmitting}
          />
        </div>
        {errors && (
          <p className="text-sm text-[#FFC312] mt-2 flex items-center gap-1">
            <AlertCircle className="w-4 h-4" />
            {errors}
          </p>
        )}
      </div>

      <div className="flex flex-col md:flex-row justify-center md:justify-between items-center gap-4 mt-6 w-full">
        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="w-full md:w-auto px-8 py-3 bg-[#4B0082] text-white font-semibold rounded-lg 
             hover:bg-[#3A0066] transition-all duration-300 shadow-md 
             disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Verifying..." : "Verify Code"}
        </button>

        <div className="relative w-full md:w-auto">
          <button
            onClick={handleResendOtp}
            disabled={countDown > 0 || isResending}
            className="md:w-full px-8 py-3 bg-[#FFC312] text-[#4B0082] font-semibold rounded-lg
               hover:bg-[#E0B00F] transition-all duration-300 shadow-sm 
               disabled:opacity-50 disabled:cursor-not-allowed relative flex justify-center items-center"
          >
            {isResending ? "Resending..." : "Resend Code"}
          </button>

          {countDown > 0 && (
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-medium text-zinc-700">
              {countDown}s
            </span>
          )}
        </div>
      </div>

      <div className="mt-5">
        <p className="text-xs text-zinc-500 mb-1">Didn’t receive the code?</p>
        <ul className="list-disc list-inside text-zinc-500 text-xs space-y-1">
          <li>Codes can take up to 5 minutes to arrive.</li>
          <li>Check your spam or promotions folder.</li>
        </ul>
      </div>
    </div>
  );
};

export default VerificationUI;
