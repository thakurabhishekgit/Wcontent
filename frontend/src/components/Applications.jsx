import React, { useState, useEffect } from "react";

const MyOpportunities = () => {
  const [opportunities, setOpportunities] = useState([]);
  const [selectedOpportunity, setSelectedOpportunity] = useState(null);
  const [applications, setApplications] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const userId = localStorage.getItem("id");
  const token = localStorage.getItem("token");

  // Fetch all opportunities posted by the user
  useEffect(() => {
    if (!userId || !token) {
      setError("User not logged in. Please login again.");
      return;
    }

    const fetchOpportunities = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/api/users/opportunities/getMyOpportunities/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setOpportunities(data);
        } else {
          setError("Failed to fetch opportunities.");
        }
      } catch (error) {
        setError("Error fetching opportunities. Please try again.");
      }
    };

    fetchOpportunities();
  }, [userId, token]);

  // Fetch applications for a specific opportunity
  const fetchApplications = async (oppId) => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/users/application/opportunity/${oppId}/applicants`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setApplications(data);
      } else {
        setError("Failed to fetch applications.");
      }
    } catch (error) {
      setError("Error fetching applications. Please try again.");
    }
  };

  // Handle clicking on an opportunity card
  const handleOpportunityClick = (opportunity) => {
    setSelectedOpportunity(opportunity);
    setSelectedApplication(null); // Reset selected application
    fetchApplications(opportunity.id);
  };

  // Handle clicking on an application card
  const handleApplicationClick = (application) => {
    setSelectedApplication(application);
  };

  return (
    <div className="my-opportunities-container">
      {error && <div className="error">{error}</div>}
      {message && <div className="success">{message}</div>}

      <h2>My Posted Opportunities</h2>
      <div className="opportunities-list">
        {opportunities.map((opportunity) => (
          <div
            key={opportunity.id}
            className="opportunity-card"
            onClick={() => handleOpportunityClick(opportunity)}
          >
            <h3>{opportunity.title}</h3>
            <p>{opportunity.description}</p>
            <div className="opportunity-meta">
              <p>
                <strong>Location:</strong> {opportunity.location}
              </p>
              <p>
                <strong>Type:</strong> {opportunity.type}
              </p>
              <p>
                <strong>Salary:</strong> {opportunity.salaryRange}
              </p>
            </div>
            <button className="view-details-btn">View Details</button>
          </div>
        ))}
      </div>

      {selectedOpportunity && (
        <div className="opportunity-details">
          <h2>{selectedOpportunity.title}</h2>
          <p>{selectedOpportunity.description}</p>
          <div className="details-meta">
            <p>
              <strong>Requirements:</strong> {selectedOpportunity.requirements}
            </p>
            <p>
              <strong>Location:</strong> {selectedOpportunity.location}
            </p>
            <p>
              <strong>Type:</strong> {selectedOpportunity.type}
            </p>
            <p>
              <strong>Salary Range:</strong> {selectedOpportunity.salaryRange}
            </p>
          </div>

          <h3>Applications Received</h3>
          <div className="applications-list">
            {applications.map((application) => (
              <div
                key={application.email}
                className="application-card"
                onClick={() => handleApplicationClick(application)}
              >
                <h4>{application.name}</h4>
                <p>
                  <strong>Email:</strong> {application.email}
                </p>
                <p>
                  <strong>Applied on:</strong> {application.applicationDate}
                </p>
                <button className="view-application-btn">
                  View Application
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedApplication && (
        <div className="application-details">
          <h3>Application Details</h3>
          <p>
            <strong>Name:</strong> {selectedApplication.name}
          </p>
          <p>
            <strong>Email:</strong> {selectedApplication.email}
          </p>
          <p>
            <strong>Resume:</strong>{" "}
            <a
              href={selectedApplication.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              View Resume
            </a>
          </p>
          <p>
            <strong>Application Date:</strong>{" "}
            {selectedApplication.applicationDate}
          </p>
        </div>
      )}

      <style jsx>{`
        .my-opportunities-container {
          width: 100%;
          max-width: 1200px;
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

        .my-opportunities-container h2 {
          text-align: center;
          font-size: 28px;
          margin-bottom: 20px;
          color: #fff; /* Light text */
        }

        .opportunities-list {
          display: grid;
          grid-template-columns: repeat(
            auto-fit,
            minmax(300px, 1fr)
          ); /* Responsive grid */
          gap: 20px; /* Spacing between cards */
        }

        .opportunity-card {
          background: #2a2a2a; /* Dark card background */
          border-radius: 12px; /* Rounded corners */
          padding: 20px;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3); /* Subtle shadow */
          transition: transform 0.3s, box-shadow 0.3s;
        }

        .opportunity-card:hover {
          transform: translateY(-5px); /* Lift effect on hover */
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.4); /* Enhanced shadow on hover */
        }

        .opportunity-card h3 {
          font-size: 20px;
          margin-bottom: 10px;
          color: #007bff; /* Accent color for headings */
        }

        .opportunity-card p {
          font-size: 14px;
          color: #ccc; /* Light gray text */
        }

        .opportunity-meta {
          margin-top: 10px;
          font-size: 14px;
          color: #999; /* Light gray text */
        }

        .view-details-btn {
          margin-top: 15px;
          padding: 10px 20px;
          background-color: #007bff; /* Accent color for buttons */
          color: #fff; /* Light text */
          border: none;
          border-radius: 6px; /* Rounded corners */
          cursor: pointer;
          transition: background-color 0.3s;
        }

        .view-details-btn:hover {
          background-color: #0056b3; /* Darker shade on hover */
        }

        .opportunity-details {
          margin-top: 20px;
          padding: 20px;
          background: #2a2a2a; /* Dark background */
          border-radius: 12px; /* Rounded corners */
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3); /* Subtle shadow */
        }

        .opportunity-details h2 {
          font-size: 24px;
          margin-bottom: 15px;
          color: #007bff; /* Accent color for headings */
        }

        .opportunity-details p {
          font-size: 16px;
          color: #ccc; /* Light gray text */
        }

        .details-meta {
          margin-top: 10px;
          font-size: 14px;
          color: #999; /* Light gray text */
        }

        .applications-list {
          display: grid;
          grid-template-columns: repeat(
            auto-fit,
            minmax(250px, 1fr)
          ); /* Responsive grid */
          gap: 20px; /* Spacing between cards */
          margin-top: 20px;
        }

        .application-card {
          background: #333; /* Dark card background */
          border-radius: 12px; /* Rounded corners */
          padding: 20px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3); /* Subtle shadow */
          cursor: pointer;
          transition: transform 0.3s, box-shadow 0.3s;
        }

        .application-card:hover {
          transform: translateY(-5px); /* Lift effect on hover */
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.4); /* Enhanced shadow on hover */
        }

        .application-card h4 {
          font-size: 18px;
          margin-bottom: 10px;
          color: #007bff; /* Accent color for headings */
        }

        .application-card p {
          font-size: 14px;
          color: #ccc; /* Light gray text */
        }

        .view-application-btn {
          margin-top: 15px;
          padding: 10px 20px;
          background-color: #007bff; /* Accent color for buttons */
          color: #fff; /* Light text */
          border: none;
          border-radius: 6px; /* Rounded corners */
          cursor: pointer;
          transition: background-color 0.3s;
        }

        .view-application-btn:hover {
          background-color: #0056b3; /* Darker shade on hover */
        }

        .application-details {
          margin-top: 20px;
          padding: 20px;
          background: #2a2a2a; /* Dark background */
          border-radius: 12px; /* Rounded corners */
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3); /* Subtle shadow */
        }

        .application-details h3 {
          font-size: 20px;
          margin-bottom: 15px;
          color: #007bff; /* Accent color for headings */
        }

        .application-details p {
          font-size: 16px;
          color: #ccc; /* Light gray text */
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
          .opportunities-list {
            grid-template-columns: repeat(
              auto-fit,
              minmax(250px, 1fr)
            ); /* Smaller cards for mobile */
          }

          .opportunity-card h3 {
            font-size: 18px; /* Smaller font size */
          }

          .opportunity-card p {
            font-size: 12px; /* Smaller font size */
          }

          .opportunity-details h2 {
            font-size: 20px; /* Smaller font size */
          }

          .opportunity-details p {
            font-size: 14px; /* Smaller font size */
          }
        }
      `}</style>
    </div>
  );
};

export default MyOpportunities;
