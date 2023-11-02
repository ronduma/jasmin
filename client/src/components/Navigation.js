import React, {useContext} from 'react';
import {NavLink} from 'react-router-dom';
import {AuthContext} from '../context/AuthContext';
import SignOutButton from './LogOut';

import '../App.css';
import logo from '../images/jasmin logo.png';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';

const Navigation = () => {
  const {currentUser} = useContext(AuthContext);
  return <div>{currentUser ? <NavigationAuth /> : <NavigationNonAuth />}</div>;
};

const NavigationAuth = () => {
  return (
    <AppBar position="static" style={{background:"#85C2A7"}} elevation={0}>
      <Toolbar>
        <NavLink to='/'>
          <Box
            component="img"
            sx={{
              height:"4vh"
            }}
            src={logo}
          />
        </NavLink>
        <div
          style={{marginLeft:"auto"}}
        >
        <Button component = {NavLink} to='/about' color="inherit">About Us</Button>
        <Button component = {NavLink} to='/profile' color="inherit">Profile</Button>
        <Button><SignOutButton /></Button>
        </div>
      </Toolbar>
    </AppBar>
  );
};

const NavigationNonAuth = () => {
  return (
    <AppBar position="static" style={{background:"#85C2A7"}} elevation={0}>
    <Toolbar>
      <NavLink to='/'>
        <Box
          component="img"
          sx={{
            height:"4vh"
          }}
          src={logo}
        />
      </NavLink>
      <div
        style={{marginLeft:"auto"}}
      >
        <Button component = {NavLink} to='/about' color="inherit">About Us</Button>
        <Button component = {NavLink} to='/login' color="inherit">Log In</Button>
        <Button component = {NavLink} to='/register' color="inherit">Register</Button>
      </div>
    </Toolbar>
  </AppBar>
  );
};

export default Navigation;
