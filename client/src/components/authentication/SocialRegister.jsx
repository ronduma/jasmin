import React from 'react';
import {doSocialSignIn} from '../../firebase/FirebaseFunctions';

import axios from 'axios';

const SocialRegister = () => {
  const socialSignOn = async () => {
    try {
      let user = await doSocialSignIn();
      axios.post('http://localhost:5000/register', user.user)
      .then(response => {
        console.log("user", user)
        console.log("response", response)
      })
    } catch (error) {
      alert(error);
    }
  };
  return (
    <div>
      <img
        onClick={() => socialSignOn()}
        alt='google signin'
        src='/imgs/btn_google_signin.png'
      />
    </div>
  );
};

export default SocialRegister;
