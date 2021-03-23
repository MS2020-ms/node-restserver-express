const { Router } = require('express');
const { check } = require('express-validator');

const { login } = require('../controllers/auth');
const { validarCampos } = require('../midlewares/validar-campos');

const router = Router();

//path: '/api/auth/login'
//Ruta de mi app: sgundo parametro controlador
router.post('/login', [
    check('correo', 'El correo es obligatorio').isEmail(),
    check('password', 'El password es obligatorio').not().isEmpty(),

    validarCampos
], login);

module.exports = router;
