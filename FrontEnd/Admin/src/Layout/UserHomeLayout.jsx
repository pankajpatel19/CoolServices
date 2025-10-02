import React from "react";
import { Outlet } from "react-router-dom";
import Nav from "../Components/Home/Nav";

function UserHomeLayout() {
  return (
    <div>
      <Nav />
      <Outlet />
    </div>
  );
}

export default UserHomeLayout;
