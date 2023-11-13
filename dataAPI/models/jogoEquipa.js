var sql = require('../models/db.js');

var JogoEquipa = function(e){
    this.idJogo = e.idJogo;
    this.IdEquipa=e.IdEquipa;
} 

module.exports=JogoEquipa;

JogoEquipa.createEquipaAjogar = function (idJogo,team1,team2,connection){
    return new Promise(function(resolve, reject) {
        connection.query(`INSERT INTO equipasnojogo (idJogo,idEquipa,score) VALUES (?,(SELECT idEquipa from equipa
                    WHERE equipa.Nome=?),?)
                    ON DUPLICATE KEY UPDATE score=?;
                    INSERT  INTO equipasnojogo (idJogo,idEquipa,score) VALUES (?,(SELECT idEquipa from equipa
                    WHERE equipa.Nome=?),?)
                    ON DUPLICATE KEY UPDATE score=?;`,[idJogo,team1.name,team1.score,team1.score,idJogo,team2.name,team2.score,team2.score],
            function (err, res) {
              if(err) {
                  console.log(err);
                  reject(err);
              }
              else{
                  resolve(res);
              }
          });
      })
}



JogoEquipa.createEquipaAjogarF1 = function (idJogo,team,connection){
    return new Promise(function(resolve, reject) {
        connection.query(`INSERT INTO equipasnojogo (idJogo,idEquipa,score) VALUES (?,(SELECT idEquipa from equipa
                    WHERE equipa.Nome=?),?)
                    ON DUPLICATE KEY UPDATE score=?`,[idJogo,team.name,team.score],
            function (err, res) {
              if(err) {
                  console.log(err);
                  reject(err);
              }
              else{
                  resolve(res);
              }
          });
      })
}

