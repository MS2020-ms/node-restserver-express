const path = require('path');
const fs = require('fs');

const cloudinary = require('cloudinary').v2
cloudinary.config(process.env.CLOUDINARY_URL);

const { response } = require('express');
const { subirArchivo } = require('../helpers');

const { Usuario, Producto } = require('../models')

const cargarArchivo = async (req = request, res = response) => {

    try {
        // txt o md:
        // const nombre = await subirArchivo(req.files, ['txt', 'md'], 'textos');
        // Imagenes:
        const nombre = await subirArchivo(req.files, undefined, 'imgs');

        res.json({
            nombre: nombre
        });
    } catch (error) {
        res.status(400).json({ msg });
    }
}

const actualizarImagen = async (req, res = response) => {

    const { id, coleccion } = req.params;

    let modelo;

    //comprobar que exista un usuario o producto con ese id
    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe un usuario con el id ${id}`
                });
            }
            break;
        case 'productos':
            modelo = await Producto.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe un producto con el id ${id}`
                });
            }
            break;
        default:
            return res.status(500).json({ msg: 'Se me olvido validar esto' });
    }

    //Antes de subir el archivo: Limpiar imagenes previas
    //si existe la imagen = modelo viene con imagen
    if (modelo.img) {
        //borrar la imagen del servidor
        const pathImagen = path.join(__dirname, '../uploads', coleccion, modelo.img);
        if (fs.existsSync(pathImagen)) {
            //borrar el archivo
            fs.unlinkSync(pathImagen);
        }
    }

    const nombre = await subirArchivo(req.files, undefined, coleccion);
    modelo.img = nombre;

    await modelo.save();

    res.json({
        modelo
    });
}

//actualizar imagen en Cloudinary:
const actualizarImagenCloudinary = async (req, res = response) => {

    const { id, coleccion } = req.params;

    let modelo;

    //comprobar que exista un usuario o producto con ese id
    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe un usuario con el id ${id}`
                });
            }
            break;
        case 'productos':
            modelo = await Producto.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe un producto con el id ${id}`
                });
            }
            break;
        default:
            return res.status(500).json({ msg: 'Se me olvido validar esto' });
    }

    //Antes de subir el archivo: Limpiar imagenes previas
    //si existe la imagen = modelo viene con imagen
    if (modelo.img) {
        const nombreArr = modelo.img.split('/');
        const nombre = nombreArr[nombreArr.length - 1];
        const [public_id] = nombre.split('.');

        await cloudinary.uploader.destroy(public_id);
    }

    // Subir a Cloudinary:
    // console.log(req.files.archivo);
    const { tempFilePath } = req.files.archivo
    const { secure_url } = await cloudinary.uploader.upload(tempFilePath);
    modelo.img = secure_url;

    await modelo.save();

    res.json({ modelo });
}

const mostrarImagen = async (req, res = response) => {

    // const { id, coleccion } = req.params;
    // res.json({
    //     id,
    //     coleccion
    // })

    const { id, coleccion } = req.params;

    let modelo;

    //comprobar que exista un usuario o producto con ese id
    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe un usuario con el id ${id}`
                });
            }
            break;
        case 'productos':
            modelo = await Producto.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe un producto con el id ${id}`
                });
            }
            break;

        default:
            return res.status(500).json({ msg: 'Se me olvido validar esto' });
    }

    //Antes de subir el archivo: Limpiar imagenes previas
    //si existe la imagen = modelo viene con imagen
    if (modelo.img) {
        //borrar la imagen del servidor
        const pathImagen = path.join(__dirname, '../uploads', coleccion, modelo.img);
        if (fs.existsSync(pathImagen)) {
            //mostar imagen
            return res.sendFile(pathImagen)

        }
    }

    //Si no existe imagen:
    //res.json({ msg: 'Falta place-holder' });

    const pathImagenPlaceholder = path.join(__dirname, '../assets/no-image.jpg');
    return res.sendFile(pathImagenPlaceholder)

}

module.exports = {
    cargarArchivo,
    actualizarImagen,
    mostrarImagen,
    actualizarImagenCloudinary
}