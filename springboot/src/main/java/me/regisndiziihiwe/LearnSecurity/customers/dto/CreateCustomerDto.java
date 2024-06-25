package me.regisndiziihiwe.LearnSecurity.customers.dto;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import me.regisndiziihiwe.LearnSecurity.models.Transaction;
import org.springframework.boot.context.properties.bind.DefaultValue;

import java.util.Date;
import java.util.List;

public class CreateCustomerDto {

    @NotBlank
    @Size(min = 2, message = "First name is too short")
    private String firstName;

    @NotBlank
    @Size(min = 2, message = "Last name is too short")
    private String lastName;

    @NotNull
    @Email(message = "Invalid email")
    private String email;

    @NotNull
    @Pattern(regexp = "\\d{10}", message = "Invalid phone number")
    private String mobile;

    @NotNull
    @Past(message = "Invalid date of birth")
    private Date dob;

    @NotNull
    @Size(min = 10, max = 10, message = "Invalid account number")
    private String account;

    @NotNull
    private  double balance = 0.0;

    public CreateCustomerDto(String firstName, String lastName, String email, String mobile, Date dob, String account, double balance) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.mobile = mobile;
        this.dob = dob;
        this.account = account;
        this.balance = balance;
    }

    public CreateCustomerDto() {
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
}
