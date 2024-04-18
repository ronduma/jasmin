import React from 'react';
import './loading.css'; // Import CSS for styling

import { Grid } from "@mui/material";

const Loading = () => {
  return (
    <Grid
      container
      justifyContent="center"
      className="loading-icon-container"
    >
      <Grid item xs={12}>
        <img src="/imgs/logo_flower.png" className="loading-icon" alt="Icon" />
      </Grid>
    </Grid>
  );
};

export default Loading;