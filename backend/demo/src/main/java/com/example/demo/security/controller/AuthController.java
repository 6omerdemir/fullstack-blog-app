package com.example.demo.security.controller;


import com.example.demo.dtos.requests.UserRequest;
import com.example.demo.entities.User;
import com.example.demo.security.entity.AuthRequest;
import com.example.demo.security.service.JwtService;
import com.example.demo.security.service.UserInfoService;
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
@CrossOrigin
public class AuthController {
    private UserInfoService service;

    private JwtService jwtService;

    private AuthenticationManager authenticationManager;

    private UserService userService;

    private PasswordEncoder passwordEncoder;

    public AuthController(UserInfoService service, PasswordEncoder passwordEncoder, UserService userService, AuthenticationManager authenticationManager, JwtService jwtService) {
        this.passwordEncoder = passwordEncoder;
        this.userService = userService;
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
        this.service = service;
    }

    @PostMapping("/login")
    public String login(@RequestBody UserRequest userRequest) {
        UsernamePasswordAuthenticationToken authToken =
                new UsernamePasswordAuthenticationToken(userRequest.getUserName(), userRequest.getPassword());
        Authentication authentication = authenticationManager.authenticate(authToken); // authentication sonucu burada
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwtToken = jwtService.generateToken(userRequest.getUserName());
        System.out.println("Extracted Username: " + authentication.getName());
        System.out.println("Authentication result: " + authentication.isAuthenticated());
        System.out.println("Authorities: " + authentication.getAuthorities());
        return "Bearer " + jwtToken;
    }


    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody UserRequest userRequest) {
        if(userService.getOneUserByUserName(userRequest.getUserName()).isEmpty()){
            User user = new User();
            user.setUserName(userRequest.getUserName());
            user.setPassword(passwordEncoder.encode(userRequest.getPassword()));
            userService.saveOneUser(user);
            return new ResponseEntity<>("User created successfully", HttpStatus.CREATED);
        }
        return new ResponseEntity<>("User already exists", HttpStatus.BAD_REQUEST);
    }
}
