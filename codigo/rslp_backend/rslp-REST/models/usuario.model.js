const mongoose = require('mongoose');

const UsuarioSchema = mongoose.Schema({
    nickname: {type: String, index: {unique: true}},
    correo: {type: String, index: {unique: true}},
    contrasena: String,
    imagen: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Usuario', UsuarioSchema);