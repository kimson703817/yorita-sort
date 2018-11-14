'use strict';
const fs = require('fs');
const axios = require('axios');
const { Client } = require('pg');

const client = new Client();
let rawdata = fs.readFile('test.json', (err, data) => {
    if (err) throw err;
    let rows = JSON.parse(data);
    console.log(rows);
});

const DB_insert_idol = async(idol) => {
    const queryText =`
        INSERT INTO idols(name, type, age,
            birthday, bloodtype)
        SELECT * FROM jsonb_to_record($1) as idol(
            name VARCHAR(20),
            type idol_type,
            age INT,
            birthday DATE,
            bloodtype blood_type);
    `;
    const values = [idol];
    try {
        await client.connect();
        const res = await client.query(queryText, values);
        console.log(res);
    } catch(err) {
        console.log(err.message);
    };
    await client.end();
};

const DB_update_idol = async(idol) => {
    console.log(idol);
}

const sampleIdol = {
    name: 'Sunny Yorita',
    type: 'Passion',
    age: 16,
    birthday: '10-03-0001',
    bloodtype: 'A'
};

//DB_insert_idol(sampleIdol);