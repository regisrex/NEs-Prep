package me.regisndiziihiwe.LearnSecurity.repositories;

import me.regisndiziihiwe.LearnSecurity.models.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TransactionRepository extends JpaRepository<Transaction, String> { }
