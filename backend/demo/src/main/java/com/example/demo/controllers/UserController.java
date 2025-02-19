package com.example.demo.controllers;

import com.example.demo.entities.User;
import com.example.demo.repos.UserRepository;
import com.example.demo.services.UserService;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/users")

public class UserController {
    private final UserService userService;

    public UserController(UserService userService){
        this.userService=userService;
    }

    @GetMapping
    public List<User> getAllUsers(){
        return userService.getAllUsers();
    }

    @PostMapping
    public User createUser(@RequestBody User newUser){
        return userService.saveOneUser(newUser);
    }

    @GetMapping("/{userId}")
    public User getOneUser(@PathVariable Long userId){
        //custom exception eklenecek
        return userService.getOneUserById(userId);
    }
    @PutMapping("/{userId}")
    public User updateOneUserById(@PathVariable Long userId, @RequestBody User newUser){
        return userService.updateOneUserById(userId, newUser);
    }

    @DeleteMapping("/{userId}")
    public void deleteOneUserById(@PathVariable Long userId){
        userService.deleteOneUserById(userId);
    }
}
