import React from 'react'
import { MenuItem, Menu } from 'semantic-ui-react'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const navigate = useNavigate();
  
  return (
    <Menu>
      <MenuItem header>BLOG</MenuItem>
      <MenuItem
        name='home'
        onClick={() => navigate('/')}
      />
      <MenuItem
        name='user'
        onClick={() => navigate('/user')}
      />
    </Menu>
  )
}

export default Navbar;