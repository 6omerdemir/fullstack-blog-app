package com.example.demo.controllers;

import com.example.demo.dtos.requests.CommentCreateRequest;
import com.example.demo.dtos.requests.CommentUpdateRequest;
import com.example.demo.entities.Comment;
import com.example.demo.services.CommentService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/comments")

public class CommentController {
    private CommentService commentService;

    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

    @GetMapping
    public List<Comment> getAllComments() {
        return commentService.getAllComments();
    }

    @GetMapping("/userId/{userId}")
    public List<Comment> getCommentsByUserId(@PathVariable Long userId) {
        return commentService.getAllCommentsByUserId(userId);
    }

    @GetMapping("/postId/{postId}")
    public List<Comment> getCommentsByPostId(@PathVariable Long postId) {
        return commentService.getAllCommentsByPostId(postId);
    }

    @GetMapping("/userId/{userId}/postId/{postId}")
    public List<Comment> getCommentsByUserIdAndPostId(@PathVariable Long userId, @PathVariable Long postId) {
        return commentService.getAllCommentsByUserAndPost(userId, postId);
    }

    @GetMapping("/{commentId}")
    public Comment getOneComment(@PathVariable Long commentId){
        return commentService.getOneCommentById(commentId);
    }

    @PostMapping
    public Comment createOneComment(@RequestBody CommentCreateRequest commentCreateRequest){
        return commentService.createOneComment(commentCreateRequest);
    }

    @PutMapping("/{commentId}")
    public Comment updateOneCommentById(@PathVariable Long commentId, @RequestBody CommentUpdateRequest commentUpdateRequest){
        return commentService.updateOneCommentById(commentId, commentUpdateRequest);
    }

    @DeleteMapping("/{commentId}")
    public void deleteOneCommentById(@PathVariable Long commentId){
        commentService.deleteOneCommentById(commentId);
    }
}
