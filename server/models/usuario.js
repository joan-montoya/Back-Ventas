const mongoose = require ('mongoose');

let Schema = mongoose.Schema;

let usuarioSchema = new Schema({
    //_id: {
    //    type: String,
    //    required: [true, 'El id es necesario']   
   // },
    nombre: {
        type: String,
        required: [true, 'El nombre es necesario']
    },
    apellidos: {
        type: String,
        required: [true, 'El nombre es necesario']
    },
    email:{
        type: String,
        required: [true, 'El correo es necesario'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es necesaria']
    },
    telefono: {
        type: String,
        required: [true, 'El telefono es necesario']
    },
    nombreempresa: {
        type: String,
        required: [true, 'El nombre de la empresa es necesario']
    },
},{
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    },
});

module.exports = mongoose.model('Usuario', usuarioSchema);