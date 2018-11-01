'use strict';
const express = require('express');
const app = express();
const port = 5555;

app.get('/api/hello', (req, res) => {
    console.log('received!');
    res.status(200).send('hello yoshino');
});

// get idol from database

app.listen(port, () => console.log('Ready'));