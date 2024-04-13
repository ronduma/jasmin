import React, {useContext, useEffect, useState} from 'react';
import {redirect, useLocation, useNavigate, Navigate} from 'react-router-dom';
import {AuthContext} from '../../context/AuthContext';
import {doCreateUserWithEmailAndPassword} from '../../firebase/FirebaseFunctions';

import axios from 'axios';

import '../../App.css';
import Alert from '@mui/material/Alert';
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
  const [profileData, setProfileData] = useState(null);

  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [usernameError, setUsernameError] = useState(false);
  const [ageError, setAgeError] = useState(false);
  const [genderError, setGenderError] = useState(false);
  const [locationError, setLocationError] = useState(false);
  const [occupationError, setOccupationError] = useState(false);
  const [alert, setAlert] = useState(false);

  const [isLoading, setLoading] = useState(true);

  const [gender, setGender] = React.useState('');

  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("getting prof data")
        const response = await axios.get(`http://localhost:5173/profile/${currentUser.uid}`);
        setProfileData(response.data);
        setLoading(false);
        console.log(response.data)
      } catch (e) {
        // console.log("yo")
        navigate('/not-found')
      }
    };

    fetchData(); 
  }, []);

  const setError = async (response) => {
    let field = response.split(' ')[0];
    switch (field) {
      case 'firstName':
        setFirstNameError(response);
        break;
      case 'lastName':
        setLastNameError(response);
        break;
      case 'username':
        setUsernameError(response);
        break;
      case 'age':
        setAgeError(response);
        break;
      case 'gender':
        setGenderError(response);
        break;
      case 'location':
        setLocationError(response);
        break;
      case 'occupation':
        setOccupationError(response);
        break;
    }
    setAlert(response)
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:5173/profile/${currentUser.uid}`);
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
      let test = await axios.put('http://localhost:5173/profile', user)
      console.log("updated data", test)
      navigate('/profile');
    } catch (error) {
      console.log(error);
      setError(error.response.data)
    }
  };

  if (isLoading) {
    return <div className="App">Loading...</div>;
  }

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
              label='First Name'
              autoFocus={true}
              autoComplete="off"
              sx={{
                width: "15ch"
              }}
              defaultValue={profileData.firstName}
              error={Boolean(firstNameError)}
            />
            <TextField
              className='form-control'
              name='lastName'
              type='text'
              label='Last Name'
              autoFocus={true}
              autoComplete="off"
              sx={{
                width: "25ch"
              }}
              defaultValue={profileData.lastName}
              error={Boolean(lastNameError)}
            />
          </div>
          <div>
            <TextField
                className='form-control'
                name='username'
                type='text'
                label='Username'
                autoFocus={true}
                autoComplete="off"
                sx={{
                  width: "40ch"
                }}
                defaultValue={profileData.username}
                error={Boolean(usernameError)}
              />
          </div>
          <div>
            <TextField
              className='form-control'
              name='age'
              type='number'
              label='Age'
              autoFocus={true}
              autoComplete="off"
              sx={{
                width: "10ch"
              }}
              defaultValue={profileData.age}
              error={Boolean(ageError)}
            />
            <FormControl
              sx={{width : '30ch'}}
            >
              <InputLabel>Gender</InputLabel>
                <Select
                  defaultValue={profileData.gender}
                  label="Gender"
                  name="gender"
                  error={Boolean(genderError)}
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
                label='Location'
                autoFocus={true}
                autoComplete="off"
                sx={{
                  width: "40ch"
                }}
                defaultValue={profileData.location}
                error={Boolean(locationError)}
              />
          </div>
          <div>
            <TextField
                className='form-control'
                name='occupation'
                type='text'
                label='Occupation'
                autoFocus={true}
                autoComplete="off"
                sx={{
                  width: "40ch"
                }}
                defaultValue={profileData.occupation}
                error={Boolean(occupationError)}
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
          {alert ? <Alert severity="error" sx={{mx:"auto", width: "40ch"}}>{alert}</Alert> : <div></div>}
        </Box>
      </CardContent>
    </Card>
  );
}

export default EditProfile;
