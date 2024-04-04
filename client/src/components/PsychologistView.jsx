import "../App.css";
import { useParams, useNavigate, NavLink } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

import Typography from '@mui/material/Typography';
import TherapistBio from "./profile/TherapistBio";


function PsychologistView() {
  const { id } = useParams();
  const [profileData, setprofileData] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5173/profile/${id}`);
        setprofileData(response.data);
        setLoading(false);
      } catch (e) {
        console.log("yo")
      }
    };
    fetchData();
  }, [id]);

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
              <Button variant="contained"> Match </Button> {" "}
              <Button variant="contained"> Schedule </Button>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <TherapistBio /> 
        </Grid>
      </Grid>
    </div>
  );

}
export default PsychologistView;
