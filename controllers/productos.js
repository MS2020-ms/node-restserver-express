const { response } = require('express');
const { Producto } = require('../models/index');

//obtenerProductos - paginado - total - populate {xa extraer solo el nombre del usuario} (mongoose)
//http://localhost:8080/api/productos?desde=5
//http://localhost:8080/api/productos?limit=5 

const obtenerProductos = async (req = request, res = response) => {

    //limit: n° de registros | skip: desde donde empezar
    const { limite = 5, desde = 0 } = req.query;
    //SOLO los que tienen el estado en true (activos)
    const query = { estado: true };

    const [total, productos] = await Promise.all([
        //N° total de registros "activos-> estado: true" en la coleccion (BD)
        Producto.countDocuments(query),
        Producto.find(query)
            .populate('usuario', 'nombre')
            .populate('categoria', 'nombre')
            .skip(Number(desde))
            .limit(Number(limite))
    ]);
    res.json({
        total,
        productos
    });
}

//obtenerProducto por Id - populate {} (mongoose)
const obtenerProducto = async (req, res = response) => {

    //http://localhost:8080/api/productos/:id
    const { id } = req.params
    //populate {xa extraer solo el nombre del usuario}
    const producto = await Producto.findById(id)
        .populate('usuario', 'nombre')
        .populate('categoria', 'nombre');

    res.json({ producto });
}

//crearProducto
const crearProducto = async (req, res = response) => {

    const { estado, usuario, ...body } = req.body;

    //Busco si existe un producto con ese nombre,
    const productoDB = await Producto.findOne({ nombre: body.nombre });

    //si existe:
    if (productoDB) {
        return res.status(400).json({
            msg: `El producto ${productoDB.nombre}, ya existe`
        });
    }

    //Generar la data a guardar
    const data = {
        ...body,
        nombre: body.nombre.toUpperCase(),
        //_id id de mongo
        usuario: req.usuario._id
    }

    //crea categoria
    const producto = new Producto(data);
    //Guardar DB
    await producto.save();
    //Impresion
    res.status(201).json(producto);
}

//actualizarProducto
const actualizarProducto = async (req, res = response) => {
    const { id } = req.params;
    //extraigo el estado y usuario xa que no se pueda modofocar
    const { estado, usuario, ...data } = req.body;

    if (data.nombre) {
        data.nombre = data.nombre.toUpperCase();
    }

    data.usuario = req.usuario._id;

    const producto = await Producto.findByIdAndUpdate(id, data, { new: true });

    res.json(producto);
}

//borrarProducto - cambiar estado:false
const borrarProducto = async (req, res = response) => {
    const { id } = req.params;
    const productoBorrado = await Producto.findByIdAndUpdate(id, { estado: false }, { new: true });

    res.json(productoBorrado);
}

module.exports = {
    crearProducto,
    obtenerProductos,
    obtenerProducto,
    actualizarProducto,
    borrarProducto
}