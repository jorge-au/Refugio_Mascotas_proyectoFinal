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
        pool.query(`SELECT * FROM perros`, (err, data) => {
            if(err) {
                throw err 
            } else {
                res.render('pages/masPerros', {perros: data})
            }
        })
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
        if (!req.file) {
            return res.status(400).json({ msg: 'No se ha subido ninguna imagen' });
        }    
        const {nombre, raza, edad, fecha_ingreso, estado} = req.body;
        const url_imagen = `http://localhost:3000/img/${req.file.filename}`;
        const sql = 'INSERT INTO perros (nombre, raza, edad, fecha_ingreso, imagen, estado) VALUES (?, ?, ?, ?, ?, ?)';
        const values = [nombre, raza, edad, fecha_ingreso, url_imagen, estado];
        pool.query(sql, values,  (err, data) =>{
            if(err) {
                throw err 
            } else {
                res.redirect('/nuestrosPerros')
            }
        })
    }

} //llave de cierre de module exports
