const { Pool, Client } = require('pg');

// pool will use environment variables for connection info

const pool = new Pool();

const submitProfile = async(profile) => {
   const queryText = `SELECT * from json_to_record($1) as x(
      username text,
      top5 text[],
      plevel int,
      birthday date);`
//   const queryText = '';
   const values = [profile];
   try {
      const res = await pool.query(queryText, values);
      console.log(res.rows[0]);
   } catch(err) {
      console.log(err.message);
   }
};

const sampleProfile = {
   username: 'sunny-yorita',
   top5: ['Yoshino Yorita', 'Hiromi Seki', 'Yuka Nakano'],
   plevel: 180,
   birthday: '10-03-0001'
};

submitProfile(sampleProfile);

// INSERT INTO userprofiles(username, top5, plevel)