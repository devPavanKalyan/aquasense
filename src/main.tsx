import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import { AuthProvider } from "./context/AuthContext.tsx";
import { ScrollProvider } from "./context/ScrollContext.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ScrollProvider>
          <App />
        </ScrollProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
