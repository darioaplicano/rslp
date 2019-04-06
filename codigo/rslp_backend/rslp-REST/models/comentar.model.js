const mongoose = require('mongoose');

const comentarSchema = mongoose.Schema({
    valoracion: Number,
    comentario: String,
    usuario: {type: mongoose.Schema.Types.ObjectId, ref: 'Usuario'},
    contenido: {type: mongoose.Schema.Types.ObjectId, ref: 'Contenido'}
}, {
    timestamps: true
});

module.exports = mongoose.model('Comentario', comentarSchema);