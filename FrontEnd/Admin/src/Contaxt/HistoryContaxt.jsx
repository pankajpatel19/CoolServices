import { createContext, useContext, useEffect, useState } from "react";
import api from "../../Utils/axios";

const HistoryContext = createContext(null);

export const useHistoryData = () => useContext(HistoryContext);

export const HistoryProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("user"));
    if (currentUser) {
      setUser(currentUser.user);
    } else {
      setUser(null);
    }
  }, []);

  useEffect(() => {
    if (!user?._id) {
      setLoading(false);
      return;
    }

    const fetchHistory = async () => {
      try {
        const res = await api.get(`/Home/history/${user._id}`);
        if (res.data) setHistory(res.data);
      } catch (err) {
        console.error("Error fetching history:", err);
      }
    };

    fetchHistory();
  }, [user?._id]);

  return (
    <HistoryContext.Provider
      value={{
        history,
        setHistory,
        loading,
      }}
    >
      {children}
    </HistoryContext.Provider>
  );
};
