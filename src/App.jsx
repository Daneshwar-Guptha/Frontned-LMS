import "./App.css";
import { Routes, Route } from "react-router-dom";

import Login from "./components/login";
import Dashboard from "./components/Dashboard/MainDashBoard/Dashboard";
import ProtectRoutes from "./components/ProtectRoutes/ProtectedRoutes";
import Profile from "./components/Profile/profile";
import ViewDeatils from "./components/Dashboard/ViewDetails/ViewDeatils";
import ContinueLearning from "./components/MyCourse/continueLearning/ContinueLearning";
import MyCourse from "./components/MyCourse/MyCourse";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route element={<ProtectRoutes />}>
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/viewDetails/:courseId" element={<ViewDeatils />} />
        <Route path="/mycourse" element={<MyCourse />} />
        <Route  path="/continueLearning/:courseId"element={<ContinueLearning />}/>
      </Route>
    </Routes>
  );
}

export default App;
