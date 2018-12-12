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
--     admin BOOLEAN DEFAULT FALSE,
--     PRIMARY KEY (id)
-- );

-- select producers.table_schema, producers.table_name, kc.column_name
-- from information_schema.table_constraints producers
--   join information_schema.key_column_usage kc 
--     on kc.table_name = producers.table_name and kc.table_schema = producers.table_schema and kc.constraint_name = producers.constraint_name
-- where producers.constraint_type = 'PRIMARY KEY'
--   and kc.ordinal_position is not null
-- order by producers.table_schema,
--          producers.table_name,
--          kc.position_in_unique_constraint;