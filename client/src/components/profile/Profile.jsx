import "../../App.css";

import axios from 'axios';

import React, {useState, useEffect, useContext} from 'react';

import {useNavigate, NavLink} from 'react-router-dom';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CheckCircleIcon from '@mui/icons-material/CheckCircleOutlined';
import CancelRoundedIcon from '@mui/icons-material/CancelOutlined';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import { Unstable_Popup as Popup } from '@mui/base/Unstable_Popup';
import { styled } from '@mui/system';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import {AuthContext} from '../../context/AuthContext';

function Profile() {
  const {currentUser} = useContext(AuthContext);
  const [profileData, setProfileData] = useState(null);
  const [isFocused, setFocused] = useState(false);

  const navigate = useNavigate();

  console.log(profileData)

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("getting prof data")
        const response = await axios.get(`http://localhost:5000/profile/${currentUser.uid}`);
        setProfileData(response.data);
      } catch (e) {
        console.log("yo")
        navigate('/not-found')
      }
    };

    fetchData(); 
  }, [currentUser.uid]);

  const [anchor, setAnchor] = React.useState(null);

  const handlePfpChange = (event) => {
    setAnchor(anchor ? null : event.currentTarget);
  };

  const open = Boolean(anchor);
  const id = open ? 'simple-popup' : undefined;

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
                <div aria-describedby={'profilePic'} onClick={handlePfpChange} id='profilePic'>
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
                </div>
                <Popup id={'profilePic'} open={open} anchor={anchor}>
                  <PopupBody>The content of the Popup.</PopupBody>
                </Popup>
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
              <Button component = {NavLink} to='/edit-profile' variant="contained">Edit Info</Button>
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

const grey = {
  50: '#F3F6F9',
  100: '#E5EAF2',
  200: '#DAE2ED',
  300: '#C7D0DD',
  400: '#B0B8C4',
  500: '#9DA8B7',
  600: '#6B7A90',
  700: '#434D5B',
  800: '#303740',
  900: '#1C2025',
};

const blue = {
  200: '#99CCFF',
  300: '#66B2FF',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
  700: '#0066CC',
};

const PopupBody = styled('div')(
  ({ theme }) => `
  width: max-content;
  padding: 12px 16px;
  margin: 8px;
  border-radius: 8px;
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  background-color: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  box-shadow: ${
    theme.palette.mode === 'dark'
      ? `0px 4px 8px rgb(0 0 0 / 0.7)`
      : `0px 4px 8px rgb(0 0 0 / 0.1)`
  };
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  z-index: 1;
`,
);

export default Profile;
