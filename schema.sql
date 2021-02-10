CREATE TABLE users (
    id serial PRIMARY KEY,
    username varchar (100),
    password varchar (200),
    first_name varchar (100),
    last_name varchar (100),
    weight integer,
    height_ft integer,
    height_in integer,
    age integer,
    phone_num text,
    picture text,
);