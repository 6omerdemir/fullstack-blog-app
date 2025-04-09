package com.example.demo.controllers;

import com.example.demo.dtos.requests.CommentCreateRequest;
import com.example.demo.dtos.requests.CommentUpdateRequest;
import com.example.demo.dtos.responses.CommentResponse;
import com.example.demo.mapper.ModelMapperService;
import com.example.demo.services.CommentService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/comments")
public class CommentController {
    private final CommentService commentService;
    private final ModelMapperService modelMapperService;

    public CommentController(CommentService commentService, ModelMapperService modelMapperService) {
        this.commentService = commentService;
        this.modelMapperService = modelMapperService;
    }

    @GetMapping
    public List<CommentResponse> getAllComments() {
        return commentService.getAllComments().stream()
                .map(comment -> modelMapperService.forResponse()
                        .map(comment, CommentResponse.class))
                .toList();
    }

    @GetMapping("/userId/{userId}")
    public List<CommentResponse> getCommentsByUserId(@PathVariable Long userId) {
        return commentService.getAllCommentsByUserId(userId).stream()
                .map(comment -> modelMapperService.forResponse()
                        .map(comment, CommentResponse.class))
                .toList();
    }

    @GetMapping("/postId/{postId}")
    public List<CommentResponse> getCommentsByPostId(@PathVariable Long postId) {
        return commentService.getAllCommentsByPostId(postId).stream()
                .map(comment -> modelMapperService.forResponse()
                        .map(comment, CommentResponse.class))
                .toList();
    }

    @GetMapping("/userId/{userId}/postId/{postId}")
    public List<CommentResponse> getCommentsByUserIdAndPostId(@PathVariable Long userId, @PathVariable Long postId) {
        return commentService.getAllCommentsByUserAndPost(userId, postId).stream()
                .map(comment -> modelMapperService.forResponse()
                        .map(comment, CommentResponse.class))
                .toList();
    }

    @GetMapping("/{commentId}")
    public CommentResponse getOneComment(@PathVariable Long commentId) {
        return modelMapperService.forResponse()
                .map(commentService.getOneCommentById(commentId), CommentResponse.class);
    }

    @PostMapping
    public CommentResponse createOneComment(@RequestBody CommentCreateRequest commentCreateRequest) {
        return modelMapperService.forResponse()
                .map(commentService.createOneComment(commentCreateRequest), CommentResponse.class);
    }

    @PutMapping("/{commentId}")
    public CommentResponse updateOneCommentById(@PathVariable Long commentId, @RequestBody CommentUpdateRequest commentUpdateRequest) {
        return modelMapperService.forResponse()
                .map(commentService.updateOneCommentById(commentId, commentUpdateRequest), CommentResponse.class);
    }

    @DeleteMapping("/{commentId}")
    public void deleteOneCommentById(@PathVariable Long commentId) {
        commentService.deleteOneCommentById(commentId);
    }
}
