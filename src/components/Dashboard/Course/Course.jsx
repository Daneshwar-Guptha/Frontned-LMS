import { useNavigate } from "react-router-dom";
import "./Course.css";


const Course = ({ courseData }) => {
  const navigate = useNavigate()
  if (!courseData) return null;


  const { title, description, thumbnail, price, isPublished ,_id} = courseData;
  
  function viewDeatils(){
    navigate(`/viewDetails/${_id}`)

  }

  return (
    <div className="course-card">
      {/* Thumbnail */}
      <div className="course-image-wrapper">
        <img src={thumbnail} alt={title} className="course-image" />

        {!isPublished && (
          <span className="course-badge">Draft</span>
        )}
      </div>

      {/* Content */}
      <div className="course-body">
        <h3 className="course-title">{title}</h3>

        <p className="course-description">
          {description.length > 90
            ? description.slice(0, 90) + "..."
            : description}
        </p>

        <div className="course-footer">
          <span className="course-price">₹{price}</span>
          <button className="course-btn" onClick={viewDeatils}>View Details</button>
        </div>
      </div>
    </div>
  );
};

export default Course;
