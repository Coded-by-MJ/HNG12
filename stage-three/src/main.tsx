import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ToastContainer } from "react-toastify";

import "./index.css";

import App from "./App.tsx";
import AppProvider from "./provider/ContextProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppProvider>
      <App />
      <ToastContainer />
    </AppProvider>
  </StrictMode>
);
