import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./app/App";
import "./index.css";
import { SnackbarProvider } from "./components/providers/SnackbarProvider";
import { LoadingProvider } from "./components/providers/LoadingProvider";
import { ModalProvider } from "./components/providers/ModalProvider";

import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <LoadingProvider>
        <SnackbarProvider>
          <ModalProvider>
            <App />
          </ModalProvider>
        </SnackbarProvider>
      </LoadingProvider>
    </BrowserRouter>
  </StrictMode>
);
