const mongoose = require ('mongoose');

let Schema = mongoose.Schema;

let usuariorSchema = new Schema({
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
    },
    password: {
        type: String,
        required: [true, 'La contraseña es necesaria']
    },
    rol: {
        type: String,
        default: "1",
      },
},{
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    },
});

module.exports = mongoose.model('Usuarior', usuariorSchema);