package com.example.demo.services;

import com.example.demo.entities.User;
import com.example.demo.security.entity.RefreshToken;
import com.example.demo.security.repos.RefreshTokenRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Service
public class RefreshTokenService {
    @Value("${refresh.token.expires.in}")
    private Long expireSeconds;

    private RefreshTokenRepository refreshTokenRepository;
    public RefreshTokenService(RefreshTokenRepository refreshTokenRepository) {
        this.refreshTokenRepository = refreshTokenRepository;
    }

    public String createRefreshToken(User user) {
        RefreshToken refreshToken = new RefreshToken();
        refreshToken.setUser(user);
        refreshToken.setToken(UUID.randomUUID().toString());
        refreshToken.setExpiryDate(Date.from(Instant.now().plusSeconds(expireSeconds)));
        refreshTokenRepository.save(refreshToken);
        return refreshToken.getToken();
    }

    public boolean isRefreshExpired(RefreshToken token) {
        return token.getExpiryDate().before(new Date());
    }

    public RefreshToken getByUser(Long userId) {
        List<RefreshToken> tokens = refreshTokenRepository.findByUserId(userId);
        if (tokens.isEmpty()) {
            throw new RuntimeException("Refresh token not found");
        }
        return tokens.get(0); // En sonuncuyu al (DESC sıralama yüzünden ilk eleman)
    }
}
