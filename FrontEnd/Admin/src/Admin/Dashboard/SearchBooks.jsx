import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  User, 
  Settings, 
  Calendar, 
  Phone, 
  CheckCircle2, 
  Clock, 
  ChevronRight, 
  Trash2,
  Wrench,
  UserCheck
} from "lucide-react";

function SearchBooks({
  requestDate = [],
  getStatusColor,
  handledelete,
  updatebooking,
  updateTechnician,
}) {
  const tableHeaderClasses = "px-6 py-4 text-left text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]";

  return (
    <div className="bg-transparent">
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/90 backdrop-blur-2xl rounded-[2.5rem] shadow-2xl border border-white/40 overflow-hidden"
      >
        <div className="px-8 py-6 border-b border-slate-50 flex items-center justify-between bg-white/50">
          <div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              Filtered Records
            </h2>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">
              Search results from current query
            </p>
          </div>
          <div className="p-3 bg-indigo-50 rounded-2xl">
            <Settings className="w-5 h-5 text-indigo-600 animate-spin-slow" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="bg-slate-50/30">
                <th className={tableHeaderClasses}>Customer</th>
                <th className={tableHeaderClasses}>System Status</th>
                <th className={tableHeaderClasses}>Schedule</th>
                <th className={tableHeaderClasses}>Operator</th>
                <th className={tableHeaderClasses}>Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              <AnimatePresence>
                {requestDate.map((item, index) => (
                  <motion.tr
                    key={item._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: index * 0.05 }}
                    className="group hover:bg-slate-50/50 transition-all duration-300"
                  >
                    {/* Customer Info */}
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 font-black text-sm border border-blue-100 group-hover:scale-110 transition-transform">
                          {item.name?.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <Link
                            to={`/showbooking/${item._id}`}
                            className="text-sm font-black text-slate-900 hover:text-indigo-600 flex items-center gap-1 transition-colors"
                          >
                            {item.name}
                            <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </Link>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-[10px] font-bold text-slate-400 uppercase">{item.appliance}</span>
                            <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                            <span className="text-[10px] font-bold text-slate-400 uppercase">{item.phone}</span>
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Status Select */}
                    <td className="px-6 py-5">
                      <div className="relative w-max">
                        <select
                          className={`appearance-none pl-4 pr-10 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border transition-all focus:outline-none focus:ring-4 focus:ring-indigo-100 ${getStatusColor(item.status)}`}
                          value={item.status}
                          onChange={(e) => updatebooking(item._id, e.target.value)}
                        >
                          <option value="New">New</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Done">Done</option>
                          <option value="cancel">Cancel</option>
                        </select>
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none opacity-50">
                          <ChevronRight className="w-3 h-3 rotate-90" />
                        </div>
                      </div>
                    </td>

                    {/* Schedule */}
                    <td className="px-6 py-5">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-slate-700 font-bold text-xs">
                          <Calendar className="w-3.5 h-3.5 text-slate-400" />
                          {item.date}
                        </div>
                        <div className="flex items-center gap-2 text-slate-400 font-bold text-[10px] tracking-tight">
                          <Clock className="w-3.5 h-3.5" />
                          {item.time}
                        </div>
                      </div>
                    </td>

                    {/* Technician Assign */}
                    <td className="px-6 py-5">
                      <div className="relative w-max">
                        <UserCheck className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
                        <select
                          className="appearance-none pl-9 pr-10 py-1.5 bg-slate-50 border border-slate-100 rounded-full text-[10px] font-black text-slate-600 uppercase tracking-widest hover:border-indigo-200 transition-all focus:outline-none focus:ring-4 focus:ring-indigo-50"
                          value={item.technician || ""}
                          onChange={(e) => updateTechnician(item._id, e.target.value)}
                        >
                          <option value="">No Operator</option>
                          <option value="ajay">Ajay P.</option>
                          <option value="rohit">Rohit S.</option>
                          <option value="anuj">Anuj K.</option>
                        </select>
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none opacity-50">
                          <ChevronRight className="w-3 h-3 rotate-90" />
                        </div>
                      </div>
                    </td>

                    {/* Action */}
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => handledelete(item._id)}
                          className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>

          {requestDate.length === 0 && (
            <div className="text-center py-20 bg-slate-50/10">
              <div className="w-20 h-20 bg-slate-100 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10 text-slate-300" />
              </div>
              <h3 className="text-xl font-black text-slate-800 tracking-tight">Nothing Found</h3>
              <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mt-1">No matches for your search query</p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}

export default SearchBooks;
