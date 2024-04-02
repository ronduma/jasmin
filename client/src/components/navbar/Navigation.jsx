import React, {useContext} from 'react';
import {NavLink} from 'react-router-dom';
import {AuthContext} from '../../context/AuthContext';
import LogOutButton from '../LogOut';

import './styles.css';
import { CircleUserRound } from 'lucide-react';

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
    <AppBar position="static" style={{background:"#F2F0E1", margin:'2vh 0 0 0'}} elevation={0}>
      <Toolbar>
        <Button component = {NavLink} to='/' color='green' className="navlink" sx={{fontSize:"20pt", fontWeight:"800"}}>
          <img
            alt='google signin'
            src='/imgs/logo.png'
            style={{
              height:'2em'
            }}
          />
        </Button>
        <div
          style={{marginLeft:"auto"}}
        >
          <Button component = {NavLink} to='/about' color='green' className="navlink">Personal Therapy</Button>
          <Button component = {NavLink} to='/about' color='green' className="navlink">Couples Therapy</Button>
          <Button component = {NavLink} to='/about' color='green' className="navlink">Children Therapy</Button>
          <Button component = {NavLink} to='/profile' color='green' className="navlink"><CircleUserRound/></Button>
          <LogOutButton 
            style={{
              height:'1em'
            }}
          />
        </div>
      </Toolbar>
    </AppBar>
  );
};

const NavigationNonAuth = () => {
  return (
    <AppBar position="static" style={{background:"#F2F0E1"}} elevation={0}>
    <Toolbar>
      <Button component = {NavLink} to='/' color='green' className="navlink">
        <img
          alt='google signin'
          src='/imgs/logo.png'
          style={{
            height:'2em'
          }}
        /> 
      </Button>
      <div
        style={{marginLeft:"auto"}}
      >
        <Button component = {NavLink} to='/about' color="green">About Us</Button>
        <Button component = {NavLink} to='/register' color="green">Register</Button>
        <Button component = {NavLink} to='/login' color="green">Log In</Button>
      </div>
    </Toolbar>
  </AppBar>
  );
};

export default Navigation;
