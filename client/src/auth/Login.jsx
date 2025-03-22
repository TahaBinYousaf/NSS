import { useState } from "react";
import PropTypes from "prop-types"; // ✅ Import PropTypes
import Image1 from "../assets/logo.png";
import axios from "axios";

export default function Login({ modalTypeSet }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function login() {
    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      if (response?.data) {
        console.log("✅ Login Successful:", response.data);

        const { user, token } = response.data;

        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", token);

        modalTypeSet("");

        window.location.reload();
      }
    } catch (err) {
      console.error("❌ Login Error:", err.response?.data?.message || err.message);
      setError(err.response?.data?.message || "Login failed. Please try again.");
    }
  }

  return (
    <div className="fixed inset-0 z-50 backdrop-blur-md flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-[400px] shadow-lg relative mx-4">
        <button
          onClick={() => modalTypeSet("")}
          className="absolute top-4 font-bold cursor-pointer right-4 text-3xl"
        >
          &times;
        </button>

        <div className="flex justify-center mb-4">
          <img src={Image1} alt="Logo" className="w-14 md:w-18 object-contain" />
        </div>

        <h2 className="text-center text-xl font-semibold text-gray-800">
          Login into your account
        </h2>

        {error && <p className="text-center text-red-500 mt-2">{error}</p>}

        <div className="space-y-1 mt-5">
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="Enter your email"
          />
        </div>

        <div className="space-y-1 mt-3">
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="Enter your password"
          />
        </div>

        <p
          onClick={() => modalTypeSet("Forget")}
          className="text-center my-3 text-md cursor-pointer underline"
        >
          Forgot Password?
        </p>

        <button onClick={login} className="w-full cursor-pointer bg-black text-white rounded-full py-2">
          Login
        </button>

        <p
          onClick={() => modalTypeSet("Signup")}
          className="text-center text-sm mt-4 cursor-pointer hover:underline"
        >
          New to NSS? Create an account
        </p>
      </div>
    </div>
  );
}

// ✅ Add PropTypes validation
Login.propTypes = {
  modalTypeSet: PropTypes.func.isRequired, // Ensures modalTypeSet is a required function
};
