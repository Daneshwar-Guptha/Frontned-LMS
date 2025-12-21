import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const InstructorDashboard = () => {
  const { userData } = useSelector((store) => store.user);
  const [stats, setStats] = useState({ courses: 0, students: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get(
          "http://localhost:2000/instructor/courses",
          { withCredentials: true }
        );

        const courses = res.data;

        let count = 0;
        for (let c of courses) count += c.enrollCount ?? 0;

        setStats({ courses: courses.length, students: count });

      } catch (err) {
        console.log(err);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="p-8 text-white bg-[#0d1a2b] min-h-screen">
      <h1 className="text-3xl font-bold mb-6">
        Welcome Instructor, {userData?.name}
      </h1>

      <div className="grid grid-cols-2 gap-6 max-w-xl">
        <div className="p-5 bg-[#12223a] rounded-xl shadow">
          <h2 className="text-xl font-semibold">Total Courses</h2>
          <p className="text-4xl font-bold mt-3">{stats.courses}</p>
        </div>

        <div className="p-5 bg-[#12223a] rounded-xl shadow">
          <h2 className="text-xl font-semibold">Total Students</h2>
          <p className="text-4xl font-bold mt-3">{stats.students}</p>
        </div>
      </div>
    </div>
  );
};

export default InstructorDashboard;
