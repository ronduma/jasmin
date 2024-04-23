import React, {useEffect, useRef, useState} from 'react';
import "./dm.css";

import dayjs from 'dayjs';

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
  // padding: theme.spacing(2),
  maxWidth: 400,
  color: theme.palette.text.primary,
  boxShadow: 'none',
  padding:0
}));

function Message(props) {
  const [pfp, setPfp] = useState(props.pfp)
  const parsedDate = dayjs(props.timestamp, "MM-DD-YYYY HH:mm:ss");
  const formatted = parsedDate.format('MM/DD/YY hh:mm A');
  return (
    <StyledPaper
        sx={{
          // my: 1,
          mx: 'auto',
          p: 2,
        }}
        className="message-container"
      >
        <Grid container wrap="nowrap">
          {/* <Grid item>
            <Avatar src={pfp}/>
          </Grid> */}
          <Grid item xs>
            <Typography style={{fontWeight:800}}>{props.sender} </Typography>
            <Typography>{formatted}</Typography>
            <Typography>{props.message}</Typography>
          </Grid>
        </Grid>
        <hr></hr>
      </StyledPaper>
  );
}

export default Message;
