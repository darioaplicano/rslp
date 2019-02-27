var express = require('express');
var router = express.Router();
const usuario = require('../controllers/usuario.controller.js');

/* GET usuarios. */
router.get('/', usuario.findAll);
router.post('/', usuario.create);
router.get('/:userid', usuario.findOne);

module.exports = router;
