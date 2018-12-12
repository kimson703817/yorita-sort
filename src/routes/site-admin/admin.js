const express = require('express');

const jwt = require('jsonwebtoken');
const passport = require('passport');

const dbAdmin_secret = require('../../../config/keys').PGadmin;
const privateKey = require('../../../config/keys').private;
const pgQueryHandler = require('../../postgres/postgres').pgQueryHandler;
const pgErrorHandler = require('../../postgres/postgres').pgErrorHandler;

// Load Input Validation
// const validateRegisterInput = require('../../validation/register');
// const validateLoginInput = require('../../validation/login');

// const usersTbl = require('../../postgres/models/producers');

const router = express.Router();

router.get('/hello', (req, res) => {
    res.send('Hello Yoshino!');
});

// @route   POST /admin/idol/add
// @desc    Add a new idol to the app's database
// @access  ADMIN
router.post('/idol/add',
    passport.authenticate('jwt', { session: false}),
    async(req, res) => {
        if(!req.user.admin) {
            return res.status(403).json('You do not have permission to perform this action');
        }

        const sql_insert = `
            INSERT INTO
                idols (name, cvname, age, type, birthday, heightcm, weightkg, bloodtype, rlhanded, imgcolor)
                VALUES (
                    ${req.body.name? `'${req.body.name}'`: 'null'},
                    ${req.body.cvname? `'${req.body.cvname}'`: 'null'},
                    ${req.body.age? `'${req.body.age}'`: 'null'},
                    ${req.body.type? `'${req.body.type}'`: 'null'},
                    ${req.body.birthday? `'${req.body.birthday}'`: 'null'},
                    ${req.body.heightcm? `'${req.body.heightcm}'`: 'null'},
                    ${req.body.weightkg? `'${req.body.weightkg}'`: 'null'},
                    ${req.body.bloodtype? `'${req.body.bloodtype}'`: 'null'},
                    ${req.body.rlhanded? `'${req.body.rlhanded}'`: 'null'},
                    ${req.body.imgcolor? `'${req.body.imgcolor}'`: 'null'}
                );
        `;
        // console.log(sql_insert);
        try {
            await pgQueryHandler(
                dbAdmin_secret,
                sql_insert,
            );
            res.status(200).json('Added new idol');
        } catch(err) {
            err.Objective = 'add idol';
            if(!err.column) err.column = 'idol';
            pgErrorHandler(err, res);
        }
    });



/*************************************************
**************** HELPER FUNCTIONS ****************
*************************************************/


module.exports = router;