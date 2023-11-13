const Boletim = require("../models/boletim.js");
const Aposta = require("../models/aposta.js");

const Boletins = module.exports
var sql = require('../models/db.js');

Boletins.listarBoletins = async (idUser) =>  {
    var res = await Boletim.getAllBets(idUser);
    var equipas = [];
    var bets = [];
    for(let i=0 ; i<res.length; i++){
      if (i<res.length-1 && res[i].idAposta==res[i+1].idAposta){
        equipas.push({idEquipa:res[i].idEquipa,equipa:res[i].NomeEquipa});
      }
      else{
        equipas.push({idEquipa:res[i].idEquipa,equipa:res[i].NomeEquipa});
        bets.push({nome:res[i].nome,idBoletim:res[i].idBoletim,quantia:res[i].quantia,oddSum:res[i].oddSum,gameName:res[i].name,idAposta:res[i].idAposta,equipas:equipas,idescolha:res[i].idescolha,escolha:res[i].escolha,winner:res[i].Winner});
        equipas=[];
      }
    }
    return bets;
  };

Boletins.getBoletim = async (idBoletim) =>{
  var res = await Boletim.getBoletim(idBoletim);
  var equipas = [];
  for (let i in res){
    equipas.push({idEquipa:res[i].idEquipa,equipa:res[i].NomeEquipa});
  }
  res=res[0];
  res.equipas=equipas;
  delete res.idEquipa;
  delete res.NomeEquipa;
  return res;
}

Boletins.createBoletim = async (boletim)=>{
  sql.getConnection(async function(err, connection) {
    try {
        connection.beginTransaction()
        const queryPromises = []
        var idBoletim = await Boletim.create(boletim,connection);
        for(i in boletim.Aposta)
            queryPromises.push(Aposta.create(idBoletim,boletim.Aposta[i].idPartida,connection))
        const results = await Promise.all(queryPromises)
        connection.commit()
        connection.release()
        return results
    } catch (err) {
        connection.rollback()
        connection.release()
    }
  })
}


