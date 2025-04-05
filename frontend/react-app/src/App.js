import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import User from './components/User/User';
import Post from './components/Post/Post';
import Register from './components/Auth/Register';
import 'semantic-ui-css/semantic.min.css';
import PostForm from './components/Post/PostForm';
import Login from './components/Auth/Login';

function AppContent() {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  return (
    <div>
      {!isAuthPage && <Navbar />}
      <div style={{ marginTop: isAuthPage ? '0' : '40px' }}> 
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts/:postId" element={<Post />} />
          <Route path="/users/:userId" element={<User />} />
          <Route path="/post/form" element={<PostForm />} />
          <Route path="/post/form/:postId" element={<PostForm />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;