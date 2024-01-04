/* Replace with your SQL commands */

CREATE TABLE spaces(
    ID SERIAL PRIMARY KEY,
    name VARCHAR(255),
    address VARCHAR(255),
    seats VARCHAR(255) DEFAULT '0',
    coordinates VARCHAR(255),
    affiliation VARCHAR(255),
    availiability VARCHAR(255),
    scheduale VARCHAR(255),
    type VARCHAR(255)
);