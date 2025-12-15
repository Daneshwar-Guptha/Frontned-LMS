import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./ViewDeatils.css";

/* ---------- Lesson Component ---------- */
const LessonItem = ({ lesson, index }) => {
  const [open, setOpen] = useState(false);
  const [preview, setPreview] = useState(null); // "video" | "pdf"

  return (
    <>
      <div className="lesson-wrapper">
        {/* Lesson Header */}
        <div className="lesson-item" onClick={() => setOpen(!open)}>
          <span className="lesson-title">
            {index + 1}. {lesson.title}
          </span>
          <span className="lesson-duration">{lesson.duration} min</span>
        </div>

        {/* Dropdown */}
        {open && (
          <div className="lesson-dropdown">
            <div className="lesson-dropdown-content">
              <p className="lesson-info">
                📘 Lesson resources
              </p>
            </div>

            <div className="lesson-actions">
              <button
                className="resource-btn"
                onClick={() => setPreview("video")}
              >
                ▶ Watch Video
              </button>

              <button
                className="resource-btn"
                onClick={() => setPreview("pdf")}
              >
                📄 View Cheat Sheet
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ===== MODAL ===== */}
      {preview && (
        <div className="modal-overlay" onClick={() => setPreview(null)}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="close-btn" onClick={() => setPreview(null)}>
              ✕
            </button>

            {preview === "video" && (
              <video
                src={lesson.videoUrl}
                controls
                autoPlay
                className="media-player"
              />
            )}

            {preview === "pdf" && (
              <iframe
                src={lesson.cheatSheetUrl}
                title="Cheat Sheet"
                className="media-player"
              />
            )}
          </div>
        </div>
      )}
    </>
  );
};

/* ---------- View Details ---------- */
const ViewDetails = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔥 NEW STATE
  const [enrollStatus, setEnrollStatus] = useState(null); // "success" | "error"
  const [enrolling, setEnrolling] = useState(false);

  useEffect(() => {
    fetchCourseDetails();
  }, [courseId]);

  const fetchCourseDetails = async () => {
    try {
      const res = await axios.get(
        `http://localhost:2000/user/courses/${courseId}`,
        { withCredentials: true }
      );
      setCourse(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  /* ===== ENROLL API ===== */
  const Enroll = async () => {
    try {
      setEnrolling(true);

      await axios.post(
        `http://localhost:2000/user/courses/${courseId}/enroll`,
        {},
        { withCredentials: true }
      );

      setEnrollStatus("success"); // ✅ success popup
    } catch (error) {
      console.error(error);
      setEnrollStatus("error"); // ❌ error popup
    } finally {
      setEnrolling(false);
    }
  };

  if (loading) return <p className="page-message">Loading course…</p>;
  if (!course) return <p className="page-message">Course not found</p>;

  return (
    <>
      <div className="course-details-container">
        {/* ===== HERO ===== */}
        <div className="course-hero">
          <img
            src={course.coverPhoto}
            alt={course.title}
            className="course-cover"
          />

          <div className="course-hero-content">
            <h1>{course.title}</h1>
            <p>{course.description}</p>
            <span className="price">₹{course.price}</span>
          </div>
        </div>

        {/* ===== CONTENT ===== */}
        <div className="course-content">
          <h2>Course Content</h2>

          {course.sections.map((section, sIndex) => (
            <div key={section._id} className="section-card">
              <h3>📘 Section {sIndex + 1}: {section.title}</h3>

              {section.lessons.map((lesson, lIndex) => (
                <LessonItem
                  key={lesson._id}
                  lesson={lesson}
                  index={lIndex}
                />
              ))}
            </div>
          ))}
        </div>

        {/* ===== STICKY ENROLL BAR ===== */}
        <div className="enroll-bar">
          <div className="enroll-info">
            <span className="enroll-price">₹{course.price}</span>
            <span className="enroll-text">
              Lifetime access • Certificate included
            </span>
          </div>

          <button
            className="enroll-btn"
            onClick={Enroll}
            disabled={enrolling}
          >
            {enrolling ? "Enrolling..." : "Enroll Now"}
          </button>
        </div>
      </div>

      {/* ===== SUCCESS / ERROR POPUP ===== */}
      {enrollStatus && (
        <div className="popup-overlay">
          <div className={`popup ${enrollStatus}`}>
            <h3>
              {enrollStatus === "success"
                ? "🎉 Enrollment Successful!"
                : "❌ Enrollment Failed"}
            </h3>

            <p>
              {enrollStatus === "success"
                ? "You have successfully enrolled in this course."
                : "Something went wrong. Please try again."}
            </p>

            <button
              className="popup-btn"
              onClick={() => setEnrollStatus(null)}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </>
  );
};


export default ViewDetails;
