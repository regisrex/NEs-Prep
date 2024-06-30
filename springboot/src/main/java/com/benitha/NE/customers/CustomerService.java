package com.benitha.NE.customers;

import com.benitha.NE.customers.dto.CreateCustomerDto;
import com.benitha.NE.customers.dto.UpdateCustomerDto;
import com.benitha.NE.models.Customer;
import com.benitha.NE.repositories.CustomerRepository;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import com.benitha.NE.utils.ApiResponse;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CustomerService {

    private final CustomerRepository customerRepository;

    public ApiResponse<Customer> createCustomer(
            CreateCustomerDto createCustomerDto
    )  {
        if(customerRepository.findByAccount(createCustomerDto.getAccount()).isPresent()) return new ApiResponse<>(false,"Account ID already registered", null);
        if(customerRepository.findByEmail(createCustomerDto.getEmail()).isPresent()) return  new ApiResponse<>(false,"Email taken", null);
        if(customerRepository.findByMobile(createCustomerDto.getMobile()).isPresent()) return  new ApiResponse<>(false,"Mobile number registered", null);

        Customer customer = new Customer(
                createCustomerDto.getFirstName(),
                createCustomerDto.getLastName(),
                createCustomerDto.getEmail(),
                createCustomerDto.getMobile(),
                createCustomerDto.getDob(),
                createCustomerDto.getAccount(),
                createCustomerDto.getBalance()
        );
        customerRepository.save(customer);
        return new ApiResponse<>(true, "Customer created", customer);
    }

    public ApiResponse<Customer> updateCustomer(String id, @Valid UpdateCustomerDto updateCustomerDto) throws Exception {

        Customer customer = customerRepository.findById(id).orElseThrow();
        customer.setFirstName(updateCustomerDto.getFirstName());
        customer.setLastName(updateCustomerDto.getLastName());
        customer.setBalance(updateCustomerDto.getBalance());
        customer.setDob(updateCustomerDto.getDob());
        customer.setEmail(updateCustomerDto.getEmail());
        customer.setAccount(updateCustomerDto.getAccount());

        customerRepository.save(customer);
        return new ApiResponse<>(true, "Customer updated", customer);
    }

    public ApiResponse<Customer> deleteCustomer(String id) {
        customerRepository.deleteById(id);
        return new ApiResponse<>(true, "Customer deleted", null);
    }

    public ApiResponse<List<Customer>> getAllCustomers() {
        List<Customer> customers = customerRepository.findAll();
        return new ApiResponse<>(true, "Customers fetched", customers);
    }

    public ApiResponse<Customer> getCustomerById(String id) {
        Customer customer = customerRepository.findById(id).orElseThrow();
        return new ApiResponse<>(true, "Customers fetched", customer);
    }

}
