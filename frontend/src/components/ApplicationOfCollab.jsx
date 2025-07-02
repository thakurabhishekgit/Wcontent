import React, { useState, useEffect } from "react";

const ApplcationOfCollab = () => {
  const [collaborations, setCollaborations] = useState([]);
  const [selectedCollaboration, setSelectedCollaboration] = useState(null);
  const [collabRequests, setCollabRequests] = useState([]);
  const [error, setError] = useState(null);
  

  const userId = localStorage.getItem("id");
  const token = localStorage.getItem("token");

  // Fetch all collaborations posted by the user
  useEffect(() => {
    if (!userId || !token) {
      setError("User not logged in. Please login again.");
      return;
    }

    const fetchCollaborations = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/api/users/collabration/getCollabOfUser/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setCollaborations(data);
        } else {
          setError("Failed to fetch collaborations.");
        }
      } catch (error) {
        setError("Error fetching collaborations. Please try again.");
      }
    };

    fetchCollaborations();
  }, [userId, token]);

  // Fetch collaboration requests for a specific collaboration
  const fetchCollabRequests = async (collabId) => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/users/collabration/getCollabRequests/${collabId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setCollabRequests(data);
      } else {
        setError("Failed to fetch collaboration requests.");
      }
    } catch (error) {
      setError("Error fetching collaboration requests. Please try again.");
    }
  };

  // Handle clicking on a collaboration card
  const handleCollaborationClick = (collab) => {
    setSelectedCollaboration(collab);
    setCollabRequests([]); // Reset requests
    fetchCollabRequests(collab._id); // Use the _id field from MongoDB
  };

  return (
    <div className="my-collaborations-container">
      {error && <div className="error">{error}</div>}

      <h2>My Collaborations</h2>
      <div className="collaborations-list">
        {collaborations.map((collab) => (
          <div
            key={collab._id} // Use MongoDB _id as the key
            className="collaboration-card"
            onClick={() => handleCollaborationClick(collab)}
          >
            <h3>{collab.title}</h3>
            <p>{collab.description}</p>
            <div className="collaboration-meta">
              <p>
                <strong>Category:</strong> {collab.contentCategory}
              </p>
              <p>
                <strong>Type:</strong> {collab.collaborationType}
              </p>
              <p>
                <strong>Timeline:</strong> {collab.timeline}
              </p>
            </div>
            <button className="view-details-btn">View Details</button>
          </div>
        ))}
      </div>

      {selectedCollaboration && (
        <div className="collaboration-details">
          <h2>{selectedCollaboration.title}</h2>
          <p>{selectedCollaboration.description}</p>
          <div className="details-meta">
            <p>
              <strong>Category:</strong> {selectedCollaboration.contentCategory}
            </p>
            <p>
              <strong>Type:</strong> {selectedCollaboration.collaborationType}
            </p>
            <p>
              <strong>Timeline:</strong> {selectedCollaboration.timeline}
            </p>
            <p>
              <strong>Email:</strong> {selectedCollaboration.email}
            </p>
            <p>
              <strong>Status:</strong>{" "}
              {selectedCollaboration.open ? "Open" : "Closed"}
            </p>
          </div>

          <h3>Collaboration Requests</h3>
          <div className="requests-list">
            {collabRequests.map((request) => (
              <div key={request.requesterId} className="request-card">
                <h4>{request.requesterName}</h4>
                <p>
                  <strong>Email:</strong> {request.requesterEmail}
                </p>
                <p>
                  <strong>Message:</strong> {request.message}
                </p>
                <p>
                  <strong>Applied on:</strong> {request.appliedDate}
                </p>
                <p>
                  <strong>Status:</strong> {request.status}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      <style jsx>{`
        .my-collaborations-container {
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

        .my-collaborations-container h2 {
          text-align: center;
          font-size: 28px;
          margin-bottom: 20px;
          color: #fff; /* Light text */
        }

        .collaborations-list {
          display: grid;
          grid-template-columns: repeat(
            auto-fit,
            minmax(300px, 1fr)
          ); /* Responsive grid */
          gap: 20px; /* Spacing between cards */
        }

        .collaboration-card {
          background: #2a2a2a; /* Dark card background */
          border-radius: 12px; /* Rounded corners */
          padding: 20px;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3); /* Subtle shadow */
          transition: transform 0.3s, box-shadow 0.3s;
        }

        .collaboration-card:hover {
          transform: translateY(-5px); /* Lift effect on hover */
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.4); /* Enhanced shadow on hover */
        }

        .collaboration-card h3 {
          font-size: 20px;
          margin-bottom: 10px;
          color: #007bff; /* Accent color for headings */
        }

        .collaboration-card p {
          font-size: 14px;
          color: #ccc; /* Light gray text */
        }

        .collaboration-meta {
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

        .collaboration-details {
          margin-top: 20px;
          padding: 20px;
          background: #2a2a2a; /* Dark background */
          border-radius: 12px; /* Rounded corners */
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3); /* Subtle shadow */
        }

        .collaboration-details h2 {
          font-size: 24px;
          margin-bottom: 15px;
          color: #007bff; /* Accent color for headings */
        }

        .collaboration-details p {
          font-size: 16px;
          color: #ccc; /* Light gray text */
        }

        .details-meta {
          margin-top: 10px;
          font-size: 14px;
          color: #999; /* Light gray text */
        }

        .requests-list {
          display: grid;
          grid-template-columns: repeat(
            auto-fit,
            minmax(250px, 1fr)
          ); /* Responsive grid */
          gap: 20px; /* Spacing between cards */
          margin-top: 20px;
        }

        .request-card {
          background: #333; /* Dark card background */
          border-radius: 12px; /* Rounded corners */
          padding: 20px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3); /* Subtle shadow */
        }

        .request-card h4 {
          font-size: 18px;
          margin-bottom: 10px;
          color: #007bff; /* Accent color for headings */
        }

        .request-card p {
          font-size: 14px;
          color: #ccc; /* Light gray text */
        }

        @media (max-width: 768px) {
          .collaborations-list {
            grid-template-columns: repeat(
              auto-fit,
              minmax(250px, 1fr)
            ); /* Smaller cards for mobile */
          }

          .collaboration-card h3 {
            font-size: 18px; /* Smaller font size */
          }

          .collaboration-card p {
            font-size: 12px; /* Smaller font size */
          }

          .collaboration-details h2 {
            font-size: 20px; /* Smaller font size */
          }

          .collaboration-details p {
            font-size: 14px; /* Smaller font size */
          }
        }
      `}</style>
    </div>
  );
};

export default ApplcationOfCollab;
