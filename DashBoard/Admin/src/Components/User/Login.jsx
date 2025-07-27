import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
//
import { motion } from "framer-motion";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [form, setform] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handlechange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  const handleform = async (e) => {
    e.preventDefault();

    try {
      const data = await axios.post("http://localhost:1916/login", form, {
        withCredentials: true,
      });
      localStorage.setItem("token", data.data.token);
      if (data.data.role == "user") {
        navigate("/");
      } else {
        navigate("/showbooking");
      }
      toast.success("login SuccessFullly");
    } catch (error) {
      console.log(error);
      toast.error("invalid UserName And Password");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-green-100 via-green-200 to-green-300 fixed">
      <ToastContainer position="top-center" />
      <motion.form
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 80, duration: 0.8 }}
        className="p-8 rounded-2xl shadow-2xl bg-white w-96"
        onSubmit={handleform}
      >
        <motion.h1
          className="text-4xl text-green-600 text-center font-bold font-serif mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          Sign In
        </motion.h1>

        <motion.div
          className="mb-6 font-serif"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <label
            htmlFor="username"
            className="block text-gray-700 text-sm mb-2"
          >
            UserName
          </label>
          <input
            type="text"
            placeholder="Enter UserName"
            name="username"
            value={form.username}
            onChange={handlechange}
            className="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </motion.div>

        <motion.div
          className="mb-6 font-serif"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7 }}
        >
          <label
            htmlFor="password"
            className="block text-gray-700 text-sm mb-2"
          >
            PassWord
          </label>
          <input
            type="password"
            placeholder="Enter Password"
            name="password"
            value={form.password}
            onChange={handlechange}
            className="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </motion.div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-4 w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-xl shadow-md transition duration-300"
        >
          Login
        </motion.button>
      </motion.form>
    </div>
  );
}

export default Login;
