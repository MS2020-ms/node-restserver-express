const { Schema, model } = require('mongoose');

const ProductoSchema = Schema({
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
    precio: {
        type: Number,
        default: 0
    },
    descripcion: {
        type: String
    },
    disponible: {
        type: Boolean,
        default: true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        //igual que en models/usuario.js 'Usuario'
        ref: 'Usuario',
        required: true
    },
    categoria: {
        type: Schema.Types.ObjectId,
        //igual que en models/categoria.js 'Categoria'
        ref: 'Categoria',
        required: true
    },
    img: {
        type: String,
    }
});

//Metodo toJSON - Sacar la version __v y el estado de la respuesta (res) - informacion sensible
ProductoSchema.methods.toJSON = function () {
    //extraer __v, estado de la respuesta. Y el resto de argumentos agrupados en data:
    const { __v, estado, ...data } = this.toObject();
    return data;
}

//Nombre de la base de datos Producto+s
module.exports = model('Producto', ProductoSchema);