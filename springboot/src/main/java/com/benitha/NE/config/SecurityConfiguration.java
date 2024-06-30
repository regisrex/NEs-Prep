package com.benitha.NE.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
@RequiredArgsConstructor
public class SecurityConfiguration {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;
    private final AuthenticationProvider authenticationProvider;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http.csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(auth -> auth.requestMatchers(
                        "/v3/api-docs/*",
                        "/v3/api-docs",
                        "/swagger-ui/*",
                        "/api/v1/customers",
                        "/api/v1/transactions",
                        "/api/v1/auth/signup",
                        "/api/v1/auth/login").permitAll()
                        .anyRequest()
                        .permitAll())
                .sessionManagement(sess -> sess.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authenticationProvider(authenticationProvider)
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
                .build();

        // .authorizeRequests().requestMatchers("/api/v1/auth/**")
        // .permitAll()
        // .anyRequest()
        // .authenticated()
        // .and()
        // .sessionManagement()
        // .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
        // .and()
        // .authenticationProvider(authenticationProvider)
        // .addFilterBefore(jwtAuthenticationFilter,
        // UsernamePasswordAuthenticationFilter.class)
        // .build();

    }
}
