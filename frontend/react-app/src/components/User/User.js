import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import UserService from '../../services/UserService';
import FollowService from '../../services/FollowService';
import PostCard from '../PostCard/PostCard';
import { Container, Icon, Modal, Button, List } from 'semantic-ui-react';
import { colorOptions } from '../Colors/Colors';

function User() {
    const { userId: urlUserId } = useParams();
    const loggedInUserId = localStorage.getItem('userId');
    const [user, setUser] = useState(null);
    const [profileColor, setProfileColor] = useState('#FF5733');
    const [headerColor, setHeaderColor] = useState('#33FF57');
    const [posts, setPosts] = useState([]);
    const [settingsOpen, setSettingsOpen] = useState(false);
    const [selectedColorType, setSelectedColorType] = useState('profileColor');
    const [isFollowing, setIsFollowing] = useState(false);
    const [followerCount, setFollowerCount] = useState(0);
    const [followingCount, setFollowingCount] = useState(0);
    const [followers, setFollowers] = useState([]);
    const [following, setFollowing] = useState([]);
    const [showFollowModal, setShowFollowModal] = useState(false);
    const [modalType, setModalType] = useState(''); // 'followers' or 'following'
    const navigate = useNavigate();

    const userService = new UserService();
    const followService = new FollowService();

    const fetchCounts = (userId) => {
        // Fetch follower list
        followService.getFollowers(userId)
            .then(response => {
                setFollowerCount(response.data.length);
                setFollowers(response.data);
            })
            .catch(error => console.error('Follower yükleme hatası:', error));

        // Fetch following list
        followService.getFollowing(userId)
            .then(response => {
                setFollowingCount(response.data.length);
                setFollowing(response.data);
            })
            .catch(error => console.error('Following yükleme hatası:', error));
    };

    useEffect(() => {
        const idToFetch = urlUserId || loggedInUserId;
        
        // Fetch user data
        userService.getOneUserById(idToFetch)
            .then(response => {
                // console.log('User data:', response.data);
                setUser(response.data);
                setProfileColor(response.data.profileColor || '#FF5733');
                setHeaderColor(response.data.headerColor || '#33FF57');
            })
            .catch(error => console.error('User yükleme hatası:', error));

        // Fetch initial counts
        fetchCounts(idToFetch);

        // Check if logged in user is following this user
        if (loggedInUserId && urlUserId && loggedInUserId !== urlUserId) {
            followService.getFollowing(loggedInUserId)
                .then(response => {
                    const followingIds = response.data.map(u => u.id);
                    setIsFollowing(followingIds.includes(Number(urlUserId)));
                })
                .catch(error => console.error('Takip kontrol hatası:', error));
        }
    }, [urlUserId, loggedInUserId]);

    const handleFollowToggle = (targetId) => {
        if (isFollowing) {
            followService.unfollowUser(loggedInUserId, targetId)
                .then(() => {
                    setIsFollowing(false);
                    // Güncel sayıları backend'den al
                    fetchCounts(urlUserId);
                })
                .catch(error => console.error('Takipten çıkma hatası:', error));
        } else {
            followService.followUser(loggedInUserId, targetId)
                .then(() => {
                    setIsFollowing(true);
                    // Güncel sayıları backend'den al
                    fetchCounts(urlUserId);
                })
                .catch(error => console.error('Takip etme hatası:', error));
        }
    };

    const handleUserClick = (userId) => {
        setShowFollowModal(false);
        navigate(`/users/${userId}`);
    };

    const openFollowModal = (type) => {
        setModalType(type);
        setShowFollowModal(true);
    };

    const handleColorChange = (type, value) => {
        const updatedUser = { ...user, [type]: value };
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
    const totalLikes = posts.reduce((sum, post) => sum + (Number(post.likeCount) || 0), 0);

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
                <div style={{ display: 'flex', flexDirection: 'column', color: textColor }}>
                    <h1 style={{ margin: 0 }}>{user.userName}</h1>
                    <div style={{ display: 'flex', gap: '20px', marginTop: '10px' }}>
                        <span 
                            style={{ cursor: 'pointer', textDecoration: 'underline' }}
                            onClick={() => openFollowModal('followers')}
                        >
                            {followerCount} Followers
                        </span>
                        <span 
                            style={{ cursor: 'pointer', textDecoration: 'underline' }}
                            onClick={() => openFollowModal('following')}
                        >
                            {followingCount} Following
                        </span>
                        <span>{totalLikes} Likes</span>
                    </div>
                    {loggedInUserId && loggedInUserId !== urlUserId && (
                        <Button
                            style={{ marginTop: '10px', width: 'fit-content' }}
                            color={isFollowing ? 'grey' : 'blue'}
                            onClick={() => handleFollowToggle(urlUserId)}
                        >
                            {isFollowing ? 'Unfollow' : 'Follow'}
                        </Button>
                    )}
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
                            <Modal.Header>Color Settings</Modal.Header>
                            <Modal.Content>
                                <div style={{ 
                                    textAlign: 'center',
                                    justifyContent: 'center', 
                                    marginBottom: '20px' 
                                }}>
                                    <h3 
                                        onClick={() => setSelectedColorType('profileColor')} 
                                        style={{ 
                                            cursor: 'pointer', 
                                            color: selectedColorType === 'profileColor' ? '#4183c4' : 'black',
                                            fontWeight: selectedColorType === 'profileColor' ? 'bold' : 'normal'
                                        }}
                                    >
                                        Profile Color
                                    </h3>
                                    <h3 
                                        onClick={() => setSelectedColorType('headerColor')} 
                                        style={{ 
                                            cursor: 'pointer', 
                                            color: selectedColorType === 'headerColor' ? '#4183c4' : 'black',
                                            fontWeight: selectedColorType === 'headerColor' ? 'bold' : 'normal'
                                        }}
                                    >
                                        Header Color
                                    </h3>
                                </div>
                                <div style={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(4, 1fr)',
                                    gap: '10px',
                                }}>
                                    {colorOptions.map(color => (
                                        <div
                                            key={color}
                                            style={{
                                                backgroundColor: color,
                                                width: '100px',
                                                height: '100px',
                                                borderRadius: '4px',
                                                cursor: 'pointer',
                                                border: (selectedColorType === 'profileColor' && profileColor === color) || 
                                                        (selectedColorType === 'headerColor' && headerColor === color) 
                                                        ? '2px solid black' : 'none'
                                            }}
                                            onClick={() => handleColorChange(selectedColorType, color)}
                                        />
                                    ))}
                                </div>
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

            {/* Follow/Following Modal */}
            <Modal
                open={showFollowModal}
                onClose={() => setShowFollowModal(false)}
                size="tiny"
            >
                <Modal.Header>
                    {modalType === 'followers' ? 'Followers' : 'Following'}
                </Modal.Header>
                <Modal.Content>
                    <List divided relaxed>
                        {(modalType === 'followers' ? followers : following).map(user => (
                            <List.Item key={user.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px' }}>
                                <div 
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => handleUserClick(user.id)}
                                >
                                    <List.Content>
                                        <List.Header>{user.userName}</List.Header>
                                    </List.Content>
                                </div>
                                {loggedInUserId && loggedInUserId !== user.id && (
                                    <Button
                                        size='tiny'
                                        color={following.some(f => f.id === user.id) ? 'grey' : 'blue'}
                                        onClick={() => handleFollowToggle(user.id)}
                                    >
                                        {following.some(f => f.id === user.id) ? 'Unfollow' : 'Follow'}
                                    </Button>
                                )}
                            </List.Item>
                        ))}
                    </List>
                </Modal.Content>
                <Modal.Actions>
                    <Button onClick={() => setShowFollowModal(false)} primary>
                        Close
                    </Button>
                </Modal.Actions>
            </Modal>

            <Container style={{ width: '100%' }}>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <div style={{ width: 'fit-content', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                        <h1 style={{ margin: '0 0 10px 0' }}>{user.userName}'s Posts</h1>
                        <PostCard userId={urlUserId || loggedInUserId} onPostsLoaded={handlePostsLoaded} filterByUser={true} />
                    </div>
                </div>
            </Container>
        </div>
    );
}

export default User;