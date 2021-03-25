const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../midlewares/validar-campos');

const { login, googleSignin } = require('../controllers/auth');

const router = Router();

//path: '/api/auth/login'

//Ruta de mi app: sgundo parametro controlador
router.post('/login', [
    check('correo', 'El correo es obligatorio').isEmail(),
    check('password', 'El password es obligatorio').not().isEmpty(),

    validarCampos
], login);

//Ruta que reciba id-token de google
router.post('/google', [
    check('id_token', 'El id_token es obligatorio').not().isEmpty(),

    validarCampos
], googleSignin);

module.exports = router;
