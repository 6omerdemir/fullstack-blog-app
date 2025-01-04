package com.example.demo.dtos.requests;

public class UserRequest {
    private String username;
    private String password;

    // Parametresiz constructor
    public UserRequest() {
    }

    // Parametreli constructor
    public UserRequest(String username, String password) {
        this.username = username;
        this.password = password;
    }

    // Getter ve Setter metodları
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
