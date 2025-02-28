package com.example.demo.dtos.requests;

public class LikeCreateRequest {
    private Long userId;
    private Long postId;

    public LikeCreateRequest (){};

    public LikeCreateRequest(Long userId, Long id, Long postId) {
        this.userId = userId;

        this.postId = postId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getPostId() {
        return postId;
    }

    public void setPostId(Long postId) {
        this.postId = postId;
    }
}
