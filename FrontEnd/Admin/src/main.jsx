import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import App from "./App";
import { UserProvider } from "./context/userContext";

createRoot(document.getElementById("root")).render(
  <UserProvider>
    <App />
  </UserProvider>,
);
