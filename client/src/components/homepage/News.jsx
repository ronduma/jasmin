import React from 'react';
import './styles.css';

import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import Grid from '@mui/material/Grid';

// NOTE: these are for demo purposes, to be populated with backend eventually
const news = [
  { url: "/imgs/homepage/news/img1.png", 
    title: "Psychedelic therapies for veterans with PTSD", 
    caption: "Advocating for access to innovative mental health tools", 
    label: "Family therapy"},
  { url: "/imgs/homepage/news/img2.png", 
  title: "Healing from child sexual abuse: a journey of resilience", 
  caption: "Insights into overcoming trauma through therapy and social support", 
  label: "Children therapy"},
  { url: "/imgs/homepage/news/img3.png", 
  title: "Film therapy: how movies impact mental health", 
  caption: "Exploring the therapeutic potential of cinema", 
  label: "Personal therapy"}
];

const News = () => {
  return (
    <div className="section green news-section">
      <Grid 
        container 
        justifyContent="center"
        spacing={2}
        className="types-container"
      > 
        <Grid item xs={12} className="reviews-text">
          Latest news
        </Grid>
        <Grid 
          container 
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={2}
        >
          {news.map((article, index) => (
            <Grid key={index} item xs={4}>
              <Card style={{height:"100%", padding:"2rem"}}>
                <CardActionArea >
                  <div className="image-container">
                    <img src={article.url} alt={`Image ${index + 1}`} className="types-image" />
                  </div>
                  <div className="detail-container"> 
                    <div className="news-label">
                      {article.label}
                    </div>
                    <div className="news-title">
                      {article.title}
                    </div>
                    <div className="types-caption">
                      {article.caption}
                    </div>
                  </div>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
        <div className="news-button">
          See all
        </div>
      </Grid>
    </div>
  );
}

export default News;