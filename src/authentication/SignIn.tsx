import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import CaptchaModal from "../components/fragments/CaptchaModal";
import SignInPasswordSection from "../components/fragments/SignInPasswordSection";
import UserTypeForm from "../components/fragments/UserTypeForm";
import VerificationUI from "../components/fragments/VerificationUI";

const SignIn: React.FC = () => {
  //   const [loginType, setLoginType] = useState<"owner" | "staff">("staff");

  //   const handleLoginType = () => {
  //     setLoginType((prev) => (prev === "owner" ? "staff" : "owner"));
  //   };

  const [searchParams] = useSearchParams();

  const params = [
    "client_id",
    "response_type",
    "code_challenge",
    "code_challenge_method",
    "from",
    "state",
    "page",
    "backwards_compatible",
    "redirect_uri"
  ];

  const [captchaOpen, setCaptchaOpen] = useState(false);
  const [verificationOpen, setVerificationOpen] = useState(false);
  const [userTypeFormOpen, setUserTypeForm] = useState(true); // default open
  const [passwordSectionOpen, setPasswordSectionOpen] = useState(false);
  const [email, setEmail] = useState<string>("");

  const handleChangeEmail = (value: string) => {
    setEmail(value);
    console.log(email);
  };

  const goToCaptcha = () => {
    setCaptchaOpen(true);
    setVerificationOpen(false);
    setPasswordSectionOpen(false);
  };

  const goToVerification = () => {
    setCaptchaOpen(false);
    setUserTypeForm(false);
    setVerificationOpen(true);
  };

  const goToPasswordSection = () => {
    setCaptchaOpen(false);
    setUserTypeForm(false);
    setVerificationOpen(false);
    setPasswordSectionOpen(true);
  };

  const goBackToLoginForm = () => {
    setCaptchaOpen(false);
    setVerificationOpen(false);
    setPasswordSectionOpen(false);
    setUserTypeForm(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 sm:px-6 md:px-10 lg:px-20 xl:px-32 py-10">
      <div className="w-full min-w-[300px] max-w-xl md:max-w-5xl bg-white rounded-3xl shadow-2xl flex flex-col md:flex-row overflow-hidden min-h-[600px] hover:scale-105 transition-all duration-300 ease-in-out">
        <div className="hidden md:flex w-full md:w-1/2 bg-gradient-to-br from-sky-600 to-cyan-600 items-center justify-center relative p-4">
          <div className="absolute w-40 h-40 bg-white/10 rounded-full animate-pulse blur-3xl top-10 left-10"></div>
          <div className="absolute w-60 h-60 bg-white/20 rounded-full animate-spin-slow blur-2xl bottom-0 right-0"></div>
          <div className="text-white text-center z-10 px-4">
            <h2 className="text-3xl font-bold mb-2 break-words">
              Secure AquaSense Sign in
            </h2>
            <p className="text-sm font-medium break-words">
              Real-time insights powered by Data Science, AI & IoT
            </p>
          </div>
        </div>
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center min-w-0 min-h-[500px] flex-1">
          {/* Top Section */}
          <h2 className="text-3xl font-bold text-gray-800 text-center mt-5">
            Sign in to <span className="text-blue-600">AquaSense</span>
          </h2>

          {/* Middle Section - grows to fill space */}
          <div className="flex-1 flex items-center justify-center">
            {userTypeFormOpen && (
              <UserTypeForm
                goToCaptcha={goToVerification}
                email={email}
                handleChangeEmail={handleChangeEmail}
              />
            )}
            {passwordSectionOpen && (
              <SignInPasswordSection signType={"owner"} shownEmail={email} />
            )}
            {verificationOpen && (
              <VerificationUI
                type="LOGIN"
                isOpen={verificationOpen}
                onClose={goBackToLoginForm}
                userEmail={email}
                onSubmit={goToPasswordSection}
              />
            )}
          </div>
          {/* Bottom Section */}
          <p
            className="text-xs text-gray-500 text-center leading-relaxed mb-5"
            id="agreements"
          >
            By continuing, you agree to the AquaSense Customer Agreement and the{" "}
            <a className="text-blue-600 hover:underline font-medium" href="#">
              Privacy Notice
            </a>
            . This site uses essential cookies. See our{" "}
            <a className="text-blue-600 hover:underline font-medium" href="#">
              Cookie Notice
            </a>
            .
          </p>
          <>
            {params.map((param) => (
              <input
                key={param}
                id={param}
                name={param}
                type="hidden"
                value={searchParams.get(param) || ""}
              />
            ))}
          </>
        </div>
      </div>
      {captchaOpen && (
        <CaptchaModal
          isOpen={captchaOpen}
          onClose={goBackToLoginForm}
          goToVerification={goToVerification}
        />
      )}
    </div>
  );
};

export default SignIn;
