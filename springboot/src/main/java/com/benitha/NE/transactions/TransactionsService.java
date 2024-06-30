package com.benitha.NE.transactions;


import com.benitha.NE.repositories.CustomerRepository;
import com.benitha.NE.transactions.dtos.CreateTransactionDto;
import lombok.RequiredArgsConstructor;
import com.benitha.NE.enums.TransactionType;
import com.benitha.NE.models.Customer;
import com.benitha.NE.models.Transaction;
import com.benitha.NE.repositories.TransactionRepository;
import com.benitha.NE.utils.ApiResponse;
import com.benitha.NE.utils.Mailer;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.Date;


@Service
@RequiredArgsConstructor
public class TransactionsService {
    private final TransactionRepository transactionRepository;
    private final CustomerRepository customerRepository;

    public ApiResponse<Transaction> createTransaction(
            CreateTransactionDto createTransactionDto
    ) {
        try{

        // Check if the transacting customer exists
        Customer customer = customerRepository.findById(createTransactionDto.getCustomerId()).orElseThrow();
        if (createTransactionDto.getTransactionType() == TransactionType.SAVING) {
            customer.setBalance(customer.getBalance() + createTransactionDto.getAmount());
            customerRepository.save(customer);
        } else if (createTransactionDto.getTransactionType() == TransactionType.WITHDRAW) {
            if (customer.getBalance() <= 0 || customer.getBalance() < createTransactionDto.getAmount())
                return new ApiResponse<>(false, "Dear customer, you don't have enought money to withdraw", null);
            customer.setBalance(customer.getBalance() - createTransactionDto.getAmount());
            customerRepository.save(customer);
        } else {
            Customer toCustomer = customerRepository.findByAccount(createTransactionDto.getToAccount()).orElseThrow();
            if (customer.getBalance() <= 0 || customer.getBalance() < createTransactionDto.getAmount())
                return new ApiResponse<>(false, "Dear customer, you don't have enought money to transfer", null);
            toCustomer.setBalance(toCustomer.getBalance() + createTransactionDto.getAmount());
            customer.setBalance(customer.getBalance() - createTransactionDto.getAmount());
        }

        Transaction tx = new Transaction(
                createTransactionDto.getCustomerId(),
                createTransactionDto.getToAccount(),
                customer,
                createTransactionDto.getAmount(),
                createTransactionDto.getTransactionType(),
                new Date()
        );

        JavaMailSender emailSender = new Mailer().getJavaMailSender();

        transactionRepository.save(tx);
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("noreply@baeldung.com");
        message.setTo(customer.getEmail());
        message.setSubject("NATIONAL BANK OF  RWANDA SYSTEM");
        message.setText("Dear " + customer.getFirstName() + ", your " + createTransactionDto.getTransactionType().name().toLowerCase() + " of " + createTransactionDto.getAmount() + " on your account with account: " + customer.getAccount().toUpperCase() + " has been completed successfully \n\n\n\n From National Bank System");
        emailSender.send(message);

        return new ApiResponse<>(true, "Transaction performed", tx);
        } catch (Exception e){
            return new ApiResponse<>(false, e.getMessage()  == "No value present" ? "Customer doesn't exist" : e.getMessage(), null);
        }
    }

}
