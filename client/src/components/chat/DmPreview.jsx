import React, { useState, useEffect } from "react";
import "./chat.css";

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { CardActionArea } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

const DmPreview = (props) => {
  const sendMessageToParent = () => {
    // Invoke the callback function passed from the parent with data
    props.onMessage({ isChatting: true, id: props.id, pfp: props.pfp });
  };

  const truncatedText = props.message.length > 20 ? `${props.message.slice(0, 20)}...` : props.message;

  return (
    <Card 
      sx={{ 
        display: 'flex', 
        // margin: "1rem 0 0 0"
      }}
    >
      <CardActionArea 
        onClick={sendMessageToParent}
        sx={{ 
          display: 'flex', 
          alignItems: 'flex-start', 
          justifyContent: 'flex-start', 
          width: '100%'
        }}
      >
        <CardMedia
          component="img"
          sx={{ width: '5rem', height: '5rem'}}
          image={props.from == "kAI" ? '/imgs/logo_flower.png' : `data:image/png;base64,${props.pfp}`}
        />
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <CardContent sx={{ flex: '1 0 auto' }}>
            <div>{props.from}</div>
            <div>{props.timestamp}</div>
          </CardContent>
          <Box sx={{ display: 'flex', alignItems: 'left', pl: 1, pb: 1 }}>
            <div>{truncatedText}</div>
          </Box>
        </Box>
      </CardActionArea>
    </Card>
  );
};

export default DmPreview;
