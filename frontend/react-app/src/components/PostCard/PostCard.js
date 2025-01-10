import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    CardMeta,
    CardHeader,
    CardDescription,
    CardContent,
    Card,
    Icon,
    Image,
} from 'semantic-ui-react';
import PostService from '../../services/PostService';
import './PostCard.css';
import { Button } from 'semantic-ui-react'

function PostCard({ userId }) {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [posts, setPosts] = useState([]);
    const [liked, setLiked] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        let postService = new PostService();
        postService.getAllPosts(userId)
            .then(result => {
                setIsLoaded(true);
                setPosts(result.data);
            })
            .catch(error => {
                setIsLoaded(true);
                setError(error);
            });
    }, [userId]);

    const handlePostClick = (postId) => {
        navigate(`/posts/${postId}`);
    };

    const handleLikeClick = (postId) => {
        postId.stopPropagation();
        setLiked(!liked);
    };

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            {posts.map(post => (
                <Card key={post.id} onClick={() => handlePostClick(post.id)} className="custom-card" style={{ cursor: 'pointer' }}>
                    <Image src='/images/avatar/large/matthew.png' wrapped ui={false} />
                    <CardContent>
                        <CardHeader>{post.userName}</CardHeader>
                        <CardMeta>
                            <span className='date'>Joined in 2015</span>
                        </CardMeta>
                        <CardDescription>
                            {post.title}
                        </CardDescription>
                    </CardContent>
                    <CardContent extra>
                        <div>
                            <Button
                                color={liked ? 'red' : 'white'}
                                content='Like'
                                icon='heart'
                                label={{ basic: true, color: 'white', pointing: 'left', content: '2,048' }}
                                onClick={handleLikeClick}
                            />
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}

export default PostCard;