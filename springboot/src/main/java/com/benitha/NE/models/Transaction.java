package com.benitha.NE.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import com.benitha.NE.enums.TransactionType;

import java.util.Date;


@Entity(name = "transactions")
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @NotNull
    @Column(insertable=false, updatable=false)
    private  String customerId;

    private  String account;
    @NotNull
    @ManyToOne
    @JoinColumn(name = "customerId")
    @JsonIgnoreProperties("transactions")
    private Customer customer;

    @NotNull
    private double amount;

    @NotNull
    @Enumerated(EnumType.STRING)
    private TransactionType transactionType;

    @NotNull
    @Temporal(TemporalType.TIMESTAMP)
    private Date bankingDateTime;

    public Transaction(String customerId, String account, Customer customer, double amount, TransactionType transactionType, Date bankingDateTime) {
        this.customerId = customerId;
        this.account = account;
        this.customer = customer;
        this.amount = amount;
        this.transactionType = transactionType;
        this.bankingDateTime = bankingDateTime;
    }

    public Transaction() {

    }

    @PrePersist
    protected void onCreate() {
        bankingDateTime = new Date();
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getCustomerId() {
        return customerId;
    }

    public void setCustomerId(String customerId) {
        this.customerId = customerId;
    }

    public String getAccount() {
        return account;
    }

    public void setAccount(String account) {
        this.account = account;
    }

    public Customer getCustomer() {
        return customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public TransactionType getTransactionType() {
        return transactionType;
    }

    public void setTransactionType(TransactionType transactionType) {
        this.transactionType = transactionType;
    }

    public Date getBankingDateTime() {
        return bankingDateTime;
    }

    public void setBankingDateTime(Date bankingDateTime) {
        this.bankingDateTime = bankingDateTime;
    }
}
