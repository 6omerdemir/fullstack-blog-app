package com.example.demo.dtos.responses;

public class LikeResponse {
    private Long id;
    private Long userId;
    private String userName;
    private Long postId;

    public LikeResponse() {
    }

    public LikeResponse(Long id, Long userId, String userName, Long postId) {
        this.id = id;
        this.userId = userId;
        this.userName = userName;
        this.postId = postId;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public Long getPostId() {
        return postId;
    }

    public void setPostId(Long postId) {
        this.postId = postId;
    }
}