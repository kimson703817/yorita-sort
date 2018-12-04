const { Client } = require('pg');

const pgQueryHandler = async(pg_secret, queryString) => {
    const client = new Client(pg_secret);

    try {
        await client.connect();
        const dbRes = await client.query(queryString);
        return dbRes;
    } catch(err) {
        throw err;
    }
};

const pgErrorHandler = (err, res) => {
    // Check if postgres returned an error code
    switch(err.code) {
        case '23505':
            res.status(422);
            res.send('This email is already registered');
            break;
        default:
            res.status(err.status || 500).send(err.message);
            break;
    };
}

module.exports = {
    pgQueryHandler,
    pgErrorHandler
};