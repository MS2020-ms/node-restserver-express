const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos, validarArchivoSubir } = require('../midlewares');
const { cargarArchivo, actualizarImagen, mostrarImagen, actualizarImagenCloudinary } = require('../controllers/uploads');
const { coleccionesPermitidas } = require('../helpers');

const router = Router();

//path: '/api/uploads'
router.post('/', validarArchivoSubir, cargarArchivo);

//path: '/api/uploads/:coleccion/:id'
router.put('/:coleccion/:id', [
    validarArchivoSubir,
    check('id', 'El id debe ser un MongoId').isMongoId(),
    check('coleccion').custom(c => coleccionesPermitidas(c, ['usuarios', 'productos'])),
    validarCampos
], actualizarImagenCloudinary);
// ], actualizarImagen);

//path: '/api/uploads/:coleccion/:id'
router.get('/:coleccion/:id', [
    check('id', 'El id debe ser un MongoId').isMongoId(),
    check('coleccion').custom(c => coleccionesPermitidas(c, ['usuarios', 'productos'])),
    validarCampos
], mostrarImagen);

module.exports = router;
