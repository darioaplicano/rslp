var express = require('express');
var router = express.Router();
const contenido = require('../controllers/contenido.controller.js');

/* GET contenidos. */
router.get('/', contenido.findAll);
router.post('/', contenido.create);
router.get('/:contenid', contenido.findOne);

module.exports = router;