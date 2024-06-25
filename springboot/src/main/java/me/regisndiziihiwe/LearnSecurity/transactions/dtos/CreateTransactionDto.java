package me.regisndiziihiwe.LearnSecurity.transactions.dtos;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import me.regisndiziihiwe.LearnSecurity.enums.TransactionType;


@AllArgsConstructor
@NoArgsConstructor
@Data
public class CreateTransactionDto {

    @NotNull
    @Size(min = 2)
    private String customerId;
    @NotNull
    private TransactionType transactionType;

    private  String toAccount;

    @NotNull
    private double amount;
}
