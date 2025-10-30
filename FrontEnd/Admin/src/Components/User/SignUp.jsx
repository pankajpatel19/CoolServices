import React, { useState } from "react";
import { User, Mail, Lock, Eye, EyeOff, Sparkles, Phone } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import api from "../../../Utils/axios";

function SignUp() {
  const [form, setRegData] = useState({
    userName: "",
    email: "",
    phone: "",
    password: "",
    userrole: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState(null);

  const navigate = useNavigate();

  const handlechange = (e) => {
    setRegData({ ...form, [e.target.name]: e.target.value });
  };

  const handleform = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await api.post("/signup", form, {
        withCredentials: true,
      });

      navigate("/login");
      toast.success("register SuccessFullly");
    } catch (error) {
      setIsLoading(false);

      toast.error(error.response.data.message);
    }

    if (!form) {
      return <h1>Please Wait!!!!</h1>;
    }
  };

  const inputClasses =
    "w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50/80 backdrop-blur-sm border border-gray-200/50 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all duration-300 hover:bg-gray-100/80 hover:shadow-sm placeholder-gray-400";

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-emerald-50 via-green-100 to-teal-200 overflow-hidden">
      {/* Animated background elements */}
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
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -left-20 w-80 h-80 bg-gradient-to-r from-emerald-300/30 to-green-400/30 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute -bottom-20 -right-20 w-80 h-80 bg-gradient-to-r from-teal-300/30 to-emerald-400/30 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-green-200/20 to-teal-300/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "0.5s" }}
        ></div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-bounce opacity-20"
            style={{
              left: `${20 + i * 15}%`,
              top: `${10 + i * 10}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + i * 0.5}s`,
            }}
          >
            <Sparkles className="w-4 h-4 text-emerald-400" />
          </div>
        ))}
      </div>

      {/* Notification */}
      {notification && (
        <div
          className={`fixed top-6 right-6 z-50 px-6 py-3 rounded-lg shadow-lg backdrop-blur-sm transform transition-all duration-300 ${
            notification.type === "success"
              ? "bg-green-500/90 text-white"
              : "bg-red-500/90 text-white"
          }`}
        >
          <div className="flex items-center gap-2">
            <div
              className={`w-2 h-2 rounded-full ${
                notification.type === "success" ? "bg-green-200" : "bg-red-200"
              }`}
            ></div>
            {notification.message}
          </div>
        </div>
      )}

      <div className="relative flex justify-center items-center min-h-screen p-6">
        <div className="w-full max-w-md transform transition-all duration-500 hover:scale-[1.02]">
          {/* Header */}
          <div className="text-center mb-8 animate-fade-in">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full mb-6 shadow-2xl shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all duration-300">
              <User className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-3">
              Create Account
            </h1>
            <p className="text-gray-600 font-medium">
              Join us today and start your journey
            </p>
          </div>
          {/* Form Card */}
          <div className="bg-white/70 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-white/30 hover:shadow-3xl hover:bg-white/80 transition-all duration-500 relative overflow-hidden">
            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-3xl"></div>

            <div className="relative space-y-6">
              {/* Username Field */}
              <div className="group">
                <label
                  htmlFor="username"
                  className="block text-sm font-bold text-gray-700 mb-3 group-hover:text-emerald-600 transition-colors duration-200"
                >
                  Username
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400 group-focus-within:text-emerald-500 transition-colors duration-300" />
                  </div>
                  <input
                    type="text"
                    name="userName"
                    id="username"
                    value={form.username}
                    onChange={handlechange}
                    placeholder="Enter your username"
                    required
                    className={inputClasses}
                  />
                  <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 scale-x-0 group-focus-within:scale-x-100 transition-transform duration-300 origin-left"></div>
                </div>
              </div>

              {/* Email Field */}
              <div className="group">
                <label
                  htmlFor="email"
                  className="block text-sm font-bold text-gray-700 mb-3 group-hover:text-emerald-600 transition-colors duration-200"
                >
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-emerald-500 transition-colors duration-300" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={form.email}
                    onChange={handlechange}
                    placeholder="Enter your email address"
                    required
                    className={inputClasses}
                  />
                  <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 scale-x-0 group-focus-within:scale-x-100 transition-transform duration-300 origin-left"></div>
                </div>
              </div>
              <div className="group">
                <label
                  htmlFor="username"
                  className="block text-sm font-bold text-gray-700 mb-3 group-hover:text-emerald-600 transition-colors duration-200"
                >
                  Phone
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone className="h-5 w-5 text-gray-400 group-focus-within:text-emerald-500 transition-colors duration-300" />
                  </div>
                  <input
                    type="text"
                    name="phone"
                    id="username"
                    value={form.phone}
                    onChange={handlechange}
                    placeholder="Enter your username"
                    required
                    className={inputClasses}
                  />
                  <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 scale-x-0 group-focus-within:scale-x-100 transition-transform duration-300 origin-left"></div>
                </div>
              </div>

              {/* Password Field */}
              <div className="group">
                <label
                  htmlFor="password"
                  className="block text-sm font-bold text-gray-700 mb-3 group-hover:text-emerald-600 transition-colors duration-200"
                >
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-emerald-500 transition-colors duration-300" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    id="password"
                    value={form.password}
                    onChange={handlechange}
                    placeholder="Create a strong password"
                    required
                    className={`${inputClasses} pr-12`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-emerald-600 transition-colors duration-200"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                  <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 scale-x-0 group-focus-within:scale-x-100 transition-transform duration-300 origin-left"></div>
                </div>
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
                </select>
              </div>
              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="button"
                  onClick={handleform}
                  disabled={isLoading}
                  className={`w-full py-4 px-6 rounded-xl font-bold text-white text-lg shadow-xl relative overflow-hidden group transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] ${
                    isLoading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 shadow-emerald-500/25 hover:shadow-emerald-500/40"
                  }`}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  <span className="relative flex items-center justify-center gap-2">
                    {isLoading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Creating Account...
                      </>
                    ) : (
                      <>
                        <User className="w-5 h-5" />
                        Create Account
                      </>
                    )}
                  </span>
                </button>
              </div>

              {/* Additional Info */}
              <div className="text-center pt-4">
                <p className="text-sm text-gray-600">
                  Already have an account?{" "}
                  <button
                    onClick={() => navigate("/login")}
                    className="font-semibold text-emerald-600 hover:text-emerald-700 hover:underline transition-all duration-200"
                  >
                    Sign In
                  </button>
                </p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-8">
            <p className="text-sm text-gray-500/80">
              By creating an account, you agree to our{" "}
              <span className="text-emerald-600 hover:underline cursor-pointer font-medium">
                Terms of Service
              </span>{" "}
              and{" "}
              <span className="text-emerald-600 hover:underline cursor-pointer font-medium">
                Privacy Policy
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
