var express = require('express');
var router = express.Router();
var Apostador = require('../controllers/apostador')
var bcrypt = require('bcryptjs')
var sql = require('../models/db.js');

router.get('/getAll/',function(req,res){
    Apostador.listar()
        .then(apostador => res.jsonp(apostador))
        .catch(erro => res.status(500).jsonp(erro))
    });

router.get('/getUser/:email',function(req,res){
     Apostador.get(req.params.email)
        .then(apostador => res.jsonp(apostador))
        .catch(erro => res.status(500).jsonp(erro))
});

router.get('/gettrans/:idApostador',function(req,res){
    Apostador.gettrans(req.params.idApostador)
        .then(apostador => res.jsonp(apostador))
        .catch(erro => res.status(500).jsonp(erro))
});

router.post('/create/',function(req,res){
    Apostador.put(req.body)
            .then(apostador => res.jsonp(apostador))
            .catch(erro => res.status(500).jsonp(erro))
});

router.post('/createtrans/',function(req,res){
    Apostador.createtrans(req.body)
        .then(apostador => res.jsonp(apostador))
        .catch(erro => res.status(500).jsonp(erro))
});

router.post('/login/',function(req,res){
    Apostador.login(req.body)
        .then(dados =>{
            var result = {
                login : false,
                message : "Utilizador não existe."
            }
            if(dados.length!=0){
                if(bcrypt.compareSync(req.body.password,dados[0].password)){
                    sql.getConnection(function(err,conn){
                        Apostador.get(dados[0].email,conn)
                        .then(async apostador =>{
                            var expirationDate = new Date();
                            expirationDate.setHours(expirationDate.getHours() + 8);
                            result.login = true
                            result.message = "Credenciais corretas."
                            result.apostador = apostador
                            result.expirationDate = expirationDate;
                            res.jsonp(result)
                        })
                        .catch(error => {console.log("Entrei no erro")
                        res.status(500).jsonp(error)})
                        conn.release();
                        if(err) throw err;
                    })
                }
                else{
                    result.message="Password errada."
                }
            }
            else{
                res.jsonp(result)
            }
        })
        .catch(erro => res.status(500).jsonp(erro))
    });



router.put('/update/:idApostador',function(req,res){
    Apostador.update(req.params.idApostador,req.body)
        .then(apostador => res.jsonp(apostador))
        .catch(erro => res.status(500).jsonp(erro))
    });

router.get('/getFunds/:idApostador',function(req,res){
    Apostador.getMoneys(req.params.idApostador)
            .then(apostador => res.jsonp(apostador))
            .catch(erro => res.status(500).jsonp(erro))
    });

router.put('/putEuro/:idApostador',function(req,res){
    Apostador.putEuros(req.params.idApostador,req.body)
            .then(apostador => res.jsonp(apostador))
            .catch(erro => res.status(500).jsonp(esrro))
    });

router.put('/putADA/:idApostador',function(req,res){
    Apostador.putADAS(req.params.idApostador,req.body)
            .then(apostador => res.jsonp(apostador))
            .catch(erro => res.status(500).jsonp(esrro))
    });

router.put('/putDolar/:idApostador',function(req,res){
    Apostador.putDolars(req.params.idApostador,req.body)
            .then(apostador => res.jsonp(apostador))
            .catch(erro => res.status(500).jsonp(esrro))
    });
/*
//Login
//display login page
router.get('/', function(req, res, next){    
    // render to views/user/add.ejs
    res.render('auth/login', {
        title: 'Login',
        email: '',
        password: ''     
    })
})
 
//display login page
router.get('/login', function(req, res, next){    
    // render to views/user/add.ejs
    res.render('auth/login', {
        title: 'Login',
        email: '',
        password: ''    
    })
})

//authenticate user
router.post('/authentication', function(req, res, next) {
       
    var email = req.body.email;
    var password = req.body.password;
 
        connection.query('SELECT * FROM apostador WHERE email = ? AND password = ?', [email, password], function(err, rows, fields) {
            if(err) throw err
             
            // if user not found
            if (rows.length <= 0) {
                req.flash('error', 'Please correct enter email and Password!')
                res.redirect('/login')
            }
            else { // if user found
                // render to views/user/edit.ejs template file
                req.session.loggedin = true;
                req.session.name = name;
                res.redirect('/home');
 
            }            
        })
  
})
 
//display home page
router.get('/home', function(req, res, next) {
    if (req.session.loggedin) {
         
        res.render('auth/home', {
            title:"Dashboard",
            name: req.session.name,     
        });
 
    } else {
 
        req.flash('success', 'Please login first!');
        res.redirect('/login');
    }
});

// Logout user
router.get('/logout', function (req, res) {
    req.session.destroy();
    req.flash('success', 'Login Again Here');
    res.redirect('/login');
  });
*/
module.exports=router;