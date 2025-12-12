hacer: npm init

descargar:
npm install --save-dev nodemon
npm install express
npm install bcrypt
npm install cors
npm i jsonwebtoken
npm install mysql2  
npm i dotenv

comandos para crear la bases de datos:
CREATE DATABASE angularacademy2025;
USE angularacademy2025;
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100),
    password VARCHAR(200),
    last_login DATETIME,
    login_count INT DEFAULT 0
);
DESCRIBE users;
