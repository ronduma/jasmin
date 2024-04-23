import React, { useState, useEffect, useContext } from "react";
import {AuthContext} from '../../context/AuthContext';

import "./chat.css";

import axios from 'axios';

import Fab from "@mui/material/Fab";
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';

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
  const [isOpen, setIsOpen] = useState(false);
  const [dms, setDms] = useState([]);
  const [previews, setPreviews] = useState([]);

  const togglePopup = () => {
    setIsOpen(!isOpen); 
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:5173/profile/${currentUser.uid}`);
      setProfileData(response.data);
    } catch (e) {
      console.log(e)
    }
  };

  const getDm = async (chatLog) => {
    setDms([]);
    for (const id of chatLog){
      console.log("id:", id)
      try{
        const response = await axios.get(`http://localhost:5173/chats/${id}`);
        setDms(prevDms => [...prevDms, response.data]);
      } catch (e) {
        console.log(e)
      }
    }
  }
  
  const getPreview = async (dms) => {
    setPreviews([]);
    setLoading(true); 
    try {
      const previewResults = await Promise.all(
        dms.map(async (dm) => {
          const recipient = profileData._id === dm.user1_id ? dm.user2_id : dm.user1_id;
          const response = await axios.get(`http://localhost:5173/profile/${recipient}`);
          return [response.data, dm._id];
        })
      );
      setPreviews(previewResults);
    } catch (error) {
      console.log(error);
      setPreviews([]);
    } finally {
      setLoading(false); 
    }
  }

  useEffect(() =>{
    console.log("dms:", dms)
    getPreview(dms);
  }, [dms])

  useEffect(() =>{
    console.log("previews:", previews)
  }, [previews])

  const handleDmResponse = (data) => {
    // console.log(data)
    setIsChatting(data.isChatting);
    setSelectedChat(data.id);
  };

  const handleSearchResponse = (data) => {
    fetchData();
    setIsChatting(data.isChatting);
    setSelectedChat(data.id);
  };

  if (currentUser){
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
                              {previews.map((dm)=> (
                                <div key={dm[1]}>
                                  <DmPreview 
                                    from={dm[0].firstName + " " + dm[0].lastName}
                                    id={dm[1]}
                                    pfp={dm[0].profile_img}
                                    timestamp=""
                                    message=""
                                    onMessage={handleDmResponse}
                                  />
                                  {/* {getDm(dm)} */}
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
            onClick={() => {togglePopup(); getDm(profileData.chatLog); fetchData();}}
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
