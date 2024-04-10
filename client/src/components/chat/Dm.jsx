import React, {useEffect, useRef, useState} from 'react';
import "./chat.css";

import io from 'socket.io-client';


import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';

function Dm() {
  // states for logins and messaging
  const [state, setState] = useState({message: '', name: '', room: ''});
  const [chat, setChat] = useState([]);
  const [userList, setUserList] = useState([]);

  // refs for socket connection and chat container div
  const socketRef = useRef();
  const chatContainerRef = useRef(null);

  // socket connection
  useEffect(() => {
    socketRef.current = io('/');
    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  // event listeners for when a message is sent and when a user joins
  useEffect(() => {
    socketRef.current.on('message', ({name, message}) => {
      console.log('The server has sent message data to all clients');
      setChat(prevChat => [...prevChat, {name, message}]);
    });
    socketRef.current.on('user_join', function ({name, room, userList}) {
      setChat(prevChat => [
        ...prevChat,
        {name: 'ChatBot', message: `${name} has joined the room ${room}`}
      ]);
      setUserList(userList);
    });
    socketRef.current.on('user_leave', function ({name, userList}) {
      setChat(prevChat => [
        ...prevChat,
        {name: 'ChatBot', message: `${name} has left the room`}
      ]);
      setUserList(userList);
    });

    return () => {
      socketRef.current.off('message');
      socketRef.current.off('user-join');
    };
  }, []);

  // sent to server-side socket.on('user_join')
  const userjoin = (name, room) => {
    socketRef.current.emit('user_join', {name, room});
  };

  const onMessageSubmit = (e) => {
    let msgEle = document.getElementById('message');
    console.log([msgEle.name], msgEle.value);
    setState({...state, [msgEle.name]: msgEle.value});
    socketRef.current.emit('message', {
      name: state.name,
      message: msgEle.value
    });
    e.preventDefault();
    setState({...state, message: '', name: state.name});
    msgEle.value = '';
    msgEle.focus();
  };

  const renderChat = () => {
    console.log('In render chat');
    if (chatContainerRef.current){
      console.log("updated scroll")
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
    return chat.map(({name, message}, index) => (
      <div key={index}>
        <h3>
          {name}: <span>{message}</span>
        </h3>
      </div>
    ));
  };

  return (
    <div>
      {state.name && (
        <div>
          {/* chat log */}
          <h1>Chat Log</h1>
          <div className='render-chat' ref={chatContainerRef}>
            <h3>Users: <span>{userList}</span></h3>
            {renderChat()}
          </div>

          {/* send message */}
          <form className="messenger" onSubmit={onMessageSubmit}>
            <div className='container'>
              <span className="room">Room: {state.room}</span>
              <input
                  name='message'
                  id='message'
                  variant='outlined'
                  label='Message'
                />
              <button>Send Message</button>
              {/* <img className='button' src={send} alt='Send Message'></img> */}
            </div>
          </form>
        </div>
      )}
      
      {/* login */}
      {!state.name && (
        <div className='container'>
          <h1>ron's chat client</h1>
          <hr></hr>
          <form
            className='login'
            onSubmit={(e) => {
              e.preventDefault();
              setState({
                name: document.getElementById('username_input').value, 
                room: document.getElementById('room_input').value
              });
              userjoin(document.getElementById('username_input').value, document.getElementById('room_input').value);
            }}
          >
            <div className='form-group'>
              <label>
                User Name:
                <br />
                <input id='username_input' />
              </label>
              <br />
              <br />
              <label>
                Room Name:
                <br />
                <input id='room_input' />
              </label>
            </div>
            <br />
            <button className='button' type='submit'> Click to join</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Dm;
