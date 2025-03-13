package com.example.demo.dtos.responses;
public class AuthResponse {
    private String message;
    private Long userId;
    private String accessToken;
    private String refreshToken;

    public AuthResponse(String message, Long userId, String accessToken, String refreshToken) {
        this.message = message;
        this.userId = userId;
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
    }
    public AuthResponse() {}

    public String getAccessToken() {
        return accessToken;
    }

    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }

    public String getRefreshToken() {
        return refreshToken;
    }

    public void setRefreshToken(String refreshToken) {
        this.refreshToken = refreshToken;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }
}
