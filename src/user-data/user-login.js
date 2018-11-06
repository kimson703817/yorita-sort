// Required dependencies
const express = require('express');
const app = express();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
//const cookieSession = require('cookie-session');

passport.use(new GoogleStrategy({
    clientID: '992838132243-abmjsnb2ig0vo687hbmnd9fu9qpmm8lp.apps.googleusercontent.com',
    clientSecret: 'H1qK2iHA91QdpYazcp4H19g8',
    callbackURL: 'https://yoritasort.example.com:5555/auth/google/callback'
}));