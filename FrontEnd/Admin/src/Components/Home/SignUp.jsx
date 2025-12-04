import React, { useState } from "react";
import { User, Mail, Lock, Eye, EyeOff, Phone } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { ToastContainer, toast } from "react-toastify";
import api from "../../../Utils/axios";

// ------------------------
// 🔹 ZOD VALIDATION SCHEMA
// ------------------------
const SignUpSchema = z.object({
  userName: z.string().min(3, "Username must be at least 3 characters long"),

  email: z.string().email("Enter a valid email"),

  phone: z.string().regex(/^[0-9]{10}$/, "Enter a valid 10-digit phone number"),

  password: z.string().min(6, "Password must be at least 6 characters"),
});

function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(SignUpSchema),
  });

  const onSubmit = async (data) => {
    setIsLoading(true);

    try {
      const res = await api.post("/signup", data, { withCredentials: true });

      toast.success("Register Successfully!");
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }

    setIsLoading(false);
  };

  const inputClasses =
    "w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50/80 backdrop-blur-sm border border-gray-200/50 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition placeholder-gray-400";

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-emerald-50 via-green-100 to-teal-200">
      <ToastContainer position="top-center" autoClose={3000} />

      <div className="relative flex justify-center items-center min-h-screen p-6">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full mb-6 shadow-xl">
              <User className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-700">Create Account</h1>
            <p className="text-gray-600">
              Join us today and start your journey
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white/70 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-white/30"
          >
            <div className="space-y-6">
              {/* Username */}
              <div>
                <label className="text-sm font-bold">Username</label>
                <div className="relative">
                  <User className="absolute left-3 top-3 text-gray-400" />
                  <input
                    {...register("userName")}
                    placeholder="Enter your username"
                    className={inputClasses}
                  />
                </div>
                {errors.userName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.userName.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="text-sm font-bold">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 text-gray-400" />
                  <input
                    {...register("email")}
                    type="email"
                    placeholder="Enter your email"
                    className={inputClasses}
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="text-sm font-bold">Phone</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 text-gray-400" />
                  <input
                    {...register("phone")}
                    placeholder="Enter your phone number"
                    className={inputClasses}
                  />
                </div>
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.phone.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div>
                <label className="text-sm font-bold">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 text-gray-400" />

                  <input
                    {...register("password")}
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a strong password"
                    className={`${inputClasses} pr-12`}
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3"
                  >
                    {showPassword ? <EyeOff /> : <Eye />}
                  </button>
                </div>

                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-3 mt-4 rounded-xl font-bold text-white text-lg transition ${
                  isLoading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-emerald-500 to-teal-600 hover:scale-105"
                }`}
              >
                {isLoading ? "Creating Account..." : "Create Account"}
              </button>
            </div>
          </form>

          <p className="text-center mt-4 text-sm text-gray-600">
            Already have an account?{" "}
            <button
              onClick={() => navigate("/login")}
              className="font-semibold text-emerald-600 hover:underline"
            >
              Sign In
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
