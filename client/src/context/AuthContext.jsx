import React, {useState, useEffect} from 'react';
import {getAuth, onAuthStateChanged} from 'firebase/auth';
export const AuthContext = React.createContext();

import axios from 'axios';

export const AuthProvider = ({children}) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [profileData, setProfileData] = useState({});
  const auth = getAuth();
  useEffect(() => {
    let myListener = onAuthStateChanged(auth, (user) => {
      console.log("user:", user);
      setCurrentUser(user);
    });
    return () => {
      if (myListener) myListener();
    };
  }, [auth, currentUser]);

  return (
    <AuthContext.Provider value={{currentUser, profileData, setProfileData}}>
      {children}
    </AuthContext.Provider>
  );
};
