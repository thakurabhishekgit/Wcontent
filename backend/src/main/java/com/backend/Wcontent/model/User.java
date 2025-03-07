package com.backend.Wcontent.model;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "users")
public class User {
    @Id
    private String id;
    private String username;
    private String password;
    @Indexed(unique = true)
    private String email;
    private UserType userType;
    private String ChannelName;
    @Indexed(unique = true)
    private String ChannelId;
    @Indexed(unique = true)
    private String ChannelURL;
    private List<PostOpportunity> jobOpportunities;
    private List<Collaboration> collaborations;
    private boolean verified;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public UserType getUserType() {
        return userType; // Corrected
    }

    public void setUserType(UserType userType) {
        this.userType = userType; // Added setter for userType
    }

    public String getChannelName() {
        return ChannelName;
    }

    public void setChannelName(String channelName) {
        ChannelName = channelName;
    }

    public String getChannelId() {
        return ChannelId;
    }

    public void setChannelId(String channelId) {
        ChannelId = channelId;
    }

    public String getChannelURL() {
        return ChannelURL;
    }

    public void setChannelURL(String channelURL) {
        ChannelURL = channelURL;
    }

    public List<PostOpportunity> getJobOpportunities() {
        return jobOpportunities;
    }

    public void setJobOpportunities(List<PostOpportunity> jobOpportunities) {
        this.jobOpportunities = jobOpportunities;
    }

    public List<Collaboration> getCollaborations() {
        return collaborations;
    }

    public void setCollaborations(List<Collaboration> collaborations) {
        this.collaborations = collaborations;
    }

    public void setVerified(boolean verified) {
        this.verified = verified;
    }

    public boolean isVerified() {
        return verified;
    }
}
