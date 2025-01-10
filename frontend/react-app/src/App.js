import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import User from './components/User/User';
import Post from './components/Post/Post';
import 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css'; 
import PostForm from './components/Post/PostForm';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts/:postId" element={<Post />} />
          <Route path="/users/:userId" element={<User />} />
          <Route path="post/form" element={<PostForm/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
