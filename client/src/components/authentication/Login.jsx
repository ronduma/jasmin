import React, {useContext, useState} from 'react';
import SocialLogin from './SocialLogin';
import {Navigate} from 'react-router-dom';

import {AuthContext} from '../../context/AuthContext';
import {
  doSignInWithEmailAndPassword,
  doPasswordReset
} from '../../firebase/FirebaseFunctions';


import axios from 'axios';

import '../../App.css';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';

function Login() {
  const {currentUser} = useContext(AuthContext);
  const [isNewUser, setIsNewUser] = useState(null);

  const handleNewUser = async (additionalUserInfo) => {
    setIsNewUser(additionalUserInfo.isNewUser)
  }

  const handleLogin = async (event) => {
    event.preventDefault();
    let {email, password} = event.target.elements;

    try {
      await doSignInWithEmailAndPassword(email.value, password.value);
    } catch (error) {
      alert(error);
    }
  };

  const passwordReset = (event) => {
    event.preventDefault();
    let email = document.getElementById('email').value;
    if (email) {
      doPasswordReset(email);
      alert('Password reset email was sent');
    } else {
      alert(
        'Please enter an email address below before you click the forgot password link'
      );
    }
  };

  if (currentUser) {
    console.log(isNewUser)
    return <Navigate to={ isNewUser ? '/getting-started' : '/profile'} />;
  }
  return (
    <Card>
      <CardContent className='card'
        sx={{'& > div': { marginBottom: '1rem' } }}
      >
        <h1>Log In</h1>
        <form onSubmit={handleLogin}>
          <Box 
            className='form' 
            onSubmit={handleLogin}
            sx={{'& > div': { marginBottom: '1rem' } }}
          >
            <div>
              <TextField
                name='email'
                id='email'
                type='email'
                placeholder='Email'
                label='Email'
                autoFocus={true}
                required
              />
            </div>
            <div>
              <TextField
                name='password'
                type='password'
                placeholder='Password'
                label='Password'
                autoComplete='off'
                required
              />
            </div>  
          </Box>
        </form>
        <div>
          <Button className='button' type='submit' variant='contained'>
            Log in
          </Button>
        </div>
        <div>
          <Link className='forgotPassword' onClick={passwordReset}>
            Forgot Password?
          </Link>
        </div>
        <SocialLogin onSignIn={handleNewUser}/>
      </CardContent>
    </Card>
  );
}

export default Login;
