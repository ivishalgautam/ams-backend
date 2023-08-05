CREATE DATABASE appointment_management;

CREATE TABLE hospitals (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    telephone VARCHAR(20) NOT NULL,
    email VARCHAR(40) NOT NULL,
    speciality VARCHAR(255),
    is_deleted BOOLEAN DEFAULT false
);

CREATE TABLE departments (
    id SERIAL PRIMARY KEY,
    description VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    is_deleted BOOLEAN DEFAULT false,
    hospital_id INT,
    FOREIGN KEY (hospital_id) REFERENCES hospitals(id)
);

CREATE TABLE doctors (
    id SERIAL PRIMARY KEY,
    fullname VARCHAR(255) NOT NULL,--
    email VARCHAR(40) NOT NULL,--
    phone VARCHAR(20) NOT NULL,--
    username VARCHAR(40) NOT NULL,--
    password VARCHAR(40) NOT NULL,--
    department VARCHAR(40) NOT NULL,--
    qualification VARCHAR(40) NOT NULL,--
    institution VARCHAR(255) NOT NULL,--
    address VARCHAR(255) NOT NULL,--
    location VARCHAR(40) NOT NULL,--
    fees INT NOT NULL,--
    total_earning INT DEFAULT 0;
    about VARCHAR(255),--
    schedule_days VARCHAR(10) [],--
    image_url TEXT,
    is_featured BOOLEAN DEFAULT false,
    assistant_number VARCHAR(20),
    is_banned BOOLEAN DEFAULT false,
    is_deleted BOOLEAN DEFAULT false,
    department_id INT,
    hospital_id INT,
    created_at TIMESTAMP DEFAULT NOW();
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;
    FOREIGN KEY (department_id) REFERENCES departments(id),
    FOREIGN KEY (hospital_id) REFERENCES hospitals(id),
);

ALTER TABLE doctors ADD COLUMN created_at TIMESTAMP DEFAULT NOW();
ALTER TABLE doctors ADD COLUMN updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;


CREATE TABLE appointments (
    id SERIAL PRIMARY KEY,
    schedule_time VARCHAR(10) [],
    schedule_date DATE,
    is_deleted BOOLEAN DEFAULT false,
    doctor_id INT,
    FOREIGN KEY (doctor_id) REFERENCES doctors(id)
);

CREATE TABLE sectors(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    firstname VARCHAR(40) NOT NULL,
    lastname VARCHAR(40) NOT NULL,
    email VARCHAR(40) NOT NULL,
    password VARCHAR(100) NOT NULL,
    is_deleted BOOLEAN DEFAULT false,
)