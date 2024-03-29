import React, {useContext, useState} from 'react';
import {redirect, useLocation, useNavigate, Navigate} from 'react-router-dom';
import {AuthContext} from '../../context/AuthContext';
import {doCreateUserWithEmailAndPassword} from '../../firebase/FirebaseFunctions';

import axios from 'axios';

import '../../App.css';


import CheckCircleIcon from '@mui/icons-material/CheckCircleOutlined';
import CancelRoundedIcon from '@mui/icons-material/CancelOutlined';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

function TherapistBio() {
  const {currentUser} = useContext(AuthContext);
  const [isFocused, setFocused] = useState(false);
  const navigate = useNavigate(); 

  return (
    <div>
      <Grid 
        container 
        spacing={2}
        style={{textAlign:"left"}}
      >
        <Grid item xs={12}>
          <Paper style={{height: '18vh', padding: '2vh'}}>
            <Typography variant='h5'>
              Reviews
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper style={{height: '40vh', padding: '2vh'}}>
            <Typography variant='h5'>
              Upcoming Availability
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateCalendar />
            </LocalizationProvider>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default TherapistBio;
