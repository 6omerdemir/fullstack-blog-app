package com.example.demo.dtos.responses;

import java.time.LocalDateTime;

public class FollowResponse {
    private Long id;
    private UserResponse follower;
    private UserResponse following;
    private LocalDateTime createdAt;

    public FollowResponse() {
    }

    public FollowResponse(Long id, UserResponse follower, UserResponse following, LocalDateTime createdAt) {
        this.id = id;
        this.follower = follower;
        this.following = following;
        this.createdAt = createdAt;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public UserResponse getFollower() {
        return follower;
    }

    public void setFollower(UserResponse follower) {
        this.follower = follower;
    }

    public UserResponse getFollowing() {
        return following;
    }

    public void setFollowing(UserResponse following) {
        this.following = following;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
} 