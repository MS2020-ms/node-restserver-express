const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');

const { generarJWT } = require('../helpers/generar-jwt');

//controlador:
const login = async (req = request, res = response) => {

    const { correo, password } = req.body;

    try {

        //Verificar si correo existe
        const usuario = await Usuario.findOne({ correo });
        if (!usuario) {
            return res.status(400).json({
                msg: 'Usuario/Password no son correctos - correo'
            })
        }

        //Verificar si usuario activo en BD (estado: true/false)
        //equivale (!usuario.estado)
        if (usuario.estado === false) {
            return res.status(400).json({
                msg: 'Usuario/Password no son correctos - estado:false'
            })
        }

        //Verificar password
        const validPassword = bcryptjs.compareSync(password, usuario.password);
        if (!validPassword) {
            return res.status(400).json({
                msg: 'Usuario/Password no son correctos - password'
            })
        }

        //Generar JWT
        const token = await generarJWT(usuario.id);

        res.json({
            //msg: 'Login OK'
            //retorno usuario y login
            usuario,
            token
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador del Server'
        })
    }
}

module.exports = {
    login
}