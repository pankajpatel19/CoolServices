import React, { createContext, useState } from "react";

const serviceContext = createContext();
const ServiceProvider = ({ children }) => {
  const [service, setService] = useState(null);
  return (
    <serviceContext.Provider value={{ service, setService }}>
      {children}
    </serviceContext.Provider>
  );
};

export { serviceContext, ServiceProvider };
