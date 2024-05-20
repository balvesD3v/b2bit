import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import Profile from "./components/Profile/index.tsx";
import Login from "./components/Login.tsx/index.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* <Login /> */}
    <Profile />
  </React.StrictMode>
);
