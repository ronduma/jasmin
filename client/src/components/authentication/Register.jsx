import React, {useContext, useState} from 'react';
import {Navigate} from 'react-router-dom';
import {AuthContext} from '../../context/AuthContext';
import SocialRegister from './SocialRegister';
import {doCreateUserWithEmailAndPassword, doSignOut} from '../../firebase/FirebaseFunctions';

import axios from 'axios';

import '../../App.css';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';

function Register() {
  const {currentUser} = useContext(AuthContext);
  const [pwMatch, setPwMatch] = useState('');
  const [isNewUser, setIsNewUser] = useState(true);

  const handleNewUser = async (additionalUserInfo) => {
    console.log(additionalUserInfo.isNewUser)
    setIsNewUser(additionalUserInfo.isNewUser)
  }

  const handleRegister = async (e) => {
    e.preventDefault();
    const {email, passwordOne, passwordTwo} = e.target.elements;
    if (passwordOne.value !== passwordTwo.value) {
      setPwMatch('Passwords do not match');
      return false;
    }
    try {
      let user = await doCreateUserWithEmailAndPassword(
        email.value,
        passwordOne.value,
        null // displayName.value
      );
      console.log("user created:", user)  
      axios.post('http://localhost:5173/register', user)
      .then(response => {
        console.log("user", user)
        console.log("response", response)
      })
      .catch(error => {
        console.log(error.response.data.error)
      });        
    } catch (error) {
      alert(error);
    }
  };

  if (currentUser) {
    if (isNewUser){
      return <Navigate to='/getting-started' /> 
    } else {
      alert("user exists");
      doSignOut();
      return <Navigate to='/register' />
    } 
    
  }

  return (
    <Card className='card'>
      <CardContent>
        <h1>Register</h1>
        {pwMatch && <h4 className='error'>{pwMatch}</h4>}
        <Box 
          autoComplete="off"
          component="form"
          onSubmit={handleRegister}
          sx={{'& > div': { marginBottom: '1rem' } }}
        >
          {/* <div>
            <TextField
              className='form-control'
              name='displayName'
              type='text'
              placeholder='Name'
              label='Username'
              autoFocus={true}
              autoComplete="off"
              required
            />
          </div> */}
          <div>
            <TextField
              className='form-control'
              required
              name='email'
              type='email'
              placeholder='Email'
              label='Email'
              autoComplete="off"
            />
          </div>
          <div>
            <TextField
              className='form-control'
              id='passwordOne'
              name='passwordOne'
              type='password'
              placeholder='Password'
              label='Password'
              required
            />
          </div>
          <div>
            <TextField
              className='form-control'
              name='passwordTwo'
              type='password'
              placeholder='Confirm Password'
              label='Confirm Password'
              required
            />
          </div>
          <div>
            <Button
              className='button'
              id='submitButton'
              name='submitButton'
              type='submit'
              variant='contained'
              sx={{mb:'1rem'}}
            >
              Register
            </Button>
            <SocialRegister onRegister={handleNewUser}/>
          </div>
        </Box>
      </CardContent>
    </Card>
  );
}

export default Register;
