import React from 'react';

import '../../App.css';
import Box from '@mui/material/Box';

function Home() {
  return (
    <div className="Home" >
        <Box
          className="homeBanner"
          sx={{
            backgroundColor:"white",
            py:"15vh"
          }}
        >
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
    </div>
  );
}

export default Home;
