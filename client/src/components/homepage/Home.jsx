
import React from 'react';

import '../../App.css';

import Slider from './Slider'
import Stats from './Stats'

import Grid from '@mui/material/Grid';

function Home() {
  return (
    <div className="Home">
      <Grid 
        container 
        justifyContent="center"
        style={{marginBottom: '20px'}}
      >
        <Slider/>
      </Grid>
      <Stats/>
      {/* <Types/>
      <Reviews/>
      <Therapists/>
      <News/>
      <Subscribe/> */}
    </div>
  );
}

export default Home;
