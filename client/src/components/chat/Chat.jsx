import React, { useState, useEffect, useContext } from "react";
import {AuthContext} from '../../context/AuthContext';

import "./chat.css";

import axios from 'axios';

import { Fab, Grid } from "@mui/material";
import ChatIcon from '@mui/icons-material/Chat';
import EditIcon from '@mui/icons-material/Edit';

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
      console.log(response)
      setProfileData(response.data);
      console.log(profileData);
    } catch (e) {
      console.log(e)
    }
  };

  useEffect(() => {
    fetchData(); 
  }, []);

  return (
    <div >
      {isOpen && (
        <div className="chat-popup">
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
                <EditIcon/>
              </Grid>
              <Grid item xs={12}>
                <div>Messages</div>
              </Grid>
              <Grid item xs={12}>
                {/* {
                  profileData.
                } */}
                <Dm/>
              </Grid>
            </Grid>
          </div>
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
