import "../App.css";
import profile_img from "../images/profile.jpg";
import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import {Box} from "@mui/material";
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
        // console.log(profileData);
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
                  <p>Email: {profileData.email}</p>
                  <p>Bio: {profileData.bio}</p>
      
    </Box>
  );
}
export default Profile;
