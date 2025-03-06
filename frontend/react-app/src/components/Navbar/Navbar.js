import React from 'react';
import { MenuItem, Menu, Button, Dropdown, Icon } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    let userId = localStorage.getItem('userId');

    const handleProfile = () => {
        navigate(`/users/${userId}`);
    };

    const handleLogout = () => {
        localStorage.removeItem('userId');
        localStorage.removeItem('username');
        localStorage.removeItem('token');
        navigate('/');
    };

    const handleWriteClick = () => {
        if (!userId) {
            alert('Please log in to write!');
            return;
        }
        navigate('/post/form');
    };

    return (
        <Menu
            style={{
                position: 'fixed',
                top: 0,
                width: '100%',
                zIndex: 1000,
                margin: 0,
            }}
        >
            <MenuItem header>BLOG</MenuItem>
            <MenuItem
                name='home'
                onClick={() => navigate('/')}
            />
            <Menu.Menu position='right'>
                <Button
                    style={{
                        border: '2px solid green',
                        color: 'green',
                        backgroundColor: 'transparent',
                    }}
                    onClick={handleWriteClick}
                >
                    <Icon name='write' />
                    Write
                </Button>
                {localStorage.getItem('userId') == null ? (
                    <Button
                        style={{
                            border: '2px solid #4287f5',
                            color: 'white',
                            backgroundColor: '#4287f5',
                        }}
                        onClick={() => navigate(`/login`)}
                    >
                        Sign In
                    </Button>
                ) : (
                    <Dropdown
                        button
                        text={
                            <>
                                <Icon name="setting" />
                                {localStorage.getItem('username')}
                            </>
                        }
                        style={{
                            border: '2px solid #4287f5',
                            color: 'white',
                            backgroundColor: '#4287f5',
                        }}
                    >
                        <Dropdown.Menu>
                            <Dropdown.Item text="Profile" onClick={handleProfile} />
                            <Dropdown.Item text="Logout" onClick={handleLogout} />
                        </Dropdown.Menu>
                    </Dropdown>
                )}
            </Menu.Menu>
        </Menu>
    );
};

export default Navbar;