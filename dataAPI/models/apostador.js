var sql = require('../models/db.js');
var bcrypt = require('bcryptjs')

var Apostador = function(a){
    this.Name=a.Nome;
    this.Apelido=a.Apelido
    this.email=a.email;
    this.password=a.password;
    this.nif=a.nif;
    this.birthdate=a.birthdate;
    this.cc=a.cc;
    this.Euro=a.Euro;
    this.ACA=a.ACA;
    this.Dolar=a.Dolar;
} 

module.exports=Apostador;

Apostador.getAll =  function(){
  return new Promise( function(resolve, reject) {
    sql.query('SELECT * FROM apostador',function(err,res){
      if(err){
          console.log("error: ",err);
          reject(err);
      }
      else{
          resolve(res);
      }
    });
  })
};

Apostador.regist = function(apostador){
  var encryptPassword=bcrypt.hashSync(apostador.password,10);
  var parameter = [apostador.nome,apostador.apelido,apostador.email,apostador.nif,apostador.birthdate,encryptPassword, apostador.cc,apostador.eur,apostador.ada,apostador.usd]
  return new Promise(function(resolve,reject){
      sql.query("INSERT INTO apostador (Nome,Apelido,email,nif,birthdate,password,cc,Euro,ACA,Dolar) VALUES (?,?,?,?,?,?,?,?,?,?)",parameter,function(err,res){
          if(err){
              console.log("error: ", err);
              reject(err);
          }
          else{
              resolve(res.insertId);
          }
      });
  })
};

Apostador.getUser = function(email){
  return new Promise(function(resolve,reject){
    sql.query("SELECT * from  apostador where email=?",email,function(err,res){
        if(err){
            console.log("error: ", err);
            reject(err);
        }
        else{
            resolve(res);
        }
    });
   })
};


Apostador.getUserbyID = function(idApostador){
  return new Promise(function(resolve,reject){
    sql.query("SELECT * from  apostador where idApostador=?",idApostador,function(err,res){
        if(err){
            console.log("error: ", err);
            reject(err);
        }
        else{
            resolve(res);
        }
    });
   })
};

Apostador.getMoney = function(idApostador){
  return new Promise(function(resolve,reject){
    sql.query("SELECT Euro,ACA,Dolar from  apostador where idApostador=?",idApostador,function(err,res){
        if(err){
            console.log("error: ", err);
            reject(err);
        }
        else{
            resolve(res);
        }
    });
   })
};


Apostador.putEuro = function(idApostador,moneys){
  return new Promise(function(resolve,reject){
    sql.query("UPDATE apostador set Euro=? where idApostador=?",[moneys.Euro,idApostador],function(err,res){
        if(err){
            console.log("error: ", err);
            reject(err);
        }
        else{
            resolve(res);
        }
    });
   })
};

Apostador.putADA = function(idApostador,moneys){
  return new Promise(function(resolve,reject){
    sql.query("UPDATE apostador set ACA=? where idApostador=?",[moneys.ADA,idApostador],function(err,res){
        if(err){
            console.log("error: ", err);
            reject(err);
        }
        else{
            resolve(res);
        }
    });
   })
};

Apostador.putDolar = function(idApostador,moneys){
  return new Promise(function(resolve,reject){
    sql.query("UPDATE apostador set Dolar=? where idApostador=?",[moneys.Dolar,idApostador],function(err,res){
        if(err){
            console.log("error: ", err);
            reject(err);
        }
        else{
            resolve(res);
        }
    });
   })
};

Apostador.updateUser = async function(idApostador,apostador){
    if(apostador.password==null)
      apostador.password=bcrypt.hashSync(apostador.password,10);
    else{
      var ola = await Apostador.getUserbyID(idApostador)
      password=ola.password
    }
    return new Promise(function(resolve,reject){
      sql.query(`UPDATE apostador 
                SET Nome = ?, Apelido = ? , IF (?,password = ?,?)
                where idApostador= ?`,[apostador.Nome,apostador.Apelido,apostador.password,apostador.password,password,idApostador],function(err,res){
          if(err){
              console.log("error: ", err);
              reject(err);
          }
          else{
              resolve(res);
          }
      });
     })
  };

Apostador.createTransacoes = function (idApostador,valor,saldo, data) {
    return new Promise(function(resolve, reject) {
      sql.query(`INSERT INTO transactionshistory(idApostador,saldo,valor,data) 
                  VALUES (?,?,?,?))`,[idApostador,saldo,valor,data],
          function (err, res) {
            if(err){
                console.log("error: ", err);
                reject(err);
            }
            else{
                resolve(res);
            }
        });
       })
    };

//Obter lista de transações
Apostador.getTransacoes =  function(idApostador){
    return new Promise(function(resolve, reject) {
      sql.query('SELECT * FROM transactionshistory where idApostador=?',idApostador
      ,function(err,res){
        if(err){
            console.log("error: ",err);
            reject(err);
        }
        else{
            resolve(res);
        }
      });
    })
  };

  Apostador.loginUser =  function(email){
    return new Promise(function(resolve, reject) {
      sql.query('SELECT * FROM apostador where email=?',[email]
      ,function(err,res){
        if(err){
            console.log("error: ",err);
            reject(err);
        }
        else{
            resolve(res);
        }
      });
    })
  };



