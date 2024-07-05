const express = require('express');
const router = express.Router();
const controllers = require('../controllers/controller');
const fileUpload = require('../utils/handleStorage');

router.get('/', controllers.renderHome);
router.get('/adopcion', controllers.renderAdopcion);
router.get('/nuestrosPerros', controllers.renderNuestrosPerros);
router.get('/educacionCanina', controllers.renderEducacionCanina);
router.get('/contacto', controllers.renderContacto);

router.get('/masPerros', controllers.obtenerMasPerros);
router.get('/formNuevoPerro', controllers.formNuevoPerro);
router.post('/nuevo_perro', fileUpload.single('imagen'), controllers.crearNuevoPerro);
router.post('/nuevo_adoptante', controllers.crearNuevoAdopante);

module.exports = router;
