var express = require('express');
var router = express.Router();
var Boletim = require('../controllers/boletim.js')

router.get('/getAll/:idUser',function(req,res){
    Boletim.listarBoletins(req.params.idUser)
        .then(boletim => res.jsonp(boletim))
        .catch(erro => res.status(500).jsonp(erro))
    });


router.get('/getBoletim/:idBoletim',function(req,res){
    Boletim.getBoletim(req.params.idBoletim)
        .then(boletim => res.jsonp(boletim))
        .catch(erro => res.status(500).jsonp(erro))
    });

router.post('/createBoletim/', function(req,res){
    Boletim.createBoletim(req.body)
    .then(boletim => res.jsonp(boletim) )
    .catch(erro => res.status(500).jsonp(erro))
})

router.put('/update/:id',function(req,res){
    Boletim.updateBoletim(req.params.idBoletim,req.body)
    .then(boletim => res.jsonp(boletim))
    .catch(erro => res.status(500).jsonp(erro))
});

module.exports=router;