import React from "react";
import Dashboard from "../Admin/Dashboard";
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
