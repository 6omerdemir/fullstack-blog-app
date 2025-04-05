package com.example.demo.dtos.responses;

import java.util.Date;

public class CommentResponse {
    private Long id;
    private Long userId;
    private String userName;
    private String profileColor;
    private Long postId;
    private String text;
    private Date createDate;

    public CommentResponse() {
    }

    public CommentResponse(Long id, Long userId, String userName, String profileColor, Long postId, String text, Date createDate) {
        this.id = id;
        this.userId = userId;
        this.userName = userName;
        this.profileColor = profileColor;
        this.postId = postId;
        this.text = text;
        this.createDate = createDate;
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

    public String getProfileColor() {
        return profileColor;
    }

    public void setProfileColor(String profileColor) {
        this.profileColor = profileColor;
    }

    public Long getPostId() {
        return postId;
    }

    public void setPostId(Long postId) {
        this.postId = postId;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public Date getCreateDate() {
        return createDate;
    }

    public void setCreateDate(Date createDate) {
        this.createDate = createDate;
    }
}