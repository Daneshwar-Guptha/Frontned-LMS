import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

import Carousel from "../Coursel/Carousel";
import "./Dashboard.css";
import Course from "../Course/Course";

const Dashboard = () => {
  const [courseData, setCourseData] = useState([]);
  const [loading, setLoading] = useState(true);

  const getCourseData = async () => {
    try {
      const response = await axios.get("http://localhost:2000/user/courses", {
        withCredentials: true,
      });

      setCourseData(response.data);
    } catch (error) {
      console.error("Failed to fetch courses:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCourseData();
  }, []);
 

 return (
  <>
    <h1 className="dashboard-heading">Trending Courses</h1>

    {/* ONE container controls left & right margin */}
    <div className="dashboard-container">

      <Carousel />

      {loading ? (
        <p className="loading-text">Loading courses...</p>
      ) : courseData.length === 0 ? (
        <p className="empty-text">No courses available</p>
      ) : (
        <div className="courses-container">
          {courseData.map((course) => (
            <Course key={course._id} courseData={course} />
          ))}
        </div>
      )}

    </div>
  </>
);

};

export default Dashboard;
