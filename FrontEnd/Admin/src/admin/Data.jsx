import React, { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  AreaChart,
  Area,
} from "recharts";
import {
  TrendingUp,
  Activity,
  CheckCircle2,
  Clock,
  PieChart as PieChartIcon,
  BarChart3,
  Zap,
  ArrowUpRight,
  Users,
} from "lucide-react";
import api from "../utils/axios";

function Data() {
  const [dashData, setDashData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);
        const res = await api.get("/showbooking/dashboard");
        setDashData(res.data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  const chartData = useMemo(
    () => [
      { name: "New", count: dashData.newBooking || 0, color: "#3b82f6" },
      {
        name: "In Progress",
        count: dashData.InProgress || dashData.inProgress || 0,
        color: "#f59e0b",
      },
      {
        name: "Completed",
        count: dashData.Done || dashData.done || 0,
        color: "#10b981",
      },
    ],
    [dashData],
  );

  const pieColors = ["#3b82f6", "#f59e0b", "#10b981"];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/90 backdrop-blur-xl p-4 rounded-2xl shadow-2xl border border-white/40 ring-1 ring-black/5">
          <p className="font-black text-slate-800 mb-1">{label}</p>
          <div className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: payload[0].payload.color }}
            ></div>
            <p className="text-indigo-600 font-bold text-lg">
              {payload[0].value} Tasks
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  const StatCard = ({ title, value, icon: Icon, colorClass, delay }) => (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      whileHover={{ y: -5 }}
      className={`bg-white/90 backdrop-blur-2xl p-6 rounded-[2rem] border border-white/40 shadow-xl relative overflow-hidden group flex flex-col justify-between h-44`}
    >
      <div
        className={`absolute -right-4 -top-4 w-24 h-24 bg-${colorClass}-500/5 rounded-full blur-2xl group-hover:bg-${colorClass}-500/10 transition-all duration-500`}
      ></div>

      <div className="flex justify-between items-start relative z-10">
        <div
          className={`p-4 bg-${colorClass}-50 rounded-2xl text-${colorClass}-600 shadow-inner group-hover:scale-110 transition-transform duration-500`}
        >
          <Icon className="w-6 h-6" />
        </div>
        <div className="flex items-center gap-1 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-black uppercase tracking-widest">
          <ArrowUpRight className="w-3 h-3" />
          Active
        </div>
      </div>

      <div className="relative z-10">
        <p className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-1">
          {title}
        </p>
        <div className="flex items-baseline gap-2">
          <h3 className="text-4xl font-black text-slate-900 tracking-tight">
            {isLoading ? "..." : value || 0}
          </h3>
          <span className="text-[10px] font-bold text-slate-400">
            Total volume
          </span>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-transparent p-4 sm:p-8 space-y-10">
      {/* Dynamic Header */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-6"
      >
        <div>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight mb-2">
            Operations <span className="text-indigo-600">Control</span>
          </h1>
          <p className="text-slate-500 font-bold flex items-center gap-2">
            <Activity className="w-4 h-4 text-indigo-500" />
            Live data feed refreshed every 60 seconds
          </p>
        </div>

        <div className="flex gap-3">
          <button className="px-6 py-3 bg-white/70 backdrop-blur-xl border border-white/40 rounded-2xl font-bold text-slate-700 hover:text-indigo-600 shadow-sm transition-all flex items-center gap-2">
            <Users className="w-5 h-5" />
            Staff Online
          </button>
          <div className="px-6 py-3 bg-indigo-600 text-white rounded-2xl font-bold shadow-xl shadow-indigo-100 flex items-center gap-2">
            <Zap className="w-5 h-5" />
            Live Build
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Overall Volume"
          value={dashData.total}
          icon={TrendingUp}
          colorClass="blue"
          delay={0.1}
        />
        <StatCard
          title="Pending Review"
          value={dashData.newBooking}
          icon={Clock}
          colorClass="amber"
          delay={0.2}
        />
        <StatCard
          title="Active Jobs"
          value={dashData.InProgress || dashData.inProgress}
          icon={Activity}
          colorClass="orange"
          delay={0.3}
        />
        <StatCard
          title="Successful Ends"
          value={dashData.Done || dashData.done}
          icon={CheckCircle2}
          colorClass="emerald"
          delay={0.4}
        />
      </div>

      {/* Visual Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Distribution Chart */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="lg:col-span-2 bg-white/90 backdrop-blur-2xl p-8 rounded-[2.5rem] shadow-2xl border border-white/40"
        >
          <div className="flex items-center justify-between mb-10">
            <div>
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                Workload Flow
              </h3>
              <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mt-1">
                Status distribution analysis
              </p>
            </div>
            <div className="p-3 bg-indigo-50 rounded-2xl text-indigo-600">
              <BarChart3 className="w-6 h-6" />
            </div>
          </div>

          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{ top: 0, right: 0, left: -20, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#f1f5f9"
                />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#94a3b8", fontSize: 12, fontWeight: 700 }}
                  dy={15}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#94a3b8", fontSize: 12, fontWeight: 700 }}
                />
                <Tooltip
                  content={<CustomTooltip />}
                  cursor={{ fill: "#f8fafc", radius: 16 }}
                />
                <Bar dataKey="count" radius={[12, 12, 12, 12]} barSize={60}>
                  {chartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.color}
                      fillOpacity={0.8}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Breakdown Chart */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white/90 backdrop-blur-2xl p-8 rounded-[2.5rem] shadow-2xl border border-white/40 flex flex-col"
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                Focus Map
              </h3>
              <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mt-1">
                Percentage split
              </p>
            </div>
            <div className="p-3 bg-pink-50 rounded-2xl text-pink-600">
              <PieChartIcon className="w-6 h-6" />
            </div>
          </div>

          <div className="flex-1 h-[300px] flex items-center justify-center relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={110}
                  paddingAngle={8}
                  dataKey="count"
                  animationDuration={1000}
                >
                  {chartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.color}
                      fillOpacity={0.8}
                      strokeWidth={0}
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-4xl font-black text-slate-800">
                {dashData.total || 0}
              </span>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                Total
              </span>
            </div>
          </div>

          <div className="space-y-3 mt-6">
            {chartData.map((item, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-3 bg-slate-50 rounded-2xl border border-slate-100"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <span className="text-sm font-black text-slate-600">
                    {item.name}
                  </span>
                </div>
                <span className="text-sm font-black text-slate-900">
                  {dashData.total
                    ? Math.round((item.count / dashData.total) * 100)
                    : 0}
                  %
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Growth Metric Area */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="bg-slate-900 rounded-[2.5rem] p-10 text-white relative overflow-hidden shadow-2xl"
      >
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl -mr-48 -mt-48"></div>
        <div className="relative z-10 md:flex items-center justify-between gap-10">
          <div className="mb-8 md:mb-0">
            <h3 className="text-3xl font-black mb-4">Operational Efficiency</h3>
            <p className="text-slate-400 font-bold max-w-md">
              Our systems are running at peak performance. Current data
              indicates a high completion rate across all service sectors.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
            {[
              {
                label: "Completion",
                value: dashData.total
                  ? Math.round(
                      ((dashData.Done || dashData.done) / dashData.total) * 100,
                    )
                  : 0,
              },
              {
                label: "Active Flow",
                value: dashData.total
                  ? Math.round(
                      ((dashData.InProgress || dashData.inProgress) /
                        dashData.total) *
                        100,
                    )
                  : 0,
              },
              {
                label: "Response",
                value: dashData.total
                  ? Math.round((dashData.newBooking / dashData.total) * 100)
                  : 0,
              },
            ].map((metric, i) => (
              <div key={i} className="text-center">
                <div className="text-4xl font-black text-indigo-400 mb-1">
                  {metric.value}%
                </div>
                <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default Data;
