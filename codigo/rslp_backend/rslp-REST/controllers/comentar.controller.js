const Comment = require('../models/comentar.model.js');

//CRUD:

//Create:
// Creates and writes a new comment to the database
exports.create = (req, res) => {
    // TODO: Validate request
    // Validate request
    if(!req.body.valoracion) {
        return res.status(400).send({
            message: "La valoración no puede estar vacía"
        });
    }
    if(!req.body.comentario) {
        return res.status(400).send({
            message: "El comentario no puede estar vacío"
        });
    }
    if(!req.body.usuario) {
        return res.status(400).send({
            message: "El usuario ID no puede estar vacío"
        });
    }
    if(!req.body.contenido) {
        return res.status(400).send({
            message: "El contenido ID no puede estar vacío"
        });
    }

    // Create a comment
    const comentar = new Comment({
        valoracion: req.body.valoracion,
        comentario: req.body.comentario,
        usuario: req.body.usuario,
        contenido: req.body.contenido,
    });

    // Save comment in the database
    comentar.save()
    .then(comentar => {
        res.send(comentar);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the comment."
        });
    });
};

//Read:
// Retrieve and return all follows from the database.
exports.findAll = (req, res) => {
    Comment.find()
    .populate('usuario')
    .populate('contenido')
    .then(follows => {
        res.send(follows);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving follows."
        });
    });
};

// Retrieve and return comment with userid and contenid from the database.
exports.findOne = (req, res) => {
    Comment.findOne({usuario:req.params.userid, contenido:req.params.contenid})
    .populate('usuario')
    .populate('contenido')
    .then(comentar => {
        if(!comentar) {
            return res.status(404).send({
                message: "Comment no encontrado por id " + req.params.contenid+","+req.params.userid
            });            
        }
        res.send(comentar);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving comment."
        });
    });
};

exports.findByUsuario = (req, res) => {
    Comment.find({usuario:req.params.userid})
    .populate('usuario')
    .populate('contenido')
    .then(comentar => {
        if(!comentar) {
            return res.status(404).send({
                message: "Comment no encontrado por id " +req.params.userid
            });            
        }
        res.send(comentar);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving comment."
        });
    });
};

exports.findByContenido = (req, res) => {
    Comment.find({contenido:req.params.contenid})
    .populate('usuario')
    .populate('contenido')
    .then(comentar => {
        if(!comentar) {
            return res.status(404).send({
                message: "Comment no encontrado por id " + req.params.contenid
            });            
        }
        res.send(comentar);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving comment."
        });
    });
};

// Update:
// Update the fields of the comment with the given id.
exports.update = (req, res) => {
    // Find and update comment with the request body
    Comment.findOneAndUpdate({usuario:req.params.userid, contenido:req.params.contenid}, {
        valoracion: req.body.valoracion,
        comentario: req.body.comentario,
        usuario: req.body.userid,
        contenido: req.body.contenid
    }, {new: false})
    .populate('usuario')
    .populate('contenido')
    .then(comment => {
        if(!comment) {
            return res.status(404).send({
                message:"Comment no encontrado por id " + req.params.userid+","+req.params.contenid
            });
        }
        res.send(comment);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while updating comment."
        });
    });
};

//Delete:
// Delete comment with the given id
exports.delete = (req, res) => {
    // Delete the comment
    Comment.findOneAndDelete({usuario:req.params.userid, contenido:req.params.contenid})
    .then(comment => {
        if(!comment) {
            return res.status(404).send({
                message: "Comment no encontrado por id " + req.params.userid+","+req.params.contenid
            });
        }
        res.send({"message": "Comment eliminado con éxito"});
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while deleting comment."
        });
    });
};

//Delete All:
// Delete comment with the given id
exports.delete = (req, res) => {
    // Delete the comment
    Comment.findOneAndDelete({contenido:req.params.contenid})
    .then(comment => {
        if(!comment) {
            return res.status(404).send({
                message: "Comment no encontrado por id " +req.params.contenid
            });
        }
        res.send({"message": "Comments eliminados con éxito"});
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while deleting comment."
        });
    });
};