import React, {useEffect, useRef, useState} from 'react';
import "./dm.css";

import dayjs from 'dayjs';
import axios from 'axios';

import { TypeAnimation } from 'react-type-animation';

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
  const [doneTyping, setDoneTyping] = useState(false);

  const parsedDate = dayjs(props.timestamp, "MM-DD-YYYY HH:mm:ss");
  const formatted = parsedDate.format('MM/DD/YY hh:mm A');

  const kaiDone = async () => {
    try {
      console.log("ello")
      const response = await axios.put(`http://localhost:5173/chats/kai-message/done-typing/${props.chatId}}`, {timestamp: props.timestamp});
      console.log(response)
    } catch (e) {
      console.log(e)
    }
    console.log("DONE")
  }

  useEffect(() => {
    if (doneTyping){
      kaiDone()
    }
  }, [doneTyping]); 

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
            <Typography style={{fontWeight:800}}>{props.sender.name} </Typography>
            <Typography>{formatted}</Typography>
            {
              props.sender.name == "kAI" ? 
                props.sender.doneTyping ? 
                <Typography>{props.message}</Typography>
                :
                <Typography>
                  <TypeAnimation
                  cursor={false}
                  sequence={[ 
                    props.message,
                    () => {
                      setDoneTyping(true);
                    }
                  ]}
                  wrapper="span"
                  repeat={0}
                  speed={55}
                />
                </Typography>
            :
              <Typography>{props.message}</Typography>
            }
          </Grid>
        </Grid>
        <hr></hr>
      </StyledPaper>
  );
}

export default Message;
