import React, {useContext, useState} from 'react';
import dayjs from 'dayjs';
import PropTypes from 'prop-types'

import {AuthContext} from '../../context/AuthContext';

// import './styles.css';

import axios from 'axios';
import {Typography}  from '@mui/material';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import CheckCircleIcon from '@mui/icons-material/CheckCircleOutlined';
import CancelRoundedIcon from '@mui/icons-material/CancelOutlined';
import EditIcon from '@mui/icons-material/Edit';
import FormControl from '@mui/material/FormControl';


import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

import Expertise from './Expertise';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Grid 
      item 
      hidden={value !== index}
    >
      {value === index && (
        <Box sx={{ p: 3}}>
          {children}
        </Box>
      )}
    </Grid>
  );
}

function TherapistBio({bio, specialty, price}) {
  const {currentUser} = useContext(AuthContext);
  const [editAbout, setEditAbout] = useState(false);
  const [currbio, setBio] = useState(bio);
  const [newBio, setNewBio] = useState(bio);
  if (bio = "") setBio(null);
  const [selectedTopics, setSelectedTopics] = useState(specialty);
  let [selectedDate, setSelectedDate] = useState(dayjs());
  const[selectedPrice, setSelectPrice] = useState(price);
  const[newPrice, setNewPrice] = useState(price);
  if (price = "") setSelectPrice("");

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
      uid:currentUser.uid,
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

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    console.log(value)
  };

  return (
    <Paper style={{padding: '2vh', height:'100%'}}>
      <Tabs value={value} onChange={handleChange} variant="fullWidth">
        <Tab label="Details" />
        <Tab label="Availability"  />
        <Tab label="Reviews" />
      </Tabs>

      <CustomTabPanel value={value} index={0}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: "space-between"}}>
          <div className='right-section-header'> 
            Expertise 
          </div>
          {editAbout ? "" : <IconButton onClick={() => setEditAbout(true)}><EditIcon /></IconButton>}
        </div>
        {editAbout ? <Expertise />
        : <p align="left">{"No topics found. Please edit, and add topics of expertise."}</p> 
        }
        <div className='right-section-header'> 
          About Me 
        </div>
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
        <div className='right-section-header'>Price</div>
        <FormControl fullWidth>
          <Select
            onChange = {event => setSelectPrice(event.target.value)}
            id ="therapist-price"
            value ={selectedPrice}
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
              <CheckCircleIcon onClick={() => { putBio(); handleCheckboxChange(); handlePriceChange();}}>
              </CheckCircleIcon>
            </IconButton>
            <IconButton>
              <CancelRoundedIcon onClick={ ()=> {setEditAbout(false); setBio(newBio); setSelectPrice(newPrice);}}></CancelRoundedIcon>
            </IconButton>
          </div>
        )}
      </CustomTabPanel>

      <CustomTabPanel value={value} index={1}>
        <div className="right-section-header">
          Upcoming Availability
        </div>
        <div>
          <div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateCalendar defaultValue={dayjs()} onChange={(newValue) => setSelectedDate(newValue)} />
            </LocalizationProvider>
          </div>
          <div>
            {selectedDate.$d.toString()}
          </div>
        </div>
      </CustomTabPanel>

      <CustomTabPanel value={value} index={2}>
        <div className='right-section-header'> Reviews </div>
      </CustomTabPanel>
    </Paper>
  );
}

export default TherapistBio;
