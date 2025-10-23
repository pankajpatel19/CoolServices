import React from "react";
import HeaderDash from "../Admin/Dashboard/HeaderDash";
import { Outlet } from "react-router-dom";

function AdminLayout() {
  return (
    <div>
      <HeaderDash />
      <Outlet />
    </div>
  );
}

export default AdminLayout;
