import React, {useContext, useState} from 'react';
import {useNavigate, Navigate} from 'react-router-dom';
import {AuthContext} from '../context/AuthContext';
import {doCreateUserWithEmailAndPassword} from '../firebase/FirebaseFunctions';

import axios from 'axios';

import '../App.css';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Select from '@mui/material/Select';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';

function GettingStarted() {
  const {currentUser} = useContext(AuthContext);
  const [gender, setGender] = React.useState('');
  const navigate = useNavigate(); 

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const handleInfo = async (e) => {
    e.preventDefault();
    const {isTherapist, firstName, lastName, username, age, gender, location, occupation} = e.target.elements;
    // console.log(isTherapist, isTherapist.value)
    let user = {
      uid : currentUser.uid, 
      isTherapist : isTherapist.value,
      firstName : firstName.value, 
      lastName : lastName.value, 
      username : username.value,
      age : age.value, 
      gender : gender.value, 
      location : location.value, 
      occupation : occupation.value
    };
    try {
      let test = await axios.put('http://localhost:5000/profile', user)
      console.log(test)
      // let refetch = await axios.get('http://localhost:5000/profile', user.uid)
      // console.log(refetch)
    } catch (error) {
      alert(error);
    }
    console.log("navigate to profile")
    navigate('/profile')
  };

  return (
    <Card className='card'>
      <CardContent>
        <h1>Getting Started</h1>
        <Box 
          component="form"
          onSubmit={handleInfo}
          sx={{'& > div': { marginBottom: '1rem' } }}
        >
          <FormControl>
              <FormLabel id="demo-row-radio-buttons-group-label">I am a...</FormLabel>
              <RadioGroup
                row
                name="isTherapist"
              >
                <FormControlLabel value="false" control={<Radio />} label="Patient" />
                <FormControlLabel value="true" control={<Radio />} label="Therapist" />
              </RadioGroup>
            </FormControl>
          <div>
            <TextField
              className='form-control'
              name='firstName'
              type='text'
              placeholder='First Name'
              label='First Name'
              autoFocus={true}
              autoComplete="off"
              sx={{
                width: "15ch"
              }}
            />
            <TextField
              className='form-control'
              name='lastName'
              type='text'
              placeholder='Last Name'
              label='Last Name'
              autoFocus={true}
              autoComplete="off"
              sx={{
                width: "25ch"
              }}
            />
          </div>
          <div>
            <TextField
                className='form-control'
                name='username'
                type='text'
                placeholder='Username'
                label='Username'
                autoFocus={true}
                autoComplete="off"
                sx={{
                  width: "40ch"
                }}
              />
          </div>
          <div>
            <TextField
              className='form-control'
              name='age'
              type='number'
              placeholder='Age'
              label='Age'
              autoFocus={true}
              autoComplete="off"
              sx={{
                width: "10ch"
              }}
            />
            <FormControl
              sx={{width : '30ch'}}
            >
              <InputLabel>Gender</InputLabel>
                <Select
                  value={gender}
                  label="Gender"
                  name="gender"
                  onChange={handleGenderChange}
                >
                  <MenuItem value={'male'}>Male</MenuItem>
                  <MenuItem value={'female'}>Female</MenuItem>
                  <MenuItem value={'nonbinary'}>Non-Binary</MenuItem>
                </Select>
            </FormControl>
          </div>
          <div>
            <TextField
                className='form-control'
                name='location'
                type='text'
                placeholder='Location'
                label='Location'
                autoFocus={true}
                autoComplete="off"
                sx={{
                  width: "40ch"
                }}
              />
          </div>
          <div>
            <TextField
                className='form-control'
                name='occupation'
                type='text'
                placeholder='Occupation'
                label='Occupation'
                autoFocus={true}
                autoComplete="off"
                sx={{
                  width: "40ch"
                }}
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
              Submit
            </Button>
          </div>
        </Box>
      </CardContent>
    </Card>
  );
}

export default GettingStarted;
