import React, { useEffect, useState } from "react";
import {
  MapPin,
  Edit,
  Trash2,
  Home,
  Briefcase,
  MapPinned,
  Plus,
} from "lucide-react";
import { Link } from "react-router-dom";
import api from "../../../../Utils/axios";
import { toast, ToastContainer } from "react-toastify";

function ShowAddresses() {
  const [addresses, setAddresses] = useState([]);
  const [id, setId] = useState("");
  const [selectedAddress, setSelectedAddress] = useState(null);

  const handleDelete = async (id) => {
    try {
      await api.delete(`/customer/delete_address/${id}`);
      toast.success("Address Deleted");
    } catch (error) {
      toast.error(error.message);
      console.log(error.message);
    }
  };

  const fetchAddress = async (id) => {
    try {
      const { data } = await api.get(`/customer/show_address/${id}`);

      setAddresses(data.Addresses);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSetDefault = (id) => {
    setAddresses(
      addresses.map((addr) => ({
        ...addr,
        isDefault: addr.id === id,
      }))
    );
  };

  const getAddressIcon = (type) => {
    switch (type) {
      case "home":
        return <Home className="w-5 h-5" />;
      case "work":
        return <Briefcase className="w-5 h-5" />;
      default:
        return <MapPinned className="w-5 h-5" />;
    }
  };

  const getAddressColor = (type) => {
    switch (type) {
      case "home":
        return "bg-blue-100 text-blue-700";
      case "work":
        return "bg-purple-100 text-purple-700";
      default:
        return "bg-green-100 text-green-700";
    }
  };

  useEffect(() => {
    const { id } = JSON.parse(localStorage.getItem("user"));
    if (id) {
      setId(id);
      fetchAddress(id);
    }
  }, [addresses]);
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-4 sm:py-8 px-4">
      <ToastContainer />

      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <div className="flex items-center gap-3">
              <MapPin className="w-6 h-6 sm:w-8 sm:h-8 text-indigo-600" />
              <h1 className="text-lg sm:text-xl font-bold text-gray-800">
                My Addresses
              </h1>
            </div>
            <div className="text-sm text-gray-600">
              {addresses.length}{" "}
              {addresses.length === 1 ? "Address" : "Addresses"}
            </div>
          </div>

          {addresses.length === 0 ? (
            <div className="text-center py-12">
              <MapPin className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-base">No addresses saved yet</p>
              <p className="text-gray-400 text-sm mt-2">
                Add your first address to get started
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              {addresses.map((address) => (
                <div
                  key={address._id}
                  className={`border-2 rounded-xl p-4 sm:p-6 hover:shadow-lg transition relative ${
                    address.isDefault
                      ? "border-indigo-500 bg-indigo-50"
                      : "border-gray-200 bg-white"
                  }`}
                >
                  {address.isDefault && (
                    <div className="absolute top-0 right-0 bg-indigo-600 text-white text-xs px-3 py-1 rounded-bl-lg rounded-tr-lg font-medium">
                      Default
                    </div>
                  )}

                  <Link to={`/Home/selected_address/${address._id}`}>
                    <div className="flex items-start gap-3 mb-4">
                      <div
                        className={`p-2 rounded-lg ${getAddressColor(
                          address.addressType
                        )}`}
                      >
                        {getAddressIcon(address.addressType)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-base text-gray-800">
                            {address.fullName}
                          </h3>
                          <span
                            className={`text-xs px-2 py-1 rounded-full uppercase font-medium ${getAddressColor(
                              address.addressType
                            )}`}
                          >
                            {address.addressType}
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm">{address.phone}</p>
                      </div>
                    </div>

                    <div className="mb-4 text-sm text-gray-700 leading-relaxed">
                      <p>{address.addressLine1}</p>
                      {address.addressLine2 && <p>{address.addressLine2}</p>}
                      <p>
                        {address.city}, {address.state} - {address.zipCode}
                      </p>
                      <p>{address.country}</p>
                    </div>
                  </Link>

                  <div className="flex flex-wrap gap-2">
                    {!address.isDefault && (
                      <button
                        onClick={() => handleSetDefault(address.id)}
                        className="flex-1 sm:flex-none bg-indigo-600 hover:bg-indigo-700 text-white text-sm px-4 py-2 rounded-lg transition"
                      >
                        Set as Default
                      </button>
                    )}
                    <button
                      onClick={() => setSelectedAddress(address)}
                      className="flex-1 sm:flex-none bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition"
                    >
                      <Edit className="w-4 h-4" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(address._id)}
                      className="flex-1 sm:flex-none bg-red-100 hover:bg-red-200 text-red-700 text-sm px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        {/* Selected Address Details Modal */}
        {selectedAddress && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-800">
                  Address Details
                </h2>
                <button
                  onClick={() => setSelectedAddress(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-gray-500 font-medium">Name</p>
                  <p className="text-gray-800">{selectedAddress.fullName}</p>
                </div>
                <div>
                  <p className="text-gray-500 font-medium">Phone</p>
                  <p className="text-gray-800">{selectedAddress.phone}</p>
                </div>
                <div>
                  <p className="text-gray-500 font-medium">Address</p>
                  <p className="text-gray-800">
                    {selectedAddress.addressLine1}
                  </p>
                  {selectedAddress.addressLine2 && (
                    <p className="text-gray-800">
                      {selectedAddress.addressLine2}
                    </p>
                  )}
                  <p className="text-gray-800">
                    {selectedAddress.city}, {selectedAddress.state} -{" "}
                    {selectedAddress.zipCode}
                  </p>
                  <p className="text-gray-800">{selectedAddress.country}</p>
                </div>
                <div>
                  <p className="text-gray-500 font-medium">Type</p>
                  <p className="text-gray-800 capitalize">
                    {selectedAddress.addressType}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedAddress(null)}
                className="w-full mt-6 bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg transition"
              >
                Close
              </button>
            </div>
          </div>
        )}

        <Link
          to="/Home/add_Address"
          className="flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-3 mt-6 text-lg font-semibold text-white bg-gradient-to-r from-red-500 to-red-600 rounded-xl shadow-lg hover:shadow-red-500/30 transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-[1.02] active:scale-95 sticky bottom-4 sm:static z-10 sticky bottom-1"
        >
          <Plus className="w-5 h-5" /> {/* Icon adds visual context */}
          <span>Add New Address</span>
        </Link>
      </div>
    </div>
  );
}

export default ShowAddresses;
