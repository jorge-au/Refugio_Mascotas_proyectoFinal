const mysql = require('mysql2');
const util = require('util');

const pool = mysql.createPool({
    host:'bqf0a9frmahpwihjtfxr-mysql.services.clever-cloud.com',
    user: 'uwa9figijdbxsjju',
    password: 'yjNX7A7KZV5P1FTn5shj',
    database: 'bqf0a9frmahpwihjtfxr',
    port: 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

pool.getConnection((err) => {
    if (err) {
        console.error('Hubo un error en la conexión de la B.D',{'error': err});
    } else {
        console.log('Conexión a B.D. establecida');
    }
});

pool.query = util.promisify(pool.query);
module.exports = pool;