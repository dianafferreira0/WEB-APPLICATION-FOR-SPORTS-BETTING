var sql = require('../models/db.js');
var axios = require("axios").default;
var Partida = function(e){
    this.idPartida=e.idPartida;
    this.idEquipa=e.idEquipa;
    this.idJogo = e.idJogo;
    this.odd = e.odd; 
} 

module.exports=Partida;

//Alterar odd
Partida.updateOdd = function(idPartida, partida){
    return new Promise(function(resolve,reject){
      sql.query(`UPDATE partida P
                SET odd = ?
                where idPartida= ?`,[partida.odd,idPartida],function(err,res){
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

Partida.createPartidaFutebol = function(jogo,connection){
    return new Promise(function(resolve,reject){
        connection.query(`INSERT IGNORE INTO partida (idEquipa,idJogo,odd) values((SELECT idEquipa from equipa
                WHERE equipa.Nome=?),?,?);
                INSERT IGNORE INTO partida (idEquipa,idJogo,odd) values((SELECT idEquipa from equipa
                WHERE equipa.Nome=?),?,?);
                INSERT IGNORE INTO partida (idEquipa,idJogo,odd) values(?,?,?)`,
                [jogo.team1.name,jogo.id,jogo.odds[1],jogo.team2.name,jogo.id,jogo.odds[2],1,jogo.id,jogo.odds.X],function(err,res){
        if(err){
            console.log("error: ",err);
            reject(err);
        }
        else{
            resolve(res);
        }
      });
    })
  }

  
  Partida.createPartidaBasquetebol = function(jogo,connection){
    return new Promise(function(resolve,reject){
        connection.query(`INSERT IGNORE INTO partida (idEquipa,idJogo,odd) values((SELECT idEquipa from equipa
                WHERE equipa.Nome=?),?,?);
                INSERT IGNORE INTO partida (idEquipa,idJogo,odd) values((SELECT idEquipa from equipa
                WHERE equipa.Nome=?),?,?);`,
                [jogo.team1.name,jogo.id,jogo.odds[1],jogo.team2.name,jogo.id,jogo.odds[2]],function(err,res){
        if(err){
            console.log("error: ",err);
            reject(err);
        }
        else{
            resolve(res);
        }
      });
    })
  }

  Partida.createPartidaF1 = function(jogo,team,connection){
    return new Promise(function(resolve,reject){
        connection.query(`INSERT IGNORE INTO partida (idEquipa,idJogo,odd) values((SELECT idEquipa from equipa
                WHERE equipa.Nome=?),?,?)`,
                [team.name,jogo.id,team.odds],function(err,res){
        if(err){
            console.log("error: ",err);
            reject(err);
        }
        else{
            resolve(res);
        }
      });
    })
  }

  