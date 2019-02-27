const Usuario = require('../models/usuario.model.js');

// Retrieve and return all users from the database.
exports.findAll = (req, res) => {
    Usuario.find()
    .then(usuarios => {
        res.send(usuarios);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving users."
        });
    });
};

// Retrieve and return user with id from the database.
exports.findOne = (req, res) => {
    Usuario.findById(req.params.userid)
    .then(usuario => {
        if(!usuario) {
            return res.status(404).send({
                message: "Usuer not found with id " + req.params.userid
            });            
        }
        res.send(usuario);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving user."
        });
    });
};

// Write a new user to the database
exports.create = (req, res) => {
    // Validate request
    if(!req.body.content) {
        return res.status(400).send({
            message: "User fields cannot be empty"
        });
    }

    // Create a User
    const usuario = new Usuario({
        nickname: req.body.nickname,
        contrasena: req.body.contrasena,
        imagen: req.body.imagen,
        correo: req.body.correo
    });

    // Save User in the database
    usuario.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the User."
        });
    });
};