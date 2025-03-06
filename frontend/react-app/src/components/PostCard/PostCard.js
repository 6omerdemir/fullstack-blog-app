import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CardMeta, CardHeader, CardDescription, CardContent, Card, Button } from 'semantic-ui-react';
import PostService from '../../services/PostService';
import LikeService from '../../services/LikeService';
import './PostCard.css';

function PostCard({ userId, onPostsLoaded }) {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();
    const currentUserId = localStorage.getItem('userId') ? parseInt(localStorage.getItem('userId'), 10) : null;
    useEffect(() => {
        const postService = new PostService();
        const likeService = new LikeService();

        console.log('Current User ID:', currentUserId);
        postService.getAllPosts(userId)
            .then(result => {
                const fetchedPosts = result.data;
                console.log('Fetched Posts:', JSON.stringify(fetchedPosts));
                const postPromises = fetchedPosts.map(post =>
                    likeService.getLikesByPostId(post.id)
                        .then(likeRes => {
                            const likes = likeRes.data;
                            console.log(`Post ${post.id} - Likes Full Data:`, JSON.stringify(likes));
                            const likeCount = likes.length;
                            const isLiked = likes.some(like => like.user?.id === currentUserId);
                            return { ...post, likes, likeCount, isLiked };
                        })
                        .catch(err => {
                            console.error(`Beğeni çekme hatası (postId: ${post.id}):`, err);
                            return { ...post, likes: [], likeCount: 0, isLiked: false };
                        })
                );

                Promise.all(postPromises)
                    .then(formattedPosts => {
                        setPosts(formattedPosts);
                        if (onPostsLoaded) onPostsLoaded(formattedPosts);
                        setIsLoaded(true);
                    })
                    .catch(err => {
                        setError(err);
                        setIsLoaded(true);
                    });
            })
            .catch(error => {
                setError(error);
                setIsLoaded(true);
            });
    }, [userId, currentUserId]); 

    const handlePostClick = (postId) => {
        navigate(`/posts/${postId}`);
    };

    const handleUserClick = (userId) => (e) => {
        e.stopPropagation(); 
        navigate(`/users/${userId}`);
    };

    const handleLikeClick = (postId, isLiked) => (e) => {
        e.stopPropagation();
        if (!currentUserId) {
            alert('Please log in to like!');
            return;
        }

        const likeService = new LikeService();

        if (isLiked) {
            likeService.getLikesByUserIdAndPostId(currentUserId, postId)
                .then(res => {
                    const likeId = res.data[0]?.id;
                    if (likeId) {
                        return likeService.deleteOneLikeById(likeId);
                    }
                })
                .then(() => {
                    setPosts(posts.map(post =>
                        post.id === postId
                            ? { ...post, isLiked: false, likeCount: post.likeCount - 1 }
                            : post
                    ));
                })
                .catch(err => console.error('Beğeni silme hatası:', err));
        } else {
            const likeData = {
                userId: currentUserId,
                postId: postId,
            };
            likeService.createOneLike(likeData)
                .then(() => {
                    setPosts(posts.map(post =>
                        post.id === postId
                            ? { ...post, isLiked: true, likeCount: post.likeCount + 1 }
                            : post
                    ));
                })
                .catch(err => console.error('Beğeni ekleme hatası:', err));
        }
    };

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            {posts.map(post => (
                <Card
                    key={post.id}
                    onClick={() => handlePostClick(post.id)}
                    className="custom-card"
                    style={{ cursor: 'pointer' }}
                >
                    <CardContent style={{ backgroundColor: post.user?.headerColor || '#ffffff' }}>
                        <CardHeader>
                            <span 
                                onClick={handleUserClick(post.userId)} 
                                style={{ cursor: 'pointer', color: '#4183c4' }}
                            >
                                {post.userName}
                            </span>
                        </CardHeader>
                        <CardMeta>
                            <span className="date">
                                {post.createDate ? new Date(post.createDate).toLocaleString() : 'Unknown date'}
                            </span>
                        </CardMeta>
                        <CardDescription>{post.title}</CardDescription>
                    </CardContent>
                        <CardContent extra>
                            <Button
                                color={post.isLiked ? 'red' : 'grey'}
                                content="Like"
                                icon="heart"
                                label={{
                                    basic: true,
                                    color: 'grey',
                                    pointing: 'left',
                                    content: post.likeCount,
                                }}
                                onClick={handleLikeClick(post.id, post.isLiked)}
                            />
                        </CardContent>
                </Card>
            ))}
        </div>
    );
}

export default PostCard;