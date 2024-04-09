import React, { useState } from "react";
import "./chat.css";

import Grid from '@mui/material/Grid';

const Dm = (props) => {
  const truncatedText = props.message.length > 20 ? `${props.message.slice(0, 20)}...` : props.message;
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
      <Grid item xs={6}>
        {props.from}
      </Grid>
      <Grid item xs={4}>
        {props.timestamp}
      </Grid>
      <Grid item xs={12}>
        {truncatedText}
      </Grid>
    </Grid>
  );
};

export default Dm;
