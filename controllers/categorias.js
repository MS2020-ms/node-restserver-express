const { response } = require('express');
const { Categoria } = require('../models/index');

//obtenerCategorias - paginado - total - populate {xa extraer solo el nombre del usuario} (mongoose)
//http://localhost:8080/api/categorias?desde=5
//http://localhost:8080/api/categorias?limit=5 

const obtenerCategorias = async (req = request, res = response) => {

    //limit: n° de registros | skip: desde donde empezar
    const { limite = 5, desde = 0 } = req.query;
    //SOLO los que tienen el estado en true (activos)
    const query = { estado: true };

    const [total, categorias] = await Promise.all([
        //N° total de registros "activos-> estado: true" en la coleccion (BD)
        Categoria.countDocuments(query),
        Categoria.find(query)
            .populate('usuario', 'nombre')
            .skip(Number(desde))
            .limit(Number(limite))
    ]);
    res.json({
        total,
        categorias
    });
}

//obtenerCategoria por Id - populate {} (mongoose)
const obtenerCategoria = async (req, res = response) => {

    //http://localhost:8080/api/categorias/:id
    const { id } = req.params
    //populate {xa extraer solo el nombre del usuario}
    const categoria = await Categoria.findById(id)
        .populate('usuario', 'nombre');

    res.json({ categoria });
}

//crearCategoria
const crearCategoria = async (req, res = response) => {

    const nombre = req.body.nombre.toUpperCase();

    //Busco si existe una categoria con ese nombre,
    const categoriaDB = await Categoria.findOne({ nombre });

    //si existe:
    if (categoriaDB) {
        return res.status(400).json({
            msg: `La categoria ${categoriaDB.nombre}, ya existe`
        });
    }

    //Generar la data a guardar
    const data = {
        nombre,
        //_id id de mongo
        usuario: req.usuario._id
    }

    //crea categoria
    const categoria = new Categoria(data);
    //Guardar DB
    await categoria.save();
    //Impresion
    res.status(201).json(categoria);
}

//actualizarCategoria
const actualizarCategoria = async (req, res = response) => {
    const { id } = req.params;
    //extraigo el estado y usuario xa que no se pueda modofocar
    const { estado, usuario, ...data } = req.body;

    data.nombre = data.nombre.toUpperCase();
    data.usuario = req.usuario._id;

    const categoria = await Categoria.findByIdAndUpdate(id, data, { new: true });

    res.json(categoria);
}

//borrarCategoria - cambiar estado:false
const borrarCategoria = async (req, res = response) => {
    const { id } = req.params;
    const categoriaBorrada = await Categoria.findByIdAndUpdate(id, { estado: false }, { new: true });

    res.json(categoriaBorrada);
}

module.exports = {
    crearCategoria,
    obtenerCategorias,
    obtenerCategoria,
    actualizarCategoria,
    borrarCategoria
}