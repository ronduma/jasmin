import '../App.css';
import React, {useState, useRef, useEffect} from 'react';
import io from 'socket.io-client';
function Chat() {
    const [state, setState] = useState({message: '', name: '', psychologist: ''});
    const [chat, setChat] = useState([]);
  
    const socketRef = useRef();
  
    useEffect(() => {
      socketRef.current = io('/');
      return () => {
        socketRef.current.disconnect();
      };
    }, []);
  
    useEffect(() => {
      socketRef.current.on('message', ({name, message}) => {
        console.log('The server has sent some data to all clients');
        setChat([...chat, {name, message}]);
      });
      socketRef.current.on('user_join', ({name, psychologist}) =>{
        setChat([
          ...chat,
          {name: 'ChatBot', message: `${name} has joined the chatroom ${psychologist}`}
        ]);
      });
      //Tried to get leave message I figured it out
      socketRef.current.on('user_leave', (data) => {
        setChat([
          ...chat,
          {name: 'ChatBot', message: `${data.name} has left the chatroom ${data.psychologist}`}
        ]);
      });
  
      return () => {
        socketRef.current.off('message');
        socketRef.current.off('user-join');
      };
    }, [chat]);
  
    const userjoin = (name, psychologist) => {
      //pass roomNumber when join
      console.log(name +" joined" + "room" + psychologist)
      socketRef.current.emit('user_join', {name, psychologist});
    };
  
    const onMessageSubmit = (e) => {
      let msgEle = document.getElementById('message');
      console.log([msgEle.name], msgEle.value);
      setState({...state, [msgEle.name]: msgEle.value});
      //pass roomNumber when sending message
      socketRef.current.emit('message', {
        name: state.name,
        message: msgEle.value,
        psychologist: state.psychologist
      });
      e.preventDefault();
      setState({message: '', name: state.name, psychologist: state.psychologist});
      msgEle.value = '';
      msgEle.focus();
    };
  
    const renderChat = () => {
      console.log('In render chat' );
      return chat.map(({name, message}, index) => (
        <div key={index}>
          <h3>
            <h2>W</h2>
            {name}: <span>{message}</span>
          </h3>
        </div>
      ));
    };
  
    return (
        <div>
            <h1>HELLO</h1>
            {/* {state.name ? (
  <h1>Welcome, {state.name}!</h1>
) : (
  <p>User name not provided</p>
)} */}

            {state.name && (
        <div className='cardChat'>
          <div className='render-chat'>
            <h1>Chat Log Room: {state.psychologist}</h1>
            {renderChat()}
          </div>
          <form onSubmit={onMessageSubmit}>
            <h1>Messenger</h1>
            <div>
              <input
                name='message'
                id='message'
                variant='outlined'
                label='Message'
              />
            </div>
            <button>Send Message</button>
          </form>
        </div>
      )}

      {!state.name && (
        <form
          className='form'
          onSubmit={(e) => {
            console.log(document.getElementById('username_inputChat').value);
            console.log(document.getElementById('psychologist_input').value);
            e.preventDefault();
            // setState({name: document.getElementById('username_input').value});
            setState({name: document.getElementById('username_inputChat').value, psychologist: document.getElementById('psychologist_input').value});
            // userjoin(document.getElementById('username_input').value);
            userjoin(document.getElementById('username_inputChat').value, document.getElementById('psychologist_input').value);
            // userName.value = '';
          }}
        >
          <div className='form-group'>
            <label>
              User Name:
              <br />
              <input id='username_inputChat' />
            </label>
            <br />
            <label>
              Room Number:
              <br />
              <input id='psychologist_input' />
            </label>
          </div>
          <br />

          <br />
          <br />
          <button type='submit'> Click to join</button>
        </form>
      )}
        </div>
    );
  }
  
export default Chat;
