import React, {useContext, useRef, useState} from 'react';
import {redirect, useLocation, useNavigate, Navigate} from 'react-router-dom';
import {AuthContext} from '../../context/AuthContext';
import {doCreateUserWithEmailAndPassword} from '../../firebase/FirebaseFunctions';

import axios from 'axios';

import '../../App.css';


import CheckCircleIcon from '@mui/icons-material/CheckCircleOutlined';
import CancelRoundedIcon from '@mui/icons-material/CancelOutlined';
import EditIcon from '@mui/icons-material/Edit';

import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

function PatientBio({bio, concerns}) {

  const {currentUser} = useContext(AuthContext);
  const [editAbout, setEditAbout] = useState(false);
  const [editConcerns, setEditConcerns] = useState(false);
  const [currbio, setBio] = useState(bio);
  const [currConcerns, setConcerns] = useState([
    concerns[0] || null,
    concerns[1] || null,
    concerns[2] || null,
  ]);

  const setConcernsHelper = (concerns) => {
    setConcerns([
      concerns[0] || null,
      concerns[1] || null,
      concerns[2] || null,
    ]);
  }
  const allowEditAbout = () => {
    setEditAbout(true);
  }
  const allowEditConcerns = () => {
    setEditConcerns(true);
  }

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

  const putConcerns = () => {
    // console.log("curentUser: ", currentUser);
    console.log("concerns: ", currConcerns);
    axios.put('http://localhost:5173/profile/concerns', {
      uid: currentUser.uid,
      concerns: currConcerns
    })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
    setEditConcerns(false);
  }

  return (
    <div>
      <Grid 
        container 
        spacing={2}
        style={{textAlign:"left"}}
      >
        <Grid item xs={12} 
        >
          <Paper style={{height: '175px', padding: '2vh', position:"relative"}}>
            <div style={{alignItems: 'flex-start', display: 'flex', justifyContent: 'space-between'}}>
              <Typography variant='h5'>
                About Me
              </Typography>
              {editAbout ? "" : <IconButton onClick={allowEditAbout}><EditIcon /></IconButton>}
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
            {editAbout && (
              <div style={{ position: 'absolute', bottom: 0, right: 0 }}>
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
          <Paper style={{height: '325px', padding: '2vh', position: "relative"}}>
            <div style={{alignItems: 'flex-start', display: 'flex', justifyContent: 'space-between'}}>
              <Typography variant='h5'>
                Core Concerns
              </Typography>
              {editConcerns ? "" : <IconButton onClick={allowEditConcerns}><EditIcon /></IconButton>}
            </div>
            <TextField
              disabled={!editConcerns}
              fullWidth
              id="textbox-concern-one"
              label="Concern #1"
              value = {currConcerns[0] || ""}
              onChange={event => setConcerns([event.target.value, currConcerns[1], currConcerns[2]])}
              InputLabelProps={{
                shrink: currConcerns[0] || editConcerns ? true : false,
              }}
              style={{margin: '2vh 0 1vh 0'}}
              inputProps={{
                maxLength:90
              }}
            />
            <TextField
              disabled={!editConcerns}
              fullWidth
              id="textbox-concern-two"
              label="Concern #2"
              value={currConcerns[1] || ""}
              onChange={event => setConcerns([currConcerns[0], event.target.value, currConcerns[2]])}
              InputLabelProps={{
                shrink: currConcerns[1] || editConcerns ? true : false,
              }}
              style={{margin: '2vh 0 1vh 0'}}
              inputProps={{
                maxLength:90
              }}
            />
            <TextField
              disabled={!editConcerns}
              fullWidth
              id="textbox-concern-three"
              label="Concern #3"
              value={currConcerns[2] || ""}
              onChange={event => setConcerns([currConcerns[0], currConcerns[1], event.target.value])}
              InputLabelProps={{
                shrink: currConcerns[2] || editConcerns ? true : false,
              }}
              style={{margin: '2vh 0 1vh 0'}}
              inputProps={{
                maxLength:90
              }}
            />
            {editConcerns && (
              <div style={{ position: 'absolute', bottom: 0, right: 0 }}>
                <IconButton>
                  <CheckCircleIcon onClick={putConcerns}>
                  </CheckCircleIcon>
                </IconButton>
                <IconButton>
                  <CancelRoundedIcon onClick={ ()=> {setEditConcerns(false); setConcernsHelper(concerns)}}></CancelRoundedIcon>
                </IconButton>
              </div>
            )}
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default PatientBio;
