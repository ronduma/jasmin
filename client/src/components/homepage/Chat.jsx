import React, { useState } from "react";
import "../../chat.css";

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
