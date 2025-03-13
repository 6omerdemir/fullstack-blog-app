package com.example.demo.security.repos;

import com.example.demo.security.entity.RefreshToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {
        @Query("SELECT rt FROM RefreshToken rt WHERE rt.user.id = :userId ORDER BY rt.id DESC")
        List<RefreshToken> findByUserId(@Param("userId") Long userId);
    }
