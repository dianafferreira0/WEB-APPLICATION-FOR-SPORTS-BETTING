var sql = require('../models/db.js');

var Jogo = function(e){
    this.idJogo=e.idJogo;
    this.data=e.data;
    this.winner = e.winner;
} 

module.exports=Jogo;

Jogo.getAllJogos =  function(){
    return new Promise( function(resolve, reject) {
      sql.query(`select j.name, j.data, j.idJogo,p.idEquipa,p.odd,e.Nome,j.Desporto,p.odd,p.idPartida,j.last_update,j.estado from jogo as j 
                inner join partida as p on p.idJogo=j.idJogo
                left join equipa as e on e.idEquipa=p.idEquipa
                where estado!='F'`,function(err,res){
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

Jogo.getAllTimeJogos=  function(){
  return new Promise( function(resolve, reject) {
    sql.query(`select name, data,idJogo,Desporto,last_update,estado from jogo`,function(err,res){
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


Jogo.getMostRecentGame = function (){
  return new Promise( function(resolve, reject) {
    sql.query(`select name, data, idJogo,is_live from jogo
                where data > now() - interval  2 minute  AND
                data < now() + interval 20 second`,function(err,res){
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

Jogo.getRecentlyEnd = function (){
  return new Promise( function(resolve, reject) {
    sql.query(`select name, data, idJogo,is_live from jogo
                where last_update > now() - interval  2 minute  AND
                last_update < now() + interval 20 second AND estado='F'`,function(err,res){
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


Jogo.updateEstados = function (idJogo,estado){
  return new Promise(function(resolve, reject) {
    sql.query(`UPDATE jogo SET estado = ?
                  where idJogo=?`,[estado,idJogo],
        function (err, res) {
          if(err) {
              reject(err);
          }
          else{
              resolve(res.insertId);
          }
      });
  })
};


Jogo.getEstados = function (idJogo){
  return new Promise( function(resolve, reject) {
    sql.query(`select estado from jogo
                where idJogo=?`,idJogo,function(err,res){
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






Jogo.createJogoFutebol = function(jogo,connection){
  return new Promise(function(resolve,reject){
    jogo.start_datetime = jogo.start_datetime.split(" U")[0]
    connection.query(`INSERT INTO jogo (idJogo, name, Data,is_live,live_time,Desporto,last_update) values (?,?,?,?,?,?,?)
              ON DUPLICATE KEY UPDATE name=?,Data=?,is_live=?,live_time=?,Desporto=?,last_update=?`,
              [jogo.id, jogo.name, jogo.start_datetime, jogo.is_live, jogo.live_time,'Futebol',jogo.last_update,jogo.name, jogo.start_datetime, jogo.is_live, jogo.live_time,'Futebol',jogo.last_update],function(err,res){
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


Jogo.createJogoBasquetebol = function(jogo,connection){
  return new Promise(function(resolve,reject){
    jogo.start_datetime = jogo.start_datetime.split(" U")[0]
    connection.query(`INSERT INTO jogo (idJogo, name, Data,is_live,live_time,Desporto,last_update) values (?,?,?,?,?,?,?)
              ON DUPLICATE KEY UPDATE name=?,Data=?,is_live=?,live_time=?,Desporto=?,last_update=?`,
              [jogo.id, jogo.name, jogo.start_datetime, jogo.is_live, jogo.live_time,'Basquetebol',jogo.last_update,jogo.name, jogo.start_datetime, jogo.is_live, jogo.live_time,'Basquetebol',jogo.last_update],function(err,res){
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

Jogo.createJogoTennis = function(jogo,connection){
  return new Promise(function(resolve,reject){
    jogo.start_datetime = jogo.start_datetime.split(" U")[0]
    connection.query(`INSERT INTO jogo (idJogo, name, Data,is_live,live_time,Desporto,last_update) values (?,?,?,?,?,?,?)
              ON DUPLICATE KEY UPDATE name=?,Data=?,is_live=?,live_time=?,Desporto=?,last_update=?`,
              [jogo.id, jogo.name, jogo.start_datetime, jogo.is_live, jogo.live_time,'Ténis',jogo.last_update,jogo.name, jogo.start_datetime, jogo.is_live, jogo.live_time,'Ténis',jogo.last_update],function(err,res){
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


Jogo.createJogoF1 = function(jogo,connection){
  return new Promise(function(resolve,reject){
    jogo.start_datetime = jogo.start_datetime.split(" U")[0]
    connection.query(`INSERT INTO jogo (idJogo, name, Data,is_live,live_time,Desporto,last_update) values (?,?,?,?,?,?,?)
              ON DUPLICATE KEY UPDATE name=?,Data=?,is_live=?,live_time=?,Desporto=?,last_update=?`,
              [jogo.id, jogo.name, jogo.start_datetime, jogo.is_live, jogo.live_time,'Formula1',jogo.last_update,jogo.name, jogo.start_datetime, jogo.is_live, jogo.live_time,'Formula1',jogo.last_update],function(err,res){
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
// create jogos from api to find

// update jogo, jogo terminou e escolher o vencedor
