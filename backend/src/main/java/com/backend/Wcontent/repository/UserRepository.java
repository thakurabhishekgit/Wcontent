package com.backend.Wcontent.repository;

import java.util.Optional;
import com.backend.Wcontent.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<User, String> {
    Optional<User> findByEmail(String email);

    boolean existsByEmail(String email);
}
