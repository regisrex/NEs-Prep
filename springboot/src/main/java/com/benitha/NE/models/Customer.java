package com.benitha.NE.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

import java.util.Date;
import java.util.List;

@Entity
@Table(name = "customers", uniqueConstraints = @UniqueConstraint(columnNames = {"account", "email", "mobile"}))


public class Customer {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @NotNull
    private String firstName;

    private String lastName;

    @NotNull
    private String email;

    @NotNull
    private String mobile;

    @NotNull
    private Date dob;

    @NotNull
    private String account;

    private double balance = 0.0;
    @OneToMany(mappedBy = "customerId", orphanRemoval = true)
    private List<Transaction> transactions;

    @Temporal(TemporalType.TIMESTAMP)
    private Date lastUpdateDateTime;

    public Customer(String firstName, String lastName, String email, String mobile, Date dob, String account, double balance) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.mobile = mobile;
        this.dob = dob;
        this.account = account;
        this.balance = balance;
    }

    public Customer() {
    }

    @PreUpdate
    protected void onUpdate() {
        lastUpdateDateTime = new Date();
    }

    @PrePersist
    protected void onCreate() {
        lastUpdateDateTime = new Date();
    }


    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    public Date getDob() {
        return dob;
    }

    public void setDob(Date dob) {
        this.dob = dob;
    }

    public String getAccount() {
        return account;
    }

    public void setAccount(String account) {
        this.account = account;
    }

    public double getBalance() {
        return balance;
    }

    public void setBalance(double balance) {
        this.balance = balance;
    }

    public List<Transaction> getTransactions() {
        return transactions;
    }

    public void setTransactions(List<Transaction> transactions) {
        this.transactions = transactions;
    }

    public Date getLastUpdateDateTime() {
        return lastUpdateDateTime;
    }

    public void setLastUpdateDateTime(Date lastUpdateDateTime) {
        this.lastUpdateDateTime = lastUpdateDateTime;
    }
}
