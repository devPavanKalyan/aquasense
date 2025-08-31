import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CaptchaModal from "../../components/fragments/CaptchaModal";
import PasswordSection from "../../components/fragments/PasswordSection";
import RegisterForm from "../../components/fragments/RegisterForm";
import VerificationUI from "../../components/fragments/VerificationUI";

axios.defaults.withCredentials = true; // ✅ Ensure cookies are sent with every request

const Register: React.FC = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [agreed, setAgreed] = useState(false);

  const [captchaOpen, setCaptchaOpen] = useState(false);
  const [verificationOpen, setVerificationOpen] = useState(false);
  const [registerFormOpen, setRegisterFormOpen] = useState(true);
  const [passwordSectionOpen, setPasswordSectionOpen] = useState(false);

  // ----- Step control -----
  const goToCaptcha = () => {
    setCaptchaOpen(true);
  };

  const goToVerification = () => {
    setCaptchaOpen(false);
    setRegisterFormOpen(false);
    setVerificationOpen(true);
  };

  const goToPasswordSection = () => {
    setVerificationOpen(false);
    setPasswordSectionOpen(true);
  };

  const goBackToRegisterForm = () => {
    setCaptchaOpen(false);
    setVerificationOpen(false);
    setPasswordSectionOpen(false);
    setRegisterFormOpen(true);
  };

  // ----- Handlers -----
  const handleFullChange = (value: string) => setFullName(value);
  const handleEmailChange = (value: string) => setEmail(value);
  const handleAgreeChange = (value: boolean) => setAgreed(value);

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = () => {
    const errors = {
      fullName: fullName.trim() === "",
      email: !validateEmail(email),
      terms: !agreed
    };

    if (errors.fullName || errors.email || errors.terms) {
      console.error("Validation failed", errors);
      return;
    }

    console.log("Form validated - Opening Captcha...");
    goToCaptcha(); // ✅ Only open captcha here
  };

  // This will be called from CaptchaModal after user successfully solves captcha
  const submitDetailsAfterCaptcha = async () => {
    setCaptchaOpen(false);
    try {
      const data = { fullName, email };

      const response = await axios.post(
        "http://localhost:9091/api/register/details",

        data,
        {
          headers: {
            "X-Session-ID": sessionStorage.getItem("session:signup:id")
          }
        }
      );

      if (response.status === 200) {
        console.log("Basic details submitted successfully");
        goToVerification(); // ✅ Now go to verification step
      } else {
        console.error(response.data?.message || "Submission failed");
      }
    } catch (err) {
      console.error("Error submitting details", err);
    }
  };

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-10 lg:px-16 py-10">
      <div
        onClick={() => navigate("/")}
        className="fixed left-5 top-5 text-white h-10 w-30 bg-blue-600 rounded flex items-center justify-center cursor-pointer hover:bg-gray-800 transition"
      >
        Back to Home
      </div>
      <div className="w-full min-w-[300px] max-w-xl md:max-w-5xl bg-white rounded-3xl shadow-2xl flex flex-col md:flex-row overflow-hidden min-h-[600px] hover:scale-105 transition-all duration-300 ease-in-out">
        {/* Left Panel */}
        <div className="hidden md:flex w-full md:w-1/2 bg-gradient-to-br from-blue-600 to-cyan-500 text-white items-center justify-center relative p-8">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-60 h-60 bg-white/20 rounded-full blur-2xl animate-[spin_12s_linear_infinite]"></div>

          <div className="relative z-10 text-center space-y-4">
            <h2 className="text-4xl font-bold leading-tight">
              Water Quality Analytics
            </h2>
            <p className="text-base font-medium opacity-90">
              Real-time insights powered by Data Science, AI & IoT
            </p>
          </div>
        </div>

        {/* Right Panel */}
        <div className="flex-1 w-full p-5 flex items-center justify-center">
          {registerFormOpen && (
            <RegisterForm
              isOpen={registerFormOpen}
              fullName={fullName}
              email={email}
              agreed={agreed}
              handleAgreedChange={handleAgreeChange}
              handleEmailChange={handleEmailChange}
              handleFullChange={handleFullChange}
              onSubmit={handleSubmit}
            />
          )}

          {verificationOpen && (
            <VerificationUI
              type="REGISTER"
              isOpen={verificationOpen}
              onClose={goBackToRegisterForm}
              userEmail={email}
              onSubmit={goToPasswordSection}
            />
          )}

          {passwordSectionOpen && (
            <PasswordSection isOpen={passwordSectionOpen} />
          )}
        </div>
      </div>

      {/* Captcha Modal */}
      {captchaOpen && (
        <CaptchaModal
          isOpen={captchaOpen}
          onClose={goBackToRegisterForm}
          goToVerification={submitDetailsAfterCaptcha} // ✅ Submit details after captcha
        />
      )}
    </div>
  );
};

export default Register;
