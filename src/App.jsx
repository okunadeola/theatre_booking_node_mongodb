import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/user/home";
import RootLayout from "./Layout/RootLayout";
import Dashboard from "./pages/admin/dashboard";
import Movies from "./pages/admin/movie";
import Login from "./pages/general/login";
import Register from "./pages/general/register";
import { Navigate } from "react-router-dom";
import { useEffect } from "react";
import useCurrentUser from "./hooks/useCurrentUser";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import UserRootLayout from "./Layout/UserRootLayout";
import SingleMovie from "./pages/user/SingleMovie";
import Reserve from "./pages/user/reserve";
import Wallet from "./pages/user/wallet";
import Ticket from "./pages/user/Ticket";
import Profile from "./pages/user/profile";
import AdminBooking from "./pages/admin/booking";
import AdminWallet from "./pages/admin/Wallet";
import AdminTicket from "./pages/admin/ticket";
import AdminUser from "./pages/admin/user";

function App() {
  const { userData, removeCurrentUser } = useCurrentUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userData) {
      navigate("/login");
    }
  }, [userData, navigate]);

  useEffect(() => {
    const token = userData?.accessToken;

    if (token) {
      const decodedToken = jwtDecode(token);
      // console.log(decodedToken.exp * 1000)
      // console.log(new Date().getTime())
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        removeCurrentUser();
        navigate("/login");
      }
    }
  }, [userData, navigate, removeCurrentUser]);

  return (
    <Routes>

      <Route path="/" element={<Navigate to="/user" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/admin" element={<RootLayout />}>
        <Route path="/admin/" element={<Dashboard />} />
        <Route path="/admin/movies" element={<Movies />} />
        <Route path="/admin/booking" element={<AdminBooking />} />
        <Route path="/admin/user" element={<AdminUser />} />
        <Route path="/admin/wallet" element={<AdminWallet />} />
        <Route path="/admin/ticket" element={<AdminTicket />} />
      </Route>

      <Route path="/user" element={<UserRootLayout />}>
        <Route path="/user/" element={<HomePage />} />
        <Route path="/user/:category/:id" element={<SingleMovie />} />
        <Route path="/user/reserve" element={<Reserve />} />
        <Route path="/user/wallet" element={<Wallet />} />
        <Route path="/user/ticket" element={<Ticket />} />
        <Route path="/user/profile" element={<Profile />} />
      </Route>

    </Routes>
  );
}

export default App;
