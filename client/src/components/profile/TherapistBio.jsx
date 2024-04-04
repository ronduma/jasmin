import React, {useContext, useState} from 'react';
import {redirect, useLocation, useNavigate, Navigate} from 'react-router-dom';
import {AuthContext} from '../../context/AuthContext';
import {doCreateUserWithEmailAndPassword} from '../../firebase/FirebaseFunctions';

import axios from 'axios';

import '../../App.css';


import CheckCircleIcon from '@mui/icons-material/CheckCircleOutlined';
import CancelRoundedIcon from '@mui/icons-material/CancelOutlined';
import EditIcon from '@mui/icons-material/Edit';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import Tooltip from '@mui/material/Tooltip';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

function TherapistBio({bio, topics}) {
  const {currentUser} = useContext(AuthContext);
  const [editAbout, setEditAbout] = useState(false);
  const [currbio, setBio] = useState(bio);
  if (bio = "") setBio(null);

  const [subtopics, setSubTopics] = useState([
  ["Difficulty in communication, crisis", "Intimate Relations", "Breakup", "Emotional abuse, abusive behavior", 
  "Child-rearing practices", "Betrayal"], ["ADHD (Attention Deficit Hyperactivity Disorder)", "Excessive Aggression",
  "Children with Special Needs", "Loss of Loved Ones", "Adaptation", "Bullying"], ["Gestalt", "Existential",
  "Client-centered therapy", "CBT (Cognitive Behavioral Therapy)", "Positive psychotherapy", "Psychoanalysis",
  "Schema therapy", "Transactional Analysis"], ["Clinical Psychologist", "Psychiatrist", "Psychologist",
  "Consulting psychologist", "Psychotherapist", "Sexologist", "Coach", "Transactional Analysis"]]);

  const [topicHeaders, setTopicHeaders] = useState(["Couple Therapy", "Children Therapy", 
    "Therapeutic Approaches", "Types of Professionals in Mental Health"]);


  const putBio = () => {
    // console.log("curentUser: ", currentUser);
    axios.put('http://localhost:5173/profile/bio', {
      uid: currentUser.uid,
      bio: document.getElementById('textbox-bio').value
    })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
    setEditAbout(false);
  }

  const editTopics = () => {
    return (
      subtopics.map((topicList, index) => (
        <>
          <Typography variant='h7'> {topicHeaders[index] + ": "} </Typography>
          <FormGroup row style={{marginLeft: "20px"}}>
            {topicList.map((topic, i) => (
              <FormControlLabel key={"Form-Control " + index}
                control={<Checkbox key={i} defaultChecked={false} />}
                label={topic}
              />
            ))}
          </FormGroup>
        </>
      ))
    );
  }

  //checks ids and sees what is selected and stores that
  const handleCheckboxChange = (event) => {}



  return (
    <div>
      <Grid 
        container 
        spacing={2}
        style={{textAlign:"left"}}
      >
        <Grid item xs={12}>
          <Paper style={{minHeight: '18vh', padding: '2vh'}}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: "space-between"}}>
              <Typography variant='h5'> Expertise </Typography>
              {editAbout ? "" : <IconButton onClick={() => setEditAbout(true)}><EditIcon /></IconButton>}
            </div>

            {!editAbout ? 
              <p>{topics || "Please edit, and select topics of expertise."}</p>
            : ( <>
              <Typography variant='h7'> Personal Therapy Topics: </Typography> 
              <FormGroup row style={{marginLeft: "20px"}}>
                <FormControlLabel   
                  control={<Checkbox id="1" defaultChecked = {false} />} 
                  label={
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      Relationship with Yourself
                      <Tooltip title="More information">
                        <InfoOutlinedIcon style={{ marginLeft: '5px' }} />
                      </Tooltip>
                    </div>
                  } 
                />
                <FormControlLabel   
                  control={<Checkbox id="2" defaultChecked = {false} />} 
                  label={
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      Relationship with Others
                      <Tooltip title="More information">
                        <InfoOutlinedIcon style={{ marginLeft: '5px' }} />
                      </Tooltip>
                    </div>
                  } 
                />
                <FormControlLabel   
                  control={<Checkbox id="3" defaultChecked = {false} />} 
                  label={
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      Personal and Professional development
                      <Tooltip title="More information">
                        <InfoOutlinedIcon style={{ marginLeft: '5px' }} />
                      </Tooltip>
                    </div>
                  } 
                />
                <FormControlLabel   
                  control={<Checkbox id="4" defaultChecked = {false} />} 
                  label={
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      New Living Conditions
                      <Tooltip title="More information">
                        <InfoOutlinedIcon style={{ marginLeft: '5px' }} />
                      </Tooltip>
                    </div>
                  } 
                />
                
              </FormGroup>
              {editTopics()}
              </>)}

                 <p>{" "}</p>
              <Typography variant='h5'> About Me </Typography>
              <TextField
              disabled={!editAbout}
              inputRef={input => input && input.focus()}
              fullWidth
              id="textbox-bio"
              label="Tell us about yourself!"
              value={currbio}
              onChange={event => setBio(event.target.value)}
              InputLabelProps={{
                shrink: currbio || editAbout ? true : false,
              }}
              multiline
              style={{margin: '2vh 0 1vh 0'}}
              rows={3}
              inputProps={{
                maxLength:285
              }}
            />
            {editAbout && (
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <IconButton>
                  <CheckCircleIcon onClick={putBio}>
                  </CheckCircleIcon>
                </IconButton>
                <IconButton>
                  <CancelRoundedIcon onClick={ ()=> {setEditAbout(false); setBio(bio)}}></CancelRoundedIcon>
                </IconButton>
              </div>
            )}
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper style={{minHeight: '18vh', padding: '2vh'}}>
            <Typography variant='h5'>
              Reviews
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper style={{minHeight: '40vh', padding: '2vh'}}>
            <Typography variant='h5'>
              Upcoming Availability
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateCalendar />
            </LocalizationProvider>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default TherapistBio;
