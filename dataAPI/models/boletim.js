var sql = require('../models/db.js');

var Boletim = function(b){
    this.idBoletim=b.idBoletim;
    this.idApostador=b.idApostador;
    this.quantia=b.quantia;
    this.oddSum=b.oddSum;
} 
module.exports=Boletim;

Boletim.getAllBets =  function(idUser){
  return new Promise( function(resolve, reject) {
    sql.query(  `select ap.nome,b.idBoletim, b.quantia, b.oddSum,j.name,a.idAposta,e.idEquipa,e.Nome as NomeEquipa,p.idEquipa as idescolha,e.nome as escolha, j.Winner as Winner   from boletim  as b
                inner join apostador as ap on ap.idApostador=b.idApostador
                inner join aposta as a on b.idBoletim=a.idBoletim
                left join partida as p on a.idPartida=p.idPartida
                left join jogo as j on p.idJogo=j.idJogo
                left join  equipasnojogo as ej on j.idJogo=ej.idJogo
                left join equipa as e on e.idEquipa=ej.idEquipa
                where ap.IdApostador=?` ,[idUser],
              function(err,res){
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

Boletim.getBoletim =  function(idBoletim){
  return new Promise( function(resolve, reject) {
    sql.query(  `select ap.nome,b.idBoletim, b.quantia, b.oddSum,a.idAposta,e.idEquipa,e.Nome as NomeEquipa,p.idEquipa as escolha, j.Winner as Winner   from boletim  as b
                inner join apostador as ap on ap.idApostador=b.idApostador
                inner join aposta as a on b.idBoletim=a.idBoletim
                inner join partida as p on a.idPartida=p.idPartida
                inner join jogo as j on p.idJogo=j.idJogo
                inner join  equipasnojogo as ej on j.idJogo=ej.idJogo
                inner join equipa as e on e.idEquipa=ej.idEquipa
                where b.idBoletim=?` ,[idBoletim],
              function(err,res){
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

Boletim.create = function (b,conn) {
  return new Promise(function(resolve, reject) {
    conn.query(`INSERT INTO boletim ( idApostador, quantia,oddSum) 
                VALUES (?, ?,?)`,[b.idApostador,b.quantia,b.oddSum],
        function (err, res) {
          if(err) {
              console.log("error: ", err);
              reject(err);
          }
          else{
              resolve(res.insertId);
          }
      });
  })
}; // Cria as apostas apos criar o boletim , model de apostas

//update boletim, para fechado e meter os ganhos caso ele ganhe



