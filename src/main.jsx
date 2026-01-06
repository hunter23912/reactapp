import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import "./index.css";
import "bootstrap/dist/css/bootstrap.css";
import Solution from "./components/solution.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Solution />
  </StrictMode>
);
