var express = require('express');
var router = express.Router();
const usuario = require('../controllers/usuario.controller.js');

/* GET usuarios. */
router.post('/', usuario.create);           //C
router.get('/', usuario.findAll);           //R(all)
router.get('/:nickname', usuario.findOne);    //R(one)
router.put('/:userid', usuario.update);     //U
router.delete('/:userid', usuario.delete);  //D

module.exports = router;
