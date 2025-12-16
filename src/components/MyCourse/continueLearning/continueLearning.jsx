import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./ContinueLearning.css";

/* ---------- Lesson Component ---------- */
const LessonItem = ({ lesson, index }) => {
  const [open, setOpen] = useState(false);
  const [preview, setPreview] = useState(null); // "video" | "pdf"

  return (
    <>
      <div className="lesson-wrapper">
        <div className="lesson-item" onClick={() => setOpen(!open)}>
          <span className="lesson-title">
            {index + 1}. {lesson.title}
          </span>
          <span className="lesson-duration">{lesson.duration} min</span>
        </div>

        {open && (
          <div className="lesson-dropdown">
            <p className="lesson-info">📘 Lesson resources</p>

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

/* ---------- Continue Learning ---------- */
const ContinueLearning = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

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
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p className="page-message">Loading course…</p>;
  if (!course) return <p className="page-message">Course not found</p>;

  return (
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
        </div>
      </div>

      {/* ===== CONTENT ===== */}
      <div className="course-content">
        <h2>Course Content</h2>

        {course.sections.map((section, sIndex) => (
          <div key={section._id} className="section-card">
            <h3>
              📘 Section {sIndex + 1}: {section.title}
            </h3>

            {section.lessons.length === 0 && (
              <p className="empty-lessons">No lessons available</p>
            )}

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
    </div>
  );
};

export default ContinueLearning;
