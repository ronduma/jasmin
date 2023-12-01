import "../App.css";
import profile_img from "../images/profile.jpg";


// import React, {useContext} from 'react';
import {NavLink} from 'react-router-dom';
import Button from '@mui/material/Button';

import React, {useState, useEffect, useContext} from 'react';
import {useNavigate} from 'react-router-dom';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import Avatar from '@mui/material/Avatar';
import {Box, Button, Link} from "@mui/material";
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

import {AuthContext} from '../context/AuthContext';

function Profile() {
  const navigate = useNavigate();
  const {profileData} = useContext(AuthContext);
  const changeInfo = (e) => {
    e.preventDefault();
    console.log('navgiate to home');
    navigate('/edit-profile');
  }
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Paper style={{ height: '100%' }}>
            {profileData ? 
              <div>
                <div>{profileData.firstName} {profileData.lastName}</div> 
                {profileData.profile_img ?             
                  <Avatar
                    alt="Profile Picture"
                    src={profileData.profile_img}
                    sx={{ width: 24, height: 24 }}
                  /> :
                  <AccountCircleIcon
                    sx={{ width: "auto", height: 100 }}
                  />
                }
                <div></div>
                <div>Age: {profileData.age}</div> 
                <div>Gender: {profileData.gender}</div> 
                <div>Location: {profileData.location}</div> 
                <div>Occupation: {profileData.occupation}</div> 
                <div>Email: {profileData.email}</div> 
              </div>
              : <div>Missing Data</div>}
              <br/>
              <form onSubmit={changeInfo}>
                <Button 
                type = 'submit' 
                variant='contained'
                id='submitButton'
                name='submitButton'
                className ='button'
                sx={{mb:'1rem'}}
                >
                  Edit Profile
                </Button>
              </form>

          </Paper>
        </Grid>

        <Grid item xs={6}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Paper>About Me</Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper>Core Concerns</Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper>Frustrations</Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default Profile;
