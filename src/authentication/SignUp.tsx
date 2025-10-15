import { CheckCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/fragments/Footer";
import { preparePkceAndRedirect } from "../utils/authRedirects";

const SignUpPage = () => {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    termsAccepted: false
  });

  const [pkceReady, setPkceReady] = useState(false);

  useEffect(() => {
    const prepare = async () => {
      await preparePkceAndRedirect(false);
      setPkceReady(true);
    };
    prepare();
  }, []);

  const handleLogin = () => {
    preparePkceAndRedirect(true); 
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const val = type === "checkbox" ? checked : value;
    setForm((prev) => ({ ...prev, [name]: val }));
  };

  const isValidEmail = (email: string) => /.+@.+\..+/.test(email);
  const isValidName = (name: string) => name.trim().length > 2;

  const isFormValid = isValidName(form.fullName) && isValidEmail(form.email);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;
    alert("Verification link or OTP sent to email");
  };

  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gray-100 px-6 py-8">
      <div
        onClick={() => navigate("/")}
        className="fixed left-5 top-5 text-white h-10 w-30 bg-blue-600 rounded flex items-center justify-center cursor-pointer hover:bg-gray-800 transition"
      >
        Back to Home
      </div>

      <div className="flex justify-center px-10">
        <div
          onClick={() => navigate("/")}
          className="fixed left-5 top-5 text-white h-10 w-30 bg-blue-600 rounded flex items-center justify-center cursor-pointer hover:bg-gray-800 transition"
        >
          Back to Home
        </div>
        <div className="w-full max-w-[900px] bg-white shadow-xl rounded-xl flex flex-col md:flex-row overflow-hidden">
          <div className="hidden md:flex w-full md:w-1/2 bg-gradient-to-br from-sky-600 to-cyan-600 items-center justify-center relative p-4">
            <div className="absolute w-40 h-40 bg-white/10 rounded-full animate-pulse blur-3xl top-10 left-10"></div>
            <div className="absolute w-60 h-60 bg-white/20 rounded-full animate-spin-slow blur-2xl bottom-0 right-0"></div>
            <div className="text-white text-center z-10 px-4">
              <h2 className="text-2xl font-semibold mb-2 break-words">
                Water Quality Analytics
              </h2>
              <p className="text-sm break-words">
                Real-time insights powered by Data Science, AI & IoT
              </p>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="w-full md:w-1/2 bg-gray-50 p-6 sm:p-8 flex flex-col justify-center min-w-0"
          >
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6 text-center sm:text-left flex flex-col sm:flex-row items-center sm:items-start gap-1">
              Sign Up for{" "}
              <div
                onClick={() => navigate("/")}
                className="flex items-center cursor-pointer text-3xl font-extrabold text-[#4B0082] transition-colors"
                style={{ fontFamily: "'Pacifico', cursive" }}
              >
                AquaSense
              </div>
            </h1>

            <div className="space-y-5">
              <div>
                <label className="block text-gray-700 font-medium mb-1 text-sm sm:text-base">
                  What should we call you?
                </label>
                <p className="text-xs text-gray-500 mb-2 break-words">
                  Choose a name for your AquaSense account. You can change it
                  later.
                </p>
                <div className="relative">
                  <input
                    name="fullName"
                    type="text"
                    value={form.fullName}
                    onChange={handleChange}
                    placeholder="Your name"
                    className="w-full min-w-0 border border-gray-300 px-3 py-2 rounded-md text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                  {isValidName(form.fullName) && (
                    <CheckCircle
                      className="absolute right-2 top-2 text-green-500"
                      size={16}
                    />
                  )}
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1 text-sm sm:text-base">
                  Email
                </label>
                <p className="text-xs text-gray-500 mb-2 break-words">
                  Used for recovery and as described in the AquaSense Privacy
                  Notice.
                </p>
                <div className="relative">
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="w-full min-w-0 border border-gray-300 px-3 py-2 rounded-md text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                  {isValidEmail(form.email) && (
                    <CheckCircle
                      className="absolute right-2 top-2 text-green-500"
                      size={16}
                    />
                  )}
                </div>
              </div>

              <div>
                <input
                  type="submit"
                  value="Verify email address"
                  disabled={!isFormValid}
                  className={`w-full text-white py-2.5 px-4 rounded-md text-sm font-semibold transition-all duration-300 ${
                    isFormValid
                      ? "bg-blue-600 hover:bg-blue-700"
                      : "bg-gray-400 cursor-not-allowed"
                  }`}
                />
              </div>
            </div>

            <div className="flex items-center my-6">
              <hr className="flex-grow border-gray-300" />
              <span className="mx-2 text-gray-500 text-sm font-medium">OR</span>
              <hr className="flex-grow border-gray-300" />
            </div>

            <div className="text-center">
              <p className="text-sm text-gray-600 mb-2 font-medium">
                Sign in to an existing AquaSense account
              </p>
              <button
                type="button"
                className="inline-block bg-green-600 text-white font-semibold text-sm px-5 py-2 rounded-md hover:bg-green-700 transition duration-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                onClick={() => {
                  handleLogin;
                }}
                disabled={!pkceReady}
              >
                Sign In
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="flex justify-center mt-10 mb-4">
        <Footer />
      </div>
    </div>
  );
};

export default SignUpPage;
