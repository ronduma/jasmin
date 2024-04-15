import "../App.css";
import { useParams, useNavigate, NavLink } from 'react-router-dom';
import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

import Typography from '@mui/material/Typography';
import TherapistBio from "./profile/TherapistBio";
import TherapistBioFromPatientView from "./profile/TherapistBioFromPatientView";
import {AuthContext} from '../context/AuthContext';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


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
    <div style={{"marginBottom": 100}}>
      <Grid 
        container 
        justifyContent={"center"}
        spacing={2}
        alignItems={"stretch"}
        style={{padding:'2vh 0 0 0',minWidth: "1200px", minHeight: "500px"}}
      >
        <Grid 
          fontSize={"14pt"}
          item 
          xs={3}
        >
          <Paper style={{ height: "100%", minWidth: "200px", flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
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
              {isMatched ? (
              <Button variant="contained" onClick={handleClick}>
                Unmatch with Therapist
              </Button>
            ) : (
              <Button variant="contained" onClick={handleClick}>
                Match
              </Button>
            )}
            {" "}
              <Button variant="contained"> Schedule </Button>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <TherapistBioFromPatientView 
              bio = {profileData.bio} 
              specialty={profileData.specialty}/> 
        </Grid>
      </Grid>
    </div>
  );

}
export default PsychologistView;
