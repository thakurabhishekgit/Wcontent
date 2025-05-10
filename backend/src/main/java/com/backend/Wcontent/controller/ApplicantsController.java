package com.backend.Wcontent.controller;

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

import com.backend.Wcontent.MailTest.EmailService.*;
import com.backend.Wcontent.model.Applicant;
import com.backend.Wcontent.model.PostOpportunity;
import com.backend.Wcontent.repository.PostOpportunityRepository;

@RestController
@RequestMapping("/api/users/application")

public class ApplicantsController {

    @Autowired
    private PostOpportunityRepository postOpportunityRepository;
    @Autowired
    private EmailService emailService;

    @PostMapping("/opportunity/{id}/apply")
    public ResponseEntity<?> applyToOpportunity(
            @PathVariable("id") String opportunityId,
            @RequestBody Applicant applicant) {

        Optional<PostOpportunity> optionalOpportunity = postOpportunityRepository.findById(opportunityId);
        String email = optionalOpportunity.get().getEmail();
        optionalOpportunity.get().getDescription();
        if (!optionalOpportunity.isPresent()) {
            return new ResponseEntity<>("Opportunity not found", HttpStatus.NOT_FOUND);
        }
        PostOpportunity opportunity = optionalOpportunity.get();
        opportunity.getApplicants().add(applicant);
        postOpportunityRepository.save(opportunity);
        emailService.sendAppliactionEmail(email, applicant, optionalOpportunity.get().getDescription(),
                optionalOpportunity.get().getTitle(), optionalOpportunity.get().getRequirements(),
                optionalOpportunity.get().getLocation(), optionalOpportunity.get().getType(),
                optionalOpportunity.get().getSalaryRange());
        emailService.sendAppliactionEmailtoApplicant(email, applicant, optionalOpportunity.get().getDescription(),
                optionalOpportunity.get().getTitle(), optionalOpportunity.get().getRequirements(),
                optionalOpportunity.get().getLocation(), optionalOpportunity.get().getType(),
                optionalOpportunity.get().getSalaryRange());
        return new ResponseEntity<>("Application submitted successfully", HttpStatus.OK);
    }

    @GetMapping("/opportunity/{id}/applicants")
    public ResponseEntity<?> getApplicantsForOpportunity(@PathVariable("id") String opportunityId) {
        Optional<PostOpportunity> optionalOpportunity = postOpportunityRepository.findById(opportunityId);
        if (!optionalOpportunity.isPresent()) {
            return new ResponseEntity<>("Opportunity not found", HttpStatus.NOT_FOUND);
        }
        PostOpportunity opportunity = optionalOpportunity.get();
        return new ResponseEntity<>(opportunity.getApplicants(), HttpStatus.OK);
    }

}
