package com.example.demo.controllers;

import com.example.demo.dtos.responses.UserResponse;
import com.example.demo.entities.User;
import com.example.demo.mapper.ModelMapperService;
import com.example.demo.repos.UserRepository;
import com.example.demo.services.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {
    private final UserService userService;
    private final ModelMapperService modelMapperService;

    public UserController(UserService userService, ModelMapperService modelMapperService) {
        this.userService = userService;
        this.modelMapperService = modelMapperService;
    }

    @GetMapping
    public List<UserResponse> getAllUsers() {
        return userService.getAllUsers().stream()
                .map(user -> modelMapperService.forResponse()
                        .map(user, UserResponse.class))
                .toList();
    }

    @PostMapping
    public UserResponse createUser(@RequestBody User newUser) {
        return modelMapperService.forResponse()
                .map(userService.saveOneUser(newUser), UserResponse.class);
    }

    @GetMapping("/{userId}")
    public UserResponse getOneUser(@PathVariable Long userId) {
        return modelMapperService.forResponse()
                .map(userService.getOneUserById(userId), UserResponse.class);
    }

    @PutMapping("/{userId}")
    public UserResponse updateOneUserById(@PathVariable Long userId, @RequestBody User newUser) {
        return modelMapperService.forResponse()
                .map(userService.updateOneUserById(userId, newUser), UserResponse.class);
    }

    @DeleteMapping("/{userId}")
    public void deleteOneUserById(@PathVariable Long userId) {
        userService.deleteOneUserById(userId);
    }

    @GetMapping("/search")
    public ResponseEntity<List<UserResponse>> searchUsers(@RequestParam("q") String userName) {
        List<UserResponse> users = userService.searchUsers(userName).stream()
                .map(user -> modelMapperService.forResponse()
                        .map(user, UserResponse.class))
                .toList();
        return ResponseEntity.ok(users);
    }
}
