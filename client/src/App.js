import React from 'react';
import './App.css';
import {Route, Routes} from 'react-router-dom';

// import Account from './components/Account';
// import Home from './components/Home';
import Home from './components/homepage/Home';
import Navigation from './components/Navigation';
import About from './components/About';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import Feedback from './components/Feedback';
import NotFound from './components/NotFound';

import {AuthProvider} from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <AuthProvider>
        <div className="App">
          <main>
            <Navigation />
            <Routes>
              <Route path="/" element={<Home/>} /> 
              <Route path='/profile' element={<PrivateRoute />}>
                <Route path='/profile' element={<Profile />} />
              </Route>
              {/* <Route path='/account' element={<PrivateRoute />}>
                <Route path='/account' element={<Account />} />
              </Route> */}
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />

              <Route path="/about" element={<About/>} /> 
              <Route path="/profile" element={<Profile/>} /> 
              <Route path="/feedback" element={<Feedback/>} /> 
              <Route path="*" element={<NotFound/>} />
            </Routes>
          </main>
        </div>
    </AuthProvider>
  );
}

export default App;
