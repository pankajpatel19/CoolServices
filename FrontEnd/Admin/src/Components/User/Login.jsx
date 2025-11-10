import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import { motion } from "framer-motion";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../../../Utils/axios";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const [form, setform] = useState({ phone: "", password: "", userrole: "" });

  const handlechange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  const handleform = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/login", form, {
        withCredentials: true,
      });
      let { token, role, user } = res.data;
      console.log(res);

      localStorage.setItem("token", token);

      localStorage.setItem("user", JSON.stringify({ ...user, role }));

      let redirect = location.state?.from?.pathname;

      if (!redirect) {
        if (role === "customer") {
          redirect = "/Home";
        } else if (role === "technician") {
          redirect = "/techhome";
        } else if (role === "admin") {
          redirect = "/admin/showbooking";
        }
      }

      navigate(redirect, { replace: true });
      window.location.reload();

      toast.success("login SuccessFullly");
    } catch (error) {
      console.log(error);

      toast.error(error.response.data.message);
    }

    if (!form) {
      return <h1>Please Wait!!!!</h1>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex justify-center items-center p-4">
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick={true}
        pauseOnHover={true}
        toastClassName="!bg-white !border !border-gray-200 !shadow-lg !rounded-lg"
        bodyClassName="!text-sm !font-medium"
        progressClassName="!bg-blue-500"
      />

      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, duration: 0.6 }}
        className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 w-full max-w-md"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-6 h-6 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Welcome Back
          </h1>
          <p className="text-gray-600 text-sm">
            Please sign in to your account
          </p>
        </div>

        <form onSubmit={handleform} className="space-y-6">
          {/* Email Field */}
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Phone
            </label>
            <input
              type="number"
              placeholder="Enter your phone Number"
              name="phone"
              min={10}
              value={form.name}
              onChange={handlechange}
              className="w-100 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
            />
          </div>

          {/* Password Field */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              name="password"
              value={form.password}
              onChange={handlechange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
            />
          </div>
          <div>
            <select
              name="userrole"
              value={form.userrole}
              onChange={handlechange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 appearance-none cursor-pointer"
            >
              <option value="">Select Role </option>
              <option value="customer">Customer</option>
              <option value="technician">Technician</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
              />
            </svg>
            Sign In
          </button>
        </form>

        {/* Footer */}
        <div className="mt-6 text-center text-sm text-gray-600">
          <button
            className="text-blue-600 hover:text-blue-700 font-medium ml-1"
            onClick={() => navigate("/forget-password")}
          >
            Forget Password
          </button>
        </div>
        <div className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?
          <button
            className="text-blue-600 hover:text-blue-700 font-medium ml-1"
            onClick={() => navigate("/signup")}
          >
            Sign up
          </button>
        </div>
        {/* <hr style={{ marginTop: "10px", opacity: "0.2" }} />
        <div className="place-items-center">
          <a href="http://localhost:10000/auth/google">
            <i className="fa-brands fa-google"></i>
          </a>
        </div> */}
      </motion.div>
    </div>
  );
}

export default Login;
