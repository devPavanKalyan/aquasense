import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Console = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Step 1: Parse the fragment after the '#' in URL
    const fragment = new URLSearchParams(window.location.hash.substring(1));
    const token = fragment.get("access_token");

    if (token) {
      // Step 2: Store the token securely in localStorage
      localStorage.setItem("access_token", token);

      // Step 3: Remove token from URL for a clean UI
      window.history.replaceState(null, "", "/console");
    } else {
      // If token isn't in URL and not in localStorage, redirect to login
      const storedToken = localStorage.getItem("access_token");
      if (!storedToken) {
        alert("Access token missing. Please login.");
        navigate("/login");
      }
    }
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center text-gray-900">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold">Welcome to the Console</h1>
        <p className="text-gray-600">You are logged in with PKCE flow 🔐</p>
      </div>
    </div>
  );
};

export default Console;
