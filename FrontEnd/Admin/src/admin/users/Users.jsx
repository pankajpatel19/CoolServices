import {
  User,
  Mail,
  Phone,
  Calendar,
  Users as UsersIcon,
  MessageSquare,
  ArrowRight,
  Search,
  Filter,
  ShieldCheck,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

function Users({ users = [], formatDate }) {
  const navigate = useNavigate();

  const showComplains = (id) => {
    navigate(`/admin/userComplain/${id}`);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
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
    <div className="min-h-screen bg-transparent p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Aesthetic Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div>
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl shadow-xl shadow-indigo-200">
                <UsersIcon className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl font-black text-slate-900 tracking-tight">
                Customer Base
              </h1>
            </div>
            <p className="text-slate-500 font-bold flex items-center gap-2 px-1">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              {users.length} Verified Users
            </p>
          </div>

          <div className="flex gap-3">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
              <input
                type="text"
                placeholder="Search customers..."
                className="pl-12 pr-6 py-3.5 bg-white/70 backdrop-blur-xl border border-white/40 rounded-2xl shadow-sm focus:outline-none focus:ring-4 focus:ring-indigo-100 transition-all font-medium text-slate-700 w-full sm:w-64"
              />
            </div>
            <button className="p-3.5 bg-white/70 backdrop-blur-xl border border-white/40 rounded-2xl text-slate-600 hover:text-indigo-600 shadow-sm transition-all">
              <Filter className="w-6 h-6" />
            </button>
          </div>
        </motion.div>

        {/* Users List */}
        <AnimatePresence>
          {users.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-24 bg-white/50 backdrop-blur-xl rounded-[2.5rem] border border-white/40 shadow-xl"
            >
              <UsersIcon className="w-20 h-20 text-slate-200 mx-auto mb-6" />
              <p className="text-slate-400 text-xl font-black italic tracking-tight">
                No customers found in your records.
              </p>
            </motion.div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {users.map((user) => (
                <motion.div
                  key={user._id}
                  variants={itemVariants}
                  whileHover={{ y: -8 }}
                  className="bg-white/90 backdrop-blur-2xl rounded-[2rem] border border-white/40 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden group flex flex-col"
                >
                  {/* Visual Header */}
                  <div className="h-28 bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-800 p-8 relative">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-16 -mt-16"></div>
                    <div className="absolute -bottom-10 left-8">
                      <div className="w-20 h-20 rounded-2xl bg-white p-1 shadow-2xl transform group-hover:rotate-6 transition-transform duration-500">
                        <div className="w-full h-full bg-slate-50 rounded-xl flex items-center justify-center text-indigo-600 border border-slate-100">
                          <User className="w-10 h-10" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="pt-14 p-8 flex-1 space-y-6">
                    <div>
                      <h3 className="text-2xl font-black text-slate-900 mb-1 tracking-tight group-hover:text-indigo-600 transition-colors">
                        {user.userName}
                      </h3>
                      <p className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">
                        {user._id?.slice(-8)}
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center gap-4 bg-slate-50/50 p-3 rounded-2xl border border-slate-100/50">
                        <div className="p-2.5 bg-blue-100 rounded-xl text-blue-600">
                          <Mail className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">
                            Email
                          </p>
                          <p className="text-sm font-bold text-slate-700 truncate">
                            {user.email}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 bg-slate-50/50 p-3 rounded-2xl border border-slate-100/50">
                        <div className="p-2.5 bg-emerald-100 rounded-xl text-emerald-600">
                          <Phone className="w-4 h-4" />
                        </div>
                        <div className="flex-1">
                          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">
                            Phone
                          </p>
                          <p className="text-sm font-bold text-slate-700">
                            {user.phone}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 bg-slate-50/50 p-3 rounded-2xl border border-slate-100/50">
                        <div className="p-2.5 bg-purple-100 rounded-xl text-purple-600">
                          <Calendar className="w-4 h-4" />
                        </div>
                        <div className="flex-1">
                          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">
                            Customer Since
                          </p>
                          <p className="text-sm font-bold text-slate-700">
                            {formatDate(user.joinAt)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="p-8 pt-0 mt-auto">
                    <button
                      onClick={() => showComplains(user._id)}
                      className="w-full flex items-center justify-center gap-3 bg-slate-900 text-white px-6 py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all duration-300 hover:bg-indigo-600 hover:shadow-xl hover:shadow-indigo-200 active:scale-95 group/btn"
                    >
                      <MessageSquare className="w-5 h-5 group-hover/btn:rotate-12 transition-transform" />
                      Complaints
                      <ArrowRight className="w-5 h-5 ml-auto opacity-50 group-hover/btn:opacity-100 group-hover/btn:translate-x-1 transition-all" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default Users;
