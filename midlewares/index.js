
const validarCampos = require('../midlewares/validar-campos');
const validarJWT = require('../midlewares/validar-jwt');
const validarRoles = require('../midlewares/validar-roles');
const validarArchivo = require('../midlewares/validar-archivo');


module.exports = {
    ...validarCampos,
    ...validarJWT,
    ...validarRoles,
    ...validarArchivo,
}