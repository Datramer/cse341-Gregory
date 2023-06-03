const { auth } = require('express-openid-connect');

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: 'a long, randomly-generated string stored in env',
  baseURL: 'http://localhost:8080/',
  clientID: 'MfSSpHsyPGvwwk4iOWgV62eCz9IH2rvi',
  issuerBaseURL: 'https://dev-rpb3yv2pay34uyin.us.auth0.com/'
};


const express = require('express');
const router = express.Router();

router.use(auth(config));
router.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

router.use('/', require('./swagger'));
router.use('/cards', require('./cards'));

module.exports = router;