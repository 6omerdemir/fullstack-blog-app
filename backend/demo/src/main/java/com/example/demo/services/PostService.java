package com.example.demo.services;

import com.example.demo.dtos.requests.PostCreateRequest;
import com.example.demo.dtos.requests.PostUpdateRequest;
import com.example.demo.dtos.responses.PostResponse;
import com.example.demo.entities.Post;
import com.example.demo.entities.User;
import com.example.demo.mapper.ModelMapperService;
import com.example.demo.repos.PostRepository;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class PostService {
    private PostRepository postRepository;
    private UserService userService;
    private ModelMapperService modelMapperService;
    private FollowService followService;

    public PostService(PostRepository postRepository, UserService userService, ModelMapperService modelMapperService, FollowService followService) {
        this.postRepository = postRepository;
        this.userService = userService;
        this.modelMapperService = modelMapperService;
        this.followService = followService;
    }


    public List<PostResponse> getAllPosts(Optional<Long> userId) {
        List<Post> list;
        if (userId.isPresent()) {
            list = postRepository.findByUserId(userId.get());
        } else {
            list = postRepository.findAll();
        }
        return list.stream()
                .map(p -> modelMapperService.forResponse().map(p, PostResponse.class))
                .toList();
    }


    public Post getOnePostById(Long postId) {
        return postRepository.findById(postId).orElse(null);
    }

    public Post createOnePost(PostCreateRequest newPostRequest) {
        User user = userService.getOneUserById(newPostRequest.getUserId());
        if (user == null){
            return null;
        }
        Post toSave = new Post();
        toSave.setText(newPostRequest.getText());
        toSave.setTitle(newPostRequest.getTitle());
        toSave.setUser(user);
        toSave.setCreateDate(new Date());
        return postRepository.save(toSave);
    }

    public Post updateOnePostById(Long postId, PostUpdateRequest postUpdateRequest) {
        Optional<Post> post = postRepository.findById(postId);
        if(post.isPresent()){
            Post toUpdate = post.get();
            toUpdate.setText(postUpdateRequest.getText());
            toUpdate.setTitle(postUpdateRequest.getTitle());
            postRepository.save(toUpdate);
            return toUpdate;
        }
        return null;
    }

    public void deleteOnePostById(Long postId) {
        postRepository.deleteById(postId);
    }

    public List<Post> searchPosts(String title){
        if (title == null || title.trim().isEmpty()) {
            return Collections.emptyList();
        }
        return postRepository.findByTitleContaining(title);
    }

    public List<PostResponse> getFollowingUsersPosts(Long userId) {
        // Get list of users that userId follows
        List<User> followingUsers = followService.getFollowing(userId);
        
        // Get posts from all following users and map to PostResponse
        return followingUsers.stream()
                .flatMap(user -> postRepository.findByUserId(user.getId()).stream())
                .map(p -> modelMapperService.forResponse().map(p, PostResponse.class))
                .collect(Collectors.toList());
    }
}