const axios = require('axios');

const { Pool, Client } = require('pg');

const pool = new Pool();

const DB_insert_idol = async(idol) => {
    const queryText =`
        INSERT INTO idols(name, type, age,
            birthday, bloodtype)
        jsonb_to_record($1) as idol(
            name VARCHAR(20),
            type idol_type,
            age INT,
            birthday DATE,
            bloodtype blood_type);
    `;

    const values = [idol];
    try {
        const res = await pool.query(queryText, values);
        console.log(res.rows[0]);
    } catch(err) {
        console.log(err.message);
    };
};

const DB_update_idol = async(idol) => {
    console.log(idol);
}

const sampleIdol = {
    name: 'Sunny Yorita2',
    type: 'Passion',
    age: 16,
    birthday: '10-03-0001',
    bloodtype: 'A'
};

DB_insert_idol(sampleIdol);