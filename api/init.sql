CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(30) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    first_name VARCHAR(30) NOT NULL,
    middle_name VARCHAR(30), 
    last_name VARCHAR(30) NOT NULL,
    insurance_provider VARCHAR(50),
    street_address VARCHAR(255) NOT NULL,
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    zip_code VARCHAR(20) NOT NULL,
    age INT,
    date_of_occurrence DATE NOT NULL,
    job_occupation VARCHAR(50),
    CONSTRAINT chk_zip_code CHECK (zip_code REGEXP '^[0-9]{5}(?:-[0-9]{4})?$')
);