import '../App.css';
import Navbar from '../components/Navbar';

import Box from '@mui/material/Box';

function Home() {
  return (
    <div className="Home" >
      <Navbar />
      <Box
        className="homeBanner"
        sx={{
          backgroundColor:"white",
          py:"15vh"
        }}
      >
        Bringing together patients and psychologists in a seamless way.
      </Box>
    </div>
  );
}

export default Home;
