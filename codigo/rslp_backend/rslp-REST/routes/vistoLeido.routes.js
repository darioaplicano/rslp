var express = require('express');
var router = express.Router();
const vistoLeido = require('../controllers/vistoLeido.controller.js');

/* GET ha visto o leído. */
router.post('/', vistoLeido.create);                          //C
router.get('/', vistoLeido.findAll);                          //R(all)
router.get('/:userid/contenidos', vistoLeido.findByUsuario);        //R(by one index)
router.get('/:contenid/usuarios/t', vistoLeido.findByContenido);          //R(by other index)
router.get('/:seguidorid/:seguidoid', vistoLeido.findOne);    //R(by both indexes)
router.put('/:usuario/:contenido/actualizar', vistoLeido.update);     //U
router.delete('/:usuario/:contenido/eliminar', vistoLeido.delete);  //D
router.delete('/:contenido/tvistoleidos', vistoLeido.deleteT);  //D

module.exports = router;
 