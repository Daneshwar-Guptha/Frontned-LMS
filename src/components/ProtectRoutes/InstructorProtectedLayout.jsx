import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import InstructorNavbar from "../Navbar/InstructorNavbar";

const InstructorProtectedLayout = () => {
  const { userData } = useSelector(store => store.user);

  if (!userData) return <Navigate to="/" replace />;

  if (userData.role !== "instructor") return <Navigate to="/dashboard" replace />;

  return (
    <>
      <InstructorNavbar />
      <Outlet />
    </>
  );
};

export default InstructorProtectedLayout;
