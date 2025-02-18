import React from 'react';
import { MenuItem, Menu, Button, Dropdown } from 'semantic-ui-react';
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
            border: '2px solid green',
            color: 'green',
            backgroundColor: 'transparent',
          }}
          onClick={() => navigate(`/post/form/${userId}`)} 
        >
          Write
        </Button>
        {localStorage.getItem('userId') == null ? (<Button
          style={{
            border: '2px solid #4287f5',
            color: 'white',
            backgroundColor: '#4287f5',
          }}
          onClick={() => navigate(`/login`)} 
        >
          Sign In
        </Button>) : (<Dropdown
          button
          text='Options'
          style={{
            border: '2px solid #4287f5',
            color: 'white',
            backgroundColor: '#4287f5',
          }}
        >
          <Dropdown.Menu>
            <Dropdown.Item text = "Logout"/>
          </Dropdown.Menu>
        </Dropdown>) }
        
      </Menu.Menu>
    </Menu>
  );
}

export default Navbar;
