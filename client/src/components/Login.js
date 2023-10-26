import '../App.css';
import Navbar from './Navbar';

import React, {
  useState,
  useEffect
} from 'react';

import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged} from 'firebase/auth';

function Login() {
  const [auth, setAuth] = useState(false || window.localStorage.getItem('auth')==='true');
  const [token, setToken] = useState('');

  useEffect(()=>{
    const auth = getAuth();
    onAuthStateChanged(auth, (userCred) => {
      if (userCred){
        setAuth(true);
        window.localStorage.setItem('auth', 'true');
        userCred.getIdToken().then((token)=>[
          setToken(token)
        ]);
      }
    });
  }, [])

  const loginWithGoogle = () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then(
        (userCred) => {
          if (userCred){
            setAuth(true)
            window.localStorage.setItem('auth', 'true')
          }
          console.log(userCred);
        }
      )
  }

  const handleSignOut = () => {
    const auth = getAuth();
    auth.signOut()
      .then(() => {
        // Sign-out successful.
        setAuth(false)
        console.log("User signed out successfully");
      })
      .catch((error) => {
        // An error happened.
        console.error("Error during sign out: ", error);
      });
  };

  return (
    <div className="Login" >
      <Navbar />
      <div>Login</div>
      {auth ? <button onClick={handleSignOut}>Sign Out</button>
      : <button onClick={loginWithGoogle}>Log in with Google</button>
      }
    </div>
  );
}

export default Login;
