import React from 'react';
import {doSignOut} from '../firebase/FirebaseFunctions';
import Button from '@mui/material/Button';

import '../App.css';

const LogOutButton = () => {
  const buttonStyle = {
    color: 'white', // Set text color to white
  };
  return (
    <Button onClick={doSignOut} style={buttonStyle}>
      Log Out
    </Button>
  );
};

export default LogOutButton;
