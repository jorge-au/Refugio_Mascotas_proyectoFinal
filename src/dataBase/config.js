const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    database: process.env.DATABASE,
    password: process.env.PASSWORD
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database ', err);
    } else {
        console.log('Connected to the database.');
    }
});

module.exports = connection;