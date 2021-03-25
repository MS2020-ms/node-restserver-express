
const { Schema, model } = require('mongoose');

const RoleSchema = Schema({
    rol: {
        type: String,
        required: [true, 'El rol es obligatorio']
    }
});

//Nombre de la base de datos Role+s
module.exports = model('Role', RoleSchema);