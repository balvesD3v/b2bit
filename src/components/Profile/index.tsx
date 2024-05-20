import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../../axios-config";

export default function Profile() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({ name: "", email: "" });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          navigate("/");
          return;
        }

        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json;version=v1_web",
          },
        };

        const response = await axios.get("/auth/profile", config);

        setUserData({
          name: response.data.name,
          email: response.data.email,
        });

        navigate("/profile");
      } catch (error) {
        console.error("Error fetching user data:", error);
        navigate("/");
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");

    navigate("/");
  };

  return (
    <div className="h-screen flex flex-col">
      <header className="bg-white py-4">
        <div className="container mx-auto flex justify-between items-center">
          <button
            onClick={handleLogout}
            className="hover:bg-blue-700 bg-[#02274F] w-[272px] h-[44px] text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline ml-auto"
          >
            Logout
          </button>
        </div>
      </header>

      <div className="flex flex-grow items-center justify-center bg-gray-100">
        <div className="bg-white shadow-lg w-[438px] mx-auto p-8 rounded-3xl mb-[95px]">
          <div className="flex flex-col items-center mb-8">
            <h2 className="text-gray-700 text-lg font-semibold mb-4">
              Profile Picture
            </h2>

            <div className="flex justify-center">
              <img
                src="https://images.unsplash.com/photo-1628157588553-5eeea00af15c?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Foto do Usuário"
                className="w-[75px] h-auto rounded-xl"
              />
            </div>
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-[14px] font-display font-bold mb-2"
              htmlFor="email"
            >
              Your <strong>Name</strong>
            </label>
            <input
              className="bg-gray-100 appearance-none border rounded w-[385.88px] h-[54.25px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Christine James"
              value={userData.name}
              readOnly
            />
          </div>

          <div className="mb-6">
            <label
              className="block text-gray-700 text-[14px] font-display font-bold mb-2"
              htmlFor="email"
            >
              Your <strong>E-mail</strong>
            </label>
            <input
              className="bg-gray-100 appearance-none border rounded w-[385.88px] h-[54.25px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="christinejames@gmail.com"
              value={userData.email}
              readOnly
            />
          </div>
        </div>
      </div>
    </div>
  );
}
