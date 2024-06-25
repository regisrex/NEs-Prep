package me.regisndiziihiwe.LearnSecurity.repositories;

import me.regisndiziihiwe.LearnSecurity.models.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CustomerRepository extends JpaRepository<Customer, String> {

    Optional<Customer> findByEmail(String email);

    Optional<Customer> findByAccount(String account);
    Optional<Customer> findByMobile(String mobile);

}
