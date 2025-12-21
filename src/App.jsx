import { Routes, Route } from "react-router-dom";
import Login from "./components/login";

import UserProtectedLayout from "./components/ProtectRoutes/UserProtectedLayout";
import InstructorProtectedLayout from "./components/ProtectRoutes/InstructorProtectedLayout";

import Dashboard from "./components/Dashboard/MainDashBoard/Dashboard";
import Profile from "./components/Profile/profile";
import ViewDeatils from "./components/Dashboard/ViewDetails/ViewDeatils";
import ContinueLearning from "./components/MyCourse/continueLearning/ContinueLearning";

import InstructorDashboard from "./components/Dashboard/InstructorDashboard/InstructorDashboard";
import AddCourse from "./components/Dashboard/Course/AddCourse";
import CourseList from "./components/Dashboard/Course/CourseList";
import InstructorMyCourses from "./components/MyCourse/Instructor/MyCourses";
import MyCourse from "./components/MyCourse/MyCourse"


function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      {/* User Routes */}
      <Route element={<UserProtectedLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/viewDetails/:courseId" element={<ViewDeatils />} />
        <Route path="/mycourse" element={<MyCourse/>} />
        <Route path="/continueLearning/:courseId" element={<ContinueLearning />} />
      </Route>

      {/* Instructor Routes */}
      <Route element={<InstructorProtectedLayout />}>
        <Route path="/instructor/dashboard" element={<InstructorDashboard />} />
          <Route path="/instructor/addcourse" element={<AddCourse/>} />
          <Route path="/instructor/courses" element={<InstructorMyCourses/>} />
      </Route>
    </Routes>
  );
}

export default App;
