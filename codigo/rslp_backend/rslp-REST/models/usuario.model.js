const mongoose = require('mongoose');

const UsuarioSchema = mongoose.Schema({
    nickname: String,
    correo: String,
    contrasena: String,
    imagen: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Usuario', UsuarioSchema);