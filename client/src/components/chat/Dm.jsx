import React, {useEffect, useRef, useState} from 'react';
import "./dm.css";

import axios from 'axios';

import io from 'socket.io-client'
const socket = io.connect("http://localhost:5173")

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SendIcon from '@mui/icons-material/Send';

import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';

function Dm(props) {
  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState("");
  const [history, setHistory] = useState("");

  const sendMessageToParent = () => {
    // Invoke the callback function passed from the parent with data
    props.onMessage(false);
  };
  
  const getChat = async () => {
    const response = await axios.get(`http://localhost:5173/chats/${props.chat_id}`)
    return response.data
  };

  const sendMessage = async () => {
    const chat = await getChat();
    setHistory(chat);
    console.log("chat", chat);
    const msg = {
      id: props.chat_id,
      sender: props.sender,
      message: message
    }
    socket.emit("send_message", {message})
    const response = await axios.put(`http://localhost:5173/chats/message/${props.chat_id}`, msg)
    console.log(response);
  };

  useEffect(()=> {
    socket.on("receive_message", (data) => {
      setMessageReceived(data.message)
    })
  }, [socket])

  return (
    <div>
      <IconButton onClick={sendMessageToParent}>
        <ArrowBackIcon/>
      </IconButton>
      <div>
        {messageReceived}
      </div>
      <div className="input">
        <TextField 
          placeholder="Message..." 
          onChange={(event) => {
            setMessage(event.target.value);
          }}
          sx={{width:"80%"}}
        />
        <IconButton onClick={sendMessage}><SendIcon/></IconButton>
      </div>
    </div>
  );
}

export default Dm;
