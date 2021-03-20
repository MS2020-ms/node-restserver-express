const { response } = require('express')

const usuariosGet = (req = request, res = response) => {
    // res.send('Hello World');
    // res.status(401).send('Hello World');

    //http://localhost:8080/api/usuarios?q=hola&nombre=fernando&apikey=123456
    // const query = req.query;
    const { q, nombre = 'No name', apikey } = req.query;

    res.json({
        msg: 'get API - Controlador',
        q,
        nombre,
        apikey
    });
}

const usuariosPut = (req, res = response) => {

    //http://localhost:8080/api/usuarios/10
    // const {id} = req.params
    const id = req.params.id

    res.json({
        msg: 'put API - Controlador',
        id
    });
}

const usuariosPost = (req, res = response) => {

    //leer y parsear lo que viene en peticion post (body)
    const { nombre, edad } = req.body;

    res.json({
        msg: 'post API - Controlador',
        nombre,
        edad
    });
}

const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - Controlador'
    });
}

const usuariosDelete = (req, res = response) => {
    res.json({
        msg: 'delete API - Controlador'
    });
}

module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosPatch,
    usuariosDelete
}