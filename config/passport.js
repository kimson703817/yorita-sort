const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');

const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const keys = require('./keys');

const pgQueryHandler = require('../src/utils/postgres').pgQueryHandler;
const pgErrorHandler = require('../src/utils/postgres').pgErrorHandler;

// passport.use(
//     new GoogleStrategy({
//         //options for the google strategy
//         callbackURL: '/',
//         clientID: keys.google.clientID,
//         clientSecret: keys.google.clientSecret,
//     }), (accessToken, refreshToken, profile, done) => {
//         // passport callback function
//     }
// );

passport.use(
    new JwtStrategy({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: keys.private
    }, async(jwtPayload, done) => {
        const sql_userSelectEmail = `
            SELECT email from users
                WHERE id = ${jwtPayload.id} ;
        `;
        try {
            dbRes = await pgQueryHandler(
                keys.PG,
                sql_userSelectEmail
            );
            user = dbRes.rows[0];
            if(dbRes.rows.length) return done(null, user);
            return done(null, false);
            
        } catch(err) {
            console.log(err);
        }
    })
);

module.exports = passport;