import React, { useState, useEffect, useContext } from "react";
import {AuthContext} from '../../context/AuthContext';

import "./chat.css";

import axios from 'axios';

import Fab from "@mui/material/Fab";
import Grid from '@mui/material/Grid';

import ChatIcon from '@mui/icons-material/Chat';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

import Loading from "../loading/Loading";
import Search from "./Search";
import DmPreview from './DmPreview';
import Dm from './Dm';

const Chat = () => {
  const {currentUser} = useContext(AuthContext);
  const [isLoading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState(null);
  const [isChatting, setIsChatting] = useState(false);
  const [selectedChat, setSelectedChat] = useState(null);
  const [isOpen, setIsOpen] = useState(false); // isOpen state starts as false
  const [pfps, setPfps] = useState(null);

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
    if (profileData){
      let pfpList = []
      profileData.chatLog.map(async (log) => {
        const response = await axios.get(`http://localhost:5173/chats/${log.id}`);
        if (response.data.user1_id == currentUser.uid){
          const user = await axios.get(`http://localhost:5173/profile/${response.data.user2_id}`);
          pfpList.push(user.data.profile_img);
        } else {
          const user = await axios.get(`http://localhost:5173/profile/${response.data.user1_id}`);
          pfpList.push(user.data.profile_img);
        }
      });
      setPfps(pfpList);
    }
  }, [profileData]);


  const handleDmResponse = (data) => {
    // console.log(data)
    setIsChatting(data.isChatting);
    setSelectedChat(data.id);
  };

  const handleSearchResponse = (data) => {
    setLoading(true);
    fetchData();
    setIsChatting(data.isChatting);
    setSelectedChat(data.id);
    setLoading(false);
  };

  useEffect(() => {
    if (currentUser && currentUser.uid) {
      fetchData(); 
      setLoading(false);
    } else{
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (currentUser && currentUser.uid) {
      fetchData(); 
      setLoading(false);
    } else{
      setLoading(false);
    }
  }, [currentUser]);

  return (
    <div >
      {isOpen && (
        <div className="chat-popup">
          {isLoading ? <Loading/>
          : 
            (currentUser == null ? 
              <div>Not signed in.</div>
              :
            <div className="chat-container">
              <Grid
                container
                justifyContent="left"
              >
                <Grid item xs={10}>
                  <div className="chat-header">
                    Chat 
                  </div>
                </Grid>
                <Grid item xs={1}>
                  <Search 
                    id={currentUser.uid}
                    onMessage={handleSearchResponse}
                    isTherapist={profileData.isTherapist}
                  />
                </Grid>
                <Grid item xs={1}>
                  <IconButton onClick={togglePopup}>
                    <CloseIcon/>
                  </IconButton>
                </Grid>
                {
                  isChatting ? 
                  <Dm 
                    onMessage={handleDmResponse} 
                    chat_id={selectedChat}
                    sender={{id: currentUser.uid, name: profileData.firstName + " " + profileData.lastName}}
                  />
                  :
                  <div>
                    <Grid item xs={12}>
                      {
                        profileData.chatLog.length == 0 ?
                        <div>No messages to show.</div>
                        :
                        <div>
                          {profileData.chatLog.map((dm, index)=> (
                            <div key={index}>
                              <DmPreview 
                                from={dm.name}
                                id={dm.id}
                                pfp={pfps[index]}
                                timestamp=""
                                message=""
                                onMessage={handleDmResponse}
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
            )
          }
        </div>
      )}
      {isOpen ? 
        <div></div> :
        <Fab 
          color="green" 
          size="large"  
          className="chat-button" 
          aria-label="add"
          onClick={togglePopup}
        >
          <ChatIcon fontSize="large"  />
        </Fab>
      }
      
    </div>
  );
};

export default Chat;
