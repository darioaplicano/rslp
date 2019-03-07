var express = require('express');
var router = express.Router();
const seguir = require('../controllers/sigue.controller.js');

/* GET Sigue a. */
router.post('/', seguir.create);                          //C
router.get('/', seguir.findAll);                          //R(all)
router.get('/:seguidorid/seguidos', seguir.findBySeguidor);        //R(by one index)
router.get('/:seguidoid/seguidores', seguir.findBySeguido);          //R(by other index)
router.get('/:seguidorid/:seguidoid', seguir.findOne);    //R(by both indexes)
router.put('/:seguidorid/:seguidoid', seguir.update);     //U
router.delete('/:seguidorid/:seguidoid', seguir.delete);  //D

module.exports = router;
