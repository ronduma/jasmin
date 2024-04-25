import React, { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import LogOutButton from '../LogOut';

import './styles.css';
import { CircleUserRound } from 'lucide-react';

import Logo from './Logo';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';

import InboxIcon from '@mui/icons-material/Inbox';
import Notis from './Notis';

const pages = ['Products', 'Pricing', 'Blog'];

const Navigation = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  // const [anchorElUser, setAnchorElUser] = useState(null);
  const { currentUser } = useContext(AuthContext);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  // const handleOpenUserMenu = (event) => {
  //   setAnchorElUser(event.currentTarget);
  // };

  // const handleCloseUserMenu = () => {
  //   setAnchorElUser(null);
  // };

  return (
    <AppBar position='static' className='appbar' elevation={0}>
      <Toolbar className='toolbar'>
        <Logo />
        <Box sx={{ flexGrow: 1, display: { xs: 'flex', lg: 'none' } }}>
          <IconButton
            size="large"
            aria-haspopup="true"
            onClick={handleOpenNavMenu}
            color="green"
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            sx={{
              display: { xs: 'block', lg: 'none' },
            }}
          >
            <MenuItem onClick={handleCloseNavMenu}>
              <Button component={NavLink} to='/personal_matching' color='green' className="navlink">
                Personal Therapy
              </Button>
            </MenuItem>
            <MenuItem onClick={handleCloseNavMenu}>
              <Button component={NavLink} to='/couple_matching' color='green' className="navlink">
                Couples Therapy
              </Button>
            </MenuItem>
            <MenuItem onClick={handleCloseNavMenu}>
              <Button component={NavLink} to='/children_matching' color='green' className="navlink">
                Children Therapy
              </Button>
            </MenuItem>
            <MenuItem onClick={handleCloseNavMenu}>
              <Button component={NavLink} to='/all_matching' color='green' className="navlink">
                Matching
              </Button>
            </MenuItem>
          </Menu>
        </Box>
        <Logo isHamburger={true} />
        {currentUser ? <NavigationAuth /> : <NavigationNonAuth />}
      </Toolbar>
    </AppBar>
  );
};


const NavigationAuth = () => {
  return (
    <div style={{ marginLeft: 'auto', display: 'flex' }}>
      <Box sx={{ display: { xs: 'none', lg: 'block' } }}>
        <Button component={NavLink} to='/personal_matching' color='green' className="navlink">Personal Therapy</Button>
        <Button component={NavLink} to='/couple_matching' color='green' className="navlink">Couples Therapy</Button>
        <Button component={NavLink} to='/children_matching' color='green' className="navlink">Children Therapy</Button>
        <Button component={NavLink} to='/all_matching' color='green' className="navlink">Matching</Button>
      </Box>
      <Box>
        <Button color='green' className="navlink">
          <Notis/>
        </Button>
        <Button component={NavLink} to='/profile' color='green' className="navlink"><CircleUserRound /></Button>
        <LogOutButton className='logout' />
      </Box>


    </div>
  );
};

const NavigationNonAuth = () => {
  return (
    <div style={{ marginLeft: 'auto', display: 'flex' }}>
      <Button component={NavLink} to='/about' color='green'>About Us</Button>
      <Button component={NavLink} to='/register' color='green'>Register</Button>
      <Button component={NavLink} to='/login' color='green'>Log In</Button>
    </div>
  );
};

export default Navigation;
