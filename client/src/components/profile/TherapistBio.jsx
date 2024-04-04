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

function TherapistBio({bio, specialty}) {
  const {currentUser} = useContext(AuthContext);
  const [editAbout, setEditAbout] = useState(false);
  const [currbio, setBio] = useState(bio);
  if (bio = "") setBio(null);
  const [selectedTopics, setSelectedTopics] = useState(specialty);

  const [subtopics, setSubTopics] = useState([
  ["Relationship with Yourself", "Relationship with Others", "Personal and Professional development", "New Living Conditions"],
  ["Difficulty in communication, crisis", "Intimate Relations", "Breakup", "Emotional abuse, abusive behavior", 
  "Child-rearing practices", "Betrayal"], ["ADHD (Attention Deficit Hyperactivity Disorder)", "Excessive Aggression",
  "Children with Special Needs", "Loss of Loved Ones", "Adaptation", "Bullying"], ["Gestalt", "Existential",
  "Client-centered therapy", "CBT (Cognitive Behavioral Therapy)", "Positive psychotherapy", "Psychoanalysis",
  "Schema therapy", "Transactional Analysis"], ["Clinical Psychologist", "Psychiatrist", "Psychologist",
  "Consulting psychologist", "Psychotherapist", "Sexologist", "Coach", "Transactional Analysis"]]);

  const [topicHeaders, setTopicHeaders] = useState(["Personal Therapy Topics","Couple Therapy", "Children Therapy", 
    "Therapeutic Approaches", "Types of Professionals in Mental Health"]);

  const [personalTherapySubtopics, setPersonalTherapySubtopics] = useState([
    ["Fatigue", "Depression", "Irritability", "Anxiety", "Panic attacks", "Self-esteem",
    "Loneliness", "Chemical", "Suicide attempts", "Psychosomatics", "Bipolar disorder",
    "Food attitude", "Obsessive thoughts and rituals", "Borderline personality disorder" ], 
    ["Romantic relationship", "Relationship issues", "Sexual relations", "Codependency"], 
    ["Self-determination, job search", "Burnout", "Procrastination", "Attitude towards money"], 
    ["Childbirth", "Adaptation, emigration", "Grief", "Disease diagnosis", "PTSD"]
  ]);

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
            {topicList.map((currtopic, i) => (
              <FormControlLabel id={"Form-Control " + index}
                control={<Checkbox id={`${index}-${i}`} defaultChecked={selectedTopics.includes(currtopic)} />} //gotta chagne defaultChanged based on DB
                label={index != 0 ? currtopic : 
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    {currtopic}
                    <Tooltip title={personalTherapySubtopics[i].join(", ")}>
                      <InfoOutlinedIcon style={{ marginLeft: '5px' }} />
                    </Tooltip>
                  </div>
                }
              />
            ))}
          </FormGroup>
        </>
      ))
    );
  }

  //checks ids and sees what is selected and stores that
  const handleCheckboxChange = () => {
    let topicList = [];
    for (let i = 0; i < subtopics.length; i++) {
      for (let j = 0; j < subtopics[i].length; j++) {
        const checkbox = document.getElementById(`${i}-${j}`);
        if (checkbox && checkbox.checked) {
          if (i == 0) {
            topicList.push(subtopics[i][j]);
            topicList.push(...personalTherapySubtopics[j]);
          }
          else topicList.push(subtopics[i][j]);
        }
      }
    }

    // axios call to add to database
    axios.put('http://localhost:5173/profile/specialty', {
      uid: currentUser.uid,
      specialty: topicList
    })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });

    setSelectedTopics(topicList);
    setEditAbout(false);
  }



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

            {editAbout ? editTopics()
            : <p>{ selectedTopics.join(", ") || "No topics found. Please edit, and add topics of expertise."}</p> 
            }

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
                  <CheckCircleIcon onClick={() => { putBio(); handleCheckboxChange();}}>
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
