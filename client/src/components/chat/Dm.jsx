import React, { useState } from "react";
import "./chat.css";

import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';

const Dm = (props) => {
  return (
    <Grid 
      container 
      justifyContent="left"
      style={{margin: '1vh 0 0 0'}}
      className="dm-container"
    >
      <Grid item xs={12}>
        <TextField id="outlined-basic" label="Outlined" variant="outlined" />
      </Grid>
    </Grid>
  );
};

export default Dm;
