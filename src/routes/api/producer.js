const express = require('express');

const jwt = require('jsonwebtoken');
const passport = require('passport');

const db_secret = require('../../../config/keys').PG;
const privateKey = require('../../../config/keys').private;
const pgQueryHandler = require('../../postgres/postgres').pgQueryHandler;
const pgErrorHandler = require('../../postgres/postgres').pgErrorHandler;

// Load Input Validation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

const usersTbl = require('../../postgres/models/producers');

const router = express.Router();

router.get('/hello', (req, res) => {
    res.send('Hello Yoshino!');
});

// @route   GET /api/producer/register
// @desc    Page that contains the form for user registration
// @access  Public
router.get('/register', (req, res) => {
    res.send('register page');
});

// @route   POST /api/producer/register
// @desc    Submit registration
// @access  Public
router.post('/register', async(req, res) => {
    const errors = validateRegisterInput(req.body);
    // Check validation
    if(errors) {
        return res.status(400).json(errors);
    }

    const sql_insert = `
        INSERT INTO
            ${usersTbl.name} (username, email, password)
          VALUES (
            '${req.body.username}',
            '${req.body.email}',
            crypt('${req.body.password}', gen_salt('bf')
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
        err.Objective = 'register';
        if(!err.column) err.column = 'email';
        pgErrorHandler(err, res);
    }
});

// @route   POST /api/producer/login
// @desc    Login User / Returns Web Token
// @access  Public
router.post('/login', async(req, res) => {
    const errors = validateLoginInput(req.body);
    // Check validation
    if(errors) {
        return res.status(400).json(errors);
    }
    const sql_getUser = `
        SELECT id, username, email, admin
            FROM ${usersTbl.name}
          WHERE email = '${req.body.email}'
            AND password = crypt('${req.body.password}', password);
    `;

    try {
        dbRes = await pgQueryHandler(
            db_secret,
            sql_getUser,
        );
        // console.log(dbRes.rows[0].email);
        // if(dbRes.rows ===)
        if(dbRes.rows.length === 0) {
            throw Error('Incorrect email or password. Please try again');
        }
        const payload = {
            id: dbRes.rows[0].id,
            username: dbRes.rows[0].username,
            email: dbRes.rows[0].email,
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
        pgErrorHandler(err, res);
    }
});

// @route   GET /api/producer/current
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