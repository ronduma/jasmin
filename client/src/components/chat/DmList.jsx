import React, { useState, useEffect, useContext } from "react";
import {AuthContext} from '../../context/AuthContext';

import "./chat.css";

import Grid from '@mui/material/Grid';

import Search from "./Search";
import DmPreview from './DmPreview';
import Dm from './Dm';

const DmList = (props) => {
  const [isChatting, setIsChatting] = useState(false);

  const handleMessageFromChild = (data) => {
    setIsChatting(data);
  };

  return (
    <div>
      {props.profileData.chatLog.map((dm, index)=> (
        <div key={index}>
          <DmPreview 
            from="yo"
            timestamp=""
            message=""
            onMessage={handleMessageFromChild} 
          />
        </div>
      ))} 
    </div>
  );
};

export default DmList;
