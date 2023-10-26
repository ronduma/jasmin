import '../App.css';
import logo from '../images/jasmin logo.png';

import {Link, useLocation} from 'react-router-dom';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

function Navbar() {
  return (
    <AppBar position="static" style={{background:"#85C2A7"}} elevation={0}>
      <Toolbar>
        <Box
          component="img"
          sx={{
            height:"4vh"
          }}
          src={logo}
        />
        <div
          style={{marginLeft:"auto"}}
        >
          <Button><Link to="/about">About Us</Link></Button>
          <Button color="inherit"><Link to="/login">Log In</Link></Button>
          <Button color="inherit"><Link to="/register">Register</Link></Button>
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
