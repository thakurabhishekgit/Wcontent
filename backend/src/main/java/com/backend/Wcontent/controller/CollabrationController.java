package com.backend.Wcontent.controller;

import java.util.ArrayList;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.Wcontent.model.Collaboration;
import com.backend.Wcontent.model.User;
import com.backend.Wcontent.repository.CollaborationRepository;
import com.backend.Wcontent.repository.UserRepository;

@RestController
@RequestMapping("/api/users/collabration")
public class CollabrationController {

    @Autowired
    private CollaborationRepository collabrationRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private EmailService emailService;

    @PostMapping("/addCollab/{id}")
    public ResponseEntity<?> addCollab(@PathVariable String id, @RequestBody Collaboration collabration) {
        Optional<User> optionalUser = userRepository.findById(id);
        if (!optionalUser.isPresent()) {
            return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
        }
        User user = optionalUser.get();
        if (user.getCollaborations() == null) {
            user.setCollaborations(new ArrayList<>());
        }
        collabrationRepository.save(collabration);
        user.getCollaborations().add(collabration);
        userRepository.save(user);
        return new ResponseEntity<>(user, HttpStatus.CREATED);
    }

    @GetMapping("/getCollabOfUser/{id}")
    public ResponseEntity<?> getCollab(@PathVariable String id) {
        Optional<User> optionalUser = userRepository.findById(id);
        if (!optionalUser.isPresent()) {
            return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
        }
        User user = optionalUser.get();
        return new ResponseEntity<>(user.getCollaborations(), HttpStatus.OK);

    }

    @GetMapping("/getCollabOfAllUsers")
    public ResponseEntity<?> getCollabOfAllUsers() {
        return new ResponseEntity<>(collabrationRepository.findAll(), HttpStatus.OK);

    }

    @PostMapping("/deleteCollab/{id}")
    public ResponseEntity<?> deleteCollab(@PathVariable String id) {
        collabrationRepository.deleteById(id);
        return new ResponseEntity<>("Collabration deleted successfully", HttpStatus.OK);
    }

    @PostMapping("/applyForCollab/{collabId}")
    public ResponseEntity<?> applyForCollab(@PathVariable String collabId, @RequestBody CollabRequest collabRequest) {
        Optional<Collaboration> optionalCollaboration = collabrationRepository.findById(collabId);

        if (!optionalCollaboration.isPresent()) {
            return new ResponseEntity<>("Collaboration not found", HttpStatus.NOT_FOUND);
        }
        Collaboration collaboration = optionalCollaboration.get();
        collaboration.getcollabs().add(collabRequest);
        collabrationRepository.save(collaboration);
        emailService.sendCollabRequestEmail(optionalCollaboration.get().getEmail(), collabRequest,
                optionalCollaboration.get().getTitle(), optionalCollaboration.get().getDescription(),
                optionalCollaboration.get().getContentCategory(), optionalCollaboration.get().getCollaborationType(),
                optionalCollaboration.get().getTimeline());

        return new ResponseEntity<>("Collaboration request submitted successfully!",
                HttpStatus.OK);
    }

    @GetMapping("/getCollabRequests/{collabId}")
    public ResponseEntity<?> getCollabRequests(@PathVariable String collabId) {
        Optional<Collaboration> optionalCollaboration = collabrationRepository.findById(collabId);
        if (!optionalCollaboration.isPresent()) {
            return new ResponseEntity<>("Collaboration not found", HttpStatus.NOT_FOUND);
        }
        Collaboration collaboration = optionalCollaboration.get();
        return new ResponseEntity<>(collaboration.getcollabs(), HttpStatus.OK);
    }

}
