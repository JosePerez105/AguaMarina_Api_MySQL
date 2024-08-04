DROP DATABASE aguamarina_db;
CREATE DATABASE IF NOT EXISTS aguamarina_db;

USE aguamarina_db;

CREATE TABLE users (
    id_user INT(11) NOT NULL AUTO_INCREMENT,
    names VARCHAR(50) NOT NULL,
    lastnames VARCHAR(50) NOT NULL,
    dni VARCHAR(50) NOT NULL,
    mail VARCHAR(50) NOT NULL,
    password VARCHAR(50) NOT NULL,
    phone_number VARCHAR(50) NOT NULL,
    status BOOLEAN DEFAULT TRUE,

    PRIMARY KEY (id_user)
)AUTO_INCREMENT = 101;