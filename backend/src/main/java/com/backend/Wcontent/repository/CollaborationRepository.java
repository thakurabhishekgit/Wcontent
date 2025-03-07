package com.backend.Wcontent.repository;

import com.backend.Wcontent.model.*;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CollaborationRepository extends MongoRepository<Collaboration, String> {
}
