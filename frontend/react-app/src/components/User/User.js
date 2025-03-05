import React, { useState, useEffect } from 'react';
import UserService from '../../services/UserService';
import PostCard from '../PostCard/PostCard';
import { Container } from 'semantic-ui-react';

function User() {
    const userId = localStorage.getItem('userId');
    const [user, setUser] = useState(null);
    
    useEffect(() => {
        const userService = new UserService();
        userService.getOneUserById(userId)
            .then(response => {
                console.log('User data:', response.data); 
                setUser(response.data);
            })
            .catch(error => {
                console.error('User yükleme hatası:', error);
            });
    }, [userId]);

    if (!user) {
        return <p>Loading...</p>; 
    }

    return (
        <div style={{ align: 'center', width: '100%' }}>
            <h1>{user.userName}</h1>
            <Container style={{ width: '100%' }}>
                <div style={{textAlign: 'center'}}>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        <li>Joined: {user.createDate ? new Date(user.createDate).toLocaleDateString() : 'Unknown'}</li>
                    </ul>           
                </div>
                

                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <div style={{ width: 'fit-content' }}>
                        <PostCard userId={userId} />
                    </div>
                </div>
            </Container>
        </div>
    );
}

export default User;
