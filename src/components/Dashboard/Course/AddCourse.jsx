import { useState } from "react";
import axios from "axios";
import "./AddCourse.css";

const AddCourse = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
  });

  const [thumbnail, setThumbnail] = useState(null);
  const [coverPhoto, setCoverPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [previewThumb, setPreviewThumb] = useState("");
  const [previewCover, setPreviewCover] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!thumbnail || !coverPhoto) {
      setError("Thumbnail and cover photo are required");
      setLoading(false);
      return;
    }

    try {
      const fd = new FormData();
      fd.append("title", form.title);
      fd.append("description", form.description);
      fd.append("price", form.price);
      fd.append("thumbnail", thumbnail);
      fd.append("coverPhoto", coverPhoto);

      const res = await axios.post(
        "http://localhost:2000/instructor/addCourse",
        fd,
        { withCredentials: true }
      );

      alert("Course created successfully");
      setForm({ title: "", description: "", price: "" });
      setPreviewThumb("");
      setPreviewCover("");
      setError("");

    } catch (err) {
      setError(err.response?.data?.error || "Failed to create course");
    }

    setLoading(false);
  };

  return (
    <div className="addcourse-wrapper">
      <form className="addcourse-form" onSubmit={handleSubmit}>
        <h2>Create New Course</h2>

        {error && <p className="error">{error}</p>}

        <label>Course Title</label>
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Enter course title"
          required
        />

        <label>Description</label>
        <textarea
          name="description"
          rows="4"
          value={form.description}
          onChange={handleChange}
          placeholder="Enter course description"
          required
        />

        <label>Price (₹)</label>
        <input
          type="number"
          name="price"
          value={form.price}
          onChange={handleChange}
          required
        />

        <label>Upload Thumbnail</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            setThumbnail(e.target.files[0]);
            setPreviewThumb(URL.createObjectURL(e.target.files[0]));
          }}
        />

        {previewThumb && <img className="preview-img" src={previewThumb} alt="thumbnail preview" />}

        <label>Upload Cover Photo</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            setCoverPhoto(e.target.files[0]);
            setPreviewCover(URL.createObjectURL(e.target.files[0]));
          }}
        />

        {previewCover && <img className="preview-img" src={previewCover} alt="thumbnail preview" />}

        <button type="submit" disabled={loading}>
          {loading ? "Uploading..." : "Create Course"}
        </button>
      </form>
    </div>
  );
};

export default AddCourse;
