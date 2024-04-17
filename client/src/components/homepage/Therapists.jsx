import React from 'react';
import './styles.css';

import Grid from '@mui/material/Grid';

import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import StarIcon from '@mui/icons-material/Star';

// NOTE: these are for demo purposes, to be populated with backend eventually
const therapists = [
  { url: "/imgs/homepage/therapists/img1.png",
    first_name: "Olena Shevchenko",
    last_name: "",
    details: ["Personal therapy", "Family therapy", "10+ years"]
  },
  { url: "/imgs/homepage/therapists/img2.png",
    first_name: "Hiroshi",
    last_name: "Tanaka",
    details: ["Personal therapy", "Teen therapy", "15 years"]
  },
  { url: "/imgs/homepage/therapists/img3.png",
    first_name: "Li",
    last_name: "Na-Wang",
    details: ["Personal therapy", "Teen therapy", "5 years"]
  },
  { url: "/imgs/homepage/therapists/img4.png",
    first_name: "Marie",
    last_name: "Dupont",
    details: ["Personal therapy", "Family therapy", "5 years"]
  },
  { url: "/imgs/homepage/therapists/img5.png",
    first_name: "José García",
    last_name: "López",
    details: ["Personal therapy", "Family therapy", "10+ years"]
  }
];

const Reviews = () => {
  return (
    <div className="section white">
      <Grid 
        container 
        justifyContent="center"
        spacing={2}
        className="reviews-container"
      > 
        <Grid item xs={12} className="therapists-text">
          Therapists with the <span className="green-text">highest</span> rating
        </Grid>
        <Grid container spacing={2} className="therapists-container" justifyContent="center">
          {therapists.map((therapist, index) => (
            <Grid key={index} item xs={2}>
              <div className="image-container">
                <img src={therapist.url} alt={`Image ${index + 1}`} className="therapists-image" />
              </div>
              <div className="therapist-name">
                {therapist.first_name}
              </div>
              <div className="therapist-name">
                {therapist.last_name}
              </div>
              <div className="detail-container">
                {therapist.details.map((detail) => (
                  <div className="therapist-detail">{detail}</div>
                ))}
              </div>
            </Grid>
          ))}
        </Grid>
        <div className="therapists-button">
          <a href='/speciallist'className='anchor-tag'>
          Choose your specialist
          </a>
        </div>
      </Grid>
    </div>
  );
}

export default Reviews;