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

function PatientBio() {

  const {currentUser} = useContext(AuthContext);
  const [editAbout, setEditAbout] = useState(false);
  const [editConcerns, setEditConcerns] = useState(false);

  const allowEditAbout = () => {
    setEditAbout(true);
  }
  const confirmEditAbout = () => {
    setEditAbout(false);
  }

  const allowEditConcerns = () => {
    editConcerns(true);
  }

  const putBio = () => {
    console.log("curentUser: ", currentUser);
    axios.put('http://localhost:5000/profile/bio', {
      uid: currentUser.uid,
      bio: document.getElementById('outlined-multiline-static').value
    })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
  }

  return (
    <div>
      <Grid 
        container 
        spacing={2}
        style={{textAlign:"left"}}
      >
        <Grid item xs={12}>
          <Paper style={{height: '18vh', padding: '2vh'}}>
            <div style={{alignItems: 'flex-start', display: 'flex', justifyContent: 'space-between'}}>
              <Typography variant='h5'>
                About Me
              </Typography>
              {editAbout ? "" : <IconButton onClick={allowEditAbout}><EditIcon /></IconButton>}
            </div>
            <TextField
              disabled={!editAbout}
              // ref={aboutRef}
              inputRef={input => input && input.focus()}
              fullWidth
              id="outlined-multiline-static"
              label="Tell us about yourself!"
              multiline
              style={{margin: '2vh 0 1vh 0'}}
              rows={3}
              inputProps={{
                maxLength:285
              }}
              InputProps={{
                endAdornment: (
                  <React.Fragment>
                    {editAbout && (
                      <div style={{ position: 'absolute', bottom: 0, right: 0 }}>
                        <IconButton onClick={confirmEditAbout}>
                          <CheckCircleIcon onClick={putBio}>
                          </CheckCircleIcon>
                        </IconButton>
                        <IconButton>
                          <CancelRoundedIcon></CancelRoundedIcon>
                        </IconButton>
                      </div>
                    )}
                  </React.Fragment>
                ),
              }}
            />
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper style={{height: '32vh', padding: '2vh'}}>
            <div style={{alignItems: 'flex-start', display: 'flex', justifyContent: 'space-between'}}>
              <Typography variant='h5'>
                Core Concerns
              </Typography>
              {editConcerns ? "" : <IconButton onClick={allowEditConcerns}><EditIcon /></IconButton>}
            </div>
            <TextField
              fullWidth
              id="outlined-multiline-static"
              label="Concern #1"
              style={{margin: '2vh 0 1vh 0'}}
              // onFocus={() => setFocused(true)}
              // onBlur={() => setFocused(false)}
              // inputProps={{
              //   maxLength:90
              // }}
              // InputProps={{
              //   endAdornment: (
              //     <React.Fragment>
              //       {isFocused && (
              //         <div style={{ position: 'absolute', bottom: 0, right: 0 }}>
              //           <IconButton>
              //             <CheckCircleIcon></CheckCircleIcon>
              //           </IconButton>
              //           <IconButton>
              //             <CancelRoundedIcon></CancelRoundedIcon>
              //           </IconButton>
              //         </div>
              //       )}
              //     </React.Fragment>
              //   ),
              // }}
            />
            <TextField
              fullWidth
              id="outlined-multiline-static"
              label="Concern #2"
              style={{margin: '2vh 0 1vh 0'}}
              // onFocus={() => setFocused(true)}
              // onBlur={() => setFocused(false)}
              // inputProps={{
              //   maxLength:80
              // }}
              // InputProps={{
              //   endAdornment: (
              //     <React.Fragment>
              //       {isFocused && (
              //         <div style={{ position: 'absolute', bottom: 0, right: 0 }}>
              //           <IconButton>
              //             <CheckCircleIcon></CheckCircleIcon>
              //           </IconButton>
              //           <IconButton>
              //             <CancelRoundedIcon></CancelRoundedIcon>
              //           </IconButton>
              //         </div>
              //       )}
              //     </React.Fragment>
              //   ),
              // }}
            />
            <TextField
              fullWidth
              id="outlined-multiline-static"
              label="Concern #3"
              style={{margin: '2vh 0 1vh 0'}}
              // onFocus={() => setFocused(true)}
              // onBlur={() => setFocused(false)}
              // inputProps={{
              //   maxLength:80
              // }}
              // InputProps={{
              //   endAdornment: (
              //     <React.Fragment>
              //       {isFocused && (
              //         <div style={{ position: 'absolute', bottom: 0, right: 0 }}>
              //           <IconButton>
              //             <CheckCircleIcon></CheckCircleIcon>
              //           </IconButton>
              //           <IconButton>
              //             <CancelRoundedIcon></CancelRoundedIcon>
              //           </IconButton>
              //         </div>
              //       )}
              //     </React.Fragment>
              //   ),
              // }}
            />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default PatientBio;
