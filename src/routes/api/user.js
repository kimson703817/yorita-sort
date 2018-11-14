const express = require('express');
const { Client } = require('pg');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const router = express.Router();
const client = new Client();

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
router.post('/register', async(req, res) => {
    // const queryText = `
    //     INSERT INTO users (email, password) VALUES (
    //         ${req.body.email},
    //         crypt(${req.body.password}, gen_salt('bf'))
    //     );
    // `;

    const queryText = `
        SELECT ${req.body.email} || ' '
            || ${req.body.password} as account_info;
    `;

    try {
        await client.connect();
        const dbRes = await client.query(queryText);
        res.send(dbRes);
    } catch (err) {
        res.status(500).send(process.env);
    }

    

});

module.exports = router;