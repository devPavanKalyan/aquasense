import axios from "axios";
import { AlertCircle, MailCheck } from "lucide-react";
import React, { type ChangeEvent, useEffect, useState } from "react";
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
  if (!isOpen) return null;

  const [searchParams] = useSearchParams();
  const stateParam = searchParams.get("state");
  const [otp, setOtp] = useState<string>("");
  const [countDown, setCountDown] = useState<number>(0);
  const [showOtpError, setShowOtpError] = useState(false);
  const [showGlobalError, setShowGlobalError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResending, setIsResending] = useState(false);

  // Countdown timer effect
  useEffect(() => {
    if (countDown <= 0) return;

    const intervalId = setInterval(() => {
      setCountDown((prev) => {
        if (prev <= 1) {
          clearInterval(intervalId);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [countDown]);

  const handleSubmit = async () => {
    if (type === "LOGIN") {
      handleLoginSubmit();
    } else if (type === "REGISTER") {
      handleRegisterSubmit();
    }
  };

  const handleLoginSubmit = async () => {
    if (isSubmitting) return; // prevent double submit
    if (!otp.trim()) {
      setShowOtpError(true);
      return;
    }
    setShowOtpError(false);
    setShowGlobalError(false);

    setIsSubmitting(true);
    try {
      const result = await axios.get(
        `http://localhost:9091/api/notifications/otp/validate`,
        {
          headers: {
            "X-Session-ID": stateParam
          },
          params: {
            email: userEmail,
            otp: otp
          }
        }
      );

      if (result.status === 200) {
        onSubmit();
      }
    } catch (err) {
      console.error(err);
      setShowGlobalError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRegisterSubmit = async () => {
    if (isSubmitting) return; // prevent double submit
    if (!otp.trim()) {
      setShowOtpError(true);
      return;
    }
    setShowOtpError(false);
    setShowGlobalError(false);

    setIsSubmitting(true);

    try {
      const result = await axios.post(
        `http://localhost:9091/api/register/verify/otp`,
        { otp },
        {
          headers: {
            "X-Session-ID": sessionStorage.getItem("session:signup:id") || ""
          }
        }
      );

      if (result.status === 200) {
        onSubmit();
      }
    } catch (err) {
      console.error(err);
      setShowGlobalError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResendOtp = async () => {
    if (isResending || countDown > 0) return; // prevent multiple clicks

    setShowGlobalError(false);
    setIsResending(true);

    try {
      const result = await axios.post(
        `http://localhost:9091/api/notifications/otp`,
        null,
        {
          headers: {
            "X-Session-ID": sessionStorage.getItem("session:signup:id") || ""
          }
        }
      );

      if (result.status === 200) {
        alert("OTP sent successfully");
        setCountDown(60); // start 60 second countdown
      }
    } catch (err) {
      console.error(err);
      setShowGlobalError(true);
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className={`${isOpen ? "block" : "hidden"} w-full`}>
      <div className="flex flex-col items-center">
        <p className="text-sm text-gray-500 mt-1 text-center">
          Your security is our priority.
        </p>
      </div>

      <div className="text-left">
        {/* Global Error */}
        {showGlobalError && (
          <div
            id="otpInputGlobalError"
            className="text-red-600 text-sm font-medium flex items-center justify-center gap-1"
          >
            <AlertCircle className="w-4 h-4" />
            Something went wrong! Please try again.
          </div>
        )}

        {/* Instructions */}
        <div className="mt-4">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-1">
            <MailCheck className="w-5 h-5 text-blue-500" />
            Confirm your identity
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            We’ve sent a verification code to{" "}
            <strong className="text-gray-900">{userEmail}</strong>.
            <button
              id="not-you"
              className="text-blue-600 hover:underline text-sm ml-1 bg-transparent border-0 cursor-pointer focus:outline-none"
              onClick={onClose}
            >
              (not you?)
            </button>
          </p>
        </div>

        {/* OTP Input */}
        <div className="mt-4">
          <label
            htmlFor="otpInput"
            className="block text-sm text-gray-800 font-medium mb-1"
          >
            Verification Code
          </label>
          <input
            id="otpInput"
            type="text"
            placeholder="Enter 6-digit code"
            className="w-full border border-gray-300 px-4 py-2 rounded-md text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            value={otp}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setOtp(e.target.value)
            }
            disabled={isSubmitting}
          />
          <p
            id="otpInputError"
            className={`text-sm text-red-600 mt-1 ${
              showOtpError ? "block" : "hidden"
            }`}
          >
            Please enter the code we sent.
          </p>
        </div>

        {/* Buttons */}
        <div className="mt-6 space-y-3">
          <button
            id="otpSubmit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-md shadow-md transition focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            Verify
          </button>

          <button
            id="resend-otp"
            disabled={countDown > 0 || isResending}
            className="relative w-full border border-gray-300 text-gray-700 font-semibold py-2.5 rounded-md hover:bg-gray-100 transition focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleResendOtp}
          >
            Resend Code
            <span
              id="countdown-timer"
              className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-black"
            >
              {countDown}
            </span>
          </button>
        </div>

        {/* Help Info */}
        <div className="mt-5">
          <p className="text-xs text-gray-500">Didn't get the code?</p>
          <ul className="list-disc list-inside text-gray-500 text-xs mt-1 space-y-1">
            <li>Codes can take up to 5 minutes to arrive.</li>
            <li>Check your spam or promotions folder.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default VerificationUI;
