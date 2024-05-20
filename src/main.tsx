import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import { RoutesIndex } from "./routes/index.tsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RoutesIndex />
    <ToastContainer theme="colored" />
  </React.StrictMode>
);
