const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
app.use(cors());
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
var cookieSession = require('cookie-session');
require('./passport.js');
app.use(
  cookieSession({
    name: 'session',
    keys: ['key1', 'key2']
  })
);
const passport = require('passport');
app.use(passport.initialize());
app.use(passport.session());

function isLoggedIn(req, res, next) {
  if (req.user) {
    console.log('here');
    next();
  } else {
    res.send('401');
  }
}

app.get('/', (req, res) => {
  res.send(' not logged');
});

app.get('/good', isLoggedIn, (req, res) => {
  res.send('good' + req.user.displayName);
});

app.get('/failed', (req, res) => {
  res.send('failed');
});

app.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

app.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/failed' }),
  function (req, res) {
    res.redirect('/good');
  }
);

app.get('/logout', (req, res) => {
  req.session = null;
  req.logOut();
  res.redirect('/');
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
