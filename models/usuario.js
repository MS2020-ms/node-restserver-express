const { Schema, model } = require('mongoose');


const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        //correo debe ser unico
        unique: true
    },
    password: {
        type: String,
        required: [true, 'El password  es obligatorio']
    },
    img: {
        type: String
    },
    rol: {
        type: String,
        required: true,
        enum: ['ADMIN_ROLE', 'USER_ROLE']
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    },
});

//Metodo toJSON - Sacar el password y __v de la respuesta (res) - informacion sensible
UsuarioSchema.methods.toJSON = function () {
    //extraer __v, password y el resto de argumentos agrupados en usuario:
    const { __v, password, ...usuario } = this.toObject();
    return usuario;
}

//Nombre de la base de datos Usuario+s
module.exports = model('Usuario', UsuarioSchema);
