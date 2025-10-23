import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

function HistoryFilter() {
  const [status, setstatus] = useState("");

  const fetchBookings = async () => {
    try {
      const response = await axios.get("http://localhost:1916/showbooking", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      setstatus(response.data);
    } catch (error) {
      toast.error("Failed to fetch bookings");
    }
  };
  useEffect(() => {
    fetchBookings();
  }, []);
  return <div>Hii</div>;
}

export default HistoryFilter;
