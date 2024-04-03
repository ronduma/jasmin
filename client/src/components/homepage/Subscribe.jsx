import React from 'react';
import './styles.css';

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
          Join our healing community. Subscribe today.
        </Grid>
        <Grid item xs={12} className="reviews-text">
          <TextField id="outlined-basic" label="Email" variant="outlined" className="reviews-input" />
          <ArrowCircleRightOutlinedIcon className="reviews-btn"/>
        </Grid>
        <Grid item xs={12} className="reviews-subtext">
          Subscribe for updates, news, events, and community resources.
        </Grid>
      </Grid>
    </div>
  );
}

export default Subscribe;