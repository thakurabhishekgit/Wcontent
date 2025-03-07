import React, { useState, useEffect } from "react";
import axios from "axios";
import HowitWorks from "../components/HowItWorks";

const Opportunities = () => {
  const [opportunities, setOpportunities] = useState([]);
  const [selectedOpportunity, setSelectedOpportunity] = useState(null);
  const [application, setApplication] = useState({
    name: "",
    email: "",
    resumeUrl: "",
    applicationDate: new Date().toISOString().split("T")[0],
  });
  const [submissionStatus, setSubmissionStatus] = useState(null);

  useEffect(() => {
    fetchOpportunities();
  }, []);

  const fetchOpportunities = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/api/users/opportunities/opportunitiesGetAll"
      );
      setOpportunities(response.data);
    } catch (error) {
      console.error("Error fetching opportunities:", error);
    }
  };

  const handleCardClick = (opportunity) => {
    setSelectedOpportunity(opportunity);
    setSubmissionStatus(null); // Reset submission status when a new opportunity is selected
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setApplication({ ...application, [name]: value });
  };

  const handleApply = async (e) => {
    e.preventDefault();
    if (!selectedOpportunity) return;

    try {
      const response = await axios.post(
        `http://localhost:3001/api/users/application/opportunity/${selectedOpportunity.id}/apply`,
        application
      );
      setSubmissionStatus("Application submitted successfully!");
      setApplication({
        name: "",
        email: "",
        resumeUrl: "",
        applicationDate: new Date().toISOString().split("T")[0],
      }); // Reset form
    } catch (error) {
      console.error("Error applying for opportunity:", error);
      setSubmissionStatus("Failed to submit application. Please try again.");
    }
  };

  return (
    <div style={styles.container}>
      {/* How It Works Section */}
      <HowitWorks />

      {/* Divider and CTA Section */}
      <div style={styles.divider}></div>
      <div style={styles.ctaSection}>
        <h2 style={styles.ctaTitle}>Ready to Collaborate?</h2>
        <p style={styles.ctaText}>
          Join our community of innovators and creators. Explore exciting
          collaboration opportunities and bring your ideas to life with
          like-minded individuals.
        </p>
      </div>

      {/* Collaboration Opportunities Section */}

      <div style={styles.opportunitiesList}>
        {opportunities.map((opportunity) => (
          <div
            key={opportunity.id}
            style={styles.opportunityCard}
            onClick={() => handleCardClick(opportunity)}
          >
            <h3 style={styles.cardTitle}>{opportunity.title}</h3>
            <p style={styles.cardText}>{opportunity.location}</p>
            <p style={styles.cardText}>{opportunity.type}</p>
            <p style={styles.cardText}>{opportunity.salaryRange}</p>
            <button
              style={styles.applyButton}
              onClick={(e) => {
                e.stopPropagation(); // Prevent card click event
                handleCardClick(opportunity);
              }}
            >
              Apply Now
            </button>
          </div>
        ))}
      </div>

      {selectedOpportunity && (
        <div style={styles.detailsContainer}>
          <div style={styles.detailsSection}>
            <h2 style={styles.detailsTitle}>{selectedOpportunity.title}</h2>
            <p style={styles.detailsText}>{selectedOpportunity.description}</p>
            <p style={styles.detailsText}>
              <strong>Requirements:</strong> {selectedOpportunity.requirements}
            </p>
            <p style={styles.detailsText}>
              <strong>Location:</strong> {selectedOpportunity.location}
            </p>
            <p style={styles.detailsText}>
              <strong>Type:</strong> {selectedOpportunity.type}
            </p>
            <p style={styles.detailsText}>
              <strong>Salary Range:</strong> {selectedOpportunity.salaryRange}
            </p>
          </div>

          <div style={styles.applicationFormCard}>
            <h3 style={styles.formTitle}>Apply for this Opportunity</h3>
            {submissionStatus && (
              <p
                style={{
                  color: submissionStatus.includes("success") ? "green" : "red",
                  marginBottom: "20px",
                  fontSize: "14px",
                  textAlign: "center",
                }}
              >
                {submissionStatus}
              </p>
            )}
            <form onSubmit={handleApply} style={styles.form}>
              <div style={styles.formGroup}>
                <label style={styles.label}>
                  Name:
                  <input
                    type="text"
                    name="name"
                    value={application.name}
                    onChange={handleInputChange}
                    required
                    style={styles.input}
                  />
                </label>
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>
                  Email:
                  <input
                    type="email"
                    name="email"
                    value={application.email}
                    onChange={handleInputChange}
                    required
                    style={styles.input}
                  />
                </label>
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>
                  Resume URL:
                  <input
                    type="url"
                    name="resumeUrl"
                    value={application.resumeUrl}
                    onChange={handleInputChange}
                    required
                    style={styles.input}
                  />
                </label>
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>
                  Application Date:
                  <input
                    type="date"
                    name="applicationDate"
                    value={application.applicationDate}
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

export default Opportunities;

// Modern CSS Styles
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f5f5f5",
    minHeight: "100vh",
    background:
      "linear-gradient(135deg, rgba(157, 182, 202, 0.15),rgb(9, 1, 1))",
  },
  divider: {
    height: "1px",
    backgroundColor: "#ddd",
    margin: "40px 0",
  },
  ctaSection: {
    textAlign: "center",
    margin: "40px 0",
    padding: "20px",
    backgroundColor: "#fff",
    borderRadius: "12px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  ctaTitle: {
    fontSize: "28px",
    fontWeight: "bold",
    marginBottom: "15px",
    color: "#333",
  },
  ctaText: {
    fontSize: "16px",
    color: "#555",
    lineHeight: "1.6",
    maxWidth: "800px",
    margin: "0 auto",
  },
  opportunitiesList: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "20px",
    marginBottom: "20px",
  },
  opportunityCard: {
    backgroundColor: "#fff",
    borderRadius: "12px",
    padding: "20px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    cursor: "pointer",
    transition: "transform 0.2s, box-shadow 0.2s",
    border: "1px solid #e0e0e0",
    ":hover": {
      transform: "translateY(-5px)",
      boxShadow: "0 6px 12px rgba(0, 0, 0, 0.15)",
    },
  },
  cardTitle: {
    fontSize: "20px",
    fontWeight: "bold",
    marginBottom: "10px",
    color: "#333",
  },
  cardText: {
    fontSize: "14px",
    color: "#666",
    margin: "5px 0",
  },
  applyButton: {
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
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
    backgroundColor: "#fff",
    borderRadius: "12px",
    padding: "20px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  detailsSection: {
    marginBottom: "20px",
  },
  detailsTitle: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "15px",
    color: "#333",
  },
  detailsText: {
    fontSize: "16px",
    color: "#555",
    margin: "10px 0",
  },
  applicationFormCard: {
    backgroundColor: "#fff",
    borderRadius: "12px",
    padding: "20px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    marginTop: "20px",
  },
  formTitle: {
    fontSize: "20px",
    fontWeight: "bold",
    marginBottom: "15px",
    color: "#333",
    textAlign: "center",
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
    color: "#555",
    marginBottom: "5px",
    display: "block",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginTop: "5px",
    border: "1px solid #ddd",
    borderRadius: "6px",
    fontSize: "14px",
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
    borderRadius: "6px",
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
