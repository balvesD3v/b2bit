import { useState } from "react";
import axios from "../../../axios-config";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface ErrorWithResponse extends Error {
  response?: {
    status: number;
  };
}

function LoginForm() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      if (!email || !password) {
        toast.error("Por favor, preencha todos os campos.");
        return;
      }

      const response = await axios.post(
        "/auth/login/",
        { email, password },
        {
          headers: {
            Accept: "application/json;version=v1_web",
            "Content-Type": "application/json",
          },
        }
      );

      const token = response.data.tokens.access;

      if (!token) {
        console.error("Token not found in response:", response.data);
      } else {
        localStorage.setItem("token", token);
        navigate("/profile");
        toast.success("Login bem sucedido!");
      }

      console.log("Login successful:", response.data);
      navigate("/profile");
    } catch (error) {
      console.error("Error:", error);

      const typedError = error as ErrorWithResponse;

      if (typedError.response && typedError.response.status === 401) {
        toast.error("E-mail ou senha incorretos. Por favor, tente novamente.");
      } else {
        console.error("An unknown error occurred");
      }
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="bg-white drop-shadow-2xl rounded-3xl w-[438px] h-auto mx-auto p-8">
        {/* Logo */}
        <div className="flex justify-center items-center mb-8">
          <svg
            width="309"
            height="94"
            viewBox="0 0 106 42"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17.1955 36C15.4243 36 13.845 35.6015 12.4575 34.8045C11.0701 34.0074 9.97784 32.9152 9.1808 31.5277V35.5572H4V6.00012H9.93356V16.4281C10.7601 15.0407 11.8376 13.9484 13.166 13.1514C14.524 12.3543 16.1033 11.9558 17.904 11.9558C19.9114 11.9558 21.6679 12.5167 23.1734 13.6385C24.7084 14.7307 25.904 16.192 26.7601 18.0222C27.6162 19.8525 28.0442 21.8599 28.0442 24.0444C28.0442 26.2879 27.5719 28.31 26.6272 30.1108C25.6826 31.9115 24.3837 33.3432 22.7306 34.4059C21.107 35.4687 19.262 36 17.1955 36ZM15.5572 30.9521C16.8265 30.9521 17.9335 30.6421 18.8782 30.0222C19.8524 29.4023 20.6051 28.5757 21.1365 27.5425C21.6974 26.4798 21.9778 25.3285 21.9778 24.0886C21.9778 22.8193 21.7121 21.6532 21.1808 20.5905C20.6789 19.4982 19.9704 18.6274 19.0553 17.978C18.1402 17.3285 17.0922 17.0038 15.9114 17.0038C14.6125 17.0038 13.417 17.4466 12.3247 18.3322C11.262 19.1883 10.4649 20.251 9.93356 21.5204V27.0554C10.3173 28.2067 11.0701 29.1514 12.1919 29.8894C13.3136 30.5978 14.4354 30.9521 15.5572 30.9521Z"
              fill="#02274F"
            />
            <path
              d="M27.524 35.5571C27.524 33.8154 27.7159 32.2656 28.0997 30.9076C28.513 29.5497 29.2215 28.3246 30.2251 27.2324C31.2288 26.1401 32.6458 25.0774 34.4761 24.0442C36.0997 23.1881 37.4576 22.4649 38.5499 21.8744C39.6421 21.284 40.4687 20.7232 41.0295 20.1918C41.62 19.6309 41.9152 18.9815 41.9152 18.2435C41.9152 17.3579 41.5609 16.6051 40.8524 15.9852C40.1439 15.3357 39.1403 15.011 37.8414 15.011C36.4244 15.011 35.1993 15.3505 34.1661 16.0294C33.1624 16.7084 32.2916 17.4907 31.5536 18.3763L27.7897 14.0368C28.3211 13.4759 29.1181 12.8708 30.1809 12.2213C31.2436 11.5719 32.513 11.011 33.989 10.5387C35.465 10.0664 37.0886 9.8302 38.8598 9.8302C41.8709 9.8302 44.203 10.5387 45.8561 11.9557C47.5388 13.3431 48.3801 15.1438 48.3801 17.3579C48.3801 18.7453 48.0554 19.9261 47.4059 20.9003C46.786 21.8449 46.0037 22.6567 45.0591 23.3357C44.1439 23.9851 43.2583 24.5608 42.4022 25.0626C40.5129 26.0073 39.0222 26.8338 37.9299 27.5423C36.8672 28.2508 36.0111 29.1364 35.3617 30.1992H48.8672V35.5571H27.524Z"
              fill="#02274F"
            />
            <path
              d="M64.2435 35.9999C62.4723 35.9999 60.893 35.6014 59.5055 34.8044C58.1181 34.0073 57.0258 32.9151 56.2288 31.5276V35.5571H51.048V6H56.9815V16.428C57.8081 15.0406 58.8856 13.9483 60.214 13.1513C61.5719 12.3542 63.1513 11.9557 64.952 11.9557C66.9594 11.9557 68.7158 12.5166 70.2214 13.6384C71.7564 14.7306 72.952 16.1919 73.8081 18.0221C74.6642 19.8524 75.0922 21.8597 75.0922 24.0442C75.0922 26.2878 74.6199 28.3099 73.6752 30.1106C72.7306 31.9114 71.4317 33.3431 69.7786 34.4058C68.1549 35.4686 66.3099 35.9999 64.2435 35.9999ZM62.6051 30.952C63.8745 30.952 64.9815 30.642 65.9262 30.0221C66.9003 29.4022 67.6531 28.5756 68.1845 27.5424C68.7453 26.4797 69.0258 25.3284 69.0258 24.0885C69.0258 22.8191 68.7601 21.6531 68.2287 20.5904C67.7269 19.4981 67.0184 18.6273 66.1033 17.9778C65.1882 17.3284 64.1402 17.0037 62.9594 17.0037C61.6605 17.0037 60.4649 17.4465 59.3727 18.3321C58.3099 19.1882 57.5129 20.2509 56.9815 21.5203V27.0553C57.3653 28.2066 58.1181 29.1512 59.2398 29.8892C60.3616 30.5977 61.4834 30.952 62.6051 30.952Z"
              fill="#02274F"
            />
            <path
              d="M77.3392 35.557V12.3541H83.2728V35.557H77.3392Z"
              fill="#FDCF00"
            />
            <path
              d="M101.964 34.3615C101.167 34.7158 100.178 35.07 98.9977 35.4243C97.8464 35.7785 96.6508 35.9556 95.4109 35.9556C94.3187 35.9556 93.315 35.7638 92.3999 35.38C91.4848 34.9962 90.7468 34.3911 90.1859 33.5645C89.6545 32.7084 89.3888 31.6014 89.3888 30.2435V16.9151H85.6416V12.3542H89.3888V6H95.3224V12.3542H100.193V16.9151H95.3224V28.2509C95.3224 29.0479 95.529 29.6236 95.9423 29.9778C96.3851 30.332 96.9165 30.5092 97.5364 30.5092C98.1563 30.5092 98.7615 30.4058 99.3519 30.1992C99.9423 29.9926 100.415 29.8154 100.769 29.6678L101.964 34.3615Z"
              fill="#FDCF00"
            />
          </svg>
        </div>

        {/* Formulário de login */}
        <form className="w-full">
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-display font-bold mb-2"
              htmlFor="email"
            >
              E-mail
            </label>
            <input
              className="bg-gray-100 appearance-none border rounded w-[385.88px] h-[54.25px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold font-display mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="bg-gray-100 appearance-none border rounded w-[385.88px] h-[54.25px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="****************"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-center">
            <button
              className="hover:bg-blue-700 bg-[#02274F] text-white font-bold py-2 px-4 rounded-lg w-[385.88px] h-[54px] focus:outline-none focus:shadow-outline"
              type="button"
              onClick={handleLogin}
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
