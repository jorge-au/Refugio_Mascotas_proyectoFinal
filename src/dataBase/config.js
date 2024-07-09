const mysql = require('mysql2');
const util = require('util');

const pool = mysql.createPool({
    host:process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.PORT_DB
});

pool.getConnection((err) => {
    if (err) {
        console.error('Hubo un error en la conexión de la B.D',{'error': err});
    } else {
        console.log('Conexión a la B.D. establecida');
    }
});

pool.query = util.promisify(pool.query);
module.exports = pool;