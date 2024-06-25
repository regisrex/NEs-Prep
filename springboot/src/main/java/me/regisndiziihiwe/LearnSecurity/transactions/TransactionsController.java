package me.regisndiziihiwe.LearnSecurity.transactions;

import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import me.regisndiziihiwe.LearnSecurity.models.Transaction;
import me.regisndiziihiwe.LearnSecurity.transactions.dtos.CreateTransactionDto;
import me.regisndiziihiwe.LearnSecurity.utils.ApiResponse;
import org.springframework.web.bind.annotation.*;

@Tag(name = "Transactions", description = "perform transactions on customers")
@RestController
@RequestMapping("/api/v1/transactions")
@RequiredArgsConstructor
public class TransactionsController {
    private final TransactionsService transactionsService;

    @PostMapping
    public ApiResponse<Transaction> createTransaction(
            @RequestBody @Valid CreateTransactionDto createTransactionDto
    ) {
        return this.transactionsService.createTransaction( createTransactionDto);
    }
}
