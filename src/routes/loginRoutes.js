const express = require('express');
const router = express.Router();
const controllers = require('../controllers/loginController');

router.get('/formAdmin', controllers.formAdmin);
router.post('/registro', controllers.registro);
router.get('/formLogin', controllers.formLogin);
router.post('/login', controllers.login);
router.get('/logout', controllers.logout)
module.exports = router;