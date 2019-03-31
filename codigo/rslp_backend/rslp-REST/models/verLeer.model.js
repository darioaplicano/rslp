const mongoose = require('mongoose');

const verLeerSchema = mongoose.Schema({
    usuario: {type: mongoose.Schema.Types.ObjectId, ref: 'Usuario'},
    contenido: {type: mongoose.Schema.Types.ObjectId, ref: 'Contenido'}
}, {
    timestamps: true
});

verLeerSchema.index({usuario:1, contenido:1}, {unique: true});

module.exports = mongoose.model('verLeer', verLeerSchema);