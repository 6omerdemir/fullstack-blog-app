package com.example.demo.services;

import com.example.demo.dtos.requests.LikeCreateRequest;
import com.example.demo.entities.Like;
import com.example.demo.entities.Post;
import com.example.demo.entities.User;
import com.example.demo.repos.LikeRepository;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class LikeService {
    private LikeRepository likeRepository;
    private UserService userService;
    private PostService postService;
    public LikeService(LikeRepository likeRepository, UserService userService, PostService postService) {
        this.likeRepository = likeRepository;
        this.userService = userService;
        this.postService = postService;
    }

    public List<Like> getAllLikes() {
        return likeRepository.findAll();
    }

    public List<Like> getAllLikesByUserId(Long userId) {
        return likeRepository.findByUserId(userId);
    }

    public List<Like> getAllLikesByPostId(Long postId) {
        return likeRepository.findByPostId(postId);
    }

    public List<Like> getAllLikesByUserAndPost(Long userId, Long postId) {
        return likeRepository.findByUserIdAndPostId(userId, postId);
    }

    public Like getOneLikeById(Long likeId) {
        return likeRepository.findById(likeId).orElse(null);
    }

    public Like createOneLike(LikeCreateRequest likeCreateRequest) {
        User user = userService.getOneUserById(likeCreateRequest.getUserId());
        Post post = postService.getOnePostById(likeCreateRequest.getPostId());
        if(user != null && post != null) {
            Like newLike = new Like();
            newLike.setPost(post);
            newLike.setUser(user);
            return likeRepository.save(newLike);
        }else
            return null;
    }

    public void deleteOneLikeById(Long likeId) {
        likeRepository.deleteById(likeId);
    }
}
