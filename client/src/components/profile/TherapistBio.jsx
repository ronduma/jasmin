import React, {useContext, useState, useEffect} from 'react';
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
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import TherapistCalender from './TherapistCalender';

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

function TherapistBio({ bio, specialty, price, overallRating, reviews}) {
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
  const [currRating, setRating] = useState(overallRating);
  console.log(overallRating);
  const [currReviews, setReviews] = useState(reviews);
  useEffect(() => {
    const userReviews = async () => {
      try{
        console.log(currentUser);
        const response = await axios.get(`http://localhost:5173/reviews/${currentUser.uid}`);
        console.log(response.data);
      }
      catch(error){
        console.error(error);
      }
    };
    userReviews();
  });

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

  const handleSelectedTopics = (data) => {
    setSelectedTopics(data);
  }

  //checks ids and sees what is selected and stores that
  const handleCheckboxChange = async () => {
    // axios call to add to database
    axios.put('http://localhost:5173/profile/specialty', {
      uid: currentUser.uid,
      specialty: selectedTopics
    })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
    setEditAbout(false);
  }

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    console.log(value)
  };
  
  return (
    <div>
      <Grid 
        container 
        spacing={2}
      >
        <Grid item xs={12}>
          <Paper style={{padding: '2vh', height:'100%'}}>
            <Tabs value={value} onChange={handleChange} variant="fullWidth">
              <Tab label="Details" />
              <Tab label="Availability"  />
              <Tab label="Reviews" />
            </Tabs>

            <CustomTabPanel value={value} index={0}>
              <div 
                style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: "space-between"
                  }}
              >
                <div className='right-section-header'> 
                  Expertise 
                </div>
                {editAbout ? 
                  "" : 
                  <IconButton onClick={() => setEditAbout(true)}><EditIcon /></IconButton>}
              </div>
              <Expertise disabled={!editAbout} selected={handleSelectedTopics} display={specialty}/>
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
              <div>
                <Typography component="legend" style={{ marginBottom: '20px' }}>Overall Therapist Rating:</Typography>
                <Rating
                name="text-feedback"
                value ={currRating}
                readOnly
                precision={0.01}
                onChange = {(event, newValue) => {
                  setRating(newValue);
                }}
               />
               <Box>{currRating ? currRating : 0} Stars</Box>
              </div>
              <div style={{marginTop: '20px'}}>
              <Typography component="legend">List of Reviews:</Typography>
              {!currReviews ?(<div style={{marginTop: '50px'}}>Currently No Reviews</div>) : 
                (<Stack direction ='column' spacing={2}>
                  {currReviews && currReviews.map((item, index) => (
                    <Card variant='outlined' key={index}>
                      <Typography>Name: {item[0].reviewerName}</Typography>
                      <Typography>Title: {item[0].reviewTitle}</Typography>
                      <Typography>Rating: {item[0].rating}</Typography>
                      <Typography>Date: {item[0].reviewDate}</Typography>
                      <Typography>Review: {item[0].review}</Typography>
                    </Card>
                  ))}
                </Stack>)}
              </div>
            </CustomTabPanel>
          </Paper>
        </Grid>
    </Grid>
    </div>
  );
}

export default TherapistBio;
