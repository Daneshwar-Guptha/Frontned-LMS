import {  useNavigate } from "react-router-dom";
import "./Navbar.css";
import Cookies from 'js-cookie';
const Navbar = () => {
  const navigate = useNavigate()
  
  const logout = ()=>{
    Cookies.remove("token")
    navigate("/")
  }
  const profile = ()=>{
    navigate("/Profile");
  }
  const dashboard = ()=>{
    navigate("/dashboard")
  }
  return (
    <nav className="navbar">
     <img className="logo-img" src= "https://cdn-icons-png.flaticon.com/512/16847/16847436.png"/>

      <ul className="nav-links">
        <li onClick={dashboard}>Dashboard</li>
        <li>My Courses</li>
        <li>Live Classes</li>
        <li>Assignments</li>
        <li>Exams & Results</li>
        <li>Certificates</li>
        <li onClick={profile}>Profile</li>
        <li className="logout" onClick={logout}>Logout</li>
      </ul>
    </nav>
  );
};

export default Navbar;
