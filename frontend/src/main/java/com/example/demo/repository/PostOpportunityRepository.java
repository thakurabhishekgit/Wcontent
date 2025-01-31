package com.example.demo.repository;

import com.example.demo.model.PostOpportunity;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PostOpportunityRepository extends MongoRepository<PostOpportunity, String> {
}
