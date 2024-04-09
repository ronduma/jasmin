import React, { useState } from "react";
import "./chat.css";

import Grid from '@mui/material/Grid';

const Dm = () => {
  
  return (
    <Grid 
      container 
      justifyContent="left"
      style={{margin: '1vh 0 0 0'}}
      className="dm-container"
    >
      <Grid item xs={2}>
        Pfp
      </Grid>
      <Grid item xs={8}>
        Name
      </Grid>
      <Grid item xs={2}>
        Time
      </Grid>
      <Grid item xs={12}>
        Message
      </Grid>
    </Grid>
  );
};

export default Dm;
