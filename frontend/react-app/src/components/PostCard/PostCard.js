import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    CardMeta,
    CardHeader,
    CardDescription,
    CardContent,
    Card,
    Button,
} from 'semantic-ui-react';
import PostService from '../../services/PostService';
import LikeService from '../../services/LikeService';
import './PostCard.css';

function PostCard({ userId }) {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();
    const currentUserId = parseInt(localStorage.getItem('userId'), 10);

    useEffect(() => {
        const postService = new PostService();
        const likeService = new LikeService();

        console.log('Current User ID:', currentUserId); // Debug: Kullanıcı ID'si
        console.log(localStorage.getItem('userId') + "localStorage.getItem('userId') şeklinde yazılmış log."); // Debug: Local Storage'dan kullanıcı ID'si
        postService.getAllPosts(userId)
            .then(result => {
                const fetchedPosts = result.data;
                const postPromises = fetchedPosts.map(post =>
                    likeService.getLikesByPostId(post.id)
                        .then(likeRes => {
                            const likes = likeRes.data;
                            console.log('Likes Raw Data:', likes); // Ham beğeni verisi
                            const likeCount = likes.length;
                            const isLiked = likes.some(like => parseInt(like.userId, 10) === currentUserId); // Karşılaştırma
                            console.log(`Post ${post.id} - LikeCount: ${likeCount}, isLiked: ${isLiked}`);
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

    const handleLikeClick = (postId, isLiked) => (e) => {
        e.stopPropagation();
        if (!currentUserId) {
            alert('Please log in to like a post!');
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
                    <CardContent>
                        <CardHeader>{post.userName}</CardHeader>
                        <CardMeta>
                            <span className="date">Joined in 2025</span>
                        </CardMeta>
                        <CardDescription>{post.title}</CardDescription>
                    </CardContent>
                    {currentUserId && (
                        <CardContent extra>
                            <Button
                                color={post.isLiked ? 'red' : 'white'}
                                content="Like"
                                icon="heart"
                                label={{
                                    basic: true,
                                    color: 'white',
                                    pointing: 'left',
                                    content: post.likeCount,
                                }}
                                onClick={handleLikeClick(post.id, post.isLiked)}
                            />
                        </CardContent>
                    )}
                </Card>
            ))}
        </div>
    );
}

export default PostCard;