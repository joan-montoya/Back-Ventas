const mongoose = require ('mongoose');

let Schema = mongoose.Schema;

let categoriaSchema = new Schema({
    //_id: {
    //    type: String,
    //    required: [true, 'El id es necesario']   
   // },
    nombreCat: {
        type: String,
        required: [true, 'El nombre es necesario']
    },
    descripcion: {
        type: String,
        required: [true, 'El nombre es necesario']
    },
},{
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    },
});

module.exports = mongoose.model('Categoria', categoriaSchema);