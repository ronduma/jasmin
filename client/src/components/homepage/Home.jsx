
import React from 'react';

import '../../App.css';
import ImageSlideshow from './ImageSlideShow.jsx';
import Box from '@mui/material/Box';
import TextSlideshow from  './TextSlideShow.jsx';

//importing images for each section of the slideshow
import image1 from '../../images/image1.jpg'
import image2 from '../../images/image2.jpg'
import image3 from '../../images/image3.jpg'
import image4 from '../../images/image4.jpg'

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
      caption: 'Obtain support during the times when you need it'
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
      {/* <HomeCard></HomeCard> */}
    </div>
  );
}

export default Home;
