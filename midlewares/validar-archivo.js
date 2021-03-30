const { response } = require("express")

const validarArchivoSubir = (req, res = response, next) => {

    //verificar que venga los files y que venga mas de uno
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            msg: 'No hay archivos que subir - validarArchivoSubir'
        });
    }

    //verificar que se llame archivo
    if (!req.files.archivo) {
        return res.status(400).json({
            msg: 'No hay archivos que subir - validarArchivoSubir'
        });
    }

    //para que continue con el siguient emiddleware
    next();
}

module.exports = {
    validarArchivoSubir
}