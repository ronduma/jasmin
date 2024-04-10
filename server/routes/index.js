const registerRoutes = require('./register');
const loginRoutes = require('./login');
const logoutRoutes = require('./logout');
const profileRoutes = require('./profile');
const therapistRoutes = require('./therapists');
const matchingRoutes = require('./matching');
const chatRoutes = require('./chat');

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
  app.use('/matching', matchingRoutes);
  app.use('/chat', chatRoutes);

  app.use('*', (req, res) => {
    console.log('yo')
    res.status(400).json("Error: Page not found.")
  });
};

module.exports = constructorMethod;
