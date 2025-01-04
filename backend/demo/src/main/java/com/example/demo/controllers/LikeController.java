package com.example.demo.controllers;

import com.example.demo.dtos.requests.CommentCreateRequest;
import com.example.demo.dtos.requests.LikeCreateRequest;
import com.example.demo.entities.Comment;
import com.example.demo.entities.Like;
import com.example.demo.services.LikeService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/likes")
@CrossOrigin
public class LikeController {
    private LikeService likeService;
    public LikeController(LikeService likeService) {
        this.likeService = likeService;
    }

    @GetMapping
    public List<Like> getAllLikes(){
        return likeService.getAllLikes();
    }

    @GetMapping("/userId/{userId}")
    public List<Like> getLikessByUserId(@PathVariable Long userId) {
        return likeService.getAllLikesByUserId(userId);
    }

    @GetMapping("/postId/{postId}")
    public List<Like> getLikesByPostId(@PathVariable Long postId) {
        return likeService.getAllLikesByPostId(postId);
    }

    @GetMapping("/userId/{userId}/postId/{postId}")
    public List<Like> getLikesByUserIdAndPostId(@PathVariable Long userId, @PathVariable Long postId) {
        return likeService.getAllLikesByUserAndPost(userId, postId);
    }

    @GetMapping("/{likeId}")
    public Like getOneLikeById(@PathVariable Long likeId){
        return likeService.getOneLikeById(likeId);
    }

    @PostMapping
    public Like createOneLike(@RequestBody LikeCreateRequest likeCreateRequest){
        return likeService.createOneLike(likeCreateRequest);
    }

    @DeleteMapping("/{likeId}")
    public void deleteOneLikeById(@PathVariable Long likeId){
        likeService.deleteOneLikeById(likeId);
    }
}
