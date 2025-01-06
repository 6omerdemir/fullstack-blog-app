import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import UserService from '../../services/UserService';
import './User.css';
import PostCard from '../PostCard/PostCard';
import { Container } from 'semantic-ui-react';

function User() {
    const { userId } = useParams();
    const [user, setUser] = useState(null);
    
    useEffect(() => {
        const userService = new UserService();
        userService.getOneUserById(userId)
            .then(response => {
                setUser(response.data);
            });
    }, [userId]);

    return (
        <div>
            <h1>User Details</h1>
            {user ? (
                <Container className='user-container'>
                    <div>
                    <ul>
                        <li>User ID: {user.id}</li>
                        <li>Username: {user.userName}</li>
                    </ul>           
                </div>

                <div>
                    <PostCard userId={userId} />
                </div>
                </Container>             
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default User;