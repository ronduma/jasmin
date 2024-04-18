import React, { useContext, useState } from 'react';
import dayjs from 'dayjs';

import { AuthContext } from '../../context/AuthContext';

import '../../App.css';

import axios from 'axios';
import { Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import CheckCircleIcon from '@mui/icons-material/CheckCircleOutlined';
import CancelRoundedIcon from '@mui/icons-material/CancelOutlined';
import EditIcon from '@mui/icons-material/Edit';
import FormGroup from '@mui/material/FormGroup';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import Tooltip from '@mui/material/Tooltip';
// import Button from '@mui/material';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import TherapistCalender from './TherapistCalender';

function TherapistBio({ bio, specialty, price }) {
  const { currentUser } = useContext(AuthContext);
  const [editAbout, setEditAbout] = useState(false);
  const [currbio, setBio] = useState(bio);
  const [newBio, setNewBio] = useState(bio);
  if (bio = "") setBio(null);
  const [selectedTopics, setSelectedTopics] = useState(specialty);
  let [selectedDate, setSelectedDate] = useState(dayjs());
  const [selectedPrice, setSelectPrice] = useState(price);
  const [newPrice, setNewPrice] = useState(price);
  if (price = "") setSelectPrice("");
  const [subtopics, setSubTopics] = useState([
    ["Relationship with Yourself", "Relationship with Others", "Personal and Professional development", "New Living Conditions"],
    ["Difficulty in communication, crisis", "Intimate Relations", "Breakup", "Emotional abuse, abusive behavior",
      "Child-rearing practices", "Betrayal"], ["ADHD (Attention Deficit Hyperactivity Disorder)", "Excessive Aggression",
      "Children with Special Needs", "Loss of Loved Ones", "Adaptation", "Bullying"], ["Gestalt", "Existential",
      "Client-centered therapy", "CBT (Cognitive Behavioral Therapy)", "Positive psychotherapy", "Psychoanalysis",
      "Schema therapy", "Transactional Analysis"], ["Clinical Psychologist", "Psychiatrist", "Psychologist",
      "Consulting psychologist", "Psychotherapist", "Sexologist", "Coach", "Transactional Analysis"]]);

  const [topicHeaders, setTopicHeaders] = useState(["Personal Therapy Topics", "Couple Therapy", "Children Therapy",
    "Therapeutic Approaches", "Types of Professionals in Mental Health"]);

  const [personalTherapySubtopics, setPersonalTherapySubtopics] = useState([
    ["Fatigue", "Depression", "Irritability", "Anxiety", "Panic attacks", "Self-esteem",
      "Loneliness", "Chemical", "Suicide attempts", "Psychosomatics", "Bipolar disorder",
      "Food attitude", "Obsessive thoughts and rituals", "Borderline personality disorder"],
    ["Romantic relationship", "Relationship issues", "Sexual relations", "Codependency"],
    ["Self-determination, job search", "Burnout", "Procrastination", "Attitude towards money"],
    ["Childbirth", "Adaptation, emigration", "Grief", "Disease diagnosis", "PTSD"]
  ]);

  const putBio = async () => {
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
    setNewBio(document.getElementById('textbox-bio').value);
    setEditAbout(false);
  }
  const handlePriceChange = async () => {
    axios.put('http://localhost:5173/profile/price', {
      uid: currentUser.uid,
      price: selectedPrice
    })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    setNewPrice(selectedPrice);
    setEditAbout(false);
  }
  const editTopics = () => {
    return (
      subtopics.map((topicList, index) => (
        <>
          <Typography fontSize={18} align='left'> {topicHeaders[index] + ": "} </Typography>
          <FormGroup row style={{ marginLeft: "20px" }}>
            {topicList.map((currtopic, i) => (
              <FormControlLabel id={"Form-Control " + index}
                control={<Checkbox id={`${index}-${i}`} defaultChecked={selectedTopics.includes(currtopic)} />}
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
  const handleCheckboxChange = async () => {
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
      // style={{textAlign:"left"}}
      >
        <Grid item xs={12}>
          <Paper style={{ minHeight: '18vh', padding: '2vh' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: "space-between" }}>
              <div className='right-section-header' > Expertise </div>
              {editAbout ? "" : <IconButton onClick={() => setEditAbout(true)}><EditIcon /></IconButton>}
            </div>

            {editAbout ? editTopics()
              : <p align="left">{selectedTopics.join(", ") || "No topics found. Please edit, and add topics of expertise."}</p>
            }
            <div className='right-section-header'> About Me </div>
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
              style={{ margin: '2vh 0 1vh 0' }}
              rows={3}
              inputProps={{
                maxLength: 285
              }}
            />
            <div className='right-section-header'>Price</div>
            <FormControl fullWidth>
              <Select
                onChange={event => setSelectPrice(event.target.value)}
                id="therapist-price"
                value={selectedPrice}
                disabled={!editAbout}
                InputLabelProps={{
                  shrink: selectedPrice || editAbout ? true : false,
                }}
              >
                <MenuItem value=""><em>Free</em></MenuItem>
                <MenuItem value="Low">$ - Low</MenuItem>
                <MenuItem value="Medium">$$ - Medium</MenuItem>
                <MenuItem value="High">$$$ - High</MenuItem>
              </Select>
            </FormControl>

            {editAbout && (
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <IconButton>
                  <CheckCircleIcon onClick={() => { putBio(); handleCheckboxChange(); handlePriceChange(); }}>
                  </CheckCircleIcon>
                </IconButton>
                <IconButton>
                  <CancelRoundedIcon onClick={() => { setEditAbout(false); setBio(newBio); setSelectPrice(newPrice); }}></CancelRoundedIcon>
                </IconButton>
              </div>
            )}
          </Paper>
        </Grid>

        {/* <Grid item xs={12}>
          <Paper style={{minHeight: '40vh', padding: '2vh'}}>
            <div className="right-section-header">
              Upcoming Availability
            </div>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateCalendar defaultValue={dayjs()} onChange={(newValue) => setSelectedDate(newValue)} />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={6} style={{ display: 'flex', alignItems: 'flex-start' }}>
                {selectedDate.$d.toString()}
              </Grid>
            </Grid>
          </Paper>
        </Grid> */}
        <Grid item xs={12}>
          <TherapistCalender></TherapistCalender>
        </Grid>

        <Grid item xs={12}>
          <Paper style={{ minHeight: '18vh', padding: '2vh' }}>
            <div className='right-section-header'> Reviews </div>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default TherapistBio;
