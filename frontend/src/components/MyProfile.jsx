import React, { useState, useEffect } from "react";

const MyProfile = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch user data on component mount
  useEffect(() => {
    const userId = localStorage.getItem("id");
    const token = localStorage.getItem("token");

    if (userId && token) {
      fetchUserData(userId, token);
    } else {
      setError("User not authenticated. Please log in.");
      setLoading(false);
    }
  }, []);

  // Fetch user data from the backend
  const fetchUserData = async (userId, token) => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/users/getUser/${userId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Send the token in the Authorization header
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
      setError("Error fetching user data. Please try again.");
    } finally {
      setLoading(false); // Stop loading after the request is complete
    }
  };

  // Render the dashboard
  return (
    <div className="dashboard-container">
      <h1>My Profile</h1>
      {error && <p className="error-message">{error}</p>}

      {loading ? (
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading...</p>
        </div>
      ) : userData ? (
        <div className="profile-grid">
          {/* User Information */}
          <div className="profile-box">
            <h2>Username</h2>
            <p>{userData.username}</p>
          </div>
          <div className="profile-box">
            <h2>Email</h2>
            <p>{userData.email}</p>
          </div>
          <div className="profile-box">
            <h2>User Type</h2>
            <p>{userData.userType}</p>
          </div>
          <div className="profile-box">
            <h2>Verified</h2>
            <p>{userData.verified ? "Yes" : "No"}</p>
          </div>

          {/* Channel Information */}
          <div className="profile-box">
            <h2>Channel Name</h2>
            <p>{userData.channelName}</p>
          </div>
          <div className="profile-box">
            <h2>Channel ID</h2>
            <p>{userData.channelId}</p>
          </div>
          <div className="profile-box">
            <h2>Channel URL</h2>
            <a
              href={userData.channelURL}
              target="_blank"
              rel="noopener noreferrer"
            >
              {userData.channelURL}
            </a>
          </div>
        </div>
      ) : (
        <p>No data found.</p>
      )}

      <style jsx>{`
        .dashboard-container {
          background: linear-gradient(
            135deg,
            #1a1a1a,
            #0a0a0a
          ); /* Dark gradient */
          padding: 40px 20px;
          max-width: 1200px; /* Limit width for better readability */
          margin: 0 auto;
          font-family: "Arial", sans-serif;
          color: #fff; /* Light text */
          min-height: 100vh;
        }

        h1 {
          text-align: center;
          color: #fff; /* Light text */
          margin-bottom: 30px;
          font-size: 32px;
          font-weight: 700;
        }

        .error-message {
          color: #ff4d4d;
          text-align: center;
          margin: 10px 0;
          font-size: 16px;
        }

        .loading-spinner {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          margin-top: 50px;
        }

        .spinner {
          border: 4px solid rgba(255, 255, 255, 0.1); /* Light spinner */
          border-left-color: #007bff;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        .profile-grid {
          display: grid;
          grid-template-columns: repeat(
            auto-fit,
            minmax(250px, 1fr)
          ); /* Responsive grid */
          gap: 20px; /* Spacing between boxes */
          padding: 20px;
        }

        .profile-box {
          background: #2a2a2a; /* Dark card background */
          border-radius: 12px; /* Rounded corners */
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3); /* Subtle shadow */
          padding: 20px;
          text-align: center;
          transition: transform 0.3s, box-shadow 0.3s;
        }

        .profile-box:hover {
          transform: translateY(-5px); /* Lift effect on hover */
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.4); /* Enhanced shadow on hover */
        }

        .profile-box h2 {
          color: #007bff; /* Accent color for headings */
          margin-bottom: 15px;
          font-size: 20px;
          font-weight: 600;
        }

        .profile-box p {
          color: #ccc; /* Light gray text */
          font-size: 16px;
          margin: 0;
        }

        .profile-box a {
          color: #007bff; /* Accent color for links */
          text-decoration: none;
          font-size: 16px;
        }

        .profile-box a:hover {
          text-decoration: underline;
        }

        @media (max-width: 768px) {
          .profile-grid {
            grid-template-columns: repeat(
              auto-fit,
              minmax(200px, 1fr)
            ); /* Smaller boxes for mobile */
          }

          h1 {
            font-size: 28px; /* Smaller font size */
          }

          .profile-box h2 {
            font-size: 18px; /* Smaller font size */
          }

          .profile-box p,
          .profile-box a {
            font-size: 14px; /* Smaller font size */
          }
        }
      `}</style>
    </div>
  );
};

export default MyProfile;
