const mysql = require('mysql2');
const dotenv = require("dotenv");
dotenv.config();

const connection = mysql.createConnection({
  host: process.env.HOST,
  database: process.env.DATABASE,
  user: process.env.USER,
  password: process.env.PASSWORD
});

connection.connect((err) => {
  if (err) {
    console.error('Error conectando a la base de datos:', err);
    return;
  }
  console.log('Conectado al servidor MySQL.');
});

module.exports = connection;
