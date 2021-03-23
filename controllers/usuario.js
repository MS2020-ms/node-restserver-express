const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');

//controlador
const usuariosGet = async (req = request, res = response) => {
    //http://localhost:8080/api/usuarios?desde=5
    //http://localhost:8080/api/usuarios?limit=5

    // res.send('Hello World');
    // res.status(401).send('Hello World');

    //limit: n° de registros | skip: desde donde empezar
    const { limite = 5, desde = 0 } = req.query;
    //SOLO los que tienen el estado en true (activos)
    const query = { estado: true };

    const [total, usuarios] = await Promise.all([
        //N° total de registros "activos-> estado: true" en la coleccion (BD)
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ])

    res.json({
        total,
        usuarios
    });
}

const usuariosPut = async (req, res = response) => {

    //http://localhost:8080/api/usuarios/:id
    const { id } = req.params
    //puedo extraer el password, google, correo y el agrupo resto de argumentos
    //los extraigo y no hago nada con ellos, no les permito cambiar
    const { _id, password, google, correo, ...resto } = req.body;

    //TODO Validar contra la BD

    if (password) {
        //encriptar contrasena (salt: n° de vueltas de encriptacion - seguridad)-(por defecto: 10)
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    res.json({
        usuario
    });
}

const usuariosPost = async (req, res = response) => {

    //leer y parsear lo que viene en peticion post (body)
    //puedo extraer el google y el agrupo resto de argumentos => const { google, ...resto } = req.body;
    const { nombre, correo, password, rol } = req.body;
    //nueva instancia de mi usuario
    const usuario = new Usuario({ nombre, correo, password, rol });

    //encriptar contrasena (salt: n° de vueltas de encriptacion - seguridad)-(por defecto: 10)
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    //grabar usuario en BD
    await usuario.save();

    res.json({
        usuario
    });
}

const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - Controlador'
    });
}

const usuariosDelete = async (req, res = response) => {

    //http://localhost:8080/api/usuarios/:id
    const { id } = req.params;

    //OP1: Borrar Fisicamente de BD
    //const usuario = await Usuario.findByIdAndDelete(id);

    //OP2: Cambiar el estado del usuario a false
    const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });

    const usuarioAutenticado = req.usuario;

    //recibo el usuario, uid, usuarioAutenticado
    res.json({ usuario, usuarioAutenticado });
}

module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosPatch,
    usuariosDelete
}