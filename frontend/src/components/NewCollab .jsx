import React, { useState } from "react";
import axios from "axios";

const NewCollab = () => {
  const [collabData, setCollabData] = useState({
    title: "",
    description: "",
    contentCategory: "",
    collaborationType: "",
    timeline: "",
    isOpen: true,
    email: "",
  });

  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCollabData({
      ...collabData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    const token = localStorage.getItem("authToken");
    if (!token) {
      setError("User not logged in. Please login again.");
      setLoading(false);
      return;
    }

    try {
      const userId = localStorage.getItem("id");
      const response = await axios.post(
        `http://localhost:3001/api/users/collabration/addCollab/${userId}`,
        collabData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 200) {
        setMessage("Collaboration posted successfully!");
        setCollabData({
          title: "",
          description: "",
          contentCategory: "",
          collaborationType: "",
          timeline: "",
          isOpen: true,
          email: "",
        });
      }
    } catch (error) {
      setError("Failed to post collaboration. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="new-collab-container">
      {error && <div className="error">{error}</div>}
      {message && <div className="success">{message}</div>}

      <h2>Post a Collaboration</h2>
      <form onSubmit={handleSubmit} className="new-collab-form">
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={collabData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            value={collabData.description}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Content Category</label>
          <input
            type="text"
            name="contentCategory"
            value={collabData.contentCategory}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Collaboration Type</label>
          <input
            type="text"
            name="collaborationType"
            value={collabData.collaborationType}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Timeline</label>
          <input
            type="text"
            name="timeline"
            value={collabData.timeline}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={collabData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Is Open?</label>
          <input
            type="checkbox"
            name="isOpen"
            checked={collabData.isOpen}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? "Posting..." : "Post Collaboration"}
        </button>
      </form>

      <style jsx>{`
        .new-collab-container {
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
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3); /* Subtle shadow */
          color: #fff; /* Light text */
        }

        .new-collab-container h2 {
          text-align: center;
          font-size: 28px;
          margin-bottom: 20px;
          color: #fff; /* Light text */
        }

        .new-collab-form {
          display: flex;
          flex-direction: column;
          gap: 20px; /* Spacing between form groups */
        }

        .form-group {
          display: flex;
          flex-direction: column;
        }

        .form-group label {
          margin-bottom: 8px;
          font-size: 14px;
          color: #ccc; /* Light gray text */
        }

        .form-group input,
        .form-group textarea {
          padding: 10px;
          font-size: 16px;
          border: 1px solid #444; /* Dark border */
          border-radius: 6px; /* Rounded corners */
          background-color: #333; /* Dark input background */
          color: #fff; /* Light text */
          transition: border-color 0.3s, box-shadow 0.3s;
        }

        .form-group input:focus,
        .form-group textarea:focus {
          border-color: #007bff; /* Accent color on focus */
          box-shadow: 0 0 5px rgba(0, 123, 255, 0.5); /* Subtle glow on focus */
          outline: none;
        }

        .form-group textarea {
          resize: vertical;
          min-height: 100px;
        }

        .form-group input[type="checkbox"] {
          width: 20px;
          height: 20px;
          margin-top: 5px;
        }

        .submit-btn {
          padding: 12px;
          background-color: #007bff; /* Accent color for buttons */
          color: white;
          border: none;
          border-radius: 6px; /* Rounded corners */
          font-size: 16px;
          cursor: pointer;
          transition: background-color 0.3s;
        }

        .submit-btn:hover {
          background-color: #0056b3; /* Darker shade on hover */
        }

        .submit-btn:disabled {
          background-color: #555; /* Disabled button background */
          cursor: not-allowed;
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
          .new-collab-container h2 {
            font-size: 24px; /* Smaller font size */
          }

          .form-group input,
          .form-group textarea {
            font-size: 14px; /* Smaller font size */
          }
        }
      `}</style>
    </div>
  );
};

export default NewCollab;
