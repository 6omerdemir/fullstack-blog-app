package com.example.demo.repos;

import com.example.demo.entities.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findByUserId(Long userId);

    List<Comment> findByPostId(Long postId);

    List<Comment> findByUserIdAndPostId(Long userId, Long postId);

}
