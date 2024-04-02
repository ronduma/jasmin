import React, {useContext} from 'react';
import {NavLink} from 'react-router-dom';
import {AuthContext} from '../../context/AuthContext';
import LogOutButton from '../LogOut';

import './styles.css';
import { CircleUserRound } from 'lucide-react';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';

const Navigation = () => {
  const {currentUser} = useContext(AuthContext);
  return (
    <AppBar position='static' className='appbar' elevation={0}>
      <Toolbar className='toolbar'>
        <Button component = {NavLink} to='/' className='navlink'>
          <img
            alt='google signin'
            src='/imgs/logo.png'
            className='logo'
          />
        </Button>
        <div className='tabs'>
          {currentUser ? <NavigationAuth /> : <NavigationNonAuth />}
        </div>
      </Toolbar>
    </AppBar>
  );
};

const NavigationAuth = () => {
  return (
    <div>
      <Button component = {NavLink} to='/' color='green' className='navlink'>Personal Therapy</Button>
      <Button component = {NavLink} to='/' color='green' className='navlink'>Couples Therapy</Button>
      <Button component = {NavLink} to='/' color='green' className='navlink'>Children Therapy</Button>
      <Button component = {NavLink} to='/profile' color='green' className='navlink'><CircleUserRound/></Button>
      <LogOutButton className='logout'/>
    </div>
  );
};

const NavigationNonAuth = () => {
  return (
    <div>
      <Button component = {NavLink} to='/about' color='green'>About Us</Button>
      <Button component = {NavLink} to='/register' color='green'>Register</Button>
      <Button component = {NavLink} to='/login' color='green'>Log In</Button>
    </div>
  );
};

export default Navigation;
