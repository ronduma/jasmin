import '../App.css';
import logo from '../images/jasmin logo.png';

import * as React from 'react';
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
          <Button color="inherit">About Us</Button>
          <Button color="inherit">Log In</Button>
          <Button color="inherit">Register</Button>
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
