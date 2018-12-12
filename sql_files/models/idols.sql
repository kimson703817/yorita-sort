-- /home/yoshino/projects/node/yorita-sort/sql_files/models/idols.sql

-- CREATE TYPE idol_type as ENUM ('Cute', 'Cool', 'Passion');
-- CREATE TYPE blood_type as ENUM('A', 'B', 'AB', 'O');
-- CREATE TYPE handedness as ENUM('Right', 'Left');

-- CREATE TABLE idols (
--     name VARCHAR(30) NOT NULL UNIQUE,
--     CVname VARCHAR(40),
--     type idol_type NOT NULL,
--     age INT,
--     birthday DATE,
--     heightCm INT,
--     weightKg INT,
--     bloodtype blood_type,
--     RLhanded handedness,
--     imgColor TEXT
-- );