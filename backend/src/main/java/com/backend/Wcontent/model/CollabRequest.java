package com.backend.Wcontent.model;

public class CollabRequest {
    private String requesterId;
    private String requesterName;
    private String requesterEmail;
    private String message;
    private String appliedDate;
    private String status;

    // Constructor
    public CollabRequest(String requesterId, String requesterName, String requesterEmail,
            String message, String appliedDate, String status) {
        this.requesterId = requesterId;
        this.requesterName = requesterName;
        this.requesterEmail = requesterEmail;
        this.message = message;
        this.appliedDate = appliedDate;
        this.status = status;
    }

    // Default Constructor
    public CollabRequest() {
    }

    // Getters and Setters
    public String getRequesterId() {
        return requesterId;
    }

    public void setRequesterId(String requesterId) {
        this.requesterId = requesterId;
    }

    public String getRequesterName() {
        return requesterName;
    }

    public void setRequesterName(String requesterName) {
        this.requesterName = requesterName;
    }

    public String getRequesterEmail() {
        return requesterEmail;
    }

    public void setRequesterEmail(String requesterEmail) {
        this.requesterEmail = requesterEmail;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getAppliedDate() {
        return appliedDate;
    }

    public void setAppliedDate(String appliedDate) {
        this.appliedDate = appliedDate;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    @Override
    public String toString() {
        return "CollabRequest{" +
                "requesterId='" + requesterId + '\'' +
                ", requesterName='" + requesterName + '\'' +
                ", requesterEmail='" + requesterEmail + '\'' +
                ", message='" + message + '\'' +
                ", appliedDate='" + appliedDate + '\'' +
                ", status='" + status + '\'' +
                '}';
    }
}
