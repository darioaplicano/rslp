const mongoose = require('mongoose');

const SigueSchema = mongoose.Schema({
    seguidor: {type: mongoose.Schema.Types.ObjectId, ref: 'Usuario'},
    seguido: {type: mongoose.Schema.Types.ObjectId, ref: 'Usuario'}
}, {
    timestamps: true
});

SigueSchema.index({seguidor:1, seguido:1}, {unique: true});

module.exports = mongoose.model('Sigue', SigueSchema);