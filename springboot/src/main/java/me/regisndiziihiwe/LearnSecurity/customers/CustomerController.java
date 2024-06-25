package me.regisndiziihiwe.LearnSecurity.customers;


import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.persistence.GeneratedValue;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import me.regisndiziihiwe.LearnSecurity.customers.dto.CreateCustomerDto;
import me.regisndiziihiwe.LearnSecurity.customers.dto.UpdateCustomerDto;
import me.regisndiziihiwe.LearnSecurity.models.Customer;
import me.regisndiziihiwe.LearnSecurity.utils.ApiResponse;
import me.regisndiziihiwe.LearnSecurity.utils.ErrorResponse;
import org.apache.logging.log4j.core.config.plugins.validation.constraints.Required;
import org.hibernate.annotations.Array;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Tag(name = "Customers", description = "register customers and update them")
@RestController
@RequestMapping("/api/v1/customers")
public class CustomerController {
    private final CustomerService customerService;

    @PostMapping
    public ApiResponse<Customer> createCustomer(
            @RequestBody @Valid CreateCustomerDto createCustomerDto
    )  {
        return this.customerService.createCustomer(createCustomerDto);
    }

    @PutMapping("/{id}")
    public  ApiResponse<Customer> updateCustomer(
            @RequestBody @Valid UpdateCustomerDto updateCustomerDto,
            @RequestParam("id") String id
            ) throws Exception {
        return this.customerService.updateCustomer(id, updateCustomerDto);
    }

    @DeleteMapping("/{id}")
    public  ApiResponse<Customer> deleteCustomer(
            @RequestParam("id") String id
    ){
        return  this.customerService.deleteCustomer(id);
    }

    @GetMapping
    public  ApiResponse getCustomers(
            @PathVariable("id") Optional<String> id
    ){
        if(id.isEmpty()) return this.customerService.getAllCustomers();
        return this.customerService.getCustomerById(id.get());
    }

//    @ExceptionHandler()
//    @ResponseStatus(HttpStatus.CONFLICT)
//    public ApiResponse<ErrorResponse> handleExceptions(Exception ex) {
//        return new ApiResponse<>(false, ex.getMessage().contains("duplicate key value") ? "Email or account or mobile already registered" : ex.getMessage(),null);
//    }

}
