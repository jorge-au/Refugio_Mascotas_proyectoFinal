require('dotenv').config();
const dataBase = require('./src/dataBase/config');
const express = require('express');
const server = express();
const PORT = process.env.PORT;

server.get('/', (req, res) => {
    res.send('Hello world from Express')
})

server.get('/users', (req, res) => {
    const data = 'SELECT * FROM perros'
    dataBase.query(data, (err, result) => {
        if (err) {
            console.log('Hay un error');
        } else {
            res.json(result)
        }
    });
});


/**Server running */
server.listen(PORT, (error) => {
    if (error) {
        console.log('Hay un error en la conexion')
    } else {
        console.log('Server corriendo en el puerto ', PORT)
    }
})