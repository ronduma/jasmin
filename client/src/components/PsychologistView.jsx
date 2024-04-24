import "./profile/styles.css";
import { useParams, useNavigate, NavLink } from 'react-router-dom';
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

import Typography from '@mui/material/Typography';
import TherapistBioFromPatientView from "./profile/TherapistBioFromPatientView";

import {AuthContext} from '../context/AuthContext';

function PsychologistView() {
  const { id } = useParams();
  const [profileData, setprofileData] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const {currentUser} = useContext(AuthContext);
  const [isMatched, setIsMatched] = useState(false);
  console.log("We are in Psychologist");
  const [therapist, setTherapist] = useState(null);
  

  const handleClick = async () => {
    try {
      const response = await axios.post(`http://localhost:5173/matching`, {
        currentUserID: currentUser.uid,
        therapistID: id
      });
      console.log('Success Match Response:', response.data);
      setIsMatched(!isMatched)
    } catch (error) {
      // Handle error
      console.error('Error:', error);
    }
    try {
      let user2_id = id;
      let matched = isMatched;
      const response = await axios.put(`http://localhost:5173/chats/${currentUser.uid}`, {user2_id, matched})
      console.log(response)
    } catch(e){
      console.log(e);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5173/profile/${id}`);
        setprofileData(response.data);
        setLoading(false);
      } catch (e) {
        // console.log("yo")
      }
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    if (profileData && currentUser) {
      // Check if currentUser.uid is included in profileData.patients
      if (profileData.patients && profileData.patients.includes(currentUser.uid)) {
        setIsMatched(true);
      }
      else{
        setIsMatched(false);
      }
    }
  }, [profileData, currentUser]);

  if (isLoading) {
    return <div className="App">Loading...</div>;
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
                    <div sx={{mx:'auto'}}>
                      <div>
                        <AccountCircleIcon
                          sx={{ width: "auto", height: "10rem" }}
                        />
                      </div> 
                    </div>
                  }
                </div>
                <br/>
                <div className="left-section-details">
                  <div>Age: {profileData.age}</div>
                  <div>Gender: {profileData.gender}</div>
                  <div>Location: {profileData.location}</div>
                  <div>Occupation: {profileData.occupation}</div>
                  <div>Email: {profileData.email}</div>
                </div>                
              </div>
              : <div>Missing Data</div>}
              <br/>
              <div style={{margin: "2rem 0 0 0"}}>
                {isMatched ? (
                    <Button variant="contained" onClick={handleClick}>
                      Unmatch with Therapist
                    </Button>
                  ) : (
                    <Button variant="contained" onClick={handleClick}>
                      Match
                    </Button>
                  )
                }
                {" "}
                <Button variant="contained"> Chat </Button>
              </div>
          </Paper>
        </Grid>
        <Grid 
          item
          xs={12}
          md={6}
        >
          <TherapistBioFromPatientView 
            bio = {profileData.bio} 
            specialty={profileData.specialty}
          /> 
        </Grid>
      </Grid>
    </div>
  );

}
export default PsychologistView;
