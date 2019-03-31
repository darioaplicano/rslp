const mongoose = require('mongoose');

const vistoLeidoSchema = mongoose.Schema({
    usuario: {type: mongoose.Schema.Types.ObjectId, ref: 'Usuario'},
    contenido: {type: mongoose.Schema.Types.ObjectId, ref: 'Contenido'},
    recomienda: Boolean
}, {
    timestamps: true
});

vistoLeidoSchema.index({usuario:1, contenido:1}, {unique: true});

module.exports = mongoose.model('vistoLeido', vistoLeidoSchema);