import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const CourseDetails = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:2000/instructor/course/${courseId}`, {
        withCredentials: true,
      })
      .then((res) => setCourse(res.data))
      .catch(console.log);
  }, []);

  if (!course) return <p>Loading...</p>;

  return (
    <div className="p-8 bg-[#0d1a2b] min-h-screen text-white">
      <h1 className="text-3xl font-bold">{course.title}</h1>
      <p className="opacity-80">{course.description}</p>

      <h2 className="text-xl font-semibold mt-8">Sections</h2>

      {course.sections.length === 0 ? (
        <p>No sections yet</p>
      ) : (
        <ul className="space-y-4 mt-3">
          {course.sections.map((s) => (
            <li key={s._id} className="bg-[#12223a] p-4 rounded-xl">
              <h3 className="font-semibold">{s.title}</h3>

              <ul className="ml-6 mt-2 list-disc">
                {s.lessons.map((l) => (
                  <li key={l._id}>{l.title} – {l.duration} min</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CourseDetails;
