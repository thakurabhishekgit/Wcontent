package com.example.demo.repository;

import com.example.demo.model.Collaboration;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CollaborationRepository extends MongoRepository<Collaboration, String> {
}
