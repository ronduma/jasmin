import React from 'react';
import './styles.css';

import Grid from '@mui/material/Grid';

const Stats = () => {
  return (
    <div style={{
      display: 'flex', 
      justifyContent: 'center',
      padding: '10vh 15vw 10vh 15vw',
      fontSize: '3rem',
      color: 'white',
      backgroundColor: '#01382E'
    }}>
      <Grid 
        container 
        justifyContent="center"
        spacing={2}
        style={{
          textAlign:"center",
          width: 'fit-content'
        }}
      > 
        <Grid item xs={12}>
          Therapy helps make life more well balanced and harmonious
        </Grid>
        <Grid item xs={4}>
          <img
            src='/imgs/homepage/types/img1.jpg'          
          >
          </img>
          Personal therapy  
        </Grid>
        <Grid item xs={4}>
          <img
            src='/imgs/homepage/types/img2.jpg'          
          >
          </img>
          Family therapy
        </Grid>
        <Grid item xs={4}>
          <img
            src='/imgs/homepage/types/img3.jpg'          
          >
          </img>
          Children therapy
        </Grid>
      </Grid>
    </div>
  );
}

export default Stats;