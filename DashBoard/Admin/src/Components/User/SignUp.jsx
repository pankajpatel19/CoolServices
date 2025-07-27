import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const navigate = useNavigate();
  const [form, setRegData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handlechange = (e) => {
    setRegData({ ...form, [e.target.name]: e.target.value });
  };

  const handleform = async (e) => {
    e.preventDefault();
    try {
      const data = await axios.post(
        "https://coolservices.onrender.com/signup",
        form,
        {
          withCredentials: true,
        }
      );

      toast.success("User Registered SuccessFully");
      setError("");
      navigate("/login");
    } catch (error) {
      if (error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error(error);
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-green-200 via-green-300 to-green-400 font-serif">
      <ToastContainer position="top-center" />
      <motion.form
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 10 }}
        onSubmit={handleform}
        className="w-full max-w-md bg-white p-8 rounded-3xl shadow-2xl fixed"
      >
        <h1 className="text-4xl font-bold text-center text-green-600 mb-6">
          Sign Up
        </h1>

        <div className="mb-5">
          <label htmlFor="username" className="block text-gray-700 mb-2">
            Username
          </label>
          <input
            type="text"
            name="username"
            id="username"
            value={form.username}
            onChange={handlechange}
            placeholder="Enter your username"
            className="w-full px-4 py-2 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-400 transition-all duration-300"
          />
        </div>

        <div className="mb-5">
          <label htmlFor="email" className="block text-gray-700 mb-2">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={form.email}
            onChange={handlechange}
            placeholder="Enter your email"
            className="w-full px-4 py-2 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-400 transition-all duration-300"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700 mb-2">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            value={form.password}
            onChange={handlechange}
            placeholder="Enter your password"
            className="w-full px-4 py-2 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-400 transition-all duration-300"
          />
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="w-full py-2 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition-colors duration-300"
        >
          Create Account
        </motion.button>
      </motion.form>
    </div>
  );
}

export default SignUp;
