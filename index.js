require('dotenv').config();
const express = require('express');
const session = require('express-session');
const path = require('path');
const server = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;


server.use(express.static(path.join(__dirname, '/public')));
server.use(express.json());
server.use(express.urlencoded({extended: true}));
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({extended: true}))

server.use(session({
    secret: 'mys3cr3t_k3y',
    resave: false,
    saveUninitialized: false,
}));


// Motor de plantillas
server.set('views', (__dirname + '/src/views'));
server.set('view engine', 'ejs');

server.use('', require('./src/routes/mainRoutes'))
server.use('/login', require('./src/routes/loginRoutes'));



/**Server running */
server.listen(PORT, (error) => {
    if (error) {
        console.log('Hay un error en la conexion')
    } else {
        console.log('Server corriendo en el puerto ', PORT)
    }
});
