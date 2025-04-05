package com.example.demo.controllers;

import com.example.demo.entities.User;
import com.example.demo.services.FollowService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/follow")
public class FollowController {
    @Autowired
    private FollowService followService;

    @PostMapping("/{userId}/follow/{targetId}")
    public ResponseEntity<String> followUser(
            @PathVariable Long userId,
            @PathVariable Long targetId
    ) {
        followService.followUser(userId, targetId);
        return ResponseEntity.ok("Followed successfully");
    }

    @PostMapping("/{userId}/unfollow/{targetId}")
    public ResponseEntity<String> unfollowUser(
            @PathVariable Long userId,
            @PathVariable Long targetId
    ) {
        followService.unfollowUser(userId, targetId);
        return ResponseEntity.ok("Unfollowed successfully");
    }

    @GetMapping("/{userId}/following")
    public ResponseEntity<List<User>> getFollowing(@PathVariable Long userId) {
        List<User> following = followService.getFollowing(userId);
        return ResponseEntity.ok(following);
    }

    @GetMapping("/{userId}/followers")
    public ResponseEntity<List<User>> getFollowers(@PathVariable Long userId) {
        List<User> followers = followService.getFollowers(userId);
        return ResponseEntity.ok(followers);
    }
}