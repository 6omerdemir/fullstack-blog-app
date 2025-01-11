import React from 'react';
import { MenuItem, Menu, Button } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  let userId = 1;
  
  return (
    <Menu>
      <MenuItem header>BLOG</MenuItem>
      <MenuItem
        name='home'
        onClick={() => navigate('/')}
      />
      <MenuItem
        name='user'
        onClick={() => navigate(`/users/${userId}`)}
      />
      <Menu.Menu position='right'>
        <Button
          style={{
            border: '2px solid green', // Kenarlık ekledik
            color: 'green', // Yazı rengi
            backgroundColor: 'transparent', // Arka planı şeffaf yaptıks
          }}
          onClick={() => navigate('/post/form')}
        >
          Write
        </Button>
      </Menu.Menu>
    </Menu>
  );
}

export default Navbar;
