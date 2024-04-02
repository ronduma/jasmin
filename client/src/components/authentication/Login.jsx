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
  const [isNewUser, setIsNewUser] = useState(false);

  const handleNewUser = async (additionalUserInfo) => {
    setIsNewUser(additionalUserInfo.isNewUser)
  }

  const handleLogin = async (event) => {
    event.preventDefault();
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    // console.log("yo")
    try {
      await doSignInWithEmailAndPassword(email, password);
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
    // console.log("CurrentUser", currentUser)
    // console.log(isNewUser)
    const fetchData = async () => {
      try{
        // console.log("1")
        const response = await axios.get(`http://localhost:5000/profile/${currentUser.uid}`);
      } catch (e) {
        // console.log("2")
        setIsNewUser(true);
      }
    }
    fetchData();
    return <Navigate to={ isNewUser ? '/register' : '/profile'} />;
  }
  return (
    <Card>
      <CardContent className='card'
        sx={{'& > div': { marginBottom: '1rem' } }}
      >
        <h1>Log In</h1>
          <Box 
            className='form' 
            component="form"
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
                id='password'
                placeholder='Password'
                label='Password'
                autoComplete='off'
                required
              />
            </div>  
          </Box>
        <div>
          <Button className='button' type='submit' variant='contained' onClick={handleLogin}>
            Log In
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
