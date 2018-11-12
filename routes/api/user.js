const express = require('express');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const router = express.Router();

router.get('/hello', (req, res) => {
    res.send('Hello Yoshino!');
});

// @route   GET /api/users/register
// @desc    Page that contains the form for user registration
// @access  public
router.get('/register', (req, res) => {
    res.send('register page');
});

// @route   POST /api/users/register
// @desc    Submit registration
// @access  public
router.post('/register', (req, res) => {
    
});

module.exports = router;