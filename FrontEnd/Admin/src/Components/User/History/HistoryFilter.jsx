import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../../../../Utils/axios";
function HistoryFilter() {
  const [status, setstatus] = useState("");

  const fetchBookings = async () => {
    try {
      const response = await api.get("/showbooking");

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
