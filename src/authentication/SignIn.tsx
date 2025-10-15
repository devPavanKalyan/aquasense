import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import Logo from "../hooks/Logo";
import CaptchaModal from "./CaptchaModal";
import SignInPasswordSection from "./SignInPasswordSection";
import UserTypeForm from "./UserTypeForm";
import VerificationUI from "./VerificationUI";

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

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="fixed left-5 top-5">
        <Logo />
      </div>

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

      {params.map((param) => (
        <input
          key={param}
          id={param}
          name={param}
          type="hidden"
          value={searchParams.get(param) || ""}
        />
      ))}

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
