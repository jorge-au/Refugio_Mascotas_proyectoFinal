const pool = require('../dataBase/config');

module.exports = {
    renderHome: (req, res) => {
        res.render('pages/index')
    },

    renderAdopcion: (req, res) => {
        res.render('pages/adopcion')
    },

    renderNuestrosPerros: (req, res) => {
        res.render('pages/nuestrosPerros')
    },

    renderEducacionCanina: (req, res) => {
        res.render('pages/educacionCanina')
    },

    renderContacto: (req, res) => {
        res.render('pages/contacto')
    },

    obtenerMasPerros: (req, res) => {
        res.render('pages/masPerros')
    },

    crearNuevoAdopante: (req, res) => {
        const {nombre, direccion, telefono, email} = req.body;
        const sql = 'INSERT INTO adoptantes (nombre, direccion, telefono, email) VALUES (?, ?, ?, ? )';
        const values = [nombre, direccion, telefono, email];
        pool.query(sql, values, (err, result) => {
            if(err) {
                throw err
            } else {
                console.log(result)
                res.redirect('/')
            }
        })
    },

    formNuevoPerro: (req, res) => {
        res.render('pages/formNuevoPerro')
    },

    crearNuevoPerro: (req, res) => {
        const {nombre, raza, edad, fecha_ingreso, imagen, estado} = req.body;
        console.log(req.body)
        const sql = 'INSERT INTO perros (nombre, raza, edad, fecha_ingreso, imagen, estado) VALUES (?, ?, ?, ?, ?, ?)';
        pool.query(sql, [nombre, raza, edad, fecha_ingreso,imagen, estado], (err, result) =>{
            if(err) {
                throw err 
            } else {
                console.log(result)
                res.redirect('/')
            }
        })

    }

} //lave de cierre de module exports
