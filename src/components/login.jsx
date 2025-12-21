import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { updateDetails } from "../redux/userSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const navigateSignup = () => navigate("/signup");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:2000/auth/login",
        { email, password },
        { withCredentials: true }
      );

      const user = response.data.userData;   // ⭐ FIX

      // update redux state
      dispatch(updateDetails(user));

      alert(`Logged in as: ${user.email}`);

      // ⭐ redirect based on role
      if (user.role === "user") {
        navigate("/dashboard", { replace: true });
      } else if (user.role === "instructor") {
        navigate("/instructor/dashboard", { replace: true });
      }

    } catch (err) {
      alert(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-sm">
        <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Login
        </h1>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <input
              type="email"
              required
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <input
              type="password"
              required
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-medium py-2 rounded-lg hover:bg-blue-700"
          >
            Login
          </button>

          <p className="text-sm text-center text-gray-600">
            Don’t have an account?
            <span
              className="text-blue-600 hover:underline cursor-pointer"
              onClick={navigateSignup}
            >
              Sign Up
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
