import { useState } from "react";
import Image1 from "../assets/logo.png";
import axios from "axios";

export default function Login({ modalTypeSet }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function login() {
    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", { email, password });
      if (response?.data) {
        console.log(response.data);
      }
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div className="fixed inset-0 z-50 backdrop-blur-md flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-[400px] shadow-lg relative mx-4">
        <button onClick={() => modalTypeSet("")} className="absolute top-4 font-bold cursor-pointer right-4 text-3xl">
          &times;
        </button>

        <div className="flex justify-center mb-4">
          <img src={Image1} alt="Logo" className="w-14 md:w-18 object-contain" />
        </div>

        <h2 className="text-center text-xl font-semibold text-gray-800">Login into your account</h2>
        <div className="space-y-1 mt-5">
          <input
            type="text"
            id="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="Enter your email"
          />
        </div>

        <div className="space-y-1 mt-3">
          <input
            type="password"
            id="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="Enter your password"
          />
        </div>

        <p onClick={() => modalTypeSet("Forget")} className="text-center my-3 text-md cursor-pointer underline">
          Forgot Password?
        </p>

        <button onClick={login} className="w-full cursor-pointer bg-black text-white rounded-full py-2">
          Login
        </button>

        {/* <div className="mt-6 space-y-3">
          <div className="flex items-center my-3">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="px-3 text-gray-500">OR</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          <button className="w-full flex items-center justify-center gap-2 border border-gray-400 rounded-full py-2 cursor-pointer transition">
            <FaApple className="text-xl" />
            Continue with Apple
          </button>
          <button className="w-full flex items-center justify-center gap-2 border border-gray-400 rounded-full py-2 cursor-pointer">
            <FaGoogle className="text-xl" />
            Continue with Google
          </button>
        </div> */}

        <p onClick={() => modalTypeSet("Signup")} className="text-center text-sm mt-4 cursor-pointer hover:underline">
          New to NSS? Create an account
        </p>
      </div>
    </div>
  );
}
