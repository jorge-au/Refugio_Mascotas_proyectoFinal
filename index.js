require('dotenv').config();
const dataBase = require('./src/dataBase/config');
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

// server.post('/registroEnviado', async(req, res) => {
//     const {nombre, direccion, telefono, email,fecha_adopcion, imagen} = req.body;
//     dataBase.query('INSERT INTO adoptantes(nombre, direccion, telefono, email, fecha_adopcion, imagen) VALUES (?,?,?,?,?,?)', [nombre, direccion, telefono, email, fecha_adopcion], (error, data) => {
//         if(error) {
//             console.log(error);
//         } else {
//             res.render('pages/registroEnviado')
//         }
//     })
// })


/**Server running */
server.listen(PORT, (error) => {
    if (error) {
        console.log('Hay un error en la conexion')
    } else {
        console.log('Server corriendo en el puerto ', PORT)
    }
});
