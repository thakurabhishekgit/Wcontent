import React, { useState, useEffect } from "react";
import axios from "axios";

const Collaborations = () => {
  const [collaborations, setCollaborations] = useState([]);
  const [selectedCollaboration, setSelectedCollaboration] = useState(null);
  const [application, setApplication] = useState({
    requesterName: "",
    requesterEmail: "",
    message: "",
    appliedDate: new Date().toISOString().split("T")[0],
  });
  const [submissionStatus, setSubmissionStatus] = useState(null);

  useEffect(() => {
    fetchCollaborations();
  }, []);

  const fetchCollaborations = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/api/users/collabration/getCollabOfAllUsers"
      );
      setCollaborations(response.data);
    } catch (error) {
      console.error("Error fetching collaborations:", error);
    }
  };

  const handleCardClick = (collaboration) => {
    setSelectedCollaboration(collaboration);
    setSubmissionStatus(null); // Reset submission status when a new collaboration is selected
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setApplication({ ...application, [name]: value });
  };

  const handleApply = async (e) => {
    e.preventDefault();
    if (!selectedCollaboration) return;

    try {
      const response = await axios.post(
        `http://localhost:3001/api/users/collabration/applyForCollab/${selectedCollaboration.id}`,
        application
      );
      setSubmissionStatus("Application submitted successfully!");
      setApplication({
        requesterName: "",
        requesterEmail: "",
        message: "",
        appliedDate: new Date().toISOString().split("T")[0],
      }); // Reset form
    } catch (error) {
      console.error("Error applying for collaboration:", error);
      setSubmissionStatus("Failed to submit application. Please try again.");
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.pageTitle}>Collaboration Opportunities</h1>
      <p style={styles.pageDescription}>
        Explore exciting collaboration opportunities and join hands with
        like-minded individuals to bring innovative ideas to life.
      </p>

      <div style={styles.collaborationsList}>
        {collaborations.map((collaboration) => (
          <div
            key={collaboration.id}
            style={styles.collaborationCard}
            onClick={() => handleCardClick(collaboration)}
          >
            <h3 style={styles.cardTitle}>{collaboration.title}</h3>
            <p style={styles.cardText}>{collaboration.description}</p>
            <p style={styles.cardText}>
              <strong>Category:</strong> {collaboration.contentCategory}
            </p>
            <p style={styles.cardText}>
              <strong>Type:</strong> {collaboration.collaborationType}
            </p>
            <p style={styles.cardText}>
              <strong>Timeline:</strong> {collaboration.timeline}
            </p>
            <button
              style={styles.applyButton}
              onClick={(e) => {
                e.stopPropagation(); // Prevent card click event
                handleCardClick(collaboration);
              }}
            >
              Apply Now
            </button>
          </div>
        ))}
      </div>

      {selectedCollaboration && (
        <div style={styles.detailsContainer}>
          <div style={styles.detailsSection}>
            <h2 style={styles.detailsTitle}>{selectedCollaboration.title}</h2>
            <p style={styles.detailsText}>
              {selectedCollaboration.description}
            </p>
            <p style={styles.detailsText}>
              <strong>Category:</strong> {selectedCollaboration.contentCategory}
            </p>
            <p style={styles.detailsText}>
              <strong>Type:</strong> {selectedCollaboration.collaborationType}
            </p>
            <p style={styles.detailsText}>
              <strong>Timeline:</strong> {selectedCollaboration.timeline}
            </p>
            <p style={styles.detailsText}>
              <strong>Status:</strong>{" "}
              {selectedCollaboration.open ? "Open" : "Closed"}
            </p>
          </div>

          <div style={styles.applicationForm}>
            <h3 style={styles.formTitle}>Apply for this Collaboration</h3>
            {submissionStatus && (
              <p
                style={{
                  color: submissionStatus.includes("success") ? "green" : "red",
                  marginBottom: "20px",
                  fontSize: "14px",
                }}
              >
                {submissionStatus}
              </p>
            )}
            <form onSubmit={handleApply} style={styles.form}>
              <div style={styles.formGroup}>
                <label style={styles.label}>
                  Your Name:
                  <input
                    type="text"
                    name="requesterName"
                    value={application.requesterName}
                    onChange={handleInputChange}
                    required
                    style={styles.input}
                  />
                </label>
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>
                  Your Email:
                  <input
                    type="email"
                    name="requesterEmail"
                    value={application.requesterEmail}
                    onChange={handleInputChange}
                    required
                    style={styles.input}
                  />
                </label>
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>
                  Message:
                  <textarea
                    name="message"
                    value={application.message}
                    onChange={handleInputChange}
                    required
                    style={{ ...styles.input, height: "100px" }}
                  />
                </label>
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>
                  Application Date:
                  <input
                    type="date"
                    name="appliedDate"
                    value={application.appliedDate}
                    onChange={handleInputChange}
                    required
                    style={styles.input}
                  />
                </label>
              </div>
              <button type="submit" style={styles.submitButton}>
                Submit Application
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Collaborations;

// Modern CSS Styles
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#1a1a1a", // Dark background
    minHeight: "100vh",
    color: "#fff", // Light text
  },
  pageTitle: {
    fontSize: "32px",
    fontWeight: "bold",
    marginBottom: "10px",
    color: "#fff", // Light text
    textAlign: "center",
  },
  pageDescription: {
    fontSize: "16px",
    color: "#ccc", // Light gray text
    marginBottom: "30px",
    textAlign: "center",
  },
  collaborationsList: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "20px",
    marginBottom: "20px",
  },
  collaborationCard: {
    backgroundColor: "#2a2a2a", // Dark card background
    borderRadius: "8px",
    padding: "20px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)", // Dark shadow
    cursor: "pointer",
    transition: "transform 0.2s, box-shadow 0.2s",
    ":hover": {
      transform: "translateY(-5px)",
      boxShadow: "0 6px 12px rgba(0, 0, 0, 0.5)", // Enhanced shadow on hover
    },
  },
  cardTitle: {
    fontSize: "20px",
    fontWeight: "bold",
    marginBottom: "10px",
    color: "#007bff", // Accent color for headings
  },
  cardText: {
    fontSize: "14px",
    color: "#ccc", // Light gray text
    margin: "5px 0",
  },
  applyButton: {
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    padding: "10px 15px",
    cursor: "pointer",
    marginTop: "10px",
    width: "100%",
    fontSize: "14px",
    transition: "background-color 0.2s",
    ":hover": {
      backgroundColor: "#0056b3",
    },
  },
  detailsContainer: {
    backgroundColor: "#2a2a2a", // Dark background
    borderRadius: "8px",
    padding: "20px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)", // Dark shadow
  },
  detailsSection: {
    marginBottom: "20px",
  },
  detailsTitle: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "15px",
    color: "#fff", // Light text
  },
  detailsText: {
    fontSize: "16px",
    color: "#ccc", // Light gray text
    margin: "10px 0",
  },
  applicationForm: {
    marginTop: "20px",
  },
  formTitle: {
    fontSize: "20px",
    fontWeight: "bold",
    marginBottom: "15px",
    color: "#fff", // Light text
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  formGroup: {
    marginBottom: "15px",
  },
  label: {
    fontSize: "14px",
    color: "#ccc", // Light gray text
    marginBottom: "5px",
    display: "block",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginTop: "5px",
    border: "1px solid #444", // Dark border
    borderRadius: "4px",
    fontSize: "14px",
    backgroundColor: "#333", // Dark input background
    color: "#fff", // Light text
    transition: "border-color 0.2s, box-shadow 0.2s",
    ":focus": {
      borderColor: "#007bff",
      boxShadow: "0 0 5px rgba(0, 123, 255, 0.5)",
      outline: "none",
    },
  },
  submitButton: {
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    padding: "12px 20px",
    cursor: "pointer",
    marginTop: "10px",
    fontSize: "16px",
    transition: "background-color 0.2s",
    ":hover": {
      backgroundColor: "#0056b3",
    },
  },
};
