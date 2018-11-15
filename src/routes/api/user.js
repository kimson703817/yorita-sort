const express = require('express');
const { Client } = require('pg');

const jwt = require('jsonwebtoken');
const passport = require('passport');

const db_secret = require('../../../config/keys').PG;

const router = express.Router();

router.get('/hello', (req, res) => {
    res.send('Hello Yoshino!');
});

// @route   GET /api/users/register
// @desc    Page that contains the form for user registration
// @access  Public
router.get('/register', (req, res) => {
    res.send('register page');
});

// @route   POST /api/users/register
// @desc    Submit registration
// @access  Public
router.post('/register', (req, res) => {
    // Items to INSERT
    const email = req.body.email;
    const password = req.body.password;

    const sql_insert = `
        INSERT INTO users (email, password) VALUES (
            '${email}',
            crypt('${password}', gen_salt('bf'))
        );
    `;
    
    
    pgQueryHandler(db_secret, sql_insert, res);

    // try {
    //     await client.connect();
    //     const dbRes = await client.query(db_registerNewUser);
    //     res.send(dbRes);
    // } catch (err) {
    //     // Check if postgres returned an error code
    //     switch(err.code) {
    //         case '23505':
    //             res.status(422)
    //                 .send('This email is already registered');
    //             break;
    //         default:
    //             res.status(500).send(err.message);
    //             break;
    //     };
    // }

});

// @route   POST /api/user/login
// @desc    Login User / Returns Web Token
// @access  Public
router.post('/login', async(req, res) => {
    const db_getUserId = `
        SELECT id
            FROM users
          WHERE email = '${req.body.email}'
            AND password = crypt('${req.body.password}');
    `;
});

/*************************************************
**************** HELPER FUNCTIONS ****************
*************************************************/
const pgQueryHandler = async(pg_secret, queryString, res) => {
    const client = new Client(pg_secret);

    try {
        await client.connect();
        await client.query(queryString);
        res.status(201).send('Account created');
    } catch (err) {
        // Check if postgres returned an error code
        switch(err.code) {
            case '23505':
                res.status(422)
                    .send('This email is already registered');
                break;
            default:
                res.status(500).send(err.message);
                break;
        };
    }
};

module.exports = router;