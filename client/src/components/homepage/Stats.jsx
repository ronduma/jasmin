import React from 'react';
import './styles.css';

import Grid from '@mui/material/Grid';

import { UsersRound } from 'lucide-react';
import WavingHandOutlinedIcon from '@mui/icons-material/WavingHandOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined';

const Stats = () => {
  return (
    <div style={{display: 'flex', justifyContent: 'center'}}>
      <Grid 
        container 
        justifyContent="center"
        spacing={2}
        style={{width: 'fit-content'}}
        color="green"
      > 
        <Grid item xs={3} color="green">
          <UsersRound/>
          <div>10K+</div>
          <div>
            Clients began to work with therapist
          </div>
        </Grid>
        <Grid item xs={3}>
          <WavingHandOutlinedIcon/>
          <div>95%</div>
          <div>Clients found their therapist</div>
        </Grid>
        <Grid item xs={3}>
          <AccessTimeOutlinedIcon/>
          <div>5 min</div>
          <div>Average specialist search time</div>
        </Grid>
        <Grid item xs={3}>
          <VerifiedOutlinedIcon/>
          <div>100%</div>
          <div>Privacy and respect for customers</div>
        </Grid>
      </Grid>
    </div>
  );
}

export default Stats;