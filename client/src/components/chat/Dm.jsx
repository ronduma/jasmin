import React, {useEffect, useRef, useState} from 'react';
import "./chat.css";

import axios from 'axios';

import io from 'socket.io-client'
const socket = io.connect("http://localhost:5173")

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from '@mui/material/IconButton';

function Dm(props) {
  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState("");

  const sendMessageToParent = () => {
    // Invoke the callback function passed from the parent with data
    props.onMessage(false);
  };
  
  const getChat = async () => {
    const response = await axios.get(`http://localhost:5173/chats/${props.id}`)
    return response
  };

  const sendMessage = async () => {
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

      <h1>Message:</h1>
      <input placeholder="Message..." onChange={(event) => {
        setMessage(event.target.value);
      }}/>
      <div>
        {messageReceived}
      </div>
      <button onClick={sendMessage}>Send Message</button>
    </div>
  );
}

export default Dm;
