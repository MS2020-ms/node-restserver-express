const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../midlewares/validar-campos');
const { esRolValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators');

const { usuariosGet, usuariosPut, usuariosPost, usuariosPatch, usuariosDelete } = require('../controllers/usuario');

const router = Router();

//path: '/api/usuarios'
//Ruta de mi app:
router.get('/', usuariosGet);

//segundo parametro: array de midlewares (validadores)
router.put('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    check('rol').custom(esRolValido),

    validarCampos
], usuariosPut);

//segundo parametro: array de midlewares (validadores)
router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio y tener min 5 carateres').isLength({ min: 5 }),
    check('correo', 'El correo no es valido!').isEmail(),
    //validacion personalizado - db-validators
    check('correo').custom(emailExiste),
    //validacion personalizado - db-validators
    check('rol').custom(esRolValido),

    validarCampos
], usuariosPost);

router.patch('/', usuariosPatch);

router.delete('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),

    validarCampos
], usuariosDelete);

module.exports = router;