import "../../App.css";

import axios from 'axios';

import React, {useState, useEffect, useContext} from 'react';

import {useNavigate, NavLink} from 'react-router-dom';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import UploadIcon from '@mui/icons-material/Upload';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/system';
import Typography from '@mui/material/Typography';

import {AuthContext} from '../../context/AuthContext';

import TherapistBio from "./TherapistBio";
import PatientBio from "./PatientBio";

function Profile() {
  const {currentUser} = useContext(AuthContext);
  const [profileData, setProfileData] = useState(null);
  const [isTherapist, setIsTherapist] = useState(null);
  const [imgFile, setImgFile] = useState(null);

  const navigate = useNavigate();

  const [isLoading, setLoading] = useState(true);

  const [uploadMode, setUploadMode] = useState(true);
  const toggleMode = () => {
    setUploadMode(prevMode => !prevMode);
  };

  // console.log(profileData)

  const fetchData = async () => {
    try {
      console.log("getting prof data")
      const response = await axios.get(`http://localhost:5000/profile/${currentUser.uid}`);
      setProfileData(response.data);
      setLoading(false);
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
    toggleMode();
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
      toggleMode();
    } catch (error) {
      console.error('Error uploading profile picture:', error);
    }
  }

  if (isLoading) {
    return <div className="App">Loading...</div>;
  }

  return (
    <div>
      <Grid 
        container 
        justifyContent={"center"}
        spacing={2}
        style={{padding:'2vh 0 0 0',minWidth: "1200px", minHeight: "500px" }}
      >
        <Grid 
          fontSize={"14pt"}
          item 
          xs={3}
        >
          <Paper style={{ minWidth: "200px",height: '59.65vh', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <Typography 
                  variant='h4'
                  style={{padding: '1vh 0 0 0'}}
                >
                  {profileData.firstName} {profileData.lastName}
                </Typography> 
            {profileData ? 
              <div>
                <div id='profilePic'>
                  {profileData.profile_img ?            
                    <Avatar
                      alt="Profile Picture"
                      src={`data:image/png;base64,${profileData.profile_img}`}
                      sx={{ minWidth: 200, minHeight: 200, mx: 'auto'}}
                      style={{marginTop: '1em'}}
                    /> :
                    <div sx={{mx:'auto'}}>
                      <div>
                        <AccountCircleIcon
                          sx={{ width: "auto", height: 200 }}
                          style={{marginTop: '1em'}}
                        />
                      </div> 
                    </div>
                  }
                  <br/>
                  <div>
                    {uploadMode ? 
                    <Button 
                    component="label"
                    role={undefined}
                    variant="contained"
                    tabIndex={-1}
                    startIcon={<UploadIcon />}>
                      <input id="fileInput" type='file' onChange={handleFileUpload} style={{ display: "none" }} /><label htmlFor="fileInput">Edit Picture</label>
                    </Button> 
                    : <Button
                    component="label"
                    role={undefined}
                    variant="contained"
                    tabIndex={-1}
                    startIcon={<UploadIcon />}
                    onClick={ uploadMode? handleFileUpload : handleSubmitFileUpload}
                    >
                      Submit upload
                    </Button>
                    }

                  </div>
                </div>
                
                <br/>
                <div style={{width: "90%", margin: "0 auto", textAlign: "center"}}>
                  <div style={{display: "inline-block" ,textAlign:'left'}}>
                    <div>Age: {profileData.age}</div> 
                    <div>Gender: {profileData.gender}</div> 
                    <div>Location: {profileData.location}</div> 
                    <div>Occupation: {profileData.occupation}</div> 
                    <div>Email: {profileData.email}</div> 
                  </div>
                </div>                
              </div>
              : <div>Missing Data</div>}
              <br/>
              <Button component = {NavLink} to='/edit-profile' variant="contained">Edit Info</Button>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          {profileData.isTherapist == "true" ? <TherapistBio /> : <PatientBio />}
        </Grid>
      </Grid>
    </div>
  );
}

export default Profile;
