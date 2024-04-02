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
import Personal_Matching from './components/Personal_Matching';
import Couple_Matching from './components/Couple_Matching';
import Children_Matching from './components/Children_Matching';
import SpecialList from './components/Specialist';
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
            <Route path='/personal_matching' element={<Personal_Matching />} />
            <Route path='/couple_matching' element={<Couple_Matching />} />
            <Route path='/children_matching' element={<Children_Matching />} />
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
