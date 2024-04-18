import React from 'react';
import {NavLink} from 'react-router-dom';
import Button from '@mui/material/Button';

const Logo = (props) => {
  return (
    <Button 
      component = {NavLink} 
      to='/' 
      className='navlink'
      sx={{
        display: props.isHamburger ? { xs: 'flex', md: 'none' } : { xs: 'none', md: 'flex' },
        flexGrow: props.isHamburger ? 1 : 0
      }}
    >
      <img
        alt='Jasmin'
        src='/imgs/logo.png'
        className='logo'
      />
    </Button>
  )
}

export default Logo;