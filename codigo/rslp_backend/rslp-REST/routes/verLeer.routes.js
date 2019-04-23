var express = require('express');
var router = express.Router();
const verLeer = require('../controllers/verLeer.controller.js');
 
/* GET Quiere verLeer. */
router.post('/', verLeer.create);                          //C
router.get('/', verLeer.findAll);                          //R(all)
router.get('/:userid/contenidos', verLeer.findByUsuario);        //R(by one index)
router.get('/:contenid/usuarios/t', verLeer.findByContenido);          //R(by other index)
router.get('/:userid/:contenid', verLeer.findOne);    //R(by both indexes)
router.put('/:userid/:contenid', verLeer.update);     //U
router.delete('/:usuario/:contenido/eliminar', verLeer.delete);  //D
router.delete('/:contenido/tverleers', verLeer.deleteT);  //D

module.exports = router;
 