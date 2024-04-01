import React from 'react';
import './styles.css';

import Grid from '@mui/material/Grid';

import { UsersRound } from 'lucide-react';
import WavingHandOutlinedIcon from '@mui/icons-material/WavingHandOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined';

const Stats = () => {
  return (
    <div className="section green">
      <Grid 
        container 
        justifyContent="center"
        spacing={2}
        className="stats-container"
      > 
        <Grid item xs={3}>
          <UsersRound className="stats-icon"/>
          <div>10K+</div>
          <div className="stats-desc">
            Clients began to work with therapist
          </div>
        </Grid>
        <Grid item xs={3}>
          <WavingHandOutlinedIcon className="stats-icon"/>
          <div>95%</div>
          <div className="stats-desc">
            Clients found their therapist
          </div>
        </Grid>
        <Grid item xs={3}>
          <AccessTimeOutlinedIcon className="stats-icon"/>
          <div>5 min</div>
          <div className="stats-desc">
            Average specialist search time
          </div>
        </Grid>
        <Grid item xs={3}>
          <VerifiedOutlinedIcon className="stats-icon"/>
          <div>100%</div>
          <div className="stats-desc">
            Privacy and respect for customers
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default Stats;