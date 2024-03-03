import React, {useContext} from 'react';
import {AuthContext} from '../context/AuthContext';
import '../App.css';

function Matching() {
  const {currentUser} = useContext(AuthContext);
  return (
    <div className='card'>
      <h2>Hello {currentUser.displayName}, this is the MATCHING page</h2>
    </div>
  );
}

export default Matching;
