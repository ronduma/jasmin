import React, { useState, useEffect, useContext } from 'react';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Popover from '@mui/material/Popover';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { NotificationContext } from '../../context/NotificationContext';
import axios from 'axios';


const Notis = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { notifications, setNotifications, unreadNotifications, setUnreadNotifications, markAllNotificationsAsRead } = useContext(NotificationContext);
  
  const handleClick = (event) => {
    event.preventDefault();
    markAllNotificationsAsRead();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
      <IconButton color="inherit" onClick={handleClick}>
        <Badge badgeContent={unreadNotifications} color="success">
          <NotificationsIcon />
        </Badge>
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <List style={{ maxHeight: '200px', overflow: 'auto' }}>
          {notifications.length > 0 ?
            notifications.map((notification, index) => (
              <ListItem key={index}>
                <ListItemText primary={notification} />
              </ListItem>
            ))
            : <ListItem>
              <ListItemText primary="No notifications" />
            </ListItem>
          }
        </List>
      </Popover>
    </div>
  );
}

export default Notis;