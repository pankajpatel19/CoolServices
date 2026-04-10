import React from "react";
import Dashboard from "../../admin/dashboard/Dashboard.jsx";
import { Outlet } from "react-router-dom";

function DashBoard() {
  return (
    <div>
      <Dashboard />
      <div>
        <Outlet />
      </div>
    </div>
  );
}

export default DashBoard;
