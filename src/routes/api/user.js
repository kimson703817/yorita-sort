const express = require('express');
// const { Client } = require('pg');

const jwt = require('jsonwebtoken');
const passport = require('passport');

const db_secret = require('../../../config/keys').PG;
const privateKey = require('../../../config/keys').private;
const pgQueryHandler = require('../../utils/postgres').pgQueryHandler;
const pgErrorHandler = require('../../utils/postgres').pgErrorHandler;

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
router.post('/register', async(req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const sql_insert = `
        INSERT INTO users (email, password)
          VALUES (
            '${email}',
            crypt('${password}', gen_salt('bf')
          )
        );
    `;
    try {
        await pgQueryHandler(
            db_secret,
            sql_insert,
        );
        res.status(201).send('Successfully registered');
    } catch(err) {
        pgErrorHandler(err, res);
    }
});

// @route   POST /api/user/login
// @desc    Login User / Returns Web Token
// @access  Public
router.post('/login', async(req, res) => {
    const sql_getUserId = `
        SELECT id, email
            FROM users
          WHERE email = '${req.body.email}'
            AND password = crypt('${req.body.password}', password);
    `;

    try {
        dbRes = await pgQueryHandler(
            db_secret,
            sql_getUserId,
        );
        //console.log(dbRes.rows[0].email);
        //if(dbRes.rows ===)
        if(dbRes.rows.length === 0) throw err;
        const payload = {
            id: dbRes.rows[0].id,
            email: dbRes.rows[0].email
        };
        jwt.sign(
            payload,
            privateKey,
            { expiresIn: 86400 },
            (err, token) => {
                res.json({
                    success: true,
                    token: 'Bearer ' + token
                });
            }
        );
    } catch (err) {
        err.status = 401;
        err.message = 'Invalid login credentials';
        pgErrorHandler(err, res);
    }
});

// @route   GET /api/user/current
// @desc    Return current user
// @access  Private
router.get('/current',
    passport.authenticate('jwt', { session: false}),
    (req, res) => {
        res.json(req.user);
    });

/*************************************************
**************** HELPER FUNCTIONS ****************
*************************************************/


module.exports = router;