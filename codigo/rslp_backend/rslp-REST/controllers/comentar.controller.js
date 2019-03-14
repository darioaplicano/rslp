const Comentar = require('../models/comentar.model.js');

//Creating a comment
app.post('/comentar', function(req, res){
    console.log(req.body);
    var newComment = {
      nombre: req.body.name,
      correo: req.body.email,
      comentario: req.body.comment
    }
    pusher.trigger('flash-comments', 'new_comment', newComment);
    res.json({ created: true });
  });

//Save comment in the database
newComment.save()
    .then(newComment => {
        res.send(newComment);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the comment."
        });
    });

//Read
// Retrieve and return all comments from the database.
exports.findAll = (req, res) => {
    Comentar.find()
    .then(newComment => {
        res.send(newComment);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving the comments."
        });
    });
};

//Delete:
// Delete comment with the given id
exports.delete = (req, res) => {
    // Delete the comment
    Comentar.findByIdAndDelete(req.params.newCommentid)
    .then(newComment => {
        if(!newComment) {
            return res.status(404).send({
                message: "Comentario no encontrado por id " + req.params.newCommentid
            });
        }
        res.send({"message": "Comentario eliminado con éxito"});
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while deleting the comment."
        });
    });
};