import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Header, } from 'semantic-ui-react';
import PostService from '../../services/PostService';
import Comments from '../Comment/Comments';

function Post() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [post, setPost] = useState(null);
    const { postId} = useParams();

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
        <Container style={{ marginTop: '50px', width: '50%' }}>
            <div style={{
                fontSize: '40px',
                width: '100%',
                border: 'none',
                outline: 'none',
                resize: 'none',
                marginBottom: '20px',
            }}>
                <Header as='h1' size="medium">{post.title}</Header>
            </div>
            <div style = {{textAlign: 'center', fontSize: '18px'}}>
                <p>Author: {post.user.userName}</p>
            </div>
            <div style={{
                marginTop: '20px',
                fontSize: '20px',
                width: '100%',
                border: 'none',
                outline: 'none',
                resize: 'none',
                marginBottom: '20px',
            }}>
                <p>{post.text}</p>
            </div>
            <div>
                <Comments postId={postId} userId={1} />
            </div>
        </Container>
    );
}

export default Post;