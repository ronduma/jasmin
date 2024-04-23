import React, {useEffect, useRef, useState} from 'react';
import "./dm.css";

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

import Loading from "../loading/Loading";

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SendIcon from '@mui/icons-material/Send';

import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';

const StyledPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  maxWidth: 400,
  color: theme.palette.text.primary,
}));

function Message(props) {
  const [pfp, setPfp] = useState(props.pfp)
  
  return (
    <StyledPaper
        sx={{
          my: 1,
          mx: 'auto',
          p: 2,
        }}
      >
        <Grid container wrap="nowrap" spacing={2}>
          <Grid item>
            <Avatar src={pfp}/>
          </Grid>
          <Grid item xs>
            <Typography style={{fontWeight:800}}>{props.sender}: </Typography>
            <Typography>{props.message}</Typography>
          </Grid>
        </Grid>
      </StyledPaper>
  );
}

export default Message;
