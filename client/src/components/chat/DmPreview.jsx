import React, { useState } from "react";
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
  const truncatedText = props.message.length > 20 ? `${props.message.slice(0, 20)}...` : props.message;
  return (
    <Card sx={{ display: 'flex' }}>
      <CardActionArea sx={{ display: 'flex', alignItems: 'left' }}>
        <CardMedia
          component="img"
          sx={{ width: '5rem', height: '5rem'}}
          image="/imgs/kAI.png"
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
