import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const HistoryContext = createContext();

export const useHistoryData = () => useContext(HistoryContext);

export const HistoryProvider = ({ children }) => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?._id;

  useEffect(() => {
    const fetchHistory = async () => {
      if (!userId) return;
      try {
        const res = await axios.get(
          `http://localhost:1916/Home/history/${userId}`
        );

        setHistory(res.data);
      } catch (err) {
        console.error("Error fetching history:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [userId]);

  return (
    <HistoryContext.Provider
      value={{ history, setHistory, loading, setLoading }}
    >
      {children}
    </HistoryContext.Provider>
  );
};
