// Callback.tsx
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const CallbackBackend: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  useEffect(() => {
    // Extract URL parameters.
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    const codeVerifier = params.get("code_verifier");

    // Validate the presence of required parameters.
    if (!code || !codeVerifier) {
      alert("Invalid or missing PKCE flow parameters.");
      return;
    }

    // Async function to exchange the code and code verifier for tokens.
    const exchangeCodeForToken = async () => {
      try {
        const response = await fetch(
          "http://localhost:9090/api/login/oauth/token",
          {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({
              code,
              code_verifier: codeVerifier
            })
          }
        );

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error("Token exchange failed: " + errorText);
        }

        const tokenData = await response.json();
        console.log("Token exchange successful, tokenData:", tokenData);

        // Call the login function with the full token response.
        // The tokenData object must include: access_token, refresh_token, and user.
        login(tokenData);

        // Optionally, remove PKCE values from sessionStorage.
        sessionStorage.removeItem("pkce_state");
        sessionStorage.removeItem("pkce_verifier");

        // Navigate to the protected dashboard page.
        navigate("/");
      } catch (error) {
        console.error("Token exchange error:", error);
        alert("Something went wrong during login.");
      }
    };

    exchangeCodeForToken();
  }, [navigate, login]);

  return (
    <div className="flex items-center justify-center min-h-screen text-gray-800">
      Processing login...
    </div>
  );
};

export default CallbackBackend;
