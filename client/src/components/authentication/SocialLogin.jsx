import React, {useContext} from 'react';
import {doSocialSignIn} from '../../firebase/FirebaseFunctions';
import { getAdditionalUserInfo } from 'firebase/auth';
import {AuthContext} from '../../context/AuthContext';

import axios from 'axios';

const SocialLogin = ({ onSignIn }) => {
  const {currentUser} = useContext(AuthContext);
  const socialSignOn = async () => {
    try {
      let user = await doSocialSignIn();
      let additionalUserInfo = getAdditionalUserInfo(user)
      onSignIn(additionalUserInfo);
      if (additionalUserInfo.isNewUser){
        axios.post('http://localhost:5173/register', user.user)
        .then(response => {
          // console.log("user", user)
          // console.log("response", response)
        })
      }
    } catch (error) {
      alert(error);
    }
    try {
      console.log(currentUser)
      // let getUser = axios.get(`http://localhost:5173/profile/${currentUser.uid}`);
      // console.log(getUser, 'user exists');
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

export default SocialLogin;
