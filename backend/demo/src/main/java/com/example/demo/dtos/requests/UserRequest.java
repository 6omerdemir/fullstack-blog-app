package com.example.demo.dtos.requests;

public class UserRequest {
    private String userName;
    private String password;

    // Parametresiz constructor
    public UserRequest() {
    }

    // Parametreli constructor
    public UserRequest(String userName, String password) {
        this.userName = userName;
        this.password = password;
    }

    // Getter ve Setter metodları
    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
