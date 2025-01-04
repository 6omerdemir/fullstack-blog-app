package com.example.demo.repos;

import com.example.demo.entities.Like;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LikeRepository extends JpaRepository<Like, Long> {
    List<Like> findByUserId(Long userId);

    List<Like> findByPostId(Long postId);

    List<Like> findByUserIdAndPostId(Long userId, Long postId);

}
