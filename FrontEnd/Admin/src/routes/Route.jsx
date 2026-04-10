import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import SignUp from "../components/home/SignUp";
import Login from "../components/home/Login";
import AuthSuccess from "../components/user/AuthSuccess";
import ContactUs from "../components/home/ContactUs";
import UserHomeLayout from "../components/layout/UserHomeLayout";
import UserHome from "../components/user/user_home/UserHome";
import Booking from "../components/Booking";
import ShowServices from "../admin/service/ShowServices";
import Upcoming from "../components/user/user_home/Upcoming";
import History from "../components/user/history/History";
import Profile from "../components/user/user_home/profile_data/Profile";
import ComplaintForm from "../components/user/user_home/complaints/ComplainForm";
import ShowComplaints from "../components/user/user_home/complaints/ShowComplaints";
import SolvedByYour from "../components/user/user_home/SolvedByYour";
import Complete_Payment from "../admin/service/payment_success/final_payment/Complete_Payment";
import AddAddress from "../admin/service/payment_success/AddAddress";
import ShowAddresses from "../admin/service/payment_success/ShowAddreses";
import Payment from "../admin/service/payment_success/final_payment/Payment";
import AdminLayout from "../components/layout/AdminLayout";
import Dashboard from "../admin/dashboard/Dashboard";
import SearchBooks from "../admin/dashboard/SearchBooks";
import BookData from "../admin/BookData";
import Data from "../admin/Data";
import HandleTechnician from "../admin/HandleTechnician";
import AddTechnician from "../admin/AddTechnician";
import ShowUser from "../admin/users/ShowUser";
import BookingPerUser from "../admin/users/BookingPerUser";
import AddService from "../admin/service/AddService";
import TechLocation from "../admin/TechLocation";
import TechnicianHomePage from "../components/technician/TechnicianHomePage";
import TechHome from "../components/technician/TechHome";
import Call from "../components/technician/Call";
import TechProfile from "../components/technician/TechProfile";
import ForgetPassword from "../components/user/user_home/ForgetPassword";
import ResetPassword from "../components/user/user_home/ResetPassword";
import ProtectedRoute from "../components/protected_route/ProtectedRoute";
import NotFound from "../components/home/NotFound";
import Unauthorized from "../components/home/Unauthorized";
import HomePage from "../components/home/HomePage";
import RootLayoutPage from "../components/layout/RootLayoutPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<RootLayoutPage />}>
        <Route index element={<HomePage />} />

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
          {/* <Route path="history/status" element={<HistoryFilter />} /> */}
          <Route path="history/:id" element={<History />} />
          <Route path="profile/:id" element={<Profile />} />
          <Route path="complain" element={<ComplaintForm />} />
          <Route path="complain/:id" element={<ShowComplaints />} />
          <Route path="solved_by_you" element={<SolvedByYour />} />
          <Route path="show_service" element={<ShowServices />} />
          <Route path="complete_payment" element={<Complete_Payment />} />
          <Route path="add_address" element={<AddAddress />} />
          <Route path="show_address" element={<ShowAddresses />} />
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
