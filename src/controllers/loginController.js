const { hashPassword } = require('../utils/handleHashPassword');
const pool = require('../dataBase/config');
const bcrypt = require('bcrypt');

module.exports = {
    formAdmin: (req, res) => {
        res.render('pages/formAdmin')
    },

    formLogin: (req, res) => {
        res.render('pages/formLogin')
    },

    registro: async (req, res) => {
        try {
            const { usuario, contrasena } = req.body;

            if (!usuario || !contrasena) {
                return res.status(400).json({ msg: 'Usuario y contraseña son requeridos' });
            }

            const hashedPassword = await hashPassword(contrasena);

            const sql = 'INSERT INTO usuarios (usuario, contrasena) VALUES (?, ?)';
            const values = [usuario, hashedPassword];

            pool.query(sql, values, (err, data) => {
                if (err) {
                    throw err;
                } else {
                    res.redirect('formLogin')
                }
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ msg: 'Error en el servidor' });
        }
    },

    login: async (req, res) => {
        try {
            const { usuario, contrasena } = req.body;
            const [valido] = await pool.query(`SELECT * FROM usuarios WHERE usuario = ?`, [usuario]);
            
            if (!valido) {
                return res.status(404).send('Usuario no encontrado');
            }
    
            const passwordMatch = await bcrypt.compare(contrasena, valido.contrasena);
            
            if (!passwordMatch) {
                return res.status(401).json({ msg: 'No estás autorizado' });
            }
    
            let exito;
            if (passwordMatch) {
                exito = 1
            } else {
                exito = 0
            }
            const sql = 'INSERT INTO registros_inicio_sesion(id_usuario, fecha_hora, exito) VALUES(?, now(), ?)';
            
            pool.query(sql, [valido.id, exito], (err, data) => {
                if (err) {
                    return res.status(500).json({ msg: 'Error en el servidor' });
                } else {
                    req.session.userId = valido.id;
                    res.redirect('/adoptantes')
                    // return res.status(200).json({ msg: 'Ingreso exitoso' });
                }
            });
        } catch (error) {
            return res.status(500).json({ msg: 'Error en el servidor' });
        }
    
    },

    logout: async (req, res) => {
        req.session.userId = null
        res.redirect('/')
    }


} //Llave de cierre del module exports



