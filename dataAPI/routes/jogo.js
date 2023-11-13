var express = require('express');
var router = express.Router();
var Jogo = require('../controllers/jogo')

router.get('/getAllJogos',function(req,res){
    Jogo.listarJogos(req.params.idUser)
        .then(jogos => res.jsonp(jogos))
        .catch(erro => res.status(500).jsonp(erro))
    });


router.get('/getRecentGame',function(req,res){
    Jogo.getRecentGame()
        .then(jogos => res.jsonp(jogos))
        .catch(erro => res.status(500).jsonp(erro))
    });

router.get('/getRecentlyEnded',function(req,res){
    Jogo.getRecentlyEnded()
        .then(jogos => res.jsonp(jogos))
        .catch(erro => res.status(500).jsonp(erro))
    });
    

router.put('/updateEstado/:idJogo',function(req,res){
    Jogo.updateEstado(req.params.idJogo,req.body)
        .then(apostador => res.jsonp(apostador))
        .catch(erro => res.status(500).jsonp(erro))
    });

    router.get('/getEstado/:idJogo',function(req,res){
        Jogo.getEstado(req.params.idJogo)
            .then(jogos => res.jsonp(jogos))
            .catch(erro => res.status(500).jsonp(erro))
    });
module.exports=router;