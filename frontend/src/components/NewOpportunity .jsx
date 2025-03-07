import React, { useState } from "react";

const NewOpportunity = () => {
  const [opportunityData, setOpportunityData] = useState({
    title: "",
    description: "",
    requirements: "",
    location: "",
    type: "",
    salaryRange: "",
    isFilled: false,
    email: "",
  });

  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    setOpportunityData({
      ...opportunityData,
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
        `http://localhost:3001/api/users/opportunities/opportunity/${userId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(opportunityData),
        }
      );

      if (response.ok) {
        setMessage("Opportunity posted successfully!");
      } else {
        const data = await response.json();
        setError(data.message || "Failed to post opportunity.");
      }
    } catch (error) {
      setError("Error posting opportunity. Please try again.");
    }
  };

  return (
    <div className="new-opportunity-container">
      {error && <div className="error">{error}</div>}
      {message && <div className="success">{message}</div>}

      <h2>Post a New Opportunity</h2>
      <form onSubmit={handleSubmit} className="new-opportunity-form">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={opportunityData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="location">Location</label>
            <input
              type="text"
              id="location"
              name="location"
              value={opportunityData.location}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={opportunityData.description}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="salaryRange">Salary Range</label>
            <input
              type="text"
              id="salaryRange"
              name="salaryRange"
              value={opportunityData.salaryRange}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="requirements">Requirements</label>
            <textarea
              id="requirements"
              name="requirements"
              value={opportunityData.requirements}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="type">Job Type</label>
            <input
              type="text"
              id="type"
              name="type"
              value={opportunityData.type}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="email">Contact Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={opportunityData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="isFilled">Is Filled?</label>
            <input
              type="checkbox"
              id="isFilled"
              name="isFilled"
              checked={opportunityData.isFilled}
              onChange={() =>
                setOpportunityData({
                  ...opportunityData,
                  isFilled: !opportunityData.isFilled,
                })
              }
            />
          </div>
        </div>

        <div className="form-row">
          <button type="submit" className="submit-btn">
            Post Opportunity
          </button>
        </div>
      </form>

      <style jsx>{`
        .new-opportunity-container {
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

        .new-opportunity-container h2 {
          text-align: center;
          font-size: 28px;
          margin-bottom: 20px;
          color: #fff; /* Light text */
        }

        .new-opportunity-form {
          display: flex;
          flex-direction: column;
          gap: 20px; /* Spacing between form groups */
        }

        .form-row {
          display: flex;
          gap: 20px; /* Spacing between form groups */
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
          min-height: 100px;
          resize: vertical;
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

          .new-opportunity-container h2 {
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

export default NewOpportunity;
