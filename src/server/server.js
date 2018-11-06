const app = express();
const passport = require('passport');
const passportConfig = require('./config/passport-setup');

const authRoutes = require('./routes/auth-routes');

const app = express();


// passport.serializeUser((user, done) => {
//     done(null, user.id);
// });

// passport.deserializeUser((id, done) => {
//     done(null, user.id);
// })

// passport.use(new GoogleStrategy({
//     clientID: '992838132243-abmjsnb2ig0vo687hbmnd9fu9qpmm8lp.apps.googleusercontent.com',
//     clientSecret: 'H1qK2iHA91QdpYazcp4H19g8',
//     callbackURL: 'https://yoritasort.example.com:5555/auth/google/callback'
// }), (accessToken, refreshToken, profile, done));


// set up routes
app.use('/auth', authRoutes);

app.get('/', (req, res) => {

});

app.listen(5555, () => {
    console.log('app now listening for request on port 5555');
})