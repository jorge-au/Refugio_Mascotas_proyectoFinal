const express = require('express');
const server = express();
const PORT = process.env.PORT || 3000;

server.get('/', (req, res) => {
    res.send('Hello world from Express')
})

server.get('/users', (req, res) => {
    res.send('Página de usuarios')
});


/**Server running */
server.listen(PORT, (error) => {
    if (error) {
        console.log('Hay un error en la conexion')
    } else {
        console.log('Server corriendo en el puerto ', PORT)
    }
})