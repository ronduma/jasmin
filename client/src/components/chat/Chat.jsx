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
import Dm from './Dm';

const Chat = () => {
  const {currentUser} = useContext(AuthContext);
  const [isLoading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState(null);

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
                  <Search />
                </Grid>
                <Grid item xs={12}>
                  <div>Messages</div>
                </Grid>
                <Grid item xs={12}>
                  {
                    profileData.chatLog.length == [] ?
                    <div>No messages to show.</div>
                    :
                    <div>
                      {profileData.chatLog.map((dm, index)=> (
                        <div key={index}>
                          <Dm from={dm.messages[0].from} timestamp={dm.messages[0].timestamp} message={dm.messages[0].message}/>
                        </div>
                      ))}
                    </div>
                  }
                </Grid>
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
