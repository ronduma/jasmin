import React, {useEffect, useRef, useState} from 'react';
import "./dm.css";

import axios from 'axios';
import dayjs from 'dayjs';

import io from 'socket.io-client'
const socket = io.connect("http://localhost:5173")

import Loading from "../loading/Loading";

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SendIcon from '@mui/icons-material/Send';

import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';

function Dm(props) {
  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState(""); //debugging state
  const [history, setHistory] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [isKai, setIsKai] = useState(false);

  const sendMessageToParent = () => {
    // Invoke the callback function passed from the parent with data
    props.onMessage(false);
  };
  
  const getChat = async () => {
    try {
      const response = await axios.get(`http://localhost:5173/chats/${props.chat_id}`);
      setHistory(response.data);
    } catch(e){
      console.log("yo")
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async () => {
    const msg = {
      id: props.chat_id,
      sender: props.sender,
      message: message
    }
    if (!isKai){
      socket.emit("send_message", {message});
      const response = await axios.put(`http://localhost:5173/chats/message/${props.chat_id}`, msg);
      const chat = await getChat();
    } else {
      const response = await axios.put(`http://localhost:5173/chats/kai-message/${props.chat_id}`, msg)
      const chat = await getChat();
    }


    setMessage("");
  };

  useEffect(()=> {
    getChat();
  }, [])

  useEffect(()=> {
    getChat();
    if (history && history.user1_id == 1){
      setIsKai(true);
    }
  }, [history])

  useEffect(()=> {
    if (!isKai){
      socket.on("receive_message", (data) => {
        getChat();
        setMessageReceived(data.message)
      })
    }
  }, [socket])

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <div className="history">
        {history.chatLog.map((message, index)=> (
          <div key={index}>
            <div style={{margin:"0 0 1rem 0"}}>
              <div>{message.timestamp}</div>
              <span>{message.sender.name}: </span>
              {message.message}
            </div>
          </div>
        ))} 
      </div>
      <div className="input">
        <TextField 
          placeholder="Message..." 
          value={message}
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
