
import React, {useState, useEffect} from 'react';

import '../../App.css';

import Slider from './Slider'
import Stats from './Stats'
import Types from './Types'
import Reviews from './Reviews'
import Therapists from './Therapists'
import News from './News'
import Subscribe from './Subscribe'
// import Chat from '../chat/Chat'
import Loading from '../loading/Loading'

import Grid from '@mui/material/Grid';

function Home() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const delay = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(delay);
  }, []); 

  return (
    <div className="Home">
      {loading ? 
        <Loading />
        :
        <div>
          <Grid 
            container 
            justifyContent="center"
            style={{margin: '1vh 0 0 0'}}
          >
            <Slider/>
          </Grid>
          <Stats/>
          <Types/>
          <Reviews/>
          <Therapists/>
          <News/>
          <Subscribe/>
        </div>
      }
    </div>
  );
}

export default Home;
