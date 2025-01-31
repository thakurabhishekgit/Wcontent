package com.example.demo.service;

import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User saveUser(User user) {
        validateUser(user); // Validate user input
        return userRepository.save(user);
    }

    public User registerUser(User user) {
        // Check if user already exists by email
        userRepository.findByEmail(user.getEmail()).ifPresent(u -> {
            throw new RuntimeException("User with email " + user.getEmail() + " already exists" + u);
        });

        // Validate user input
        validateUser(user);

        // Save the user if everything is valid
        return userRepository.save(user);
    }

    private void validateUser(User user) {
        // Check if any field is empty or null
        if (user.getUsername() == null || user.getUsername().trim().isEmpty()) {
            throw new RuntimeException("Username is required");
        }
        if (user.getPassword() == null || user.getPassword().trim().isEmpty()) {
            throw new RuntimeException("Password is required");
        }
        if (user.getEmail() == null || user.getEmail().trim().isEmpty()) {
            throw new RuntimeException("Email is required");
        }
        if (user.getUserType() == null) {
            throw new RuntimeException("User type is required");
        }
    }
}
