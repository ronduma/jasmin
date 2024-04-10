import React, { useState, useEffect, useContext } from "react";
import {AuthContext} from '../../context/AuthContext';

import "./chat.css";

import axios from 'axios';

import Fab from "@mui/material/Fab";
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';

import ChatIcon from '@mui/icons-material/Chat';

import Loading from "../loading/Loading";
import Search from "./Search";
import DmPreview from './DmPreview';
import Dm from './Dm';

const Chat = () => {
  const {currentUser} = useContext(AuthContext);
  const [isLoading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState(null);
  const [isChatting, setIsChatting] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // isOpen state starts as false

  const togglePopup = () => {
    setIsOpen(!isOpen); // Toggle the state to open/close the chat pop-up
  };

  const fetchData = async () => {
    try {
      console.log("getting prof data")
      const response = await axios.get(`http://localhost:5173/profile/${currentUser.uid}`);
      setProfileData(response.data);
    } catch (e) {
      console.log(e)
    }
  };

  const handleMessageFromChild = (data) => {
    setIsChatting(data);
  };

  useEffect(() => {
    if (currentUser && currentUser.uid) {
      fetchData(); // Trigger fetchData when currentUser.uid is available
      setLoading(false);
    }
  }, [currentUser]); // Re-run effect whenever currentUser changes

  useEffect(() => {
    // This useEffect will run every time profileData changes
    console.log("Updated profileData:", profileData);
  }, [profileData]); // Only re-run if profileData changes

  useEffect(() => {
    // This useEffect will run every time isChatting changes
    console.log("Updated isChatting:", isChatting);
  }, [isChatting]); // Only re-run if isChatting changes

  return (
    <div >
      {isOpen && (
        <div className="chat-popup">
          {isLoading ? <Loading/>
          :
            <div className="chat-container">
              <Grid
                container
                justifyContent="left"
              >
                <Grid item xs={11}>
                  <div className="chat-header">
                    Chat 
                  </div>
                </Grid>
                <Grid item xs={1}>
                  <Search id={currentUser.uid}/>
                </Grid>
                {
                  isChatting ? 
                  <Dm onMessage={handleMessageFromChild}/>
                  :
                  <div>
                    <Grid item xs={12}>
                      <div className="messages-header">Messages</div>
                    </Grid>
                    <Grid item xs={12}>
                      {
                        profileData.chatLog.length == [] ?
                        <div>No messages to show.</div>
                        :
                        <div>
                            {profileData.chatLog.map((dm, index)=> (
                              <div key={index}>
                                <DmPreview 
                                  from={dm.messages[0].from} 
                                  timestamp={dm.messages[0].timestamp} 
                                  message={dm.messages[0].message}
                                  onMessage={handleMessageFromChild} 
                                />
                              </div>
                            ))} 
                        </div>
                      }
                    </Grid>
                  </div>
                }
              </Grid>
            </div>
          }
        </div>
      )}
      <Fab 
        color="green" 
        size="large"  
        className="chat-button" 
        aria-label="add"
        onClick={togglePopup}
      >
        <ChatIcon fontSize="large"  />
      </Fab>
    </div>
  );
};

export default Chat;
