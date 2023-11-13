var sql = require('../models/db.js');

var Equipa = function(e){
    this.IdEquipa = e.IdEquipa;
    this.Name=e.Name;
} 

module.exports=Equipa;

// create equipa ?!
Equipa.create = function (b,conn) {
    return new Promise(function(resolve, reject) {
      conn.query(`INSERT INTO equipa(idEquipa,Nome) 
                  VALUES (?, ?)`,[b.IdEquipa,b.Name],
          function (err, res) {
            if(err){
              console.log("error: ",err);
              reject(err);
          }
            else{
                resolve(res.insertId);
            }
        });
    })
  }; 
  