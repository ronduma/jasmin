import React from 'react';
import './styles.css';

import Grid from '@mui/material/Grid';

// NOTE: these are for demo purposes, to be populated with backend eventually
const images = [
  { url: "/imgs/homepage/types/img1.jpg", text: "Embark on your individual healing journey with compassionate experts by your side.", label: "Personal therapy"},
  { url: "/imgs/homepage/types/img2.jpg", text: "Strengthen family bonds, resolve conflicts, and nurture well-being together.", label: "Family therapy"},
  { url: "/imgs/homepage/types/img3.jpg", text: "A safe haven for young hearts to express, heal, and thrive under expert care.", label: "Children therapy" }
];

const Stats = () => {
  return (
    <div className="section white">
      <Grid 
        container 
        justifyContent="center"
        spacing={2}
        className="types-container"
      > 
        <Grid item xs={12} className="types-text">
          Therapy helps make life more
          <br/>
          <span className="green-text">well balanced</span> and <span className="green-text">harmonious</span>
        </Grid>
        <Grid container spacing={2}>
          {images.map((image, index) => (
            <Grid key={index} item xs={4}>
              <div className="image-container">
                <img src={image.url} alt={`Image ${index + 1}`} className="types-image" />
                <div className="image-text">
                  {image.label}
                </div>
              </div>
              <div className="types-caption">
                {image.text}
              </div>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </div>
  );
}

export default Stats;