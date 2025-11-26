import { useSelector } from "react-redux";
import Carousel from "./Carousel";

import "./Dashboard.css";
import { data } from "react-router-dom";

const Dashboard = () => {
  const Data = useSelector(store=>store.user);
  console.log(Data)
  return (
    <>
      <h1 className="dashboard-heading">Trending Courses</h1>
      <Carousel />
    </>
  );
};

export default Dashboard;
