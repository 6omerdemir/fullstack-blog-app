import React, { useState } from 'react';
import { Container, Menu } from 'semantic-ui-react';
import PostCard from '../PostCard/PostCard';
import './Home.css';

function Home() {
    const [activeTab, setActiveTab] = useState('recent');
    const userId = localStorage.getItem('userId');

    const handleTabChange = (e, { name }) => setActiveTab(name);

    return (
        <div className="home-container">
            <Menu pointing secondary>
                <Menu.Item
                    name='recent'
                    active={activeTab === 'recent'}
                    onClick={handleTabChange}
                >
                    Recent
                </Menu.Item>
                {userId && (
                    <Menu.Item
                        name='following'
                        active={activeTab === 'following'}
                        onClick={handleTabChange}
                    >
                        Following
                    </Menu.Item>
                )}
            </Menu>

            <PostCard 
                userId={userId} 
                activeTab={activeTab}
            />
        </div>
    );
}

export default Home;