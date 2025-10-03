import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
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

  //   const goToCaptcha = () => {
  //     setCaptchaOpen(true);
  //     setVerificationOpen(false);
  //     setPasswordSectionOpen(false);
  //   };

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

  const navigate = useNavigate();

  return (
    <div className="min-h-screen md:bg-gray-50 flex items-center justify-center md:px-8 lg:px-12 xl:px-16 py-10">
      <div
        onClick={() => navigate("/")}
        className="fixed left-5 top-5 flex items-center gap-2 px-4 py-2 
               bg-blue-600 text-white rounded-xl shadow-md cursor-pointer 
               hover:bg-blue-700 hover:shadow-lg active:scale-95 
               transition-all duration-300"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="font-medium">Back</span>
      </div>

      <div
        className="w-full max-w-4xl bg-white md:rounded-3xl md:shadow-2xl 
                  flex flex-col md:flex-row overflow-hidden 
                  min-h-[600px] transition-all duration-300 ease-in-out"
      >
        {/* Left Section */}
        <div className="hidden md:flex w-1/2 bg-gradient-to-br from-sky-600 to-cyan-600 items-center justify-center relative p-6">
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

        {/* Right Section */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-center min-w-0 min-h-[500px] flex-1">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 text-center mt-5">
            Sign in to <span className="text-blue-600">AquaSense</span>
          </h2>

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

          <p className="text-xs text-gray-500 text-center leading-relaxed mb-5">
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

          {params.map((param) => (
            <input
              key={param}
              id={param}
              name={param}
              type="hidden"
              value={searchParams.get(param) || ""}
            />
          ))}
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
