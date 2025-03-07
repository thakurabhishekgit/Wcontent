package com.backend.Wcontent.dto;

import com.backend.Wcontent.model.User;

public class TokenResponse {
    private User user;
    private String token;

    // Constructor
    public TokenResponse(User user, String token) {
        this.user = user;
        this.token = token;
    }

    // Getters and setters
    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}
