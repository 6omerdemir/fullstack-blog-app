package com.example.demo.dtos.responses;

import java.util.Date;

public class PostResponse {
    private Long id;
    private Long userId;
    private String userName;
    private String title;
    private String text;
    private Date createDate;

    public PostResponse() {
    };

    public PostResponse(Long id, Long userId, String userName, String title, String text, Date createDate) {
        this.id = id;
        this.userId = userId;
        this.userName = userName;
        this.title = title;
        this.text = text;
        this.createDate = createDate;
    }

    public Date getCreateDate() {
        return createDate;
    }

    public void setCreateDate(Date createDate) {
        this.createDate = createDate;
    }

    public Long getId() {
        return id;
    };

    public void setId(Long id) {
        this.id = id;
    };

    public Long getUserId() {
        return userId;
    };

    public void setUserId(Long userId) {
        this.userId = userId;
    };

    public String getUserName() {
        return userName;
    };

    public void setUserName(String userName) {
        this.userName = userName;
    };

    public String getTitle() {
        return title;
    };

    public void setTitle(String title) {
        this.title = title;
    };

    public String getText() {
        return text;
    };

    public void setText(String text) {
        this.text = text;
    };
}
