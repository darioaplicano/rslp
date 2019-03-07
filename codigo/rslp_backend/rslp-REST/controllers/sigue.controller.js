const Follow = require('../models/sigue.model.js');

//CRUD:

//Create:
// Creates and writes a new follow to the database
exports.create = (req, res) => {
    // TODO: Validate request
    

    // Create a follow
    const seguir = new Follow({
        seguidor: req.body.seguidorid,
        seguido: req.body.seguidoid,
    });

    // Save follow in the database
    seguir.save()
    .then(seguir => {
        res.send(seguir);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the follow."
        });
    });
};

//Read:
// Retrieve and return all follows from the database.
exports.findAll = (req, res) => {
    Follow.find()
    .populate('seguidor')
    .populate('seguido')
    .then(follows => {
        res.send(follows);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving follows."
        });
    });
};

// Retrieve and return follow with seguidorid and seguidoid from the database.
exports.findOne = (req, res) => {
    Follow.findOne({seguidor:req.params.seguidorid, seguido:req.params.seguidoid})
    .populate('seguidor')
    .populate('seguido')
    .then(seguir => {
        if(!seguir) {
            return res.status(404).send({
                message: "Follow no encontrado por id " + req.params.seguidoid+","+req.params.seguidorid
            });            
        }
        res.send(seguir);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving follow."
        });
    });
};

exports.findBySeguidor = (req, res) => {
    Follow.find({seguidor:req.params.seguidorid})
    .populate('seguidor')
    .populate('seguido')
    .then(seguir => {
        if(!seguir) {
            return res.status(404).send({
                message: "Follow no encontrado por id " +req.params.seguidorid
            });            
        }
        res.send(seguir);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving follow."
        });
    });
};

exports.findBySeguido = (req, res) => {
    Follow.find({seguido:req.params.seguidoid})
    .populate('seguidor')
    .populate('seguido')
    .then(seguir => {
        if(!seguir) {
            return res.status(404).send({
                message: "Follow no encontrado por id " + req.params.seguidoid
            });            
        }
        res.send(seguir);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving follow."
        });
    });
};

// Update:
// Update the fields of the follow with the given id.
exports.update = (req, res) => {
    // Find and update follow with the request body
    Follow.findOneAndUpdate({seguidor:req.params.seguidorid, seguido:req.params.seguidoid}, {
        seguido: req.body.seguidoid,
        seguidor: req.body.seguidorid
    }, {new: false})
    .populate('seguidor')
    .populate('seguido')
    .then(follow => {
        if(!follow) {
            return res.status(404).send({
                message: "Follow no encontrado por id "  + req.params.seguidorid+","+req.params.seguidoid
            });
        }
        res.send(follow);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while updating follow."
        });
    });
};

//Delete:
// Delete follow with the given id
exports.delete = (req, res) => {
    // Delete the follow
    Follow.findOneAndDelete({seguidor:req.params.seguidorid, seguido:req.params.seguidoid})
    .then(follow => {
        if(!follow) {
            return res.status(404).send({
                message: "Follow no encontrado por id " + req.params.seguidorid+","+req.params.seguidoid
            });
        }
        res.send({"message": "Follow eliminado con éxito"});
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while deleting follow."
        });
    });
};