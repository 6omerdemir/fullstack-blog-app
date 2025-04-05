package com.example.demo.controllers;

import com.example.demo.dtos.requests.LikeCreateRequest;
import com.example.demo.dtos.responses.LikeResponse;
import com.example.demo.entities.Like;
import com.example.demo.mapper.ModelMapperService;
import com.example.demo.services.LikeService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/likes")
public class LikeController {
    private final LikeService likeService;
    private final ModelMapperService modelMapperService;

    public LikeController(LikeService likeService, ModelMapperService modelMapperService) {
        this.likeService = likeService;
        this.modelMapperService = modelMapperService;
    }

    @GetMapping
    public List<LikeResponse> getAllLikes() {
        return likeService.getAllLikes().stream()
                .map(like -> modelMapperService.forResponse()
                        .map(like, LikeResponse.class))
                .toList();
    }

    @GetMapping("/userId/{userId}")
    public List<LikeResponse> getLikesByUserId(@PathVariable Long userId) {
        return likeService.getAllLikesByUserId(userId).stream()
                .map(like -> modelMapperService.forResponse()
                        .map(like, LikeResponse.class))
                .toList();
    }

    @GetMapping("/postId/{postId}")
    public List<LikeResponse> getLikesByPostId(@PathVariable Long postId) {
        return likeService.getAllLikesByPostId(postId).stream()
                .map(like -> modelMapperService.forResponse()
                        .map(like, LikeResponse.class))
                .toList();
    }

    @GetMapping("/userId/{userId}/postId/{postId}")
    public List<LikeResponse> getLikesByUserIdAndPostId(@PathVariable Long userId, @PathVariable Long postId) {
        return likeService.getAllLikesByUserAndPost(userId, postId).stream()
                .map(like -> modelMapperService.forResponse()
                        .map(like, LikeResponse.class))
                .toList();
    }

    @GetMapping("/{likeId}")
    public LikeResponse getOneLikeById(@PathVariable Long likeId) {
        return modelMapperService.forResponse()
                .map(likeService.getOneLikeById(likeId), LikeResponse.class);
    }

    @PostMapping
    public LikeResponse createOneLike(@RequestBody LikeCreateRequest likeCreateRequest) {
        return modelMapperService.forResponse()
                .map(likeService.createOneLike(likeCreateRequest), LikeResponse.class);
    }

    @DeleteMapping("/{likeId}")
    public void deleteOneLikeById(@PathVariable Long likeId) {
        likeService.deleteOneLikeById(likeId);
    }
}
