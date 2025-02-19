import React from 'react';
import PostCard from '../PostCard/PostCard';
import './Home.css';
import { Icon } from 'semantic-ui-react';
function Home() {
    return (
        <div className="home-container">
            <div>
                <h1>
                    <Icon name="home"></Icon>
                </h1>
                <PostCard />
            </div>
        </div>
    );
}

export default Home;