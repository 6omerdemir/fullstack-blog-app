package com.example.demo.dtos.responses;

import java.util.Date;

public class UserResponse {
    private Long id;
    private String userName;
    private String profileColor;
    private String headerColor;
    private Date createDate;

    public UserResponse() {
    }

    public UserResponse(Long id, String userName, String profileColor, String headerColor, Date createDate) {
        this.id = id;
        this.userName = userName;
        this.profileColor = profileColor;
        this.headerColor = headerColor;
        this.createDate = createDate;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public String getHeaderColor() {
        return headerColor;
    }

    public void setHeaderColor(String headerColor) {
        this.headerColor = headerColor;
    }

    public Date getCreateDate() {
        return createDate;
    }

    public void setCreateDate(Date createDate) {
        this.createDate = createDate;
    }
}
