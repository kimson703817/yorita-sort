CREATE TYPE idol_type as ENUM ('Cute', 'Cool', 'Passion');
CREATE TYPE blood_type as ENUM('A', 'B', 'AB', 'O');

CREATE TABLE idols (
    id SERIAL PRIMARY KEY,
    name varchar(20),
    type idol_type,
    age int,
    birthday DATE,
    bloodtype blood_type
);