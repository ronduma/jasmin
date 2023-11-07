import '../App.css';
import Navbar from './Navbar';
import {Box} from '@mui/material';
function Profile() {
  return (
    <div className="Profile" >
      <Navbar />
      <Box
      sx = {{
        width: 700,
        height: 1000,
        borderRadius: 1,
        bgcolor: 'white',
      }}>

      </Box>
    </div>
  );
}

export default Profile;
