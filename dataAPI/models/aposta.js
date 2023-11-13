var sql = require('../models/db.js');

var Aposta = function(a){
    this.idAposta=a.idApostador
    this.idBoletim=a.idBoletim;
    this.idPartida=a.idPartida;
    this.estado=a.estado;
} 
module.exports=Aposta;

Aposta.create = function (idBoletim,idPartida,conn) {
  return new Promise(function(resolve, reject) {
    conn.query(`INSERT INTO Aposta ( idBoletim, idPartida) 
                VALUES ( ?, ?)`,[idBoletim,idPartida],
        function (err, res) {
          if(err) {
              reject(err);
          }
          else{
              resolve(res.insertId);
          }
      });
  })
}; // Cria as apostas apos criar o boletim

Aposta.update = function (idBoletim,estado) {
  return new Promise(function(resolve, reject) {
    sql.query(`UPDATE aposta SET estado = ?
                  where idBoletim=?`,[idBoletim,estado],
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



