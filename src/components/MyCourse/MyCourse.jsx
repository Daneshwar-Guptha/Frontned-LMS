import axios from "axios";
import { useEffect, useState } from "react";
import "./MyCourse.css";
import { useNavigate } from "react-router-dom";


const MyCourse = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate()

  useEffect(() => {
    fetchEnrollments();
  }, []);

  const fetchEnrollments = async () => {
    
    try {
      const response = await axios.get(
        "http://localhost:2000/user/courses/mycourses",
        { withCredentials: true }
      );

      const uniqueCourses = Array.from(
        new Map(
          response.data.map(item => [item.courseId._id, item])
        ).values()
      );

      setEnrollments(uniqueCourses);
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p className="loading-text">Loading your courses...</p>;
  }
  const continueLearning = (courseId)=>{
   navigate(`/continueLearning/${courseId}`)
   
    
  }

  return (
    <div className="mycourse-container">
      <h2 className="page-title">My Courses</h2>

      {enrollments.length === 0 ? (
        <p className="empty-text">You haven’t enrolled in any courses yet.</p>
      ) : (
        <div className="course-grid">
          {enrollments.map(enrollment => {
            const course = enrollment.courseId;

            return (
              <div className="course-card" key={enrollment._id}>
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="course-thumbnail"
                />

                <div className="course-content">
                  <h3 className="course-title">{course.title}</h3>

                  <p className="course-description">
                    {course.description.length > 120
                      ? course.description.slice(0, 120) + "..."
                      : course.description}
                  </p>

                  <div className="course-footer">
                    <button className="continue-btn" onClick={()=>{continueLearning(course._id)}}>
                      Continue Learning
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyCourse;
