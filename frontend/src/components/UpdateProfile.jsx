import React, { useState, useEffect } from "react";

const UpdateProfil = () => {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    userType: "",
    channelName: "",
    channelId: "",
    channelURL: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("id");

    if (token && userId) {
      // Fetch the user data initially
      fetchUserData(userId, token);
    } else {
      setError("User not logged in. Please login again.");
    }
  }, []);

  const fetchUserData = async (userId, token) => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/users/getUser/${userId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setUserData(data); // Set user data if request is successful
      } else {
        const data = await response.json();
        setError(data.message || "Failed to fetch user data.");
      }
    } catch (error) {
      setError("");
    }
  };

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("id");

    if (!token || !userId) {
      setError("User not logged in. Please login again.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3001/api/users/update/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(userData),
        }
      );

      if (response.ok) {
        setMessage("Profile updated successfully!");
      } else {
        const data = await response.json();
        setError(data.message || "Failed to update profile.");
      }
    } catch (error) {
      setError("Error updating profile. Please try again.");
    }
  };

  return (
    <div className="update-profile-container">
      {error && <div className="error">{error}</div>}
      {message && <div className="success">{message}</div>}

      <h2>Update Profile</h2>
      <form onSubmit={handleSubmit} className="update-profile-form">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={userData.username}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={userData.email}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="userType">User Type</label>
            <input
              type="text"
              id="userType"
              name="userType"
              value={userData.userType}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="channelName">Channel Name</label>
            <input
              type="text"
              id="channelName"
              name="channelName"
              value={userData.channelName}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="channelURL">Channel URL</label>
            <input
              type="url"
              id="channelURL"
              name="channelURL"
              value={userData.channelURL}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={userData.password}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-row">
          <button type="submit" className="update-btn">
            Update Profile
          </button>
        </div>
      </form>

      <style jsx>{`
        .update-profile-container {
          width: 100%;
          max-width: 800px;
          margin: 20px auto;
          padding: 20px;
          background: linear-gradient(
            135deg,
            #1a1a1a,
            #0a0a0a
          ); /* Dark gradient */
          border-radius: 12px; /* Rounded corners */
          color: #fff; /* Light text */
        }

        .update-profile-container h2 {
          text-align: center;
          font-size: 28px;
          margin-bottom: 20px;
          color: #fff; /* Light text */
        }

        .update-profile-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .form-row {
          display: flex;
          gap: 20px;
          justify-content: space-between;
        }

        .form-group {
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .form-group label {
          margin-bottom: 8px;
          font-size: 14px;
          color: #ccc; /* Light gray text */
        }

        .form-group input {
          padding: 10px;
          font-size: 16px;
          border: 1px solid #444; /* Dark border */
          border-radius: 6px; /* Rounded corners */
          background-color: #333; /* Dark input background */
          color: #fff; /* Light text */
          transition: border-color 0.3s, box-shadow 0.3s;
        }

        .form-group input:focus {
          border-color: #007bff; /* Accent color on focus */
          box-shadow: 0 0 5px rgba(0, 123, 255, 0.5); /* Subtle glow on focus */
          outline: none;
        }

        .update-btn {
          padding: 12px;
          background-color: #007bff; /* Accent color for buttons */
          color: white;
          border: none;
          border-radius: 6px; /* Rounded corners */
          font-size: 16px;
          cursor: pointer;
          transition: background-color 0.3s;
        }

        .update-btn:hover {
          background-color: #0056b3; /* Darker shade on hover */
        }

        .error {
          color: #ff4d4d; /* Red for errors */
          margin-bottom: 15px;
          text-align: center;
        }

        .success {
          color: #4caf50; /* Green for success messages */
          margin-bottom: 15px;
          text-align: center;
        }

        @media (max-width: 768px) {
          .form-row {
            flex-direction: column; /* Stack inputs vertically on mobile */
          }

          .update-profile-container h2 {
            font-size: 24px; /* Smaller font size */
          }

          .form-group input {
            font-size: 14px; /* Smaller font size */
          }
        }
      `}</style>
    </div>
  );
};

export default UpdateProfil;
