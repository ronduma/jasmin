import "../App.css";
import profile_img from "../images/profile.jpg";
import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import {Box, Button, Link} from "@mui/material";
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
    <Box sx = {{width : '100%', 
                marginTop: 10,
                maxWidth : 350, 
                backgroundColor : 'white',
                border: 1,
                borderRadius: 4,
                boxShadow: 10,
                borderColor: 'grey.300',
                }}>
                  <h1>Profile</h1>
                  {profileData ? (
                  <h2>{profileData.email}</h2>) : <h2>Missing Email</h2>}
                  <Button component ={Link} to ="/" variant="contained" color ="primary">Edit Profile</Button>
      
    </Box>
  );
}
export default Profile;
