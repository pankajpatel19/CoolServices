import React from "react";
import Nav from "../Components/Home/Nav";
import { Outlet } from "react-router-dom";

function RootLayout() {
  return (
    <div>
      <Nav />
      <div>
        <Outlet />
      </div>
    </div>
  );
}

export default RootLayout;
