package com.benitha.NE.auth;

import com.benitha.NE.models.User;
import com.benitha.NE.repositories.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import com.benitha.NE.auth.exceptions.InvalidCredentialsException;
import com.benitha.NE.auth.exceptions.UsernameTakenException;
import com.benitha.NE.config.JWTService;
import com.benitha.NE.enums.Role;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JWTService jwtService;

    public AuthenticationResponse register(RegisterDTO dto) {

        boolean usernameTaken = userRepository.existsByUsername(dto.getUsername());
        if (usernameTaken)
            throw new UsernameTakenException("Username taken");
        try {
            var user = new User();
            user.setEmail(dto.getEmail());
            user.setUsername(dto.getUsername());
            user.setRole(Role.USER);
            user.setPassword(passwordEncoder.encode(dto.getPassword()));

            userRepository.save(user);
            System.out.println(user.toString());

            var token = jwtService.generateToken(user);
            return new AuthenticationResponse(user.getUsername(), user.getEmail(), token);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    public AuthenticationResponse login(LoginDTO dto) {
        System.out.println("Step 1");
        var user = userRepository.findByUsername(dto.getUsername())
                .orElseThrow();
        var passwordsMatch = passwordEncoder.matches(dto.getPassword(), user.getPassword());
        if (!passwordsMatch)
            throw new InvalidCredentialsException("Invalid credentials");
        String token = jwtService.generateToken(user);
        return new AuthenticationResponse(user.getUsername(), user.getEmail(), token);
    }
}
