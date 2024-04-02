import React from 'react';
import './styles.css';

import Grid from '@mui/material/Grid';

import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import StarIcon from '@mui/icons-material/Star';

// NOTE: these are for demo purposes, to be populated with backend eventually
const reviews = [
  { rating: 4.9, 
    review: "Virtual sessions fit seamlessly into my busy schedule. And kAI surprises me with its insights—it’s like having a pocket therapist. Results? Coping strategies that actually work. Grateful for Jasmin.", 
    date: "10.03.2024", 
    name: "David Rodriguez"},
  { rating: 4.9, 
    review: "Booking sessions on Jasmin is a breeze - no paperwork headaches! And kAI? It’s like a wise friend - always there, nudging me toward growth. Results? Reduced anxiety. Jasmin is my lifeline.", 
    date: "10.03.2024", 
    name: "Emma Thompson"},
  { rating: 4.9, 
    review: "Jasmin’s resources? A goldmine—articles, meditations, you name it. And kAI? It doesn’t judge - it’s my non-judgmental sounding board. Results? Self-compassion blooming. Jasmin is my compass", 
    date: "25.02.2024", 
    name: "Isabella Ngueyen"},
  { rating: 4.9, 
    review: "Jasmin respects my time - no waiting rooms! And kAI adapts to my moods - sometimes a cheerleader, other times a gentle guide. Results? My depression feels lighter. Jasmin is my safe harbor", 
    date: "21.02.2024", 
    name: "Sophia Patel"},
  { rating: 4.9, 
    review: "Navigating Jasmine feels intuitive—like it’s tailored just for me. And kAI? It’s a beacon of clarity in a sea of chaos. I’ve found peace of mind. Jasmine is my anchor in the storm.", 
    date: "14.01.2024", 
    name: "Lucas Martinez"},
  { rating: 4.9, 
    review: "Chat support? Lightning-fast on Jasmin. And kAI remembers my progress - it’s like having a digital confidante. Results? Reclaimed focus. Jasmin is my secret weapon.", 
    date: "14.01.2024", 
    name: "Michael Lee"},
];

const Reviews = () => {
  return (
    <div className="section green">
      <Grid 
        container 
        justifyContent="center"
        spacing={2}
        className="reviews-container"
      > 
        <Grid item xs={12} className="reviews-text">
          Our community reviews
          <span className="reviews-btns">
            <ArrowCircleLeftOutlinedIcon className="reviews-btn" style={{opacity:"50%"}}/>
            <ArrowCircleRightOutlinedIcon className="reviews-btn"/>
          </span>
        </Grid>
        <Grid container spacing={2}>
          {reviews.map((review, index) => (
            <Grid item xs={4} className="review-container">
              <div className="review-rating">
                {review.rating} <StarIcon/>
              </div>
              <div className="review-review">
                {review.review}
              </div>
              <div className="review-date">
                {review.date}
              </div>
              <div className="review-name">
                {review.name}
              </div>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </div>
  );
}

export default Reviews;