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
    // console.log(err);
    switch(err.code) {
        case '23502':
            res.status(422);
            //err.pgSummary = 'MISSING REQUIRED';
            res.json({
                msg: `${err.Objective} error: ${err.column} is required`
            });
            break;
        case '23505':
            res.status(422);
            //err.pgSummary = 'DUPLICATE';
            res.json({msg: `${err.Objective} error: ${err.column} already exists`});
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