package com.trains.demo.controller;

import com.trains.demo.controller.auth.AuthenticationRequest;
import com.trains.demo.controller.auth.AuthenticationResponse;
import com.trains.demo.controller.auth.RegisterRequest;
import com.trains.demo.services.AuthenticationService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.postgresql.plugin.AuthenticationRequestType;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthenticationService service;
    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(@RequestBody RegisterRequest request){
        logger.info("register");
        return ResponseEntity.ok(service.register(request));
    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> register(@RequestBody AuthenticationRequest request){
        logger.info("register");

        return ResponseEntity.ok(service.authenticate(request));

    }

//    @PostMapping("/refresh-token")
//    public void refreshToken(
//            HttpServletRequest request,
//            HttpServletResponse response
//    ) throws IOException {
//        service.refreshToken(request, response);
//    }
}
