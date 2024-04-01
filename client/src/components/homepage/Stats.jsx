import React from 'react';
import './styles.css';

import Grid from '@mui/material/Grid';

import { UsersRound } from 'lucide-react';
import WavingHandOutlinedIcon from '@mui/icons-material/WavingHandOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined';

const Stats = () => {
  return (
    <div style={{
      display: 'flex', 
      justifyContent: 'center',
      padding: '10vh 15vw 10vh 15vw',
      fontSize: '3rem',
      color: '#005241'
    }}>
      <Grid 
        container 
        justifyContent="center"
        spacing={2}
        style={{
          textAlign:"left",
          width: 'fit-content'
        }}
      > 
        <Grid item xs={3}>
          <UsersRound style={{height:"2.5rem", width:"auto"}}/>
          <div>10K+</div>
          <div style={{fontSize:'1.5rem'}}>
            Clients began to work with therapist
          </div>
        </Grid>
        <Grid item xs={3}>
          <WavingHandOutlinedIcon style={{height:"2.5rem", width:"auto"}}/>
          <div>95%</div>
          <div style={{fontSize:'1.5rem'}}>Clients found their therapist</div>
        </Grid>
        <Grid item xs={3}>
          <AccessTimeOutlinedIcon style={{height:"2.5rem", width:"auto"}}/>
          <div>5 min</div>
          <div style={{fontSize:'1.5rem'}}>Average specialist search time</div>
        </Grid>
        <Grid item xs={3}>
          <VerifiedOutlinedIcon style={{height:"2.5rem", width:"auto"}}/>
          <div>100%</div>
          <div style={{fontSize:'1.5rem'}}>Privacy and respect for customers</div>
        </Grid>
      </Grid>
    </div>
  );
}

export default Stats;