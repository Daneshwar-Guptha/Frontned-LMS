import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:2000/instructor/courses", {
        withCredentials: true,
      })
      .then((res) => setCourses(res.data))
      .catch(console.log);
  }, []);

  return (
    <div className="p-8 min-h-screen bg-[#0d1a2b] text-white">
      <h1 className="text-2xl font-bold mb-6">My Courses</h1>

      <div className="grid grid-cols-3 gap-6">
        {courses.map((c) => (
          <div
            key={c._id}
            className="bg-[#12223a] p-5 rounded-xl shadow cursor-pointer"
            onClick={() => navigate(`/instructor/course/${c._id}`)}
          >
            <img className="rounded" src={c.thumbnail} alt="" />
            <h3 className="text-lg font-semibold mt-3">{c.title}</h3>
            <p className="text-sm opacity-80">{c.description.slice(0, 60)}...</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseList;
