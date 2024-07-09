const express = require('express');
const router = express.Router();
const controllers = require('../controllers/controller');
const fileUpload = require('../utils/handleStorage');

const isLogged = (req, res, next) => {
    if(!req.session.userId){
        return res.redirect('login/formLogin')
    }
    next()
}

router.get('/', controllers.renderHome);
router.get('/adopcion', controllers.renderAdopcion);
router.get('/nuestrosPerros', controllers.renderNuestrosPerros);
router.get('/educacionCanina', controllers.renderEducacionCanina);
router.get('/contacto', controllers.renderContacto);

router.get('/formNuevoPerro', controllers.formNuevoPerro);
router.post('/nuevo_perro', fileUpload.single('imagen'), controllers.crearNuevoPerro);
router.get('/masPerros', controllers.obtenerMasPerros);

router.post('/nuevo_adoptante', controllers.crearNuevoAdopante);
router.get('/adoptantes', isLogged, controllers.obtenerAdoptantes);
router.get('/editar_adoptante/:id', controllers.editarAdoptante);
router.post('/editar_adoptante/:id', controllers.actualizarAdoptante);
router.get('/borrar_adoptante/:id', controllers.eliminarAdoptante);

module.exports = router;
