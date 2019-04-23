const verLeer = require('../models/verLeer.model.js');
 
//CRUD:
 
//Create:
// Creates and writes a new see or read to the database
exports.create = (req, res) => {
    // TODO: Validate request
    

    // Create a verLeer
    const vL = new verLeer({
        usuario: req.body.usuario,
        contenido: req.body.contenido,
    });

    // Save verLeer in the database
    vL.save()
    .then(verL => {
        res.send(verL);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Se produjo algún error al crear el ver o leer."
        });
    });
};

//Read:
// Retrieve and return all verLeer from the database.
exports.findAll = (req, res) => {
    verLeer.find()
    .populate('usuario')
    .populate('contenido')
    .then(verL => {
        res.send(verL);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving verLeer."
        });
    });
};

// Retrieve and return verLeer with userid and contenid from the database.
exports.findOne = (req, res) => {
    verLeer.findOne({usuario:req.params.userid, contenido:req.params.contenid})
    .populate('usuario')
    .populate('contenido')
    .then(verL => {
        if(!verL) {
            return res.status(404).send({
                message: "verLeer no encontrado por id " + req.params.userid+","+req.params.contenid
            });            
        }
        res.send(verL);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving verLeer."
        });
    });
};

exports.findByUsuario = (req, res) => {
    verLeer.find({usuario:req.params.userid})
    .populate('usuario')
    .populate('contenido')
    .then(verL => {
        if(!verL) {
            return res.status(404).send({
                message: "verLeer no encontrado por id " +req.params.userid
            });            
        }
        res.send(verL);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving verLeer."
        });
    });
};

exports.findByContenido = (req, res) => {
    verLeer.find({contenido:req.params.contenid})
    .populate('usuario')
    .populate('contenido')
    .then(verL => {
        if(!verL) {
            return res.status(404).send({
                message: "verLeer no encontrado por id " + req.params.contenid
            });            
        }
        res.send(verL);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving verLeer."
        });
    });
};

// Update:
// Update the fields of the verLeer with the given id.
exports.update = (req, res) => {
    // Find and update verLeer with the request body
    verLeer.findOneAndUpdate({usuario:req.params.userid, contenido:req.params.contenid}, {
        usuario: req.body.userid,
        contenido: req.body.contenid
    }, {new: false})
    .populate('usuario')
    .populate('contenido')
    .then(verL => {
        if(!verL) {
            return res.status(404).send({
                message: "verLeer no encontrado por id "  + req.params.userid+","+req.params.contenid
            });
        }
        res.send(verL);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while updating verLeer."
        });
    });
};

//Delete:
// Delete verLeer with the given id
exports.delete = (req, res) => {
    // Delete the verLeer
    verLeer.findOneAndDelete({usuario:req.params.usuario, contenido:req.params.contenido})
    .then(verL => {
        if(!verL) {
            return res.status(404).send({
                message: "verLeer no encontrado por id " + req.params.usuario+","+req.params.contenido
            });
        }
        res.send({"message": "verLeer eliminado con éxito"});
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while deleting verLeer."
        });
    });
};

//Delete All:
// Delete verLeers with the given id
exports.deleteT = (req, res) => {
    // Delete the verLeers
    verLeer.findOneAndDelete({contenido:req.params.contenido})
    .then(verL => {
        if(!verL) {
            return res.status(404).send({
                message: "verLeers no encontrado por id " + req.params.contenido
            });
        }
        res.send({"message": "verLeers eliminado con éxito"});
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while deleting verLeer."
        });
    });
};