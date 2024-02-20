import React, {useContext, useState, useEffect} from 'react';
import {redirect, useLocation, useNavigate, Navigate} from 'react-router-dom';
import {AuthContext} from '../../context/AuthContext';
import {doCreateUserWithEmailAndPassword} from '../../firebase/FirebaseFunctions';

import axios from 'axios';

import '../../App.css';
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

function EditProfile() {
  const {currentUser} = useContext(AuthContext);
  const [user, setUser] = useState(currentUser); // Initialize user state with currentUser
  console.log("user:")
  console.log(user)
  console.log("Start screen")
  const [gender, setGender] = React.useState('');
  const navigate = useNavigate(); 
  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/profile/${currentUser.uid}`);
        console.log("IN USE EFFECT")
        setUser(response.data); // Update user state with fetched user data
        setGender(response.data.gender || ''); // Set gender based on fetched data
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUser();
  }, [currentUser.uid]);

  const handleInfo = async (e) => {
    e.preventDefault();
    const {firstName, lastName, username, age, gender, location, occupation} = e.target.elements;
    let user = {
      uid : currentUser.uid,
      firstName : firstName.value, 
      lastName : lastName.value, 
      username : username.value,
      age : age.value, 
      gender : gender.value, 
      location : location.value, 
      occupation : occupation.value
    };
    try {
      console.log("UPDATING DATA")
      let test = await axios.put('http://localhost:5000/profile', user)
      console.log("updated data", test)
      navigate('/profile');
    } catch (error) {
      alert(error);
    }
  };
  console.log("AFTER REACT")
  console.log(user)
  return (
    <Card className='card'>
      <CardContent>
        <h1>Edit Profile</h1>
        <Box 
          component="form"
          onSubmit={handleInfo}
          sx={{'& > div': { marginBottom: '1rem' } }}
        >
          <div>
            <TextField
              className='form-control'
              name='firstName'
              type='text'
              placeholder={`${user.firstName || 'First Name'}`}
              label='First Name'
              autoFocus={true}
              autoComplete="off"
              sx={{
                width: "15ch"
              }}
              defaultValue={user.firstName}
            />
            <TextField
              className='form-control'
              name='lastName'
              type='text'
              placeholder={`${user.lastName || 'Last Name'}`}
              label='Last Name'
              autoFocus={true}
              autoComplete="off"
              sx={{
                width: "25ch"
              }}
              defaultValue={user.lastName}
            />
          </div>
          <div>
            <TextField
                className='form-control'
                name='username'
                type='text'
                placeholder={`${user.username || 'Username'}`}
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
              placeholder={`${user.age || 'Age'}`}
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
                  <MenuItem value={'Male'}>Male</MenuItem>
                  <MenuItem value={'Female'}>Female</MenuItem>
                  <MenuItem value={'Non-binary'}>Non-Binary</MenuItem>
                </Select>
            </FormControl>
          </div>
          <div>
            <TextField
                className='form-control'
                name='location'
                type='text'
                placeholder={`${user.location || 'Location'}`}
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
                placeholder={`${user.occupation || 'Occupation'}`}
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

export default EditProfile;
