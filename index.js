require('dotenv').config();
const express = require('express');
const router = require('./src/routes/mainRoutes')
const server = express();
const PORT = process.env.PORT;


server.use(express.static(__dirname + '/public'));
server.use(express.json());
server.use(express.urlencoded({extended: true}));

// Motor de plantillas
server.set('views', (__dirname + '/src/views'));
server.set('view engine', 'ejs');

server.use('', router)


/**Server running */
server.listen(PORT, (error) => {
    if (error) {
        console.log('Hay un error en la conexion')
    } else {
        console.log('Server corriendo en el puerto ', PORT)
    }
});
