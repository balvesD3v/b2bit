import { Route, Routes } from "react-router-dom";
import Profile from "../components/Profile/index.tsx";

export function ProfileRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Profile />} />
    </Routes>
  );
}
