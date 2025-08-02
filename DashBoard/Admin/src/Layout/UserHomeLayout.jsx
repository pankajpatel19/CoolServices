import React from "react";
import { Outlet } from "react-router-dom";

function UserHomeLayout() {
  return (
    <div>
      <h1>user LAyout</h1>
      <Outlet />
    </div>
  );
}

export default UserHomeLayout;
