import React, { useState, useEffect, useContext } from "react";
import {AuthContext} from '../../context/AuthContext';

import "./chat.css";

import axios from 'axios';

import Box from '@mui/material/Box';
import Fab from "@mui/material/Fab";
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ChatIcon from '@mui/icons-material/Chat';
import CloseIcon from '@mui/icons-material/Close';

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
  const [selectedChatPfp, setSelectedChatPfp] = useState(null);
  const [selectedChatName, setSelectedChatName] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [dms, setDms] = useState([]);
  const [previews, setPreviews] = useState([]);

  const togglePopup = () => {
    setLoading(true); 
    setIsOpen(!isOpen); 
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:5173/profile/${currentUser.uid}`);
      setProfileData(response.data);
    } catch (e) {
      console.log(e)
    }
    setLoading(false)
  };

  const getDm = async (chatLog) => {
    setDms([]);
    for (const id of chatLog){
      try{
        const response = await axios.get(`http://localhost:5173/chats/${id}`);
        setDms(prevDms => [...prevDms, response.data]);
      } catch (e) {
        console.log(e)
      }
    }
  }

  useEffect (() => {
    if (profileData){
      getDm(profileData.chatLog);
    }
  }, [profileData])

  useEffect (() => {
    setIsOpen(false)
  }, [currentUser])
 
  const getPreview = async (dms) => {
    setPreviews([]);
    try {
      const previewResults = await Promise.all(
        dms.map(async (dm) => {
          if (dm.user1_id !== 1){
            const recipient = profileData._id === dm.user1_id ? dm.user2_id : dm.user1_id;
            const response = await axios.get(`http://localhost:5173/profile/${recipient}`);
            return [response.data, dm._id];
          } else return [0, dm._id]
        })
      );
      setPreviews(previewResults);
    } catch (error) {
      console.log(error);
      setPreviews([]);
    } 
  }

  useEffect(() =>{
    getPreview(dms);
  }, [dms])

  const handleDmResponse = (data) => {
    // console.log(data)
    setIsChatting(data.isChatting);
    setSelectedChat(data.id);
    setSelectedChatPfp(data.pfp);
    setSelectedChatName(data.name);
  };

  useEffect (() => {
    if (!isChatting){
      setSelectedChatName(null);
    }
  }, [isChatting])

  const handleSearchResponse = (data) => {
    fetchData();
    setIsChatting(data.isChatting);
    setSelectedChat(data.id);
    setSelectedChatName(data.name);
  };

  const sendNotif = async (data) => {
    if (data){
      try {
        console.log(data)
        const response = await axios.get(`http://localhost:5173/profile/notifications/${data}`);
        console.log(response.data)
        const currentUnread=response.data.unread
        console.log(currentUnread)
        try {
          const response = await axios.put(`http://localhost:5173/profile/notifications/${data}`, { unread: currentUnread + 1, noti_str: [`Your therapist sent you a message.`] });
          console.log(response)
        } catch (error) {
          console.log(error)
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  if (currentUser){
    return (
      <div>
        {isOpen && (
          <div className={isChatting ? "chat-popup-dm" : "chat-popup"}>
            {!profileData ? <Loading/>
            : 
            <div>
              <div className="chat-container">
                <Box>
                  <Stack>
                    <div className="chat-top-section">
                      <Grid container>
                          <Grid item xs={1}>
                            {isChatting ? 
                              <IconButton onClick={handleDmResponse}>
                                <ArrowBackIcon/>
                              </IconButton>
                              :
                              <></>  
                            }
                          </Grid>
                          <Grid item xs={8}>
                            <div 
                              className="chat-header"
                            >
                              {isChatting ? selectedChatName : "Chat"} 
                            </div>
                          </Grid>
                          <Grid item xs={1.5}>
                            {profileData.isTherapist ?
                              <Search 
                                id={currentUser.uid}
                                onMessage={handleSearchResponse}
                                isTherapist={profileData.isTherapist}
                              /> 
                              :
                              <></>
                            }
                          </Grid>
                          <Grid item xs={1.5}>
                            <IconButton onClick={togglePopup}>
                              <CloseIcon/>
                            </IconButton>
                          </Grid>
                      </Grid>
                    </div>
                    {
                      isChatting ? 
                        <Dm 
                          onMessage={handleDmResponse} 
                          onMessage2={sendNotif}
                          chat_id={selectedChat}
                          sender={{id: currentUser.uid, name: profileData.firstName + " " + profileData.lastName}}
                          sender_pfp = {profileData.profile_img}
                          recipient_pfp = {selectedChatPfp}
                        />
                      :
                      <div>
                        {previews.length == profileData.chatLog.length || isLoading ? 
                          <div xs={12}>
                            {
                              profileData.chatLog.length == 0 ?
                              <div>No messages to show.</div>
                              :
                              <div>
                                {previews.map((dm)=> (
                                  dm[0] != 0 ? 
                                    <div key={dm[1]}>
                                      <DmPreview 
                                        from={dm[0].firstName + " " + dm[0].lastName}
                                        id={dm[1]}
                                        pfp={dm[0].profile_img}
                                        timestamp=""
                                        message=""
                                        onMessage={handleDmResponse}
                                      />
                                    </div>
                                  : 
                                  <div key={dm[1]}>
                                    <DmPreview
                                      from={"kAI"}
                                      id={dm[1]}
                                      pfp={null}
                                      timestamp=""
                                      message=""
                                      onMessage={handleDmResponse}
                                    />
                                  </div>
                                ))} 
                              </div>
                            }
                          </div>
                          :
                          <div xs={12} justifyContent="center">
                            <Loading />
                          </div>
                        }
                      </div>
                    }
                  </Stack>
                </Box>
              </div>
            </div>
            
            }
          </div>
        )}
        {isOpen ? 
          <></> :
          <Fab 
            color="green" 
            size="large"  
            className="chat-button" 
            aria-label="add"
            onClick={() => {togglePopup(); fetchData();}}
          >
            <ChatIcon fontSize="large"  />
          </Fab>
        }
        
      </div>
    );
  }
  else return <></>
};

export default Chat;
