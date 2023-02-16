const mongoose = require ('mongoose');

let Schema = mongoose.Schema;

let emailSchema = new Schema({
    email:{
        type: String,
        required: [true, 'El correo es necesario'],
        unique: true
    }
},{
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    },
});

module.exports = mongoose.model('Email', emailSchema);