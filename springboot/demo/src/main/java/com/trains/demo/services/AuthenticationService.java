package com.trains.demo.services;

import com.trains.demo.controller.AuthController;
import com.trains.demo.controller.auth.AuthenticationRequest;
import com.trains.demo.controller.auth.AuthenticationResponse;
import com.trains.demo.controller.auth.RegisterRequest;
import com.trains.demo.model.Role;
import com.trains.demo.model.User;
import com.trains.demo.repository.UserRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.dao.DataAccessException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

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
                .userId(user.getUserId())
                .build();
    }

    @Service
    public static class JwtService {
        @Value("${security.key}")
        private String SECRET_KEY;
        private static final Logger logger = LoggerFactory.getLogger(AuthController.class);

        public String extractUserLogin(String token) {
            return extractClaim(token, Claims::getSubject);
        }

        private Claims extractAllClaims(String token) {
            return Jwts.parser().setSigningKey(getSignInKey()).build().parseSignedClaims(token).getPayload();


        }
        public String generateToken(UserDetails userDetails){
            return generateToken(new HashMap<>(),userDetails);
        }
        public String generateToken(Map<String, Object> extraClaims, UserDetails userDetails){

            return Jwts
                    .builder()
                    .claims(extraClaims)
                    .subject(userDetails.getUsername())
                    .issuedAt(new Date(System.currentTimeMillis()))
                    .expiration(new Date(System.currentTimeMillis()+1000*60*24))
                    .signWith(getSignInKey(), SignatureAlgorithm.HS256)
                    .compact();
        }

        private Key getSignInKey() {
            byte[] keyBytes= Decoders.BASE64.decode(SECRET_KEY);
            return Keys.hmacShaKeyFor(keyBytes);

        }

        public boolean isTokenValid(String token, UserDetails userDetails){
            String username=extractUserLogin(token);
            return (username.equals(userDetails.getUsername())) && !isTokenExpired(token);
        }

        private boolean isTokenExpired(String token) {
            return extractAllClaims(token).getExpiration().before(new Date());
        }

        public <T> T extractClaim(String token, Function<Claims, T> claimsResolver){
            final Claims claims=extractAllClaims(token);
            return claimsResolver.apply(claims);
        }
    }
}
