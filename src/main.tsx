import App from "./App";
import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import "./styles.css";

createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <App />
  </StrictMode>
);
