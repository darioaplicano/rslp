const Contenido = require('../models/contenido.model.js');

//CRUD:

//Create:
// Create and write a new content to the database
exports.create = (req, res) => {
    // Validate request
    if(!req.body.titule) {
        return res.status(400).send({
            message: "El campo del título está vacío."
        });
    }
    if(!req.body.age) {
        return res.status(400).send({
            message: "El campo del año está vacío."
        });
    }
    if(!req.body.gender) {
        return res.status(400).send({
            message: "El campo del genero está vacío."
        });
    }
    if(!req.body.synopsis) {
        return res.status(400).send({
            message: "El campo de la sinópsis está vacío."
        });
    }
    if(!req.body.authorDirector) {
        return res.status(400).send({
            message: "El campo del autor o director está vacío."
        });
    }
    if(!req.body.type) {
        return res.status(400).send({
            message: "El campo del tipo está vacío."
        });
    }
    if(req.body.type != "movie" || req.body.type != "book"){
        return res.status(400).send({
            message: "El campo del tipo debe ser movie o book."
        });
    }

    // Create a Content
    const contenido = new Contenido({
        titule: req.body.titule,
        age: req.body.age,
        gender: req.body.gender,
        synopsis: req.body.synopsis,
        authorDirector: req.body.authorDirector,
        image: req.body.image,
        type: req.body.type,
    });

    //TODO: handle duplicate titule

    // Save Content in the database
    contenido.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Ha ocurrido un error al crear el contenido."
        });
    });
};

//Read:
// Retrieve and return all content from the database.
exports.findAll = (req, res) => {
    Contenido.find()
    .then(contenidos => {
        res.send(contenidos);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Se produjo algún error al recuperar contenidos."
        });
    });
};

// Retrieve and return content with id from the database.
exports.findOne = (req, res) => {
    Contenido.findById(req.params.contenid)
    .then(contenido => {
        if(!contenido) {
            return res.status(404).send({
                message: "Contenido no encontrado con id " + req.params.contenid
            });            
        }
        res.send(contenido);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Se produjo algún error al recuperar contenido."
        });
    });
};

// Update:
// Update the fields of the content with the given id.
exports.update = (req, res) => {
    // Find and update content with the request body
    Contenido.findByIdAndUpdate(req.params.contenid, {
        titule: req.body.titule,
        age: req.body.age,
        gender: req.body.gender,
        synopsis: req.body.synopsis,
        authorDirector: req.body.authorDirector,
        image: req.body.image,
        type: req.body.type,
    }, {new: false})
    .then(contenido => {
        if(!contenido) {
            return res.status(404).send({
                message: "Contenido no encontrado por id " + req.params.contenid
            });
        }
        res.send(contenido);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Se produjo algún error al actualizar el contenido."
        });
    });
};

//Delete:
// Delete content with the given id
exports.delete = (req, res) => {
    // Delete the content
    Contenido.findByIdAndDelete(req.params.contenid)
    .then(contenido => {
        if(!contenido) {
            return res.status(404).send({
                message: "Contenido no encontrado por id " + req.params.contenid
            });
        }
        res.send({"message": "Contenido eliminado con éxito"});
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Se produjo algún error al eliminar el contenido."
        });
    });
};