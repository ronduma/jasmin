import React from 'react';
import './styles.css';

import { NavLink } from 'react-router-dom';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';

import { UsersRound } from 'lucide-react';
import TextField from '@mui/material/TextField';

const Subscribe = () => {
  return (
    <div className="section green">
      <Grid 
        container 
        justifyContent="center"
        spacing={2}
        className="stats-container"
      > 
        <Grid item xs={12} className="reviews-text">
          Join our healing community. Register today.
        </Grid>
        <Grid 
          item 
          xs={12} 
          className="reviews-text" 
        >
          <TextField id="outlined-basic" label="Email" variant="outlined" className="reviews-input" />
          <Button component={NavLink} to='/register' color='green'
            style={{padding:"0 0 1.5rem 0"}}
          >
            <ArrowCircleRightOutlinedIcon className="reviews-btn"/>
          </Button>
        </Grid>
        <Grid item xs={12} className="reviews-subtext">
          Register for updates, news, events, and community resources.
        </Grid>
      </Grid>
    </div>
  );
}

export default Subscribe;