const express = require('express');
const app = express();
const configRoutes = require('./routes');
const session = require('express-session');

const cors = require('cors');

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

app.use(
session({
    name: 'AuthCookie',
    secret: "some secret string!",
    saveUninitialized: true,
    resave: false,
    cookie: {secure: false}
  })
);

app.use(express.json());
// app.use(express.urlencoded({extended: true}));

configRoutes(app);

app.listen(5173, () => {
  console.log("We've now got a server!");
  console.log('Your routes will be running on http://localhost:5173');
  console.log();
});