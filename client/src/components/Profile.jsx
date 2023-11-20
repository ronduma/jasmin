import "../App.css";
import profile_img from "../images/profile.jpg";
import React, {useState, useEffect, useContext} from 'react';
import {useNavigate} from 'react-router-dom';

import axios from 'axios';

import {Box} from "@mui/material";
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

import {AuthContext} from '../context/AuthContext';

function Profile() {
  const {currentUser} = useContext(AuthContext);
  const [profileData, setProfileData] = useState(undefined);
  const [error, setErrorCode] = useState(false);
  useEffect(() => {
    async function fetchUserData() {
      try {
        const response = await axios.get(`http://localhost:5000/profile/${currentUser.uid}`);
        setProfileData(response.data);
      }
      catch(e){
        console.log(e);
        setErrorCode(true);
      }
    }
    fetchUserData();
 });

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Paper style={{ height: '100%' }}>
            Your Main Thing
          </Paper>
        </Grid>

        <Grid item xs={6}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Paper>Thing 1</Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper>Thing 2</Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper>Thing 3</Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
  // return (
  //   <Box sx = {{width : '100%', 
  //               marginTop: 10,
  //               maxWidth : 350, 
  //               backgroundColor : 'white',
  //               border: 1,
  //               borderRadius: 4,
  //               boxShadow: 10,
  //               borderColor: 'grey.300',
  //               }}>
  //                 <h1>Profile</h1>
  //                 {profileData ? (
  //                 <h2>{profileData.email}</h2>) : <h2>Missing Email</h2>}
      
  //   </Box>
  // );


export default Profile;
