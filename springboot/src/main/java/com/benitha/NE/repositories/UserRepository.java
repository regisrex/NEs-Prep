package com.benitha.NE.repositories;

import java.util.Optional;

import com.benitha.NE.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, String> {

    Optional<User> findByEmail(String email);

    boolean existsByUsername(String username);
    Optional<User> findByUsername(String username);
}
