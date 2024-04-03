import React from 'react';
import {doSignOut} from '../firebase/FirebaseFunctions';
import Button from '@mui/material/Button';
import {NavLink} from 'react-router-dom';

import '../App.css';

const LogOutButton = () => {
  return (
    <Button component = {NavLink} to='/' onClick={doSignOut} color='green'>
      Log Out
    </Button>
  );
};

export default LogOutButton;
