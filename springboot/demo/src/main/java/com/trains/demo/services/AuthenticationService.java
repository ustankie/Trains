package com.trains.demo.services;

import com.trains.demo.model.auth.AuthenticationRequest;
import com.trains.demo.model.auth.AuthenticationResponse;
import com.trains.demo.model.auth.RegisterRequest;
import com.trains.demo.model.nonpersistent.Role;
import com.trains.demo.model.User;
import com.trains.demo.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataAccessException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    public AuthenticationResponse register(RegisterRequest request) {
        var user= User.builder()
                .firstname(request.getFirstname())
                .lastname(request.getLastname())
                .login(request.getLogin())
                .password(passwordEncoder.encode(request.getPassword()))
                .phone(request.getPhone())
                .email(request.getEmail())
                .role(Role.USER)
                .build();

        String jwtToken=jwtService.generateToken(user);
        try{
            repository.save(user);

        }catch(DataAccessException e){
            throw new RuntimeException("Database error occurred: " + e.getMessage());
        }

        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getLogin(), request.getPassword()));
        var user=repository.findByLogin(request.getLogin()).orElseThrow();
        System.out.println(user);

        var jwtToken=jwtService.generateToken(user);

        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }

    public User getCurrentUser() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (principal instanceof UserDetails) {
            String login = ((UserDetails) principal).getUsername();
            return repository.findByLogin(login).orElse(null);
        }
        return null;
    }

}
