const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');

const { generarJWT } = require('../helpers/generar-jwt');
const { googleVerify } = require('../helpers/google-verify');

//Controlador:
const login = async (req = request, res = response) => {

    const { correo, password } = req.body;

    try {

        //Verificar si correo existe
        const usuario = await Usuario.findOne({ correo });
        if (!usuario) {
            return res.status(400).json({
                msg: 'Usuario/Password no son correctos - correo'
            });
        }

        //Verificar si usuario activo en BD (estado: true/false)
        //equivale (!usuario.estado)
        if (usuario.estado === false) {
            return res.status(400).json({
                msg: 'Usuario/Password no son correctos - estado:false'
            });
        }

        //Verificar password
        const validPassword = bcryptjs.compareSync(password, usuario.password);
        if (!validPassword) {
            return res.status(400).json({
                msg: 'Usuario/Password no son correctos - password'
            });
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
        });
    }
}

const googleSignin = async (req, res = response) => {

    const { id_token } = req.body;

    try {
        const { correo, nombre, img } = await googleVerify(id_token);

        let usuario = await Usuario.findOne({ correo });

        //si el usuario no existe tengo que crearlo y guardar en BD
        if (!usuario) {
            const data = {
                nombre,
                correo,
                password: ':P',
                img,
                google: true
            };
            usuario = new Usuario(data);
            await usuario.save();
        }

        //si el usuario en BD tien el estado en false (inactivo)
        if (!usuario.estado) {
            return res.status(401).json({
                msg: 'Hable con el administrador, usuario inactivo o bloqueado'
            });
        }

        //Generar JWT
        const token = await generarJWT(usuario.id);

        res.json({
            msg: 'Todo ok! google signin',
            usuario,
            token
        })

    } catch (error) {
        res.status(400).json({
            msg: 'Token de Google no es valido'
        })
    }
}

module.exports = {
    login,
    googleSignin
}