import React from 'react';
import './App.css';
import {Route, Routes} from 'react-router-dom';

import Home from './components/homepage/Home';
import Navigation from './components/Navigation';
import About from './components/About';
import Login from './components/authentication/Login';
import Register from './components/authentication/Register';
import GettingStarted from './components/profile/GettingStarted';
import MyProfile from './components/profile/MyProfile';
import Profile from './components/profile/Profile';
import EditProfile from './components/profile/EditProfile';
import PsychologistView from './components/PsychologistView';
import Psychologist from './components/Psychologist';
import Feedback from './components/Feedback';
import NotFound from './components/NotFound';
import Matching from './components/Matching';
import SpecialList from './components/Speciallist';
import {AuthProvider} from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <header>
          <Navigation />
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Home/>} /> 
            <Route path='/getting-started' element={<PrivateRoute />}>
              <Route path="/getting-started" element={<GettingStarted/>} /> 
            </Route>
            <Route path='/profile' element={<PrivateRoute />}>
              <Route path='/profile' element={<MyProfile />} />
            </Route>
            <Route path='/edit-profile' element={<PrivateRoute />}>
              <Route path='/edit-profile' element={<EditProfile />} />
            </Route>
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />

            <Route path="/about" element={<About/>} />
            <Route path="/psychologist" element={<PsychologistView/>} /> 
            <Route path="/feedback" element={<Feedback/>} /> 
            <Route path='/matching' element={<Matching />} />
            <Route path="/matching/:id" element={<Profile />} />
            <Route path='/speciallist' element={<SpecialList />} />
            <Route path="*" element={<NotFound/>} />
          </Routes>
        </main>
      </div>
    </AuthProvider>
  );
}

export default App;
