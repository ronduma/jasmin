
import React from 'react';

import '../../App.css';
import ImageSlideshow from './ImageSlideShow.jsx';
import Box from '@mui/material/Box';
import TextSlideshow from  './TextSlideShow.jsx';
import Chat from './Chat.jsx';
import ImageSlider from './ImageSlider.jsx';

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
      caption: 'Get your support during the times of need'
    }
];

const slides = [image1, image2, image3, image4];
const quotes = [
  'Bringing together patients and psychologists in a seamless way.',
  'Get the help you need with a click of a button.',
];
function Home() {
  const windowWidth = window.innerWidth;
  const windowHeight = windowWidth * 1/3;
  return (
    <div className="Home">


      <Box
        className="homeBanner"
        display ="flex" 
        justifyContent = "center" 
        alignItems="center"
        sx={{
          backgroundColor:"white",
          py:"4vh"
        }}
      >
        <TextSlideshow texts = {quotes}></TextSlideshow>
      </Box>
      <Box
        sx={{
          mx:"10vw",
          my:"0"
        }}
        display="flex"
        justifyContent="center" // Center the cards horizontally
        alignItems="center"     // Center the cards vertically
        gap={16}                // Adjust the spacing between cards
      >
      </Box>


      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        position="fixed"
        bottom={20}
        right={20}
        zIndex={999} 
      >

        {/* Positioning the Chat component */}
        <Chat />
      </Box>



      {/* <Box
        display ="flex" 
        justifyContent = "center" 
        alignItems="center"
        padding={6}
        >
           <ImageSlideshow images={images} />
        </Box> */}
      <div>
        <div style={{maxWidth: windowWidth, margin: "25px 5%", height: windowHeight}}>
          <ImageSlider slides={slides} parentWidth={windowWidth} />
        </div>
      </div>
      {/* <HomeCard></HomeCard> */}
    </div>
  );
}

export default Home;
