import React, {useState, useEffect} from 'react';
import {getAuth, onAuthStateChanged} from 'firebase/auth';
export const AuthContext = React.createContext();

import axios from 'axios';

export const AuthProvider = ({children}) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [profileData, setProfileData] = useState(undefined);
  const auth = getAuth();
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (currentUser) {
          console.log("FETCHING DATA")
          const response = await axios.get(`http://localhost:5000/profile/${currentUser.uid}`);
          setProfileData(response.data);
          console.log(response.data);
        }
      } catch (e) {
        console.log(e);
      }
    };
    let myListener = onAuthStateChanged(auth, (user) => {
      console.log(user);
      setCurrentUser(user);
    });
    fetchData();
    return () => {
      if (myListener) myListener();
    };
  }, [auth, currentUser]);

  return (
    <AuthContext.Provider value={{currentUser, profileData}}>
      {children}
    </AuthContext.Provider>
  );
};
