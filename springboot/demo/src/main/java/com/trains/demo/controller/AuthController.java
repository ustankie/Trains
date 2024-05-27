package com.trains.demo.controller;

import com.trains.demo.controller.auth.AuthenticationRequest;
import com.trains.demo.controller.auth.AuthenticationResponse;
import com.trains.demo.controller.auth.RegisterRequest;
import com.trains.demo.services.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.postgresql.plugin.AuthenticationRequestType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthenticationService service;

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(@RequestBody RegisterRequest request){
        return ResponseEntity.ok(service.register(request));
    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> register(@RequestBody AuthenticationRequest request){
        return ResponseEntity.ok(service.authenticate(request));

    }
}
