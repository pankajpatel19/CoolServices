import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const Booking = () => {
  const [form, setForm] = useState({
    appliance: "",
    issue: "",
    address: "",
    pincode: "",
    date: "",
    time: "",
    name: "",
    phone: "",
    email: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:1916/addbooking", form);
      toast.success("Booking successful!");
    } catch (e) {
      console.log(e);
      toast.error("Booking failed. Please try again.");
    }
    setForm({
      appliance: "",
      issue: "",
      address: "",
      pincode: "",
      date: "",
      time: "",
      name: "",
      phone: "",
      email: "",
    });
  };

  return (
    <div
      className="max-w-2xl mx-auto p-6  bg-white rounded shadow-md"
      style={{ border: "1px solid silver" }}
    >
      <ToastContainer position="top-center" />

      <h2 className="text-2xl font-semibold mb-6 text-center text-blue-600">
        Book a Service
      </h2>
      <motion.form
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 80, duration: 0.8 }}
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        {/* Appliance Type */}
        <div>
          <label className="block mb-1">Appliance Type</label>
          <select
            name="appliance"
            className="w-full border px-3 py-2 rounded"
            value={form.appliance}
            onChange={handleChange}
            required
          >
            <option value="">-- Select Appliance --</option>
            <option value="AC">AC</option>
            <option value="Refrigerator">Refrigerator</option>
            <option value="Washing Machine">Washing Machine</option>
            <option value="Other">Other</option>
          </select>
        </div>
        {/* Company Name */}
        <div>
          <label className="block mb-1">Company Type</label>
          <select
            name="appliance"
            className="w-full border px-3 py-2 rounded "
            value={form.appliance}
            onChange={handleChange}
            required
          >
            <option value="">-- Select Company --</option>
            <option value="AC">BPL</option>
            <option value="Refrigerator">Kelvinator</option>
            <option value="Washing Machine">IBM</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Issue */}
        <div>
          <label className="block mb-1">Issue Description</label>
          <textarea
            name="issue"
            className="w-full border px-3 py-2 rounded"
            rows="3"
            placeholder="Describe the issue"
            value={form.issue}
            onChange={handleChange}
            required
          />
        </div>

        {/* Address */}
        <div>
          <label className="block mb-1">Address</label>
          <input
            type="text"
            name="address"
            className="w-full border px-3 py-2 rounded"
            value={form.address}
            onChange={handleChange}
            required
          />
        </div>

        {/* Pincode */}
        <div>
          <label className="block mb-1">Pincode</label>
          <input
            type="text"
            name="pincode"
            className="w-full border px-3 py-2 rounded"
            value={form.pincode}
            onChange={handleChange}
            required
          />
        </div>

        {/* Date & Time */}
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block mb-1">Preferred Date</label>
            <input
              type="date"
              name="date"
              className="w-full border px-3 py-2 rounded"
              value={form.date}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex-1">
            <label className="block mb-1">Preferred Time</label>
            <input
              type="time"
              name="time"
              className="w-full border px-3 py-2 rounded"
              value={form.time}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* Name */}
        <div>
          <label className="block mb-1">Name</label>
          <input
            type="text"
            name="name"
            className="w-full border px-3 py-2 rounded"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block mb-1">Phone Number</label>
          <input
            type="tel"
            name="phone"
            className="w-full border px-3 py-2 rounded"
            value={form.phone}
            onChange={handleChange}
            required
          />
        </div>

        {/* Email */}
        <div>
          <label className="block mb-1">Email (Optional)</label>
          <input
            type="email"
            name="email"
            className="w-full border px-3 py-2 rounded"
            value={form.email}
            onChange={handleChange}
          />
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Submit Booking
          </button>
        </div>
      </motion.form>
    </div>
  );
};

export default Booking;
