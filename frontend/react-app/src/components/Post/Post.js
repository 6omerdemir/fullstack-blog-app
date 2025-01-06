import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Header } from 'semantic-ui-react';
import PostService from '../../services/PostService';

function Post() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [post, setPost] = useState(null);
    const { postId } = useParams();

    useEffect(() => {
        let postService = new PostService();
        postService.getOnePostById(postId)
            .then(result => {
                setPost(result.data);
                setIsLoaded(true);
            })
            .catch(error => {
                setError(error);
                setIsLoaded(true);
            });
    }, [postId]);

    if (error) return <div>Error: {error.message}</div>;
    if (!isLoaded) return <div>Loading...</div>;
    if (!post) return <div>Post not found</div>;

    return (
        <Container text>
            <Header as='h1'>{post.title}</Header>
            <p>{post.text}</p>
        </Container>
    );
}

export default Post;