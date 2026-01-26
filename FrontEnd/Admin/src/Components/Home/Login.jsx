import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import api from "../../../Utils/axios";

// -------------------------
// ZOD SCHEMA
// -------------------------
const loginSchema = z.object({
  phone: z
    .string()
    .min(10, "Phone must be 10 digits")
    .max(10, "Phone must be 10 digits"),
  password: z.string().min(4, "Password is required"),
  userrole: z.enum(["customer", "technician", "admin"], {
    errorMap: () => ({ message: "Role is required" }),
  }),
});

function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { phone: "", password: "", userrole: "" },
  });

  const onSubmit = async (data) => {
    try {
      const res = await api.post("/login", data, { withCredentials: true });

      const { role, user } = res.data;
      console.log(role);
      localStorage.setItem("user", JSON.stringify({ user, role }));
      toast.success("Login Successfully");

      let redirect = location.state?.from?.pathname;
      if (!redirect) {
        redirect =
          role === "customer"
            ? "/Home"
            : role === "technician"
              ? "/techhome"
              : "/admin/showbooking";
      }

      navigate(redirect, { replace: true });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex justify-center items-center p-4">
      <ToastContainer position="top-center" autoClose={3000} />

      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100 }}
        className="bg-white p-8 rounded-xl shadow-lg  w-full max-w-md"
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

        {/* FORM */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Phone */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Phone
            </label>
            <input
              type="text"
              placeholder="Enter your phone number"
              {...register("phone")}
              className="w-full px-4 py-3  rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">
                {errors.phone.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              {...register("password")}
              className="w-full px-4 py-3  rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Role */}
          <div>
            <select
              {...register("userrole")}
              className="w-full px-3 py-3  rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Role</option>
              <option value="customer">Customer</option>
              <option value="technician">Technician</option>
              <option value="admin">Admin</option>
            </select>

            {errors.userrole && (
              <p className="text-red-500 text-sm mt-1">
                {errors.userrole.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg flex items-center justify-center"
          >
            {isSubmitting ? "Processing..." : "Sign In"}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-6 text-center text-sm text-gray-600">
          <button
            className="text-blue-600 hover:text-blue-700 font-medium"
            onClick={() => navigate("/forget-password")}
          >
            Forget Password?
          </button>
        </div>
        <div className="mt-4 text-center text-sm text-gray-600">
          Don't have an account?
          <button
            className="text-blue-600 hover:text-blue-700 font-medium ml-1"
            onClick={() => navigate("/signup")}
          >
            Sign up
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export default Login;
