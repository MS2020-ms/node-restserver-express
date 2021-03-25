const { Schema, model } = require('mongoose');

const CategoriaSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true
    },
    estado: {
        type: Boolean,
        default: true,
        required: true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        //igual que en models/usuario.js 'Usuario'
        ref: 'Usuario',
        required: true
    }
});

//Metodo toJSON - Sacar la version __v y el estado de la respuesta (res) - informacion sensible
CategoriaSchema.methods.toJSON = function () {
    //extraer __v, estado de la respuesta. Y el resto de argumentos agrupados en data:
    const { __v, estado, ...data } = this.toObject();
    return data;
}

//Nombre de la base de datos Categoria+s
module.exports = model('Categoria', CategoriaSchema);