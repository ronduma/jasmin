import React, { useState } from "react";
import "../../chat.css";
import { Fab } from "@mui/material";
import AssistantIcon from '@mui/icons-material/Assistant';
import Video from '../video/Video';

const Chat = () => {
  const [isOpen, setIsOpen] = useState(false); // isOpen state starts as false
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);

  const togglePopup = () => {
    setIsOpen(!isOpen); // Toggle the state to open/close the chat pop-up
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("/submit-form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ msg: message }), // Send message data to server
      });
      if (response.ok) {
        // If request is successful, clear the message input
        setMessage("");
        // You can optionally update the UI to display a success message or update the chat window
      } else {
        console.error("Error submitting form");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  return (
    <div >
      {isOpen && (
        <div className="chat-popup">
          <div className="chat-container">
            <header className="chat-header">
              <h3>ChatBot</h3>
            </header>
            <div className="chat-messages">
              {chatMessages.map((msg, index) => (
                <div key={index}>{msg}</div>
              ))}
            </div>

            <div className="chat-input">
              <form id="myForm" onSubmit={handleSubmit}>
                {" "}
                {/* Add onSubmit event handler */}
                <input
                  type="text"
                  placeholder="Type your message..."
                  name="msg"
                  id="msg"
                  value={message}
                  onChange={handleMessageChange}
                />
                <button type="submit" className="send-button">
                  {" "}
                  Send{" "}
                </button>{" "}

                <a href="/video_chat" style = {{textDecoration:'none',color: 'inherit' , cursor: 'pointer'}}>Video</a> 


              </form>
            </div>
          </div>
        </div>
      )}
      {/* <button className="chat-button" onClick={togglePopup}>
        Chat
      </button> */}
      <Fab color="primary" size="large"  aria-label="add">
        <AssistantIcon fontSize="large" className="chat-button" onClick={togglePopup} />
      </Fab>
    </div>
  );
};

export default Chat;
