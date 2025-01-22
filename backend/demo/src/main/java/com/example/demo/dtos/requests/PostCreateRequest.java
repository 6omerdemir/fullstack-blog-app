package com.example.demo.dtos.requests;

public class PostCreateRequest {
    private Long userId;
    private String text;
    private String title;

    public PostCreateRequest(){}

    public PostCreateRequest(Long userId, String text, String title) {
        this.userId = userId;
        this.text = text;
        this.title = title;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }
}
