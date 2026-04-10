import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function AuthSuccess() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");

    if (token) {
      localStorage.setItem("jwtToken", token);

      navigate("/Home");
    } else {
      navigate("/login?error=true");
    }
  }, [location, navigate]);

  return <div>Loading...</div>;
}
