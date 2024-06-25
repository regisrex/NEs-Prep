package me.regisndiziihiwe.LearnSecurity.customers;

import io.swagger.annotations.Api;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import me.regisndiziihiwe.LearnSecurity.customers.dto.CreateCustomerDto;
import me.regisndiziihiwe.LearnSecurity.customers.dto.UpdateCustomerDto;
import me.regisndiziihiwe.LearnSecurity.models.Customer;
import me.regisndiziihiwe.LearnSecurity.repositories.CustomerRepository;
import me.regisndiziihiwe.LearnSecurity.utils.ApiResponse;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.concurrent.ExecutionException;

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
