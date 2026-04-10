import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import RootLayout from "../components/layout/RootLayout.jsx";
import SignUp from "../components/home/SignUp.jsx";
import Login from "../components/home/Login.jsx";
import Data from "../admin/Data";
import Home from "../components/home/Home";
import NotFound from "../components/home/NotFound";
import Booking from "../components/Booking";
import Dashboard from "../admin/dashboard/Dashboard.jsx";
import ContactUs from "../components/home/ContactUs.jsx";
import UserHomeLayout from "../components/layout/UserHomeLayout";
import UserHome from "../components/user/user_home/UserHome";
import ProtectedRoute from "../components/protected_route/ProtectedRoute.jsx";
import BookData from "../admin/BookData";
import History from "../components/user/history/History.jsx";
import TechHome from "../components/technician/TechHome";
import Profile from "../components/user/user_home/profile_data/Profile.jsx";
import Upcoming from "../components/user/user_home/Upcoming";
import ComplainForm from "../components/user/user_home/complaints/ComplainForm";
import HandleTechnician from "../admin/HandleTechnician";
import SearchBooks from "../admin/dashboard/SearchBooks.jsx";
import TechnicianHomePage from "../components/technician/TechnicianHomePage.jsx";
import Unauthorized from "../components/home/Unauthorized.jsx";
import TechLocation from "../admin/TechLocation.jsx";
import SolvedByYour from "../components/user/user_home/SolvedByYour.jsx";
import AdminLayout from "../components/layout/AdminLayout.jsx";
import Call from "../components/technician/Call.jsx";
import TechProfile from "../components/technician/TechProfile.jsx";
import HistoryFilter from "../components/user/history/HistoryFilter.jsx";
import ShowUser from "../admin/users/ShowUser.jsx";
import BookingPerUser from "../admin/users/BookingPerUser.jsx";
import ShowComplaints from "../components/user/user_home/complaints/ShowComplaints.jsx";
import ForgetPassword from "../components/user/user_home/ForgetPassword.jsx";
import ResetPassword from "../components/user/user_home/ResetPassword.jsx";
import AddService from "../admin/service/AddService.jsx";
import ShowServices from "../admin/service/ShowServices.jsx";
import AuthSuccess from "../components/user/AuthSuccess.jsx";
import Complete_Payment from "../admin/service/payment_success/final_payment/Complete_Payment.jsx";
import AddAddress from "../admin/service/payment_success/AddAddress.jsx";
import ShowAddreses from "../admin/service/payment_success/ShowAddreses.jsx";
import Payment from "../admin/service/payment_success/final_payment/Payment.jsx";
import AddTechnician from "../admin/AddTechnician.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />

        <Route path="signup" element={<SignUp />} />
        <Route path="login" element={<Login />} />
        <Route path="auth-success" element={<AuthSuccess />} />

        <Route path="contactUs" element={<ContactUs />} />
      </Route>
      <Route element={<ProtectedRoute allowedRoles={["customer"]} />}>
        <Route path="home" element={<UserHomeLayout />}>
          <Route index element={<UserHome />} />
          <Route path="contactUs" element={<ContactUs />} />
          <Route path="addbooking" element={<Booking />} />
          <Route path="services" element={<ShowServices />} />
          <Route path="history/upcoming" element={<Upcoming />} />
          <Route path="history/status" element={<HistoryFilter />} />
          <Route path="history/:id" element={<History />} />
          <Route path="profile/:id" element={<Profile />} />
          <Route path="complain" element={<ComplainForm />} />
          <Route path="complain/:id" element={<ShowComplaints />} />
          <Route path="solved_by_you" element={<SolvedByYour />} />
          <Route path="show_service" element={<ShowServices />} />
          <Route path="complete_payment" element={<Complete_Payment />} />
          <Route path="add_address" element={<AddAddress />} />
          <Route path="show_address" element={<ShowAddreses />} />
          <Route path="selected_address/:id" element={<Payment />} />
        </Route>
      </Route>

      {/* admin */}
      <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
        <Route path="admin" element={<AdminLayout />}>
          <Route path="showbooking" element={<Dashboard />} />
          <Route path="showbooking/search" element={<SearchBooks />} />
          <Route path="showbooking/:id" element={<BookData />} />
          <Route path="dashboard" element={<Data />} />
          <Route path="handle_technician" element={<HandleTechnician />} />
          <Route path="add_technician" element={<AddTechnician />} />

          <Route path="handle_user" element={<ShowUser />} />
          <Route path="user_complain/:id" element={<BookingPerUser />} />
          <Route path="add_service" element={<AddService />} />
          <Route path="show_service" element={<ShowServices />} />
          <Route path="complete_payment" element={<Complete_Payment />} />

          <Route path="tech_locations" element={<TechLocation />} />
        </Route>
      </Route>

      {/* technician */}
      <Route element={<ProtectedRoute allowedRoles={["technician"]} />}>
        <Route path="techhome" element={<TechnicianHomePage />} />
        <Route path="techhome/get_data" element={<TechHome />} />
        <Route path="techhome/show_booking/:id" element={<Call />} />

        <Route path="get_data/tech_profile" element={<TechProfile />} />
      </Route>

      <Route path="/forget-password" element={<ForgetPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />

      <Route path="*" element={<NotFound />} />
      <Route path="/unauthorized" element={<Unauthorized />} />
    </>,
  ),
);
export default router;
