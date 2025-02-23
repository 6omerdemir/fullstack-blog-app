import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Header, Dropdown } from 'semantic-ui-react';
import PostService from '../../services/PostService';
import Comments from '../Comment/Comments';

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

    const handleDelete = () => {
        let postService = new PostService();
        postService.deletePostById(postId)
            .then(result => {
                window.location.href = '/';
            })
            .catch(error => {
                console.log(error);
            });
    }

    return (
        <Container style={{ marginTop: '50px', width: '50%' }}>
            {localStorage.getItem('userId') == post.user.id && (
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Dropdown icon="edit">
                        <Dropdown.Menu>
                            <Dropdown.Item icon="edit" text="Edit" onClick={() => console.log('Edit clicked')} />
                            <Dropdown.Item icon="trash" text="Delete" onClick={handleDelete} />
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            )}

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
            <div style={{ textAlign: 'center', fontSize: '18px' }}>
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