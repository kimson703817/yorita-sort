const { Pool, Client } = require('pg');

// pool will use environment variables for connection info

const pool = new Pool();

const submitProfile = async(profile) => {
   const queryText = 'SELECT * from json_to_record($1) as x(username text, top5 text[], plevel int)';
//   const queryText = '';
   const values = [profile];
   try {
      const res = await pool.query(queryText, values);
      console.log(res.rows[0].top5);
   } catch(err) {
      console.log(err.message);
   }
};

const sampleProfile = {
   'username': 'sunny-yorita',
   'top5': ['Yoshino Yorita', 'Hiromi Seki', 'Yuka Nakano'],
   'plevel': 180
};

submitProfile(sampleProfile);

// INSERT INTO userprofiles(username, top5, plevel)