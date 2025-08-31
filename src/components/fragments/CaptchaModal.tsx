import axios from "axios";
import { X } from "lucide-react";
import React, { useEffect, useState } from "react";



interface CaptchaModalProps {
  isOpen: boolean;
  onClose: () => void;
  goToVerification: () => void;
}
axios.defaults.withCredentials = true; // ✅ Ensure cookies are sent with every request

const CaptchaModal: React.FC<CaptchaModalProps> = ({
  isOpen,
  onClose,
  goToVerification
}) => {
  const [captchaAnswer, setCaptchaAnswer] = useState("");
  const [showError, setShowError] = useState(false);
  const [captchaSrc, setCaptchaSrc] = useState("");
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [captchaId, setCaptchaId] = useState<string>("");

  // Additional loading state for captcha image fetch (separate from submit loading)
  const [captchaLoading, setCaptchaLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      loadCaptcha();
      setCaptchaAnswer("");
      setShowError(false);
      setApiError(null);
    }
  }, [isOpen]);

  const loadCaptcha = async () => {
    setCaptchaLoading(true);
    const uniqueParam = Date.now();
    try {
      const response = await fetch(
        `http://localhost:9091/api/captcha/generate?_=${uniqueParam}`,
        {
          credentials: "include" // ensures cookies are sent/received
        }
      );

      if (response.ok) {
        const json = await response.json();
        if (json.code === 200 && json.data?.imageBase64) {
          setCaptchaId(json.data.captchaId);
          setCaptchaSrc(json.data.imageBase64); // base64 string with "data:image/jpeg;base64,..."
          setApiError(null);
        } else {
          setApiError(json.message || "Failed to load captcha image");
          setCaptchaSrc("");
        }
      } else {
        setApiError("Failed to load captcha image");
        setCaptchaSrc("");
      }
    } catch (error) {
      setApiError("Failed to load captcha image");
      setCaptchaSrc("");
    } finally {
      setCaptchaLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!captchaAnswer.trim()) {
      setShowError(true);
      return;
    }
    setShowError(false);
    setApiError(null);
    setLoading(true);

    try {
      const response = await axios.post(
        `http://localhost:9091/api/captcha/verify`,
        null,
        {
          params: { captchaId: captchaId, input: captchaAnswer.trim() },
          withCredentials: true // keep session
        }
      );

      if (response.data && response.status === 200) {
        console.log("Verified successfully", response.data.data.sessionId);
        sessionStorage.setItem(
          "session:signup:id",
          response.data.data.sessionId
        );
        goToVerification();
      } else {
        setApiError(response.data?.message || "CAPTCHA validation failed.");
        setCaptchaAnswer("");
      }
    } catch (error: any) {
      setApiError("Error validating CAPTCHA. Please try again.");
      setCaptchaAnswer("");
      console.error("Captcha verify error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setCaptchaAnswer("");
    setShowError(false);
    setApiError(null);
    loadCaptcha();
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modalTitle"
      className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center transition-opacity duration-300"
    >
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 mx-4 sm:mx-auto transform transition-all">
        {/* Close Button */}
        <button
          onClick={() => {
            onClose();
            setCaptchaAnswer("");
            setShowError(false);
            setApiError(null);
          }}
          aria-label="Close modal"
          disabled={loading || captchaLoading}
          className={`absolute top-3 right-3 text-gray-500 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 p-1 rounded-full transition ${
            loading || captchaLoading ? "cursor-not-allowed opacity-50" : ""
          }`}
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title */}
        <h2
          id="modalTitle"
          className="text-xl sm:text-2xl font-semibold mb-5 text-center text-gray-800"
        >
          Security Verification
        </h2>

        {/* API error */}
        {apiError && (
          <p
            className="text-red-600 text-sm font-medium mb-4 text-center"
            role="alert"
          >
            {apiError}
          </p>
        )}

        {/* CAPTCHA Image and Refresh */}
        <div className="mb-5 flex items-center justify-center gap-3 min-h-[110px]">
          {captchaLoading ? (
            // Loading spinner placeholder
            <svg
              className="animate-spin h-10 w-10 text-blue-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              />
            </svg>
          ) : captchaSrc ? (
            <img
              id="captchaImage"
              src={captchaSrc}
              alt="CAPTCHA"
              className="w-full max-w-xs border border-gray-300 rounded-lg p-2 bg-white"
            />
          ) : (
            <p className="text-gray-500">No CAPTCHA available</p>
          )}
          {/* <button
            type="button"
            onClick={handleReset}
            disabled={loading || captchaLoading}
            aria-label="Refresh CAPTCHA"
            className={`text-blue-600 hover:text-blue-800 transition p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-300 ${
              loading || captchaLoading
                ? "disabled:text-gray-400 cursor-not-allowed opacity-50"
                : ""
            }`}
          >
            <RefreshCw className="w-5 h-5" />
          </button> */}
        </div>

        {/* CAPTCHA Input */}
        <div className="mb-6">
          <label
            htmlFor="captchaInput"
            className="block text-sm sm:text-base text-gray-700 font-medium mb-2"
          >
            Type the characters as shown above
          </label>
          <input
            id="captchaInput"
            type="text"
            value={captchaAnswer}
            onChange={(e) => setCaptchaAnswer(e.target.value)}
            placeholder="Enter CAPTCHA"
            disabled={loading || captchaLoading}
            className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition disabled:bg-gray-100"
          />
          {showError && (
            <p className="mt-1 text-sm text-red-600" role="alert">
              CAPTCHA answer is required.
            </p>
          )}
        </div>

        {/* Buttons */}
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={handleReset}
            disabled={loading || captchaLoading}
            className="text-sm sm:text-base text-blue-600 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-400 rounded disabled:text-gray-400 disabled:cursor-not-allowed"
          >
            Refresh
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading || captchaLoading}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium px-5 py-2 rounded-md text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-400 transition disabled:cursor-not-allowed"
          >
            {loading ? "Verifying..." : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CaptchaModal;
