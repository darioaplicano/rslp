const vistoLeido = require('../models/vistoLeido.model.js');
 
//CRUD:

//Create:
// Creates and writes a new saw or read to the database
exports.create = (req, res) => {
    // TODO: Validate request
    

    // Create a vistoLeido
    const vL = new vistoLeido({
        usuario: req.body.userid,
        contenido: req.body.contenid,
        recomienda: req.body.recomienda
    });

    // Save verLeer in the database
    vL.save()
    .then(verL => {
        res.send(verL);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Se produjo algún error al crear el vistoLeido."
        });
    });
};

//Read:
// Retrieve and return all vistoLeido from the database.
exports.findAll = (req, res) => {
    vistoLeido.find()
    .populate('usuario')
    .populate('contenido')
    .then(verL => {
        res.send(verL);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving vistoLeido."
        });
    });
};

// Retrieve and return vistoLeido with userid and contenid from the database.
exports.findOne = (req, res) => {
    vistoLeido.findOne({usuario:req.params.userid, contenido:req.params.contenid})
    .populate('usuario')
    .populate('contenido')
    .then(verL => {
        if(!verL) {
            return res.status(404).send({
                message: "vistoLeido no encontrado por id " + req.params.userid+","+req.params.contenid
            });            
        }
        res.send(verL);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving vistoLeido."
        });
    });
};

exports.findByUsuario = (req, res) => {
    vistoLeido.find({usuario:req.params.userid})
    .populate('usuario')
    .populate('contenido')
    .then(verL => {
        if(!verL) {
            return res.status(404).send({
                message: "vistoLeido no encontrado por id " +req.params.userid
            });            
        }
        res.send(verL);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving vistoLeido."
        });
    });
};

exports.findByContenido = (req, res) => {
    vistoLeido.find({contenido:req.params.contenid})
    .populate('usuario')
    .populate('contenido')
    .then(verL => {
        if(!verL) {
            return res.status(404).send({
                message: "vistoLeido no encontrado por id " + req.params.contenid
            });            
        }
        res.send(verL);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving vistoLeido."
        });
    });
};

// Update:
// Update the fields of the vistoLeido with the given id.
exports.update = (req, res) => {
    // Find and update vistoLeido with the request body
    vistoLeido.findOneAndUpdate({usuario:req.params.usuario, contenido:req.params.contenido}, {
        usuario: req.body.usuario,
        contenido: req.body.contenido,
        recomienda: req.body.recomienda
    }, {new: false})
    .populate('usuario')
    .populate('contenido')
    .then(verL => {
        if(!verL) {
            return res.status(404).send({
                message: "vistoLeido no encontrado por id "  + req.params.usuario+","+req.params.contenido
            });
        }
        res.send(verL);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while updating vistoLeido."
        });
    });
};

//Delete:
// Delete vistoLeido with the given id
exports.delete = (req, res) => {
    // Delete the vistoLeido
    vistoLeido.findOneAndDelete({usuario:req.params.userid, contenido:req.params.contenid})
    .then(verL => {
        if(!verL) {
            return res.status(404).send({
                message: "vistoLeido no encontrado por id " + req.params.userid+","+req.params.contenid
            });
        }
        res.send({"message": "vistoLeido eliminado con éxito"});
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while deleting vistoLeido."
        });
    });
};