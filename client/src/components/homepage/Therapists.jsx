import React from 'react';
import './styles.css';

import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import StarIcon from '@mui/icons-material/Star';

// NOTE: these are for demo purposes, to be populated with backend eventually
const therapists = [
  { url: "/imgs/homepage/therapists/img1.png",
    id: "voWEWkQP5ueby8os2GzZOXZynLz1",
    first_name: "Colleen",
    last_name: "Que",
    details: ["Personal therapy", "Family therapy", "10+ years"]
  },
  { url: "/imgs/homepage/therapists/img2.png",
    id: "v7AB7BMoLQg5AEbncJWthZqnps43",
    first_name: "Fenella",
    last_name: "LaChica",
    details: ["Personal therapy", "Teen therapy", "15 years"]
  },
  { url: "/imgs/homepage/therapists/img3.png",
    id: "XpKUF6UmLXVmXAVEOfct0olsUKn2",
    first_name: "Dr.Bishawjit",
    last_name: "Saha",
    details: ["Personal therapy", "Teen therapy", "5 years"]
  },
  { url: "/imgs/homepage/therapists/img4.png",
    id: "YgDUKFb5HEdgVVLzvAggO6Am5BG2",
    first_name: "Jae",
    last_name: "Jang",
    details: ["Personal therapy", "Family therapy", "5 years"]
  },
  { url: "/imgs/homepage/therapists/img5.png",
    id: "4C1RppNb95NWtK8mUBHDIS1BFtP2",
    first_name: "Ron",
    last_name: "Dumalagan",
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
              <a className = 'anchor-tag' href={`/matching/${therapist.id}`}>
                <div className="image-container">
                  <img src={therapist.url} alt={`Image ${index + 1}`} className="therapists-image"/>
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
              </a>
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