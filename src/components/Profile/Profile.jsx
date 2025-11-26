import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { FaPen } from "react-icons/fa";
import "./Profile.css";
import { updateDetails } from "../../redux/userSlice";

const Profile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.userData);

  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);

  // Upload to backend -> Cloudinary
  const uploadImageToServer = async (file) => {
    const formData = new FormData();
    formData.append("photo", file);

    const res = await fetch("http://localhost:2000/user/profile/photo", {
      method: "PUT",
      body: formData,
      credentials: "include",
    });

    const data = await res.json();
    return data.user;
  };

  // Handle selecting image
  const handleImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file)); // instant preview
    setLoading(true);

    try {
      const updatedUser = await uploadImageToServer(file);
      dispatch(updateDetails(updatedUser));
    } catch (err) {
      console.error("Upload failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile-container">

      <div className="profile-img-wrapper">
        <img
          src={
            preview ||
            user?.profileImage ||   // FINAL FIELD NAME
            "/images/default-profile.png"
          }
          className="profile-img"
        />

        <label htmlFor="uploadPic" className="edit-icon">
          <FaPen size={14} />
        </label>

        <input
          id="uploadPic"
          type="file"
          accept="image/*"
          className="file-input"
          onChange={handleImage}
        />
      </div>

      {loading && <p className="upload-text">Uploading...</p>}

      <h1 className="profile-name">{user?.name}</h1>
      <p className="profile-email">{user?.email}</p>

      <div className="info-box">
        <p><span>Role:</span> {user?.role}</p>
        <p><span>User ID:</span> {user?._id}</p>
        <p><span>Joined:</span> {new Date(user?.createdAt).toLocaleDateString()}</p>
      </div>
    </div>
  );
};

export default Profile;
