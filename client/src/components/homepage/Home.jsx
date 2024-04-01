
import React from 'react';

import '../../App.css';

import Slider from './Slider'
import Stats from './Stats'
import Types from './Types'

import Grid from '@mui/material/Grid';

function Home() {
  return (
    <div className="Home">
      <Grid 
        container 
        justifyContent="center"
        style={{margin: '1vh 0 0 0'}}
      >
        <Slider/>
      </Grid>
      <Stats/>
      <Types/>
      {/* <Reviews/>
      <Therapists/>
      <News/>
      <Subscribe/> */}
    </div>
  );
}

export default Home;
