import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import TechHome from "../components/technician/TechHome";

function TechnicianLayout() {
  return (
    <div>
      <Outlet />
      <br />
    </div>
  );
}

export default TechnicianLayout;
