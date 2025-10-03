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
        goToVerification();
      } else {
        console.error(response.data?.message || "Submission failed");
      }
    } catch (err) {
      console.error("Error submitting details", err);
    }
  };

  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div
        onClick={() => navigate("/")}
        className="fixed left-5 top-5 cursor-pointer text-2xl text-black 
             transition-transform duration-300 hover:scale-105"
        style={{ fontFamily: "'Pacifico', cursive" }}
      >
        AquaSense
      </div>

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

      {passwordSectionOpen && <PasswordSection isOpen={passwordSectionOpen} />}

      {captchaOpen && (
        <CaptchaModal
          isOpen={captchaOpen}
          onClose={goBackToRegisterForm}
          goToVerification={submitDetailsAfterCaptcha}
        />
      )}
    </div>
  );
};

export default Register;
