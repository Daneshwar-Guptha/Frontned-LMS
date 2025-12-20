import "./App.css";
import { Routes, Route } from "react-router-dom";

import Login from "./components/login";
import Dashboard from "./components/Dashboard/MainDashBoard/Dashboard";
import ProtectRoutes from "./components/ProtectRoutes/ProtectedRoutes";
import Profile from "./components/Profile/profile";
import ViewDeatils from "./components/Dashboard/ViewDetails/ViewDeatils";
import ContinueLearning from "./components/MyCourse/continueLearning/ContinueLearning";
import MyCourse from "./components/MyCourse/MyCourse";
import { useSelector } from "react-redux";


function App() {
  const {userData} = useSelector(store=>store.user);

  return (
    <Routes>
      <Route path="/" element={<Login />} />
     {userData?.role=='user' && (<>
     <Route element={<ProtectRoutes />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/viewDetails/:courseId" element={<ViewDeatils />} />
        <Route path="/mycourse" element={<MyCourse />} />
        <Route  path="/continueLearning/:courseId"element={<ContinueLearning />}/>
      </Route>
     </>)}

      
    </Routes>
  );
}

export default App;
