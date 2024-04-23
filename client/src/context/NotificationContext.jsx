import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from "./AuthContext";

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const { currentUser } = useContext(AuthContext);
  const [notifications, setNotifications] = useState([]);
  //need to change this after updaing the db?
  const [unreadNotifications, setUnreadNotifications] = useState(0);

  // Fetch noti from the database when the component mounts
  useEffect(() => {
    const fetchNotificationsForCurrentUser = async () => {
      if (currentUser) {
        try {
          const response = await axios.get(`http://localhost:5173/profile/notifications/${currentUser.uid}`);
          setNotifications(response.data.noti_str);
          setUnreadNotifications(response.data.unread);
        } catch (error) {
          console.error('Error fetching notifications:', error);
        }
      }
    };

    fetchNotificationsForCurrentUser();
  }, [currentUser, notifications, unreadNotifications]);

  return (
    <NotificationContext.Provider value={{ notifications, setNotifications, unreadNotifications, setUnreadNotifications }}>
      {children}
    </NotificationContext.Provider>
  );
};