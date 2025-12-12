// Importar dependencias y modulos
const mysql = require("mysql2/promise");
const dotenv = require("dotenv");

dotenv.config();

// Usar variables de entorno para la conexion
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS, // Corregir variable de entorno
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Exportar el pool con capacidad de promesas
module.exports = pool;
