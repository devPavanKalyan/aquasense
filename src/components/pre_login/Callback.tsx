// Callback.tsx
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Callback: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  useEffect(() => {
    // Extract URL parameters.
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    // const returnedState = params.get("state");

    // Retrieve PKCE parameters stored earlier (e.g., during login initiation)
    // const expectedState = sessionStorage.getItem("pkce_state") || "";
    const codeVerifier: string = sessionStorage.getItem("pkce_verifier") || "";

    // Async function to exchange the code and code verifier for tokens.

    if (!codeVerifier || !code) {
      return;
    }
    const exchangeCodeForToken = async () => {
      console.log("Code verifier", codeVerifier);
      try {
        const response = await fetch(
          "http://localhost:9091/api/login/oauth/token",
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
        navigate("/", {
          replace: true
        });
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

export default Callback;
