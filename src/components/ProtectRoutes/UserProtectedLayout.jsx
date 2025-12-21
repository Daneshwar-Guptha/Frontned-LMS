import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import UserNavbar from "../Navbar/Navbar";

const UserProtectedLayout = () => {
  const { userData } = useSelector(store => store.user);

  // not logged in
  if (!userData) return <Navigate to="/" replace />;

  // wrong role trying to access user routes
  if (userData.role !== "user") {
    return <Navigate to="/instructor/dashboard" replace />;
  }

  return (
    <>
      <UserNavbar />
      <Outlet />
    </>
  );
};

export default UserProtectedLayout;
