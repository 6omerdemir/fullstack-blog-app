package com.example.demo.dtos.requests;

public class CommentUpdateRequest {
    private String text;

    public CommentUpdateRequest(){}

    public CommentUpdateRequest(Long id, Long userId, Long postId, String text) {
        this.text = text;
    }
    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }
}
