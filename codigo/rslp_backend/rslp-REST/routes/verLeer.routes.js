var express = require('express');
var router = express.Router();
const verLeer = require('../controllers/verLeer.controller.js');
 
/* GET Quiere verLeer. */
router.post('/', verLeer.create);                          //C
router.get('/', verLeer.findAll);                          //R(all)
router.get('/:userid/contenidos', verLeer.findByUsuario);        //R(by one index)
router.get('/:contenid/usuarios', verLeer.findByContenido);          //R(by other index)
router.get('/:userid/:contenid', verLeer.findOne);    //R(by both indexes)
router.put('/:userid/:contenid', verLeer.update);     //U
router.delete('/:userid/:contenid', verLeer.delete);  //D

module.exports = router;
 