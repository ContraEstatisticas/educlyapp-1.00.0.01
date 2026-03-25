import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./global.css";
import "./i18n";

if (typeof document !== "undefined") {
  createRoot(document.getElementById("root")!).render(<App />);
}
