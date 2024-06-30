package com.benitha.NE.customers;


import com.benitha.NE.customers.dto.CreateCustomerDto;
import com.benitha.NE.customers.dto.UpdateCustomerDto;
import com.benitha.NE.models.Customer;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import com.benitha.NE.utils.ApiResponse;
import org.springframework.web.bind.annotation.*;

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
