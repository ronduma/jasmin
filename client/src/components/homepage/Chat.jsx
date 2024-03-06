import React, { useState } from 'react';
import '../../chat.css';

const Chat = () => {
    const [isOpen, setIsOpen] = useState(false); // isOpen state starts as false
    const [message, setMessage] = useState('');
    const [chatMessages, setChatMessages] = useState([]);


    const togglePopup = () => {
        setIsOpen(!isOpen); // Toggle the state to open/close the chat pop-up
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
                            {/* Chat messages will appear here */}
                        </div>


                        <div className="chat-input">
                        <input type="text" placeholder="Type your message..." />
                        <button className = "send-button">Send</button>
                        </div>
                    </div>
                </div>
            )}
                        <button className="chat-button" onClick={togglePopup}>
                Chat
            </button>
        </div>
    );
}

export default Chat;