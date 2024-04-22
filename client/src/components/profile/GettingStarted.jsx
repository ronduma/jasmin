import React, {useContext, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {AuthContext} from '../../context/AuthContext';

import axios from 'axios';

import './styles.css';

import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';

function GettingStarted() {
  const {currentUser} = useContext(AuthContext);
  const [gender, setGender] = React.useState('');
  console.log(currentUser)

  const [isTherapistError, setIsTherapistError] = useState(false);
  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [usernameError, setUsernameError] = useState('');
  const [ageError, setAgeError] = useState(false);
  const [genderError, setGenderError] = useState(false);
  const [locationError, setLocationError] = useState(false);
  const [occupationError, setOccupationError] = useState(false);
  const [alert, setAlert] = useState(false);

  const navigate = useNavigate(); 
  // console.log(location)
  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const setError = async (response) => {
    let field = response.split(' ')[0];
    setFirstNameError(false);
    setLastNameError(false);
    setUsernameError(false);
    setAgeError(false);
    setGenderError(false);
    setLocationError(false);
    setOccupationError(false);
    switch (field) {
      case 'First':
        setFirstNameError(response);
        break;
      case 'Last':
        setLastNameError(response);
        break;
      case 'Username':
        setUsernameError(response);
        break;
      case 'Age':
        setAgeError(response);
        break;
      case 'Gender':
        setGenderError(response);
        break;
      case 'Location':
        setLocationError(response);
        break;
      case 'Occupation':
        setOccupationError(response);
        break;
      case 'Are':
        setIsTherapistError(response);
        break;
    }
    setAlert(response)
  };

  const handleInfo = async (e) => {
    e.preventDefault();
    const {isTherapist, firstName, lastName, username, age, gender, location, occupation} = e.target.elements;
    let user = {
      uid : currentUser.uid, 
      email : currentUser.email,
      isTherapist : isTherapist.value,
      firstName : firstName.value, 
      lastName : lastName.value, 
      username : username.value,
      age : age.value, 
      gender : gender.value, 
      location : location.value, 
      occupation : occupation.value
    };
    try{
      const checkDB = await axios.get(`http://localhost:5173/profile/${currentUser.uid}`);
    } catch (error) {
      console.log(error)
      await axios.post('http://localhost:5173/register', user);
    }
    try {
      console.log("UPDATING DATA")
      console.log("DATA:", user)
      let updateUser = await axios.put('http://localhost:5173/profile/getting-started', user)
      console.log("updated data", updateUser)
      navigate('/profile');
    } catch (error) {
      console.log(error);
      setError(error.response.data)
    }
  };

  return (
    <Card className='card'>
      <CardContent>
        <h1>Getting Started</h1>
        <Box 
          className="form"
          component="form"
          onSubmit={handleInfo}
        >
          <FormControl>
              <FormLabel>I am a...</FormLabel>
              <RadioGroup
                row
                name="isTherapist"
                error={Boolean(isTherapistError)}
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
              error={Boolean(firstNameError)}
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
              error={Boolean(lastNameError)}
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
                error={Boolean(usernameError)}
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
              error={Boolean(ageError)}
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
                placeholder='Location'
                label='Location'
                autoFocus={true}
                autoComplete="off"
                sx={{
                  width: "40ch"
                }}
                error={Boolean(locationError)}
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
          <div>
            {alert ? <Alert severity="error" sx={{mx:"auto", width: "40ch"}}>{alert}</Alert> : <div></div>}
          </div>
        </Box>
      </CardContent>
    </Card>
  );
}

export default GettingStarted;
