import React from 'react';

import Grid from '@mui/material/Grid';

import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import GitHubIcon from '@mui/icons-material/GitHub';
import Twitter from '@mui/icons-material/Twitter';

import IconButton from '@mui/material/IconButton';

const Footer = () => {
  return (
    <Grid 
      container
      style={{
        display: 'flex', 
        fontFamily:`"Nunito Sans", sans-serif`,
        backgroundColor: '#2C2C2C',
        padding: '4vh 0 2vh 0',
    }}>
      <Grid item xs={7} 
        style={{
          color:'white',
          fontSize:'1.5rem',
          textAlign:'left',
          display: 'flex', 
          justifyContent: 'center', 
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
      <Grid item xs={1} 
        style={{
          color:'lightgray',
          textAlign:'left',
          justifyContent: 'center',
          margin: '3rem 0 0 0'
          // padding: '0 10% 0 10%'
        }}
      >
        <div>
          <a href="/personal_matching" style = {{textDecoration:'none',color: 'inherit' , cursor: 'pointer'}}>
            Personal Therapy
          </a>
        </div>
        <div>
          <a href="/couple_matching" style = {{textDecoration:'none',color: 'inherit' , cursor: 'pointer'}}>
            Couples Therapy
          </a>
        </div>
        <div>
          <a href="/children_matching" style = {{textDecoration:'none',color: 'inherit' , cursor: 'pointer'}}>
            Children Therapy
          </a>
        </div>
        {/* <div>
          Kai
        </div>
        <div>
          Our Principles
        </div> */}
      </Grid>
      <Grid item xs={1} 
        style={{
          color:'lightgray',
          textAlign:'left',
          justifyContent: 'center',
          margin: '3rem 0 0 0'
          // padding: '0 00 10%'
        }}
      >
        {/* <div>
          Community
        </div>
        <div>
          About
        </div>
        <div>
          Contact
        </div> */}
        <div>
          <a href="/specialist" style = {{textDecoration:'none',color: 'inherit' , cursor: 'pointer'}}>
            Services
          </a>
        </div>
        <div>
          <a href="/privacy_policy" style = {{textDecoration:'none',color: 'inherit' , cursor: 'pointer'}}>Privacy Policy</a> 
        </div>
        <div>
          <a href="/terms_conditions" style={{ textDecoration: 'none', color: 'inherit', cursor: 'pointer' }}>Terms and Conditions</a>
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
        <IconButton 
          style={{margin: '0 1rem 0 1rem'}}
          aria-label="linkedin.com" 
          onClick={()=>window.open('https://www.linkedin.com/company/jasminhealth')}
          color="white"
        >  
          <FacebookOutlinedIcon/>
        </IconButton>
        <IconButton 
          style={{margin: '0 1rem 0 1rem'}}
          aria-label="linkedin.com" 
          onClick={()=>window.open('https://www.linkedin.com/company/jasminhealth')}
          color="white"
        >  
          <LinkedInIcon/>
        </IconButton>
        <IconButton 
          style={{margin: '0 1rem 0 1rem'}}
          aria-label="linkedin.com" 
          onClick={()=>window.open('https://www.linkedin.com/company/jasminhealth')}
          color="white"
        >  
          <TwitterIcon/>
        </IconButton>
        <IconButton 
          style={{margin: '0 1rem 0 1rem'}}
          aria-label="github.com" 
          onClick={()=>window.open('https://github.com/ronduma/jasmin')}
          color="white"
        >  
          <GitHubIcon/>
        </IconButton>
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