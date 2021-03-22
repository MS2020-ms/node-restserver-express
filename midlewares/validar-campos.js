const { validationResult } = require('express-validator');

const validarCampos = (req, res, next) => {
    //validar todos los campos obligatorios 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors);
    }
    //si llega a este punto sigue con el siguiente midleware
    next();
}

module.exports = {
    validarCampos
}