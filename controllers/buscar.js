const { response } = require('express');
const { ObjectId } = require('mongoose').Types;
const { Usuario, Categoria, Producto } = require('../models')

const coleccionesExistentes = [
    'usuarios',
    'categorias',
    'productos',
    'roles'
];

const buscarUsuarios = async (termino = '', res = response) => {

    const esMongoId = ObjectId.isValid(termino); //si es valido = true, si no false

    if (esMongoId) {
        const usuario = await Usuario.findById(termino);

        //return xa que no siga ejecutando nada de la funcion
        return res.json({
            //si el usuario existe, envio array con usuario. Si no un array vacio
            results: [usuario] ? [usuario] : []
        });
    } else {
        //Si no es un mongoId, es un termino  -> buscar por nombre o correo
        //expresion regular termino 'i' insensible a las Mayusculas y minusculas
        const regex = new RegExp(termino, 'i');

        const usuarios = await Usuario.find({
            //y que esten activos estardo: true
            $or: [{ nombre: regex }, { correo: regex }],
            $and: [{ estado: true }]
        });

        const count = await Usuario.countDocuments({
            //y que esten activos estado: true
            $or: [{ nombre: regex }, { correo: regex }],
            $and: [{ estado: true }]
        });

        res.json({
            count,
            results: usuarios,
        });
    }

}

const buscarCategorias = async (termino = '', res = response) => {

    const esMongoId = ObjectId.isValid(termino); //si es valido = true, si no false

    if (esMongoId) {
        const categoria = await Categoria.findById(termino);

        //return xa que no siga ejecutando nada de la funcion
        return res.json({
            //si el categoria existe, envio array con categoria. Si no un array vacio
            results: [categoria] ? [categoria] : []
        });
    } else {
        //Si no es un mongoId, es un termino  -> buscar por nombre o correo
        //expresion regular termino 'i' insensible a las Mayusculas y minusculas
        const regex = new RegExp(termino, 'i');

        //Y que esten activos estado: true
        const categorias = await Categoria.find({ nombre: regex, estado: true });

        const count = await Categoria.countDocuments({ nombre: regex, estado: true });

        res.json({
            count,
            results: categorias,
        });
    }

}

const buscarProductos = async (termino = '', res = response) => {

    const esMongoId = ObjectId.isValid(termino); //si es valido = true, si no false

    if (esMongoId) {
        const producto = await Producto.findById(termino).populate('categoria', 'nombre');

        //return xa que no siga ejecutando nada de la funcion
        return res.json({
            //si el producto existe, envio array con producto. Si no un array vacio
            results: [producto] ? [producto] : []
        });
    } else {
        //Si no es un mongoId, es un termino  -> buscar por nombre o correo
        //expresion regular termino 'i' insensible a las Mayusculas y minusculas
        const regex = new RegExp(termino, 'i');

        //Y que esten activos estado: true
        //Y que se muestre el nombre de la categoria 
        const productos = await Producto.find({ nombre: regex, estado: true })
            .populate('categoria', 'nombre');

        const count = await Producto.countDocuments({ nombre: regex, estado: true });

        res.json({
            count,
            results: productos,
        });
    }

}

const buscar = (req = request, res = response) => {

    const { coleccion, termino } = req.params;

    if (!coleccionesExistentes.includes(coleccion)) {
        return res.status(400).json({
            msg: `Las colecciones permitidas son: ${coleccionesExistentes}`
        })
    }

    switch (coleccion) {
        case 'usuarios':
            buscarUsuarios(termino, res);
            break;
        case 'categorias':
            buscarCategorias(termino, res);
            break;
        case 'productos':
            buscarProductos(termino, res);
            break;
        default:
            res.status(500).json({
                msg: 'Se le olvido hacer esta busqueda'
            })
    }

}

module.exports = {
    buscar
}