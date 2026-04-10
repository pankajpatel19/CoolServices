import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  LayoutDashboard,
  Calendar,
  Clock,
  Zap,
  CheckCircle2,
  ArrowRight,
  Shield,
  Star,
} from "lucide-react";

function TechnicianHomePage() {
  const [technicianData, setTechnicianData] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setTechnicianData(user);
    }
    setIsLoaded(true);
  }, []);

  if (!isLoaded) return null;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl -mr-48 -mt-48 animate-pulse"></div>
      <div
        className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-400/10 rounded-full blur-3xl -ml-48 -mb-48 animate-pulse"
        style={{ animationDelay: "2s" }}
      ></div>

      {/* Header */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-white/40 shadow-sm"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
                className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg"
              >
                <Shield className="w-6 h-6" />
              </motion.div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent">
                Technician Portal
              </h1>
            </div>
            {technicianData && (
              <div className="flex items-center space-x-3 bg-white/50 px-3 py-1.5 rounded-full border border-white/60">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-sm">
                  {technicianData.userName?.charAt(0)}
                </div>
                <span className="text-sm font-medium text-gray-700 hidden sm:block">
                  {technicianData.userName}
                </span>
              </div>
            )}
          </div>
        </div>
      </motion.nav>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 py-12 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-12"
        >
          {/* Welcome Hero Card */}
          <motion.div
            variants={itemVariants}
            className="bg-white/90 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/40 overflow-hidden"
          >
            <div className="md:flex">
              <div className="md:w-1/3 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 p-10 flex flex-col items-center justify-center text-white">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", damping: 12, delay: 0.5 }}
                  className="w-32 h-32 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-5xl font-bold mb-6 border-4 border-white/30 shadow-2xl"
                >
                  {technicianData?.userName?.charAt(0)}
                </motion.div>
                <h2 className="text-2xl font-bold mb-1 opacity-90">
                  Welcome Back
                </h2>
                <p className="text-blue-100 text-center font-medium">
                  #{technicianData?._id?.slice(-6)}
                </p>
              </div>

              <div className="md:w-2/3 p-10 space-y-8">
                <div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-2">
                    Hello,{" "}
                    <span className="text-blue-600">
                      {technicianData?.userName}
                    </span>
                    !
                  </h3>
                  <p className="text-gray-500 font-medium italic">
                    We're glad to have you back on duty today.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center p-4 bg-slate-50 rounded-2xl border border-slate-100 group hover:border-blue-200 hover:bg-blue-50/30 transition-all duration-300">
                    <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center mr-4 text-blue-600 group-hover:scale-110 transition-transform">
                      <Star className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">
                        Role
                      </p>
                      <p className="text-slate-700 font-bold capitalize">
                        {technicianData?.userrole}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center p-4 bg-slate-50 rounded-2xl border border-slate-100 group hover:border-indigo-200 hover:bg-indigo-50/30 transition-all duration-300">
                    <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center mr-4 text-indigo-600 group-hover:scale-110 transition-transform">
                      <Calendar className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">
                        Joined
                      </p>
                      <p className="text-slate-700 font-bold">
                        {technicianData?.joinAt || "Dec 2023"}
                      </p>
                    </div>
                  </div>
                </div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link
                    to={`/techhome/get_data?username=${technicianData?.userName}`}
                    className="w-full inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 group"
                  >
                    <LayoutDashboard className="w-5 h-5 mr-3 group-hover:rotate-12 transition-transform" />
                    Navigate to Dashboard
                    <ArrowRight className="w-5 h-5 ml-3 transform group-hover:translate-x-2 transition-transform" />
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: CheckCircle2,
                label: "Status",
                value: "Active Now",
                color: "green",
              },
              {
                icon: Clock,
                label: "Current Shift",
                value: "Day Shift",
                color: "blue",
              },
              {
                icon: Zap,
                label: "Availability",
                value: "Instant Pick",
                color: "purple",
              },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="bg-white/70 backdrop-blur-xl p-8 rounded-3xl border border-white/50 shadow-xl flex flex-col items-center text-center group"
              >
                <div
                  className={`w-16 h-16 bg-${stat.color}-100 rounded-2xl flex items-center justify-center mb-4 text-${stat.color}-600 group-hover:scale-110 transition-transform duration-300 shadow-inner`}
                >
                  <stat.icon className="w-8 h-8" />
                </div>
                <h4 className="text-gray-500 font-bold text-sm uppercase tracking-widest mb-1">
                  {stat.label}
                </h4>
                <p className={`text-xl font-black text-${stat.color}-700`}>
                  {stat.value}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="max-w-5xl mx-auto px-4 py-8 text-center border-t border-slate-200/50 mt-12 bg-white/20">
        <p className="text-slate-400 text-sm font-medium">
          &copy; {new Date().getFullYear()} Cool Services Pro. All secure data
          encrypted.
        </p>
      </footer>
    </div>
  );
}

export default TechnicianHomePage;
