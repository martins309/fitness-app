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
    picture text
);

CREATE TABLE types (
    id serial PRIMARY KEY,
    name varchar (200)
);

CREATE TABLE parts_of_body (
    id serial PRIMARY KEY,
    name varchar (200)
);

CREATE TABLE workouts (
    id serial PRIMARY KEY,
    name varchar (200),
    picture text,
    link text,
    type_id integer REFERENCES types (id)
);

CREATE TABLE parts_workouts (
    id serial PRIMARY KEY,
    part_id integer REFERENCES parts_of_body (id),
    workout_id integer REFERENCES workouts (id)
);

CREATE TABLE logged_workouts (
    id serial PRIMARY KEY,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    weight integer,
    reps integer,
    duration_min integer,
    duration_sec integer,
    user_id integer REFERENCES users (id),
    workout_id integer REFERENCES workouts (id)
);

CREATE TABLE favorite_workouts (
    id serial PRIMARY KEY,
    user_id integer REFERENCES users (id),
    workout_id integer REFERENCES workouts (id)
);