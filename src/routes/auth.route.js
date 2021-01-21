'use strict';
const Router = require('express').Router();
const { signUp, signIn, verify } = require('../controllers/auth.controller');
const basic = require('../middleware/basic-auth');
const verification = require('../middleware/mailer');
Router.post('/verify', verification, verify);

Router.post('/sign-up', signUp);
Router.post('/sign-in', basic, signIn);

module.exports = Router;
