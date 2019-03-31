var express = require('express');
var router = express.Router();
const contenido = require('../controllers/contenido.controller.js');

/* GET contenidos. */
router.get('/', contenido.findAll); //R(all)
router.post('/', contenido.create); //C
router.get('/:contenid', contenido.findOne); //R(one)
router.put('/:contenid', contenido.update);     //U
router.delete('/:contenid', contenido.delete);  //D

module.exports = router; 