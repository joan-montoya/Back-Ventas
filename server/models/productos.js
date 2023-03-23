const mongoose = require ('mongoose');

let Schema = mongoose.Schema;

let productoSchema = new Schema({
    //_id: {
    //    type: String,
    //    required: [true, 'El id es necesario']   
   // },
    nombre: {
        type: String,
        required: [true, 'El nombre es necesario']
    },
    categoriaID: {
        type: String,
        required: [true, 'El nombre es necesario']
    },
    cantidad: {
        type: String,
        required: [true, 'La contraseña es necesaria']
    },
    cantidadMed: {
        type: String,
        required: [true, 'La contraseña es necesaria']
    },
    cantidadMax: {
        type: String,
        required: [true, 'La contraseña es necesaria']
    },
    precio: {
        type: String,
        required: [true, 'La contraseña es necesaria']
    }
},{
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    },
});

module.exports = mongoose.model('Producto', productoSchema);