import React from 'react';
import PostCard from '../PostCard/PostCard';
import './Home.css';

function Home() {
    return (
        <div className="home-container">
            <div>
                <h1>Home</h1>
                <PostCard />
            </div>
        </div>
    );
}

export default Home;