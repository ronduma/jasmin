import React, {useContext, useState } from "react";
import "../../chat.css";
import {AuthContext} from '../../context/AuthContext';
import axios from 'axios';


const Chat = () => {
  const {currentUser} = useContext(AuthContext); //get the current username

  const [isOpen, setIsOpen] = useState(false); // isOpen state starts as false
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);

  const togglePopup = () => {
    setIsOpen(!isOpen); // Toggle the state to open/close the chat pop-up
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let {new_message} = event.target.elements;

    console.log(currentUser);
    try {
      axios.post('http://localhost:5000/chat', {sender:currentUser,receiver:"temp", message: new_message})
      .then(response => {
        console.log("user", user)
        console.log("response", response)
      })
      .catch(error => {
        console.log(error.response.data.error)
      });        
    } catch (error) {
      alert(error);
    }
  }

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };


  return (
    <div>
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
                {/* Change type to submit */}
              </form>
            </div>
          </div>
        </div>
      )}
      <button className="chat-button" onClick={togglePopup}>
        Chat
      </button>
    </div>
  );
};

export default Chat;
