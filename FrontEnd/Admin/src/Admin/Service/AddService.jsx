import { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

export default function AddService() {
  const [formData, setFormData] = useState({
    appliance: "",
    name: "",
    description: "",
    duration: "",
    price: "",
    serviceType: "",
    imageUrl: "",
    videoUrl: "",
    toolsUsed: "",
    includedItems: "",
    rating: "",
    isPopular: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Convert comma-separated strings to arrays
      const payload = {
        ...formData,
        toolsUsed: formData.toolsUsed
          ? formData.toolsUsed.split(",").map((item) => item.trim())
          : [],
        includedItems: formData.includedItems
          ? formData.includedItems.split(",").map((item) => item.trim())
          : [],
        price: Number(formData.price),
        rating: formData.rating ? Number(formData.rating) : 4.5,
      };

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/services/add`,
        payload,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      toast.success(response.data.message);
      setFormData({
        appliance: "",
        name: "",
        description: "",
        duration: "",
        price: "",
        serviceType: "",
        imageUrl: "",
        videoUrl: "",
        toolsUsed: "",
        includedItems: "",
        rating: "",
        isPopular: false,
      });
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl bg-white shadow-2xl rounded-3xl overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-0">
          {/* Left Side - Header */}
          <div className="lg:col-span-2 bg-gradient-to-br from-blue-600 to-indigo-600 p-8 flex flex-col justify-center text-white">
            <div className="text-6xl mb-4">🛠️</div>
            <h2 className="text-3xl font-bold mb-3">Add New Service</h2>
            <p className="text-blue-100 mb-6">
              Create a new service offering for your customers
            </p>

            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <div className="bg-white/20 rounded-full p-1 mt-0.5">
                  <svg
                    className="w-3 h-3"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <span>Select appliance type</span>
              </div>
              <div className="flex items-start gap-2">
                <div className="bg-white/20 rounded-full p-1 mt-0.5">
                  <svg
                    className="w-3 h-3"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <span>Set competitive pricing</span>
              </div>
              <div className="flex items-start gap-2">
                <div className="bg-white/20 rounded-full p-1 mt-0.5">
                  <svg
                    className="w-3 h-3"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <span>Add clear descriptions</span>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="lg:col-span-3 p-8 overflow-y-auto max-h-screen">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {/* Appliance Type */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-gray-700">
                    Appliance Type <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <select
                      name="appliance"
                      value={formData.appliance}
                      onChange={handleChange}
                      className="w-full border-2 border-gray-200 rounded-lg p-2.5 pr-10 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all outline-none appearance-none bg-white cursor-pointer"
                      required
                    >
                      <option value="">Select appliance</option>
                      <option value="AC">🌡️ AC</option>
                      <option value="Fridge">❄️ Fridge</option>
                      <option value="Washing Machine">
                        🧺 Washing Machine
                      </option>
                      <option value="Water Purifier">💧 Water Purifier</option>
                    </select>
                    <div className="absolute right-2.5 top-1/2 transform -translate-y-1/2 pointer-events-none">
                      <svg
                        className="w-4 h-4 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Service Name */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-gray-700">
                    Service Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="e.g., Jet Service"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full border-2 border-gray-200 rounded-lg p-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all outline-none"
                    required
                  />
                </div>

                {/* Price */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-gray-700">
                    Price <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-500 font-semibold text-sm">
                      ₹
                    </span>
                    <input
                      type="number"
                      name="price"
                      placeholder="0"
                      value={formData.price}
                      onChange={handleChange}
                      className="w-full border-2 border-gray-200 rounded-lg p-2.5 pl-7 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all outline-none"
                      required
                    />
                  </div>
                </div>

                {/* Duration */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-gray-700">
                    Duration <span className="text-gray-400">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    name="duration"
                    placeholder="e.g., 1 hour"
                    value={formData.duration}
                    onChange={handleChange}
                    className="w-full border-2 border-gray-200 rounded-lg p-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all outline-none"
                  />
                </div>

                {/* Service Type */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-gray-700">
                    Service Type{" "}
                    <span className="text-gray-400">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    name="serviceType"
                    placeholder="e.g., Dry, Water"
                    value={formData.serviceType}
                    onChange={handleChange}
                    className="w-full border-2 border-gray-200 rounded-lg p-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all outline-none"
                  />
                </div>

                {/* Rating */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-gray-700">
                    Rating <span className="text-gray-400">(Optional)</span>
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="5"
                    name="rating"
                    placeholder="4.5"
                    value={formData.rating}
                    onChange={handleChange}
                    className="w-full border-2 border-gray-200 rounded-lg p-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all outline-none"
                  />
                </div>

                {/* Image URL */}
                <div className="space-y-1.5 col-span-2">
                  <label className="block text-xs font-semibold text-gray-700">
                    Image URL <span className="text-gray-400">(Optional)</span>
                  </label>
                  <input
                    type="url"
                    name="imageUrl"
                    placeholder="https://example.com/image.jpg"
                    value={formData.imageUrl}
                    onChange={handleChange}
                    className="w-full border-2 border-gray-200 rounded-lg p-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all outline-none"
                  />
                </div>

                {/* Video URL */}
                <div className="space-y-1.5 col-span-2">
                  <label className="block text-xs font-semibold text-gray-700">
                    Video URL <span className="text-gray-400">(Optional)</span>
                  </label>
                  <input
                    type="url"
                    name="videoUrl"
                    placeholder="https://youtube.com/..."
                    value={formData.videoUrl}
                    onChange={handleChange}
                    className="w-full border-2 border-gray-200 rounded-lg p-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all outline-none"
                  />
                </div>

                {/* Description - Full Width */}
                <div className="col-span-2 space-y-1.5">
                  <label className="block text-xs font-semibold text-gray-700">
                    Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="description"
                    placeholder="Deep jet cleaning with high-pressure water jet..."
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full border-2 border-gray-200 rounded-lg p-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all outline-none resize-none"
                    rows="3"
                    required
                  />
                </div>

                {/* Tools Used */}
                <div className="col-span-2 space-y-1.5">
                  <label className="block text-xs font-semibold text-gray-700">
                    Tools Used{" "}
                    <span className="text-gray-400">(Comma separated)</span>
                  </label>
                  <input
                    type="text"
                    name="toolsUsed"
                    placeholder="e.g., Jet Pump, Brush, Chemical Foam"
                    value={formData.toolsUsed}
                    onChange={handleChange}
                    className="w-full border-2 border-gray-200 rounded-lg p-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all outline-none"
                  />
                </div>

                {/* Included Items */}
                <div className="col-span-2 space-y-1.5">
                  <label className="block text-xs font-semibold text-gray-700">
                    Included Items{" "}
                    <span className="text-gray-400">(Comma separated)</span>
                  </label>
                  <input
                    type="text"
                    name="includedItems"
                    placeholder="e.g., Filter Cleaning, Gas Check, Compressor Test"
                    value={formData.includedItems}
                    onChange={handleChange}
                    className="w-full border-2 border-gray-200 rounded-lg p-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all outline-none"
                  />
                </div>

                {/* Is Popular Checkbox */}
                <div className="col-span-2 flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="isPopular"
                    id="isPopular"
                    checked={formData.isPopular}
                    onChange={handleChange}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-100 cursor-pointer"
                  />
                  <label
                    htmlFor="isPopular"
                    className="text-sm font-semibold text-gray-700 cursor-pointer"
                  >
                    Mark as Popular Service
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full mt-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg p-3 hover:from-blue-700 hover:to-indigo-700 transform hover:scale-[1.01] active:scale-[0.99] transition-all shadow-lg hover:shadow-xl"
              >
                Add Service
              </button>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </div>
  );
}
