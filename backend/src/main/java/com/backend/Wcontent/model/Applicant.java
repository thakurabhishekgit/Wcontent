
package com.backend.Wcontent.model;

public class Applicant {
    private String name;
    private String email;
    private String resumeUrl;
    private String applicationDate;

    // Constructor
    public Applicant(String name, String email, String resumeUrl, String applicationDate) {
        this.name = name;
        this.email = email;
        this.resumeUrl = resumeUrl;
        this.applicationDate = applicationDate;
    }

    // Default constructor
    public Applicant() {
    }

    // Getters and Setters
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getResumeUrl() {
        return resumeUrl;
    }

    public void setResumeUrl(String resumeUrl) {
        this.resumeUrl = resumeUrl;
    }

    public String getApplicationDate() {
        return applicationDate;
    }

    public void setApplicationDate(String applicationDate) {
        this.applicationDate = applicationDate;
    }

    @Override
    public String toString() {
        return "Applicant{" +
                "name='" + name + '\'' +
                ", email='" + email + '\'' +
                ", resumeUrl='" + resumeUrl + '\'' +
                ", applicationDate='" + applicationDate + '\'' +
                '}';
    }
}
