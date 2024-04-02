import React from 'react';
import './App.css';
import {Route, Routes} from 'react-router-dom';

import theme from './theme'; 
import {ThemeProvider} from '@mui/material/styles';

import Home from './components/homepage/Home';
import Navigation from './components/navbar/Navigation';
import About from './components/About';
import Login from './components/authentication/Login';
import Register from './components/authentication/Register';
import GettingStarted from './components/profile/GettingStarted';
import Profile from './components/profile/Profile';
import EditProfile from './components/profile/EditProfile';
import Footer from './components/Footer';
import NotFound from './components/NotFound';
import Matching from './components/Matching';

import {AuthProvider} from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <ThemeProvider theme={theme}>
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
                <Route path='/profile' element={<Profile />} />
              </Route>
              <Route path='/edit-profile' element={<PrivateRoute />}>
                <Route path='/edit-profile' element={<EditProfile />} />
              </Route>
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />

              <Route path="/about" element={<About/>} />
              <Route path='/matching' element={<Matching />} />
              <Route path="*" element={<NotFound/>} />
            </Routes>
          </main>
          <footer>
            <Footer/>
          </footer>
        </div>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
