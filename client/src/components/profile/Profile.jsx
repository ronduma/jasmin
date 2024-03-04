import "../../App.css";

import axios from 'axios';

import React, {useState, useEffect, useContext} from 'react';

import {useNavigate, NavLink} from 'react-router-dom';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CheckCircleIcon from '@mui/icons-material/CheckCircleOutlined';
import CancelRoundedIcon from '@mui/icons-material/CancelOutlined';
import UploadIcon from '@mui/icons-material/Upload';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/system';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import {AuthContext} from '../../context/AuthContext';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

function Profile() {
  const {currentUser} = useContext(AuthContext);
  const [profileData, setProfileData] = useState(null);
  const [isFocused, setFocused] = useState(false);
  const [imgFile, setImgFile] = useState(null);

  const navigate = useNavigate();

  console.log(profileData)

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

  useEffect(() => {
    fetchData(); 
  }, [currentUser.uid]);

  const handleFileUpload = async (event) => {
    const selectedFile = event.target.files[0];
    console.log(selectedFile)
    setImgFile(selectedFile);
    console.log("HELLO")
  } 

  useEffect(() => {
    console.log('Updated imgFile:', imgFile);
  }, [imgFile]);

  const handleSubmitFileUpload = async () => {
    try {
      const formData = new FormData();
      formData.append('file', imgFile);
      await axios.put(`http://localhost:5000/profile/${currentUser.uid}/profile-pic`, formData)
      .then(response => {
        if (response.data){
          console.log("RESPONSE", response);
        }
      })
      .catch(error => {
        console.log(error);
      });
      fetchData();
    } catch (error) {
      console.error('Error uploading profile picture:', error);
    }
  }

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
                <div id='profilePic'>
                  {profileData.profile_img ?             
                    <Avatar
                      alt="Profile Picture"
                      src={`data:image/png;base64,${profileData.profile_img}`}
                      sx={{ width: 24, height: 24 }}
                      
                    /> :
                    <div sx={{mx:'auto'}}>
                      <div>
                        <AccountCircleIcon
                          sx={{ width: "auto", height: 200 }}
                        />
                      </div>
                      <div>
                        <input type='file' onChange={handleFileUpload}/>
                      </div>
                      <div>
                        <Button
                          component="label"
                          role={undefined}
                          variant="contained"
                          tabIndex={-1}
                          startIcon={<UploadIcon />}
                          onClick={handleSubmitFileUpload}
                        >
                          Upload picture
                        </Button>
                      </div>
                    </div>
                  }
                </div>
                <div style={{textAlign:'left', padding:'1.5vh 0 0 0'}}>
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

export default Profile;
