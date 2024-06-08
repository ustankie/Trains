package com.trains.demo.controller;

import com.trains.demo.model.User;
import com.trains.demo.model.auth.AuthenticationRequest;
import com.trains.demo.model.auth.AuthenticationResponse;
import com.trains.demo.model.auth.RegisterRequest;
import com.trains.demo.services.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class AuthController {
    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);
    private final AuthenticationService service;


    @PostMapping("/auth/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        logger.info("register");
        try {
            return ResponseEntity.ok(service.register(request));
        }         catch(RuntimeException e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @PostMapping("/auth/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(@RequestBody AuthenticationRequest request) {
        logger.info("register");

        return ResponseEntity.ok(service.authenticate(request));

    }
    @GetMapping("/get_user")
    public ResponseEntity<User> getUser(){
        logger.info(String.valueOf(service.getCurrentUser()));
        return ResponseEntity.ok(service.getCurrentUser());
    }


}
