import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import UserService from '../../services/UserService';
import PostCard from '../PostCard/PostCard';
import { Container, Dropdown, Icon, Modal, Button } from 'semantic-ui-react'; 
import { colorOptions } from '../Colors/Colors';

function User() {
    const { userId: urlUserId } = useParams();
    const loggedInUserId = localStorage.getItem('userId');
    const [user, setUser] = useState(null);
    const [profileColor, setProfileColor] = useState('#FF5733');
    const [headerColor, setHeaderColor] = useState('#33FF57');
    const [posts, setPosts] = useState([]);
    const [settingsOpen, setSettingsOpen] = useState(false); 

    useEffect(() => {
        const userService = new UserService();
        const idToFetch = urlUserId || loggedInUserId;
        userService.getOneUserById(idToFetch)
            .then(response => {
                console.log('User data:', response.data);
                setUser(response.data);
                setProfileColor(response.data.profileColor || '#FF5733');
                setHeaderColor(response.data.headerColor || '#33FF57');
            })
            .catch(error => console.error('User yükleme hatası:', error));
    }, [urlUserId, loggedInUserId]);

    const handleColorChange = (type, value) => {
        const updatedUser = { ...user, [type]: value };
        const userService = new UserService();
        userService.updateUserById(loggedInUserId, updatedUser)
            .then(response => {
                setUser(response.data);
                if (type === 'profileColor') setProfileColor(value);
                if (type === 'headerColor') setHeaderColor(value);
            })
            .catch(error => console.error('Renk güncelleme hatası:', error));
    };

    const getContrast = (hex) => {
        const hexColor = hex.replace('#', '');
        const r = parseInt(hexColor.substr(0, 2), 16);
        const g = parseInt(hexColor.substr(2, 2), 16);
        const b = parseInt(hexColor.substr(4, 2), 16);
        const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
        return luminance > 0.5 ? '#000000' : '#FFFFFF';
    };

    const handlePostsLoaded = useCallback((loadedPosts) => {
        setPosts(loadedPosts);
    }, []);

    if (!user) {
        return <p>Loading...</p>;
    }

    const textColor = getContrast(headerColor);
    const totalLikes = posts.reduce((sum, post) => sum + (post.likeCount || 0), 0);

    return (
        <div style={{ width: '100%' }}>
            <div style={{
                backgroundColor: headerColor,
                height: '150px',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                padding: '20px',
                position: 'relative'
            }}>
                <div style={{
                    backgroundColor: profileColor,
                    width: '100px',
                    height: '100px',
                    borderRadius: '50%',
                    marginRight: '20px'
                }}></div>
                <div>
                    <h1 style={{ margin: 0, color: textColor }}>{user.userName}</h1>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: textColor }}>
                        <li>Joined: {user.createDate ? new Date(user.createDate).toLocaleDateString() : 'Unknown'}</li>
                        <li>
                            <Icon name="heart" style={{ marginRight: '5px' }} />
                            {totalLikes}
                        </li>
                    </ul>
                </div>
                
                {loggedInUserId === urlUserId && (
                    <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
                        <Icon 
                            name="cog" 
                            size="large" 
                            style={{ color: textColor, cursor: 'pointer' }} 
                            onClick={() => setSettingsOpen(true)} 
                        />
                        <Modal
                            open={settingsOpen}
                            onClose={() => setSettingsOpen(false)}
                            size="tiny" 
                        >
                            <Modal.Header>Profile Color Options</Modal.Header>
                            <Modal.Content>
                            
                                <Dropdown
                                    placeholder="Select Profile Color"
                                    selection
                                    options={colorOptions}
                                    value={profileColor}
                                    onChange={(e, { value }) => handleColorChange('profileColor', value)}
                                    fluid
                                    style={{ marginBottom: '10px' }}
                                />
            
                                <Dropdown
                                    placeholder="Select Header Color"
                                    selection
                                    options={colorOptions}
                                    value={headerColor}
                                    onChange={(e, { value }) => handleColorChange('headerColor', value)}
                                    fluid
                                />
                            </Modal.Content>
                            <Modal.Actions>
                                <Button onClick={() => setSettingsOpen(false)} primary>
                                    Close
                                </Button>
                            </Modal.Actions>
                        </Modal>
                    </div>
                )}
            </div>

            <Container style={{ width: '100%' }}>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <div style={{ width: 'fit-content', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                        <h1 style={{ margin: '0 0 10px 0' }}>{user.userName}'s Posts</h1>
                        <PostCard userId={urlUserId || loggedInUserId} onPostsLoaded={handlePostsLoaded} />
                    </div>
                </div>
            </Container>
        </div>
    );
}

export default User;