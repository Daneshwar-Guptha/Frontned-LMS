import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import "./InstructorNavbar.css";

const InstructorNavbar = () => {
  const navigate = useNavigate();

  const logout = () => {
    Cookies.remove("token");
    navigate("/");
  };

  return (
    <nav className="navbar">
      <img
        className="logo-img"
        src="https://cdn-icons-png.flaticon.com/512/921/921347.png"
        alt="Instructor Logo"
        onClick={() => navigate("/instructor/dashboard")}
      />

      <ul className="nav-links">
        <li onClick={() => navigate("/instructor/dashboard")}>Dashboard</li>
        <li onClick={() => navigate("/instructor/courses")}>My Courses</li>
        <li onClick={() => navigate("/instructor/addcourse")}>Add Course</li>
        <li onClick={() => navigate("/instructor/profile")}>Profile</li>
        <li className="logout" onClick={logout}>Logout</li>
      </ul>
    </nav>
  );
};

export default InstructorNavbar;
