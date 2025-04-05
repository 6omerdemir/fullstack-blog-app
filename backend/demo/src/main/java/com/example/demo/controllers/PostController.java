package com.example.demo.controllers;

import com.example.demo.dtos.requests.PostCreateRequest;
import com.example.demo.dtos.requests.PostUpdateRequest;
import com.example.demo.dtos.responses.PostResponse;
import com.example.demo.entities.Post;
import com.example.demo.entities.User;
import com.example.demo.mapper.ModelMapperService;
import com.example.demo.services.PostService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/posts")

public class PostController {
    private PostService postService;
    private ModelMapperService modelMapperService;
    public PostController(PostService postService, ModelMapperService modelMapperService) {
        this.postService = postService;
        this.modelMapperService = modelMapperService;
    }

@GetMapping
    public List<PostResponse> getAllPosts(@RequestParam Optional<Long> userId){
        return postService.getAllPosts(userId);
}

@GetMapping("/{postId}")
    public Post getOnePost(@PathVariable Long postId){
        return postService.getOnePostById(postId);
}

@PostMapping
    public Post createOnePost(@RequestBody PostCreateRequest newPostRequest){
        return postService.createOnePost(newPostRequest);
}
@PutMapping("/{postId}")
    public Post updateOnePost(@PathVariable Long postId, @RequestBody PostUpdateRequest postUpdateRequest){
        return postService.updateOnePostById(postId, postUpdateRequest);
}
@DeleteMapping("/{postId}")
    public void deleteOnePost(@PathVariable Long postId){
        postService.deleteOnePostById(postId);
}

@GetMapping("/search")
    public ResponseEntity<List<Post>> searchPosts(@RequestParam("q") String title ){
        List<Post> posts = postService.searchPosts(title);
        return ResponseEntity.ok(posts);
    }

@GetMapping("/following/{userId}")
    public ResponseEntity<List<PostResponse>> getFollowingUsersPosts(@PathVariable Long userId) {
        return ResponseEntity.ok(postService.getFollowingUsersPosts(userId));
    }
}
