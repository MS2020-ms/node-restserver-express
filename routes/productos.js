const { Router } = require('express');
const { check } = require('express-validator');

const { crearProducto,
    obtenerProductos,
    obtenerProducto,
    actualizarProducto,
    borrarProducto } = require('../controllers/productos');

const { validarJWT, validarCampos, esAdminRole } = require('../midlewares');

const { existeCategoriaPorId, existeProductoPorId } = require('../helpers/db-validators');

const router = Router();

//path: '{{url}}/api/productos'

//Obtener TODAS Productos - publico (en abierto)
router.get('/', obtenerProductos);

//Obtener UN Producto por id - publico (en abierto)
router.get('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeProductoPorId),

    validarCampos
], obtenerProducto);

//Crear UN Producto - privado (cualquier persona con token valido)
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('categoria', 'No es un id de Mongo').isMongoId(),
    check('categoria').custom(existeCategoriaPorId),

    validarCampos
], crearProducto);

//Actualizar UN Producto - privado (cualquier persona con token valido)
router.put('/:id', [
    validarJWT,
    // check('categoria', 'No es un id de Mongo').isMongoId(),
    check('id').custom(existeProductoPorId),

    validarCampos
], actualizarProducto);

//Borrar UN Producto - privado (solo ADMIN_ROLE)
router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeProductoPorId),

    validarCampos
], borrarProducto);


module.exports = router;