import { Route, Routes } from "react-router-dom";
import Login from "../components/Login.tsx";

export function LoginRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
    </Routes>
  );
}
