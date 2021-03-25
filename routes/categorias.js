const { Router } = require('express');
const { check } = require('express-validator');

const { crearCategoria,
    obtenerCategorias,
    obtenerCategoria,
    actualizarCategoria,
    borrarCategoria } = require('../controllers/categorias');
const { validarJWT, validarCampos, esAdminRole } = require('../midlewares');
const { existeCategoriaPorId } = require('../helpers/db-validators');

const router = Router();

//path: '{{url}}/api/categorias'

//Obtener TODAS las categorias - publico (en abierto)
router.get('/', obtenerCategorias);

//Obtener una categoria por id - publico (en abierto)
router.get('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeCategoriaPorId),

    validarCampos
], obtenerCategoria);

//Crear una categoria - privado (cualquier persona con token valido)
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),

    validarCampos
], crearCategoria);

//Actualizar una categoria - privado (cualquier persona con token valido)
router.put('/:id', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('id').custom(existeCategoriaPorId),

    validarCampos
], actualizarCategoria);

//Borrar una categoria - privado (solo ADMIN_ROLE)
router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeCategoriaPorId),

    validarCampos
], borrarCategoria);


module.exports = router;