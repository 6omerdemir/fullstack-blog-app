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

function PostCard() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        let postService = new PostService();
        postService.getAllPosts()
            .then(result => {
                setIsLoaded(true);
                setPosts(result.data);
            })
            .catch(error => {
                setIsLoaded(true);
                setError(error);
            });
    }, []);

    const handlePostClick = (postId) => {
        navigate(`/posts/${postId}`);
    };

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            {posts.map(post => (
                <Card key={post.id} onClick={() => handlePostClick(post.id)} style={{ cursor: 'pointer' }}>
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
                        <a>
                            <Icon name='user' />
                            22 Friends
                        </a>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}

export default PostCard;