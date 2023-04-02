const mongoose = require ('mongoose');

let Schema = mongoose.Schema;

let ventasSchema = new Schema({
    cantProd: {
        type: String,
        required: [true, 'la cantidad es necesaria']
    },
    totalVenta: {
        type: String,
        required: [true, 'El total es necesario']
    },
    cambio: {
        type: String,
        required: [true, 'el cambio es necesaria']
    },
    ingreso: {
        type: String,
        required: [true, 'el ingreso es necesaria']
    },
},{
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    },
});

module.exports = mongoose.model('Ventas', ventasSchema);