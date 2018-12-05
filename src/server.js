const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');

const routes = require('./routes/routes');

const app = express();

// parse application/x-www-form-urlenconded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

/* Use Routes
    - producer
    - profile
*/
app.use('/api/producer', routes.producer);


// Passport middleware
app.use(passport.initialize());

// Passport Config
require('../config/passport.js');

const port = process.env.PORT || 5000;



app.listen(port, () => console.log(`Server is listening on port ${port}`));