import { useEffect, useState } from "react";
import axios from "axios";
import "../MyCourse.css";
import { useNavigate } from "react-router-dom";

const InstructorMyCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchCourses();
  }, []);
  
  const fetchCourses = async () => {
    try {
      const res = await axios.get("http://localhost:2000/instructor/courses",{withCredentials:true});
      setCourses(res.data);
    } catch (err) {
      console.error("Error fetching courses:", err);
      setError("Failed to load courses.");
    }
    
    setLoading(false);
  };

  const openCourse = (courseId) => {
    navigate(`/instructor/course/${courseId}`);
  };

  return (
    <div className="instructor-courses-container">
      <h1 className="title">My Created Courses</h1>

      {loading && <p className="loading">Loading courses...</p>}
      {error && <p className="error">{error}</p>}

      {!loading && courses.length === 0 && (
        <p className="empty">You haven't uploaded any courses yet.</p>
      )}

      {!loading && courses.length > 0 && (
        <div className="course-grid">
          {courses.map((course) => (
            <div
              key={course._id}
              className="course-card"
              onClick={() => openCourse(course._id)}
            >
              <img
                src={course.thumbnail || "/placeholder.png"}
                alt="course thumbnail"
                className="thumb"
              />

              <div className="card-body">
                <h3 className="course-title">{course.title}</h3>

                <p className="course-price">₹{course.price}</p>

                <span
                  className={`badge ${course.isPublished ? "published" : "draft"}`}
                >
                  {course.isPublished ? "Published" : "Draft"}
                </span>

                <small className="timestamp">
                  Created on {new Date(course.createdAt).toLocaleDateString()}
                </small>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default InstructorMyCourses;
