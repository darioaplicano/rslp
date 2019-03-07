const Contenido = require('../models/contenido.model.js');

// Retrieve and return all users from the database.
exports.findAll = (req, res) => {
    Contenido.find()
    .then(contenidos => {
        res.send(contenidos);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving contents."
        });
    });
};

// Retrieve and return user with id from the database.
exports.findOne = (req, res) => {
    Contenido.findById(req.params.contenid)
    .then(contenido => {
        if(!contenido) {
            return res.status(404).send({
                message: "Content not found with id " + req.params.contenid
            });            
        }
        res.send(contenido);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving content."
        });
    });
};

// Write a new user to the database
exports.create = (req, res) => {
    // Validate request
    if(!req.body.content) {
        return res.status(400).send({
            message: "Content fields cannot be empty"
        });
    }

    // Create a User
    const contenido = new Contenido({
        titule: req.body.titule,
        age: req.body.age,
        gender: req.body.gender,
        synopsis: req.body.synopsis,
        authorDirector: req.body.authorDirector,
        image: req.body.image,
    });

    // Save User in the database
    contenido.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Content."
        });
    });
};