package com.example.demo.security.controller;


import com.example.demo.dtos.requests.UserRequest;
import com.example.demo.dtos.responses.AuthResponse;
import com.example.demo.entities.User;
import com.example.demo.security.entity.AuthRequest;
import com.example.demo.security.entity.RefreshRequest;
import com.example.demo.security.entity.RefreshToken;
import com.example.demo.security.service.JwtService;
import com.example.demo.security.service.UserInfoService;
import com.example.demo.services.RefreshTokenService;
import com.example.demo.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")

public class AuthController {
    private UserInfoService service;
    private JwtService jwtService;
    private AuthenticationManager authenticationManager;
    private UserService userService;
    private PasswordEncoder passwordEncoder;
    private RefreshTokenService refreshTokenService;

    public AuthController(UserInfoService service, PasswordEncoder passwordEncoder, UserService userService, AuthenticationManager authenticationManager, JwtService jwtService, RefreshTokenService refreshTokenService) {
        this.passwordEncoder = passwordEncoder;
        this.userService = userService;
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
        this.service = service;
        this.refreshTokenService = refreshTokenService;
    }

    @PostMapping("/login")
    public AuthResponse login(@RequestBody UserRequest userRequest) {
        UsernamePasswordAuthenticationToken authToken =
                new UsernamePasswordAuthenticationToken(userRequest.getUserName(), userRequest.getPassword());
        Authentication authentication = authenticationManager.authenticate(authToken);
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwtToken = jwtService.generateToken(userRequest.getUserName());
        User user = userService.getOneUserByUserName(userRequest.getUserName()).orElseThrow(() -> new UsernameNotFoundException("User not found"));
        AuthResponse authResponse = new AuthResponse();
        authResponse.setAccessToken("Bearer " + jwtToken);
        authResponse.setRefreshToken(refreshTokenService.createRefreshToken(user));
        authResponse.setUserId(user.getId());
        return authResponse;
    }


    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody UserRequest userRequest) {
        AuthResponse authResponse = new AuthResponse();
        if(userService.getOneUserByUserName(userRequest.getUserName()).isEmpty()){
            User user = new User();
            user.setUserName(userRequest.getUserName());
            user.setPassword(passwordEncoder.encode(userRequest.getPassword()));
            userService.saveOneUser(user);

            UsernamePasswordAuthenticationToken authToken =
                    new UsernamePasswordAuthenticationToken(userRequest.getUserName(), userRequest.getPassword());
            Authentication authentication = authenticationManager.authenticate(authToken);
            SecurityContextHolder.getContext().setAuthentication(authentication);
            String jwtToken = jwtService.generateToken(userRequest.getUserName());

            authResponse.setAccessToken("Bearer " + jwtToken);
            authResponse.setRefreshToken(refreshTokenService.createRefreshToken(user));
            authResponse.setUserId(user.getId());
            authResponse.setMessage("User registered successfully");
            return new ResponseEntity<>(authResponse, HttpStatus.CREATED);
        }
        authResponse.setMessage("User already exists");
        return new ResponseEntity<>(authResponse, HttpStatus.BAD_REQUEST);
    }

    @PostMapping("/refresh")
    public ResponseEntity<AuthResponse> refresh(@RequestBody RefreshRequest refreshRequest) {
        AuthResponse authResponse = new AuthResponse();
        RefreshToken refreshToken = refreshTokenService.getByUser(refreshRequest.getUserId());
        if (refreshToken == null || !refreshToken.getToken().equals(refreshRequest.getRefreshToken()) || refreshTokenService.isRefreshExpired(refreshToken)) {
            authResponse.setMessage("Invalid or expired refresh token");
            return new ResponseEntity<>(authResponse, HttpStatus.UNAUTHORIZED);
        }
        User user = refreshToken.getUser();
        String jwtToken = jwtService.generateToken(user.getUserName());

        authResponse.setAccessToken("Bearer " + jwtToken);
        authResponse.setRefreshToken(refreshToken.getToken());
        authResponse.setUserId(user.getId());
        authResponse.setMessage("Token refreshed successfully");
        return new ResponseEntity<>(authResponse, HttpStatus.OK);
    }
}
