import React, {useEffect, useRef, useState} from 'react';
import "./dm.css";

import axios from 'axios';
import dayjs from 'dayjs';

import io from 'socket.io-client'
const socket = io.connect("http://localhost:5173")

import Loading from "../loading/Loading";
import Message from "./Message";

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
  const [recipientID, setRecipientID] = useState(null);

  const sendMessageToParent = () => {
    // Invoke the callback function passed from the parent with data
    props.onMessage(false);
  };

  const sendMessageToParent2 = (id) => {
    // Invoke the callback function passed from the parent with data
    props.onMessage2(id);
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
    socket.emit("send_message", {message});
    const response = await axios.put(`http://localhost:5173/chats/message/${props.chat_id}`, msg);
    const chat = await getChat();
    setMessage("");

    if (isKai){
      const response = await axios.put(`http://localhost:5173/chats/kai-message/${props.chat_id}`, msg)
      const chat = await getChat();
    } else{
      setRecipientID(response.data);
    }
  };

  useEffect(()=> {
    getChat();
  }, [])

  useEffect(()=> {
    sendMessageToParent2(recipientID);
  }, [recipientID])

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
    <div className="dm-container">
      <div className="history">
        {history.chatLog.map((message, index) => (
          <Message
            key={index}
            chatId={props.chat_id}
            msgId={index}
            timestamp={message.timestamp}
            sender={message.sender}
            message={message.message}
            pfp={message.sender.name === props.sender.name ? props.sender_pfp : props.recipient_pfp}
          />
        ))}
      </div>
      <div className='whitespace' />
      <div className="input-container">
        <TextField
          placeholder="Message..."
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          fullWidth
          autoComplete='off'
        />
        <IconButton onClick={sendMessage}>
          <SendIcon />
        </IconButton>
      </div>
    </div>
  );
}

export default Dm;
