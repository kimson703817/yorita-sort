-- /home/yoshino/projects/node/yorita-sort/sql_files/models/users.sql


-- CREATE EXTENSION pgcrypto;

-- CREATE TABLE users (
--     id SERIAL PRIMARY KEY,
--     email TEXT NOT NULL UNIQUE,
--     password TEXT NOT NULL
-- );

-- CREATE TABLE producers (
--     id uuid DEFAULT uuid_generate_v4 (),
--     username VARCHAR(20) NOT NULL,
--     email VARCHAR NOT NULL UNIQUE,
--     password VARCHAR NOT NULL,
--     PRIMARY KEY (producer_id)
-- );