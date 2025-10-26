import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import RootLayout from "../src/Layout/RootLayout";
import SignUp from "../src/Components/User/SignUp";
import Login from "../src/Components/User/Login";
import Data from "../src/Admin/Data";
import Home from "../src/Components/Home/Home";
import NotFound from "../src/Components/Home/NotFound";
import Booking from "../src/Components/Booking/Booking";
import Dashboard from "../src/Admin/Dashboard/Dashboard.jsx";
import ContactUs from "../src/Components/User/ContactUs";
import UserHomeLayout from "../src/Layout/UserHomeLayout";
import UserHome from "../src/Components/User/User_Home/UserHome";
import ProtectRoute from "../src/ProtectedRoutes/ProtectRoute.jsx";
import BookData from "../src/Admin/BookData";
import History from "../src/Components/User/History/History.jsx";
import TechHome from "../src/Components/Technician/TechHome";
import Profile from "../src/Components/User/User_Home/ProfileData/Profile.jsx";
import Upcoming from "../src/Components/User/User_Home/Upcoming";
import ComplainForm from "../src/Components/User/User_Home/Complaints/ComplainForm";
import HandleTechnician from "../src/Admin/HandleTechnician";
import SearchBooks from "../src/Admin/Dashboard/SearchBooks.jsx";
import TechnicianHomePage from "../src/Components/Technician/TechnicianHomePage.jsx";
import Unauthorized from "../src/Components/Home/Unautorized.jsx";
import TechLocation from "../src/Admin/Location/TechLocation.jsx";
import SolvedByYour from "../src/Components/User/User_Home/SolvedByYour.jsx";
import AdminLayout from "../src/Layout/AdminLayout.jsx";
import Call from "../src/Components/Technician/Call.jsx";
import TechProfile from "../src/Components/Technician/TechProfile.jsx";
import HistoryFilter from "../src/Components/User/History/HistoryFilter.jsx";
import ShowUser from "../src/Admin/Users/ShowUser.jsx";
import BookingPerUser from "../src/Admin/Users/BookingPerUser.jsx";
import ShowComplaints from "../src/Components/User/User_Home/Complaints/ShowComplaints.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />

        <Route path="signup" element={<SignUp />} />
        <Route path="login" element={<Login />} />
        <Route path="contactUs" element={<ContactUs />} />
      </Route>
      <Route element={<ProtectRoute allowedRoles={["customer"]} />}>
        <Route path="home" element={<UserHomeLayout />}>
          <Route index element={<UserHome />} />
          <Route path="contactUs" element={<ContactUs />} />

          <Route path="addbooking" element={<Booking />} />
          <Route path="history/:id" element={<History />} />
          <Route path="history/upcoming" element={<Upcoming />} />
          <Route path="history/status" element={<HistoryFilter />} />
          <Route path="profile/:id" element={<Profile />} />
          <Route path="complain" element={<ComplainForm />} />
          <Route path="complain/:id" element={<ShowComplaints />} />

          <Route path="solvedByYou" element={<SolvedByYour />} />
        </Route>
      </Route>

      {/* admin */}
      <Route element={<ProtectRoute allowedRoles={["admin"]} />}>
        <Route path="admin" element={<AdminLayout />}>
          <Route path="showbooking" element={<Dashboard />} />
          <Route path="showbooking/search" element={<SearchBooks />} />
          <Route path="showbooking/:id" element={<BookData />} />
          <Route path="dashboard" element={<Data />} />
          <Route path="handleTechnician" element={<HandleTechnician />} />
          <Route path="handleUser" element={<ShowUser />} />
          <Route path="userComplain/:id" element={<BookingPerUser />} />

          <Route path="TechLocations" element={<TechLocation />} />
        </Route>
      </Route>

      {/* technician */}
      <Route element={<ProtectRoute allowedRoles={["technician"]} />}>
        <Route path="techhome" element={<TechnicianHomePage />} />
        <Route path="techhome/getdata" element={<TechHome />} />
        <Route path="techhome/showbooking/:id" element={<Call />} />

        <Route path="getdata/TechProfile" element={<TechProfile />} />
      </Route>

      <Route path="*" element={<NotFound />} />
      <Route path="/unauthorized" element={<Unauthorized />} />
    </>
  )
);
export default router;
