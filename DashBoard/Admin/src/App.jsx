import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import RootLayout from "./Layout/RootLayout";
import SignUp from "../src/Components/User/SignUp";
import Login from "./Components/User/Login";
import Data from "./Admin/Data";
import Home from "./Components/Home/Home";
import NotFound from "./Components/Home/NotFound";
import Booking from "./Components/Booking/Booking";
import DashBoardLayout from "./Layout/DashBoardLayout";
import Dashboard from "./Admin/Dashboard";
import ContactUs from "./Components/User/ContactUs";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="login" element={<Login />} />
          <Route path="addbooking" element={<Booking />} />
          <Route path="contactUs" element={<ContactUs />} />
        </Route>

        <Route>
          <Route path="admin" element={<DashBoardLayout />} />
          <Route path="showbooking" element={<Dashboard />} />
          <Route path="dashboard" element={<Data />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </>
    )
  );
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
