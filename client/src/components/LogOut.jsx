import React from 'react';
import {doSignOut} from '../firebase/FirebaseFunctions';
import Button from '@mui/material/Button';

import '../App.css';

const LogOutButton = () => {
  return (
    <Button onClick={doSignOut} color='green'>
      Log Out
    </Button>
  );
};

export default LogOutButton;
