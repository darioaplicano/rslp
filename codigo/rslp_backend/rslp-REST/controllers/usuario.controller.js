const Usuario = require('../models/usuario.model.js');

//CRUD:

//Create:
// Creates and writes a new user to the database
exports.create = (req, res) => {
    // Validate request
    if(!req.body.nickname) {
        return res.status(400).send({
            message: "El nickname del usuario no puede estar vacío."
        });
    }
    if(!req.body.correo) {
        return res.status(400).send({
            message: "El correo del usuario no puede estar vacío."
        });
    }
    if(!req.body.contrasena) {
        return res.status(400).send({
            message: "La contraseña del usuario no puede estar vacía."
        });
    }

    // Create a User
    const usuario = new Usuario({
        nickname: req.body.nickname,
        contrasena: req.body.contrasena,
        imagen: req.body.imagen,
        correo: req.body.correo
    });

    //TODO: handle duplicate nickname/correo

    // Save User in the database
    usuario.save()
    .then(usuario => {
        res.send(usuario);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the User."
        });
    });
};

//Read:
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
    Usuario.find({"nickname":req.params.nickname})
    .then(usuario => {
        if(!usuario) {
            return res.status(404).send({
                message: "Usuario no encontrado por id " + req.params.userid
            });            
        }
        res.send(usuario);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving user."
        });
    });
};

// Update:
// Update the fields of the user with the given id.
exports.update = (req, res) => {
    // Find and update user with the request body
    Usuario.findByIdAndUpdate(req.params.userid, {
        nickname: req.body.nickname,
        correo: req.body.correo,
        contrasena: req.body.contrasena,
        imagen: req.body.imagen
    }, {new: false})
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "Usuario no encontrado por id " + req.params.userid
            });
        }
        res.send(user);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while updating user."
        });
    });
};

//Delete:
// Delete user with the given id
exports.delete = (req, res) => {
    // Delete the user
    Usuario.findByIdAndDelete(req.params.userid)
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "Usuario no encontrado por id " + req.params.userid
            });
        }
        res.send({"message": "Usuario eliminado con éxito"});
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while deleting user."
        });
    });
};