package com.benitha.NE.repositories;

import com.benitha.NE.models.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TransactionRepository extends JpaRepository<Transaction, String> { }
