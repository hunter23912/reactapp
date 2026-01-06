import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.css";
// import Solution from "./components/solution.jsx";
// import Boxes from "./components/boxes.jsx";
import App from "./components/app.jsx";
createRoot(document.getElementById("root")).render(<App />);
