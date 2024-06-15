package me.regisndiziihiwe.LearnSecurity.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import me.regisndiziihiwe.LearnSecurity.models.User;

@Repository
public interface UserRepository extends JpaRepository<User , String> {

    Optional<User> findByEmail(String email);

    boolean existsByUsername(String username);
    Optional<User> findByUsername(String username);
}
