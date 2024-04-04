import React from 'react';
// import './styles.css';

import Grid from '@mui/material/Grid';

import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import GitHubIcon from '@mui/icons-material/GitHub';
import Twitter from '@mui/icons-material/Twitter';

const Footer = () => {
  return (
    <Grid 
      container
      style={{
        display: 'flex', 
        fontFamily:`"Nunito Sans", sans-serif`,
        backgroundColor: '#2C2C2C',
        padding: '5vh 0 5vh 0',
    }}>
      <Grid item xs={6} 
        style={{
          color:'white',
          fontSize:'1.5rem',
          textAlign:'left',
          display: 'flex', // Add this line
          justifyContent: 'center', // Add this line
          padding: '2.5% 3% 0 15%'
        }}
      >
        <div>
          At Jasmin, we blend 
          <span style={{color:'#32C58B', fontFamily:`"Libre Baskerville", serif`}}> cutting-edge AI intelligence </span>
          with unwavering empathy, creating a sanctuary where 
          <span style={{color:'#32C58B', fontFamily:`"Libre Baskerville", serif`}}> healing is personalized</span>, 
          holistic, and guided by genuine care.
        </div>
      </Grid>
      <Grid item xs={6} 
        style={{
          color:'lightgray',
          textAlign:'left',
          // display: 'flex', // Add this line
          justifyContent: 'center', // Add this line
          padding: '0 15% 0 10%'
        }}
      >
        <div>
          Services
        </div>
        <div>
          Family Therapy
        </div>
        <div>
          Couples Therapy
        </div>
        <div>
          Children Therapy
        </div>
        <div>
          Kai
        </div>
        <div>
          Our Principles
        </div>
        <div>
          Community
        </div>
        <div>
          About
        </div>
        <div>
          Contact
        </div>
        <div>
        <a href="/privacy_policy" style = {{textDecoration:'none',color: 'inherit' , cursor: 'pointer'}}>Privacy Policy</a> 
        </div>
        <div>
          Terms and Conditions
        </div>
      </Grid>
      <Grid 
        item xs={12}
        style={{
          padding: '5vh 0 0 0'
        }}
      >
        <img
          src='/imgs/logo_white.png'
          style={{
            height: "5vh",
            width: "auto"
          }}
        />
      </Grid>
      <Grid 
        item xs={12}
        style={{
          color: 'white',
          padding: '2.5vh 0 0 0'
        }}
      >
        <FacebookOutlinedIcon style={{margin: '0 1rem 0 1rem'}}/>
        <LinkedInIcon style={{margin: '0 1rem 0 1rem'}}/>
        <TwitterIcon style={{margin: '0 1rem 0 1rem'}}/>
        <GitHubIcon style={{margin: '0 1rem 0 1rem'}}/>
      </Grid>
      <Grid 
        item xs={12}
        style={{
          color: 'white',
          padding: '2.5vh 0 0 0'
        }}
      >
        © 2024 Jasmin
      </Grid>
    </Grid>
  );
}

export default Footer;