import React, {useEffect, useRef, useState} from 'react';
import "./chat.css";
import io from 'socket.io-client'
const socket = io.connect("http://localhost:5173")

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from '@mui/material/IconButton';

function Dm(props) {
  const sendMessageToParent = () => {
    // Invoke the callback function passed from the parent with data
    props.onMessage(false);
  };

  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState("");
  const sendMessage = () => {
    socket.emit("send_message", {message})
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
      {messageReceived}
      <button onClick={sendMessage}>Send Message</button>
    </div>
  );
}

export default Dm;
