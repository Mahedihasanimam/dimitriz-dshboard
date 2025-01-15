import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import React from "react";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import { Provider } from "react-redux";
import store from "./redux/store";
import Providers from "./lib/Providers";

const rootElement = document.getElementById("root");

if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      {/* Redux Provider should wrap everything that uses the Redux store */}
      <Providers>

          <App />
      </Providers>
     
    </StrictMode>
  );
} else {
  console.error("Root element not found.");
}
