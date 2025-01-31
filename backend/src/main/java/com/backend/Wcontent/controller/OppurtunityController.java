package com.backend.Wcontent.controller;

import java.util.ArrayList;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.backend.Wcontent.model.PostOpportunity;
import com.backend.Wcontent.model.User;
import com.backend.Wcontent.repository.PostOpportunityRepository;
import com.backend.Wcontent.repository.UserRepository;

@RestController
@RequestMapping("/api/users/opportunities")
public class OppurtunityController {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PostOpportunityRepository postOpportunityRepository;

    @PostMapping("/opportunity/{id}")
    public ResponseEntity<?> postOpportunity(
            @PathVariable("id") String userId,
            @RequestBody PostOpportunity opportunity) {
        Optional<User> optionalUser = userRepository.findById(userId);
        if (!optionalUser.isPresent()) {
            return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
        }
        User user = optionalUser.get();
        PostOpportunity savedOpportunity = postOpportunityRepository.save(opportunity);
        savedOpportunity.setPostedByUserId(userId);
        if (user.getJobOpportunities() == null) {
            user.setJobOpportunities(new ArrayList<>());
        }
        user.getJobOpportunities().add(savedOpportunity);
        userRepository.save(user);
        return new ResponseEntity<>(user, HttpStatus.CREATED);
    }

    @GetMapping("/opportunity/{id}")
    public ResponseEntity<?> getOpportunity(@PathVariable("id") String opportunityId) {
        Optional<PostOpportunity> optionalOpportunity = postOpportunityRepository.findById(opportunityId);
        if (!optionalOpportunity.isPresent()) {
            return new ResponseEntity<>("Opportunity not found", HttpStatus.NOT_FOUND);
        }
        PostOpportunity opportunity = optionalOpportunity.get();
        return new ResponseEntity<>(opportunity, HttpStatus.OK);
    }

    @GetMapping("/opportunitiesGetAll")
    public ResponseEntity<?> getOpportunities() {
        Iterable<PostOpportunity> opportunities = postOpportunityRepository.findAll();
        if (!opportunities.iterator().hasNext()) {
            return new ResponseEntity<>("No opportunities found", HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(opportunities, HttpStatus.OK);
    }

    @GetMapping("/getMyOpportunities/{id}")
    public ResponseEntity<?> getMyOpportunities(@PathVariable("id") String userId) {
        Optional<User> optionalUser = userRepository.findById(userId);
        if (!optionalUser.isPresent()) {
            return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
        }
        User user = optionalUser.get();
        return new ResponseEntity<>(user.getJobOpportunities(), HttpStatus.OK);

    }
}
