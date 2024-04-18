import "./styles.css";

import axios from 'axios';

import React, { useState, useEffect, useContext } from 'react';

import { useNavigate, NavLink } from 'react-router-dom';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import UploadIcon from '@mui/icons-material/Upload';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

import { AuthContext } from '../../context/AuthContext';

import Credentials from "./Credentials";
import TherapistBio from "./TherapistBio";
import PatientBio from "./PatientBio";
import TherapistCalender from "./TherapistCalender";
import Loading from "../loading/Loading";

function Profile() {
  const { currentUser } = useContext(AuthContext);
  const [profileData, setProfileData] = useState(null);
  const [imgFile, setImgFile] = useState(null);

  const navigate = useNavigate();

  const [isLoading, setLoading] = useState(true);

  const [uploadMode, setUploadMode] = useState(true);
  const toggleMode = () => {
    setUploadMode(prevMode => !prevMode);
  };

  const fetchData = async () => {
    try {
      console.log("getting prof data")
      const response = await axios.get(`http://localhost:5173/profile/${currentUser.uid}`);
      setProfileData(response.data);
      setLoading(false);
    } catch (e) {
      navigate('/getting-started')
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentUser.uid]);

  const handleFileUpload = async (event) => {
    event.preventDefault();
    const selectedFile = event.target.files[0];
    console.log(selectedFile)
    setImgFile(selectedFile);
    console.log("HELLO")
    toggleMode();
  }

  useEffect(() => {
    console.log('Updated imgFile:', imgFile);
  }, [imgFile]);

  const handleSubmitFileUpload = async (event, directory) => {
    try {
      event.preventDefault();
      const formData = new FormData();
      formData.append('file', imgFile);
      await axios.put(`http://localhost:5173/profile/${currentUser.uid}/${directory}`, formData)
        .then(response => {
          if (response.data) {
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
    return <Loading />;
  }

  return (
    <div className="profile-container">
      <Grid
        container
        justifyContent={"center"}
        spacing={2}
        alignItems={"stretch"}
      >
        <Grid 
          item 
          xs={12}
          md={6}
          lg={4}
        >
          <Paper className="left-section">
            <div className="left-section-header">
              {profileData.firstName} {profileData.lastName}
            </div>
            {profileData ?
              <div>
                <div id='profilePic'>
                  {profileData.profile_img ?
                    <Avatar
                      alt="Profile Picture"
                      src={`data:image/png;base64,${profileData.profile_img}`}
                      sx={{ width: "10rem", height: "10rem", mx: 'auto' }}
                    /> :
                    <div sx={{ mx: 'auto' }}>
                      <div>
                        <AccountCircleIcon
                          sx={{ width: "auto", height: "10rem" }}
                        />
                      </div>
                    </div>
                  }
                  <br />
                  <div>
                    {uploadMode ?
                      <Button
                        className="button"
                        component="label"
                        role={undefined}
                        variant="contained"
                        tabIndex={-1}
                        startIcon={<UploadIcon />}
                      >
                        <input
                          id="fileInput"
                          type='file'
                          onChange={handleFileUpload}
                          style={{ display: "none" }}
                        />
                        <label id="fileInputLabel" htmlFor="fileInput">Edit Picture</label>
                      </Button>
                      : <Button
                        className="button"
                        component="label"
                        role={undefined}
                        variant="contained"
                        tabIndex={-1}
                        startIcon={<UploadIcon />}
                        onClick={(event) => handleSubmitFileUpload(event, 'profile-pic')}
                      >
                        Submit Upload
                      </Button>
                    }
                  </div>
                </div>
                <br />
                <div className="left-section-details">
                  <div>Age: {profileData.age}</div>
                  <div>Gender: {profileData.gender}</div>
                  <div>Location: {profileData.location}</div>
                  <div>Occupation: {profileData.occupation}</div>
                  <div>Email: {profileData.email}</div>
                </div>
              </div>
              : <div>Missing Data</div>}
            <br />
            <Button className="button" component={NavLink} to='/edit-profile' variant="contained">Edit Info</Button>
            <br />

            {profileData.isTherapist ? <Credentials uid={profileData._id} pdf_files={profileData.pdf_files} /> : null}

          </Paper>
        </Grid>
        <Grid 
          item
          xs={12}
          md={6}
        >
          {profileData.isTherapist == true ? 
          <TherapistBio 
              bio = {profileData.bio} 
              specialty={profileData.specialty}/> 
          : <PatientBio 
              bio = {profileData.bio} 
              concerns = {profileData.concerns} 
            />}
        </Grid>

      </Grid>
    </div>
  );
}

export default Profile;
