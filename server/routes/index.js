const registerRoutes = require('./register');
const loginRoutes = require('./login');
const logoutRoutes = require('./logout');
const profileRoutes = require('./profile');
const therapistRoutes = require('./therapists');
const patientRoutes = require('./patients');
const matchingRoutes = require('./matching');
const chatsRoutes = require('./chats');
const meetingRoutes = require('./meeting')
const videoRoutes = require('./video');
const reviewRoutes = require('./reviews');
const constructorMethod = (app) => {
  // app.use('/', (req, res) => {
  //   res.status(200).json("Hello World!")
  // }); 
  // app.use('/xx', xxRoutes);

  app.use('/register', registerRoutes);
  app.use('/login', loginRoutes);
  app.use('/profile', profileRoutes);
  app.use('/logout', logoutRoutes);
  app.use('/therapists', therapistRoutes);
  app.use('/patients', patientRoutes);
  app.use('/matching', matchingRoutes);
  app.use('/chats', chatsRoutes);
  app.use('/meeting', meetingRoutes);
  app.use('/video',videoRoutes);
  app.use('/reviews', reviewRoutes);
  app.use('*', (req, res) => {
    console.log('yo')
    res.status(400).json("Error: Page not found.")
  });
};

module.exports = constructorMethod;
