import "../../App.css";

import axios from 'axios';

import React, {useState, useEffect, useContext} from 'react';

import {NavLink} from 'react-router-dom';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CheckCircleIcon from '@mui/icons-material/CheckCircleOutlined';
import CancelRoundedIcon from '@mui/icons-material/CancelOutlined';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import {AuthContext} from '../../context/AuthContext';

function Profile() {
  const {currentUser} = useContext(AuthContext);
  const [profileData, setProfileData] = useState(null);
  const [isFocused, setFocused] = useState(false);

  // Bio + concerns
  const [bio, setBio] = useState('');
const [concern1, setConcern1] = useState('');
const [concern2, setConcern2] = useState('');
const [concern3, setConcern3] = useState('');

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
              <Button component = {NavLink} to='/edit-profile' variant="contained">Edit Profile</Button>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Grid 
            container 
            spacing={2}
            style={{textAlign:"left"}}
          >
            <Grid item xs={12}>
              <Paper style={{height: '18vh', padding: '2vh'}}>
                <Typography variant='h5'>
                  About Me
                </Typography>
                <TextField
                  fullWidth
                  id="outlined-multiline-static"
                  label="Tell us about yourself!"
                  multiline
                  style={{margin: '2vh 0 1vh 0'}}
                  rows={3}
                  onFocus={() => setFocused(true)}
                  onBlur={() => setFocused(false)}
                  inputProps={{
                    maxLength:285
                  }}
                  InputProps={{
                    endAdornment: (
                      <React.Fragment>
                        {isFocused && (
                          <div style={{ position: 'absolute', bottom: 0, right: 0 }}>
                            <IconButton>
                              <CheckCircleIcon></CheckCircleIcon>
                            </IconButton>
                            <IconButton>
                              <CancelRoundedIcon></CancelRoundedIcon>
                            </IconButton>
                          </div>
                        )}
                      </React.Fragment>
                    ),
                  }}
                />
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper style={{height: '32vh', padding: '2vh'}}>
                <Typography variant='h5'>
                  Core Concerns
                </Typography>
                <TextField
                  fullWidth
                  id="outlined-multiline-static"
                  label="Concern #1"
                  style={{margin: '2vh 0 1vh 0'}}
                  onFocus={() => setFocused(true)}
                  onBlur={() => setFocused(false)}
                  inputProps={{
                    maxLength:90
                  }}
                  InputProps={{
                    endAdornment: (
                      <React.Fragment>
                        {isFocused && (
                          <div style={{ position: 'absolute', bottom: 0, right: 0 }}>
                            <IconButton>
                              <CheckCircleIcon></CheckCircleIcon>
                            </IconButton>
                            <IconButton>
                              <CancelRoundedIcon></CancelRoundedIcon>
                            </IconButton>
                          </div>
                        )}
                      </React.Fragment>
                    ),
                  }}
                />
                <TextField
                  fullWidth
                  id="outlined-multiline-static"
                  label="Concern #2"
                  style={{margin: '2vh 0 1vh 0'}}
                  onFocus={() => setFocused(true)}
                  onBlur={() => setFocused(false)}
                  inputProps={{
                    maxLength:80
                  }}
                  InputProps={{
                    endAdornment: (
                      <React.Fragment>
                        {isFocused && (
                          <div style={{ position: 'absolute', bottom: 0, right: 0 }}>
                            <IconButton>
                              <CheckCircleIcon></CheckCircleIcon>
                            </IconButton>
                            <IconButton>
                              <CancelRoundedIcon></CancelRoundedIcon>
                            </IconButton>
                          </div>
                        )}
                      </React.Fragment>
                    ),
                  }}
                />
                <TextField
                  fullWidth
                  id="outlined-multiline-static"
                  label="Concern #3"
                  style={{margin: '2vh 0 1vh 0'}}
                  onFocus={() => setFocused(true)}
                  onBlur={() => setFocused(false)}
                  inputProps={{
                    maxLength:80
                  }}
                  InputProps={{
                    endAdornment: (
                      <React.Fragment>
                        {isFocused && (
                          <div style={{ position: 'absolute', bottom: 0, right: 0 }}>
                            <IconButton>
                              <CheckCircleIcon></CheckCircleIcon>
                            </IconButton>
                            <IconButton>
                              <CancelRoundedIcon></CancelRoundedIcon>
                            </IconButton>
                          </div>
                        )}
                      </React.Fragment>
                    ),
                  }}
                />
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default Profile;
