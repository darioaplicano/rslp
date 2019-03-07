const mongoose = require('mongoose');

const ContenidoSchema = mongoose.Schema({
    titule: String,
    age: String,
    gender: String,
    synopsis: String,
    authorDirector: String,
    image: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Contenido', ContenidoSchema);