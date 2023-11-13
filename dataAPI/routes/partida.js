var express = require('express');
var router = express.Router();
var Partida = require('../controllers/partida')

router.put('/updateOdd/:idPartida',function(req,res){
    Partida.update(req.params.idPartida,req.body)
        .then(partida => res.jsonp(partida))
        .catch(erro => res.status(500).jsonp(erro))
    });

module.exports=router;

