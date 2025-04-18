import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Header, Dropdown } from 'semantic-ui-react';
import PostService from '../../services/PostService';
import Comments from '../Comment/Comments';

function Post() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [post, setPost] = useState(null);
    const { postId } = useParams();
    const navigate = useNavigate();
    const currentUserId = localStorage.getItem('userId');

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

    const handleUserClick = (userId) => {
        navigate(`/users/${userId}`);
    };

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
                // console.log(error);
            });
    };

    const handleEdit = () => {
        navigate(`/post/form/${postId}`, {
            state: {
                title: post.title,
                text: post.text
            }
        });
    };

    return (
        <Container style={{ marginTop: '50px', width: '50%' }}>
            {localStorage.getItem('userId') === String(post.user.id) && (
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Dropdown icon="edit">
                        <Dropdown.Menu>
                            <Dropdown.Item icon="edit" text="Edit" onClick={handleEdit} />
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
                <p>
                    Author: <span
                        onClick={() => handleUserClick(post.user.id)}
                        style={{ cursor: 'pointer', color: '#4183c4' }}
                    >
                        {post.user.userName}
                    </span>
                </p>
            </div>
            <div style={{textAlign: 'center', fontSize: '16px'}}>
                <span className="date" >
                    {post.createDate ? new Date(post.createDate).toLocaleDateString() : 'Unknown date'}
                </span>
            </div>
            <div style={{
                marginTop: '20px',
                fontSize: '20px',
                width: '100%',
                border: 'none',
                outline: 'none',
                resize: 'none',
                marginBottom: '20px',
                whiteSpace: 'pre-wrap'
            }}>
                <p>{post.text}</p>
            </div>
            <div>
                <Comments postId={postId} userId={currentUserId} />
            </div>
        </Container>
    );
}

export default Post;