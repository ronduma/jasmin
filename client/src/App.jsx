import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';

import theme from './theme';
import { ThemeProvider } from '@mui/material/styles';

import Home from './components/homepage/Home';
import Navigation from './components/navbar/Navigation';
import About from './components/About';
import Login from './components/authentication/Login';
import Register from './components/authentication/Register';
import GettingStarted from './components/profile/GettingStarted';
import Profile from './components/profile/Profile';
import EditProfile from './components/profile/EditProfile';
import Footer from './components/Footer';
import PsychologistView from './components/PsychologistView';
import Psychologist from './components/Psychologist';
import NotFound from './components/NotFound';
import Personal_Matching from './components/matching/Personal_Matching';
import Couple_Matching from './components/matching/Couple_Matching';
import Matching from './components/Matching';
import All_Matching from './components/matching/All_Matching';
import Children_Matching from './components/matching/Children_Matching';
import Specialist from './components/Specialist';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Privacy from './components/Privacy';
import Chat from './components/chat/Chat';
import Video from './components/video/Video';
import Terms from './components/Terms';
import PatientFromTherapistView from './components/PatientViewFromTherapist';
// import Feedback from './components/Feedback';
import { VerificationProvider } from './context/VerificationContext';
import { NotificationProvider } from './context/NotificationContext';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <VerificationProvider>
          <NotificationProvider>
            <div className="App">
              <header>
                <Navigation />
              </header>
              <main>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path='/getting-started' element={<PrivateRoute />}>
                    <Route path="/getting-started" element={<GettingStarted />} />
                  </Route>
                  <Route path='/profile' element={<PrivateRoute />}>
                    <Route path='/profile' element={<Profile />} />
                  </Route>
                  <Route path='/edit-profile' element={<PrivateRoute />}>
                    <Route path='/edit-profile' element={<EditProfile />} />
                  </Route>
                  <Route path='/login' element={<Login />} />
                  <Route path='/register' element={<Register />} />

                  <Route path="/about" element={<About />} />
                  <Route path="/psychologist" element={<PsychologistView />} />
                  {/* <Route path="/feedback" element={<Feedback/>} />  */}
                  <Route path='/personal_matching' element={<Personal_Matching />} />
                  <Route path='/couple_matching' element={<Couple_Matching />} />
                  <Route path='/children_matching' element={<Children_Matching />} />
                  <Route path='/all_matching' element={<All_Matching />} />
                  <Route path='/matching' element={<Matching />} />
                  <Route path="/matching/:id" element={<PsychologistView />} />
                  <Route path="/patient/:id" element={<PatientFromTherapistView />} />

                  <Route path='/specialist' element={<Specialist />} />
                  <Route path='/privacy_policy' element={<Privacy />} />
                  <Route path='/video_chat' element={<Video />} />
                  <Route path='/terms_conditions' element={<Terms />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
                <Chat />
              </main>
              <footer>
                <Footer />
              </footer>
            </div>
          </NotificationProvider>
        </VerificationProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
