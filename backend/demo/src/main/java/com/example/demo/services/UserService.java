package com.example.demo.services;

import com.example.demo.entities.User;
import com.example.demo.repos.FollowRepository;
import com.example.demo.repos.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.Optional;
@Service
public class UserService {
    private final UserRepository userRepository;
    private final FollowRepository followRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, FollowRepository followRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.followRepository = followRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User saveOneUser(User newUser) {
        newUser.setCreateDate(new Date());
        return userRepository.save(newUser);
    }

    public User getOneUserById(Long userId) {
        return userRepository.findById(userId).orElse(null);
    }

    public User updateOneUserById(Long userId, User newUser) {
        Optional<User> user = userRepository.findById(userId);
        if(user.isPresent()){
            User foundUser = user.get();
            foundUser.setUserName(newUser.getUserName());
            if (newUser.getPassword() != null && !newUser.getPassword().isEmpty()) {
                foundUser.setPassword(passwordEncoder.encode(newUser.getPassword()));
            }
            foundUser.setProfileColor(newUser.getProfileColor());
            foundUser.setHeaderColor(newUser.getHeaderColor());
            userRepository.save(foundUser);
            return foundUser;
        }else{
            return null; //custom exception eklenecek
        }
    }

    public void deleteOneUserById(Long userId) {
        userRepository.deleteById(userId);
    }

    public Optional<User> getOneUserByUserName(String userName) {
        return userRepository.findByUserName(userName);
    }

    public List<User> searchUsers(String query) {
        if(query == null || query.trim().isEmpty()){
            return Collections.emptyList();
        }
        return userRepository.findByUserNameContaining(query);
    }
}
