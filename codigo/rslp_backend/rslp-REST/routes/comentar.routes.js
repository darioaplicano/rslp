var express = require('express');
var router = express.Router();
const comentar = require('../controllers/comentar.controller.js');

/* GET Comentarios */
router.post('/', comentar.create);                          //C
router.get('/', comentar.findAll);  
router.get('/:userid/comentarios', comentar.findByUsuario);        //R(by one index)
router.get('/:contenid/tcomentarios', comentar.findByContenido);          //R(by other index)
router.put('/:userid/:contenid', comentar.update);     //U
router.delete('/:userid/:contenid', comentar.delete);  //D

module.exports = router;