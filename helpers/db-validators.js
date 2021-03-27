// const Role = require('../models/role');
// const Usuario = require('../models/usuario');
// const Categoria = require('../models/categoria');

const { Role, Usuario, Categoria, Producto } = require('../models');

//validar si rol es valido
const esRolValido = async (rol = '') => {
    const existeRol = await Role.findOne({ rol });
    if (!existeRol) {
        throw new Error(`El rol ${rol} no esta registrado en la base de datos`);
    }
}

//validar si correo ya existe
const emailExiste = async (correo = '') => {
    const existeEmail = await Usuario.findOne({ correo });
    if (existeEmail) {
        throw new Error(`El Email: ${correo}, ya esta registrado!`);
    }
}

//validar si usuario por ID ya existe
const existeUsuarioPorId = async (id) => {
    const existeUsuario = await Usuario.findById(id);
    if (!existeUsuario) {
        throw new Error(`El Id: ${id}, no existe`);
    }
}

//validar si categoria por ID ya existe
const existeCategoriaPorId = async (id) => {
    const existeCategoria = await Categoria.findById(id);
    if (!existeCategoria) {
        throw new Error(`El Id: ${id}, no existe`);
    }
}

//validar si producto por ID ya existe
const existeProductoPorId = async (id) => {
    const existeProducto = await Producto.findById(id);
    if (!existeProducto) {
        throw new Error(`El Id: ${id}, no existe`);
    }
}

module.exports = {
    esRolValido,
    emailExiste,
    existeUsuarioPorId,
    existeCategoriaPorId,
    existeProductoPorId
}