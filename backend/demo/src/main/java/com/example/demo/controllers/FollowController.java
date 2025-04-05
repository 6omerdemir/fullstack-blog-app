package com.example.demo.controllers;

import com.example.demo.dtos.responses.FollowResponse;
import com.example.demo.dtos.responses.UserResponse;
import com.example.demo.entities.Follow;
import com.example.demo.mapper.ModelMapperService;
import com.example.demo.services.FollowService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/follow")
public class FollowController {
    private final FollowService followService;
    private final ModelMapperService modelMapperService;

    public FollowController(FollowService followService, ModelMapperService modelMapperService) {
        this.followService = followService;
        this.modelMapperService = modelMapperService;
    }

    @PostMapping("/{userId}/follow/{targetId}")
    public ResponseEntity<FollowResponse> followUser(
            @PathVariable Long userId,
            @PathVariable Long targetId
    ) {
        Follow follow = followService.followUser(userId, targetId);
        if (follow == null) {
            return ResponseEntity.ok(null);
        }
        return ResponseEntity.ok(modelMapperService.forResponse()
                .map(follow, FollowResponse.class));
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
    public ResponseEntity<List<UserResponse>> getFollowing(@PathVariable Long userId) {
        return ResponseEntity.ok(
            followService.getFollowing(userId).stream()
                .map(user -> modelMapperService.forResponse()
                    .map(user, UserResponse.class))
                .toList()
        );
    }

    @GetMapping("/{userId}/followers")
    public ResponseEntity<List<UserResponse>> getFollowers(@PathVariable Long userId) {
        return ResponseEntity.ok(
            followService.getFollowers(userId).stream()
                .map(user -> modelMapperService.forResponse()
                    .map(user, UserResponse.class))
                .toList()
        );
    }
}