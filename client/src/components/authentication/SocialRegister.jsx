import React from 'react';
import {doSocialSignIn} from '../../firebase/FirebaseFunctions';
import { getAdditionalUserInfo } from 'firebase/auth';

import axios from 'axios';

const SocialRegister = ({ onRegister }) => {
  const socialSignOn = async () => {
    try {
      let user = await doSocialSignIn();
      let additionalUserInfo = getAdditionalUserInfo(user)
      onRegister(additionalUserInfo)
      if (additionalUserInfo.isNewUser){
        console.log(user.user)
        axios.post('http://localhost:5173/register', user.user)
        .then(response => {
          // console.log("user", user)
          // console.log("response", response)
        })
      }
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
