import React, {useContext, useState} from 'react';
import {Navigate} from 'react-router-dom';
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
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';

function GettingStarted() {
  const {currentUser} = useContext(AuthContext);

  return (
    <Card className='card'>
      <CardContent>
        <h1>Getting Started</h1>
        <Box 
          autoComplete="off"
          component="form"
          sx={{'& > div': { marginBottom: '1rem' } }}
        >
          <div>
            <TextField
              className='form-control'
              type='text'
              placeholder='First Name'
              label='First Name'
              autoFocus={true}
              autoComplete="off"
            />
            <TextField
              className='form-control'
              type='text'
              placeholder='Last Name'
              label='Last Name'
              autoFocus={true}
              autoComplete="off"
            />
          </div>
          <div>
            <TextField
              className='form-control'
              type='number'
              placeholder='Age'
              label='Age'
              autoFocus={true}
              autoComplete="off"
            />
          </div>
          <div>
            <TextField
              className='form-control'
              type='text'
              placeholder='Location'
              label='Location'
              autoFocus={true}
              autoComplete="off"
            />
          </div>
          <div>
            <FormControl
              sx={{width : '10vw'}}
            >
              <InputLabel>Gender</InputLabel>
              <Select
                label="Gender"
              >
                <MenuItem>Male</MenuItem>
                <MenuItem>Female</MenuItem>
                <MenuItem>Non-Binary</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div>
            <FormControlLabel control={<Switch />} label="Therapist?" />
          </div>
        </Box>
      </CardContent>
    </Card>
  );
}

export default GettingStarted;
