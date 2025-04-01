import App from "./App";
import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import { TimerProvider } from "./context/TimerContext";
import "./styles.css";

createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <TimerProvider>
      <App />
    </TimerProvider>
  </StrictMode>
);
