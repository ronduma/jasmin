import "../App.css";

import axios from 'axios';

import React, {useState, useEffect, useContext} from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import {AuthContext} from '../context/AuthContext';

function Profile() {
  const {currentUser} = useContext(AuthContext);
  const [profileData, setProfileData] = useState(null);

  console.log(profileData)

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("getting prof data")
        const response = await axios.get(`http://localhost:5000/profile/${currentUser.uid}`);
        setProfileData(response.data);
      } catch (e) {
        console.error(e);
      }
    };

    fetchData(); 
  }, [currentUser.uid]);

  return (
    <div>
      <Grid 
        container 
        justifyContent={"center"}
        spacing={2}
        style={{padding:'4vh 0 0 0'}}
      >
        <Grid 
          fontSize={"14pt"}
          item 
          xs={3}
        >
          <Paper style={{ height: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            {profileData ? 
              <div>
                <Typography 
                  variant='h4'
                >
                    {profileData.firstName} {profileData.lastName}
                </Typography> 
                {profileData.profile_img ?             
                  <Avatar
                    alt="Profile Picture"
                    src={profileData.profile_img}
                    sx={{ width: 24, height: 24 }}
                  /> :
                  <AccountCircleIcon
                    sx={{ width: "auto", height: 200 }}
                  />
                }
                <div style={{textAlign:'left'}}>
                  <div>Age: {profileData.age}</div> 
                  <div>Gender: {profileData.gender}</div> 
                  <div>Location: {profileData.location}</div> 
                  <div>Occupation: {profileData.occupation}</div> 
                  <div>Email: {profileData.email}</div> 
                </div>                
              </div>
              : <div>Missing Data</div>}
              <br/>
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
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Grid 
            container 
            spacing={2}
            style={{textAlign:"left"}}
          >
            <Grid item xs={12}>
              <Paper style={{height: '17vh', padding: '2vh'}}>
                <Typography variant='h5'>
                  About Me
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper style={{height: '33vh', padding: '2vh'}}>
                <Typography variant='h5'>
                  Core Concerns
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default Profile;
