package me.regisndiziihiwe.LearnSecurity.auth;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import me.regisndiziihiwe.LearnSecurity.auth.exceptions.InvalidCredentialsException;
import me.regisndiziihiwe.LearnSecurity.auth.exceptions.UsernameTakenException;
import me.regisndiziihiwe.LearnSecurity.config.JWTService;
import me.regisndiziihiwe.LearnSecurity.enums.Role;
import me.regisndiziihiwe.LearnSecurity.models.User;
import me.regisndiziihiwe.LearnSecurity.repositories.UserRepository;

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
