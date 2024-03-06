
import React from 'react';

import '../../App.css';
import ImageSlideshow from './ImageSlideShow.jsx';
import {Box, Button, Grid, Typography} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextSlideshow from  './TextSlideShow.jsx';

//importing images for each section of the slideshow
import image1 from '../../images/image1.jpg'
import image2 from '../../images/image2.jpg'
import image3 from '../../images/image3.jpg'
import image4 from '../../images/image4.jpg'
import { NavLink } from 'react-router-dom';

const theme = createTheme({
  palette: {
    guga: {
      light: '#68ac8f',
      main: '#439873',
      dark: '#2e6a50',
      contrastText: '#fff',
    },  
  },
});
const images = [
    {
      image: image1,
      caption: 'Receive help from certified professionals'

    }, 

    { 
      image: image2,
      caption: 'Have real-time conversations anytime, anywhere'
    },

    {
      image: image3,
      caption: 'Gain self-insight and experience personal development'
    },
    {
      image: image4,
      caption: 'Get your support during the times of need'
    }
];
const quotes = [
  'Bringing together patients and psychologists in a seamless way.',
  'Get the help you need with a click of a button.',
];
function Home() {
  return (
    <div className="Home">
      <Box
        className="homeBanner"
        display ="flex" 
        justifyContent = "center" 
        alignItems="center"
        sx={{
          backgroundColor:"white",
          py:"15vh"
        }}
      >
        <TextSlideshow texts = {quotes}></TextSlideshow>
      </Box>
      <Box
        sx={{
          mx:"2vw",
          my:"5vh"
        }}
        display="flex"
        justifyContent="center" // Center the cards horizontally
        alignItems="center"     // Center the cards vertically
        gap={16}                // Adjust the spacing between cards
      >
      </Box>
      <Box
        display ="flex" 
        justifyContent = "center" 
        alignItems="center"
        >
           <ImageSlideshow images={images} />
      </Box>
      <Box
      className="homeBanner"
      display ="flex" 
      justifyContent = "center" 
      alignItems="center"
      sx={{
        backgroundColor:"white",
        py:"15vh"
      }}>
        Find a psychologist who understands you
      </Box>
      <Box
      className="homeBanner"
      display ="flex" 
      justifyContent = "center" 
      alignItems="center"
      
      sx={{
        backgroundColor:"white",
      }}>
        <Grid container spacing={10} justifyContent="center">
          <Grid item>
            <ThemeProvider theme={theme}>
              <Button color='guga' 
              variant='contained' 
              component ={NavLink} to='/matching'
              style={{
                width: '250px',
                height: '60px'
              }}>Choose a therapist</Button>
            </ThemeProvider>
          </Grid>
          
          <Grid item>
              <ThemeProvider theme={theme}>
                <Button color="guga" 
                variant='contained' 
                component= {NavLink} to='/speciallist'
                style={{
                  width: '250px',
                  height: '60px'
                }}>All specialists</Button>
              </ThemeProvider>
          </Grid>
        </Grid>
      </Box>
      <p>   </p>
    </div>
  );
}

export default Home;
