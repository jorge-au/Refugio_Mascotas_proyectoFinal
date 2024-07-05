const express = require('express');
const router = express.Router();
const controllers = require('../controllers/controller');

router.get('/', controllers.renderHome);
router.get('/adopcion', controllers.renderAdopcion);
router.get('/nuestrosPerros', controllers.renderNuestrosPerros);
router.get('/educacionCanina', controllers.renderEducacionCanina);
router.get('/contacto', controllers.renderContacto);

router.get('/masPerros', controllers.obtenerMasPerros);
router.get('/formNuevoPerro', controllers.formNuevoPerro);
router.post('/nuevo_adoptante', controllers.crearNuevoAdopante);
router.post('/nuevo_perro', controllers.crearNuevoPerro);
module.exports = router;
