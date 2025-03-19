import React, { useState, useEffect } from 'react';
import { Input, List, Grid, Header } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';
import _ from 'lodash';
import UserService from '../../services/UserService';
import PostService from '../../services/PostService';

const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [users, setUsers] = useState([]);
    const [posts, setPosts] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const userService = new UserService();
    const postService = new PostService();

    const fetchResults = async (query) => {
        if (!query.trim()) {
            setUsers([]);
            setPosts([]);
            setIsOpen(false);
            return;
        }

        try {
            const [userResponse, postResponse] = await Promise.all([
                userService.searchUsers(query),
                postService.searchPosts(query)
            ]);
            setUsers(userResponse.data);
            setPosts(postResponse.data);
            setIsOpen(true);
        } catch (error) {
            console.error('Search failed:', error);
            setUsers([]);
            setPosts([]);
            setIsOpen(false);
        }
    };

    const debouncedSearch = _.debounce((query) => fetchResults(query), 500);

    useEffect(() => {
        debouncedSearch(searchTerm);
        return () => debouncedSearch.cancel();
    }, [searchTerm]);

    const handlePostClick = (postId) => {
        navigate(`/posts/${postId}`);
        setSearchTerm('');
        setIsOpen(false);
    };

    const handleUserClick = (userId) => {
        navigate(`/users/${userId}`);
        setSearchTerm('');
        setIsOpen(false);
    };

    return (
        <div style={{ position: 'relative', width: '300px' }}>
            <Input
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                icon="search"
                iconPosition="left"
                style={{ width: '100%' }}
            />
            {isOpen && (
                <div
                    style={{
                        position: 'absolute',
                        top: '100%',
                        left: 0,
                        width: '400px',
                        background: 'white',
                        border: '1px solid #ccc',
                        zIndex: 1000,
                        maxHeight: '300px',
                        overflowY: 'scroll',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                        padding: '10px'
                    }}
                >
                    <style>
                        {`
                            ::-webkit-scrollbar {
                                display: none;
                            }
                        `}
                    </style>
                    <Grid columns={2} divided>
                        <Grid.Column>
                            <Header as="h4">Users</Header>
                            <List>
                                {users.map(user => (
                                    <List.Item
                                        key={user.id}
                                        onClick={() => handleUserClick(user.id)}
                                        style={{ cursor: 'pointer', padding: '10px' }}
                                    >
                                        {user.userName}
                                    </List.Item>
                                ))}
                                {users.length === 0 && searchTerm && (
                                    <List.Item>No users found</List.Item>
                                )}
                            </List>
                        </Grid.Column>
                        <Grid.Column>
                            <Header as="h4">Posts</Header>
                            <List>
                                {posts.map(post => (
                                    <List.Item
                                        key={post.id}
                                        onClick={() => handlePostClick(post.id)}
                                        style={{ cursor: 'pointer', padding: '10px' }}
                                    >
                                        {post.title}
                                    </List.Item>
                                ))}
                                {posts.length === 0 && searchTerm && (
                                    <List.Item>No posts found</List.Item>
                                )}
                            </List>
                        </Grid.Column>
                    </Grid>
                </div>
            )}
        </div>
    );
};

export default SearchBar;
