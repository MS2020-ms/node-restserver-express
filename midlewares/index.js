
const validarCampos = require('../midlewares/validar-campos');
const validarJWT = require('../midlewares/validar-jwt');
const validarRoles = require('../midlewares/validar-roles');

module.exports = {
    ...validarCampos,
    ...validarJWT,
    ...validarRoles,
}