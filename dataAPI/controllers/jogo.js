const Jogo = require("../models/jogo.js");
const Partida = require("../models/partida.js");
const JogoEquipa = require("../models/jogoEquipa.js");
const Jogos = module.exports
var axios = require("axios").default;
var sql = require('../models/db.js');

Jogos.listarJogos = async () => {
    var res = await Jogo.getAllJogos();
    console.log(res)
    var jogos =[];
    var equipas =[]
    for(let i=0 ; i<res.length; i++){
      res[i].data=new Date(res[i].data).toISOString().replace(/T/, ' ').replace(/\..+/, '');
      res[i].odd=parseFloat(res[i].odd)
      if (i<res.length-1 && res[i].idJogo==res[i+1].idJogo){
        equipas.push({idEquipa:res[i].idEquipa,equipa:res[i].Nome,odd:res[i].odd,idPartida:res[i].idPartida});
      }
      else{
        equipas.push({idEquipa:res[i].idEquipa,equipa:res[i].Nome,odd:res[i].odd,idPartida:res[i].idPartida});
        jogos.push({name:res[i].name,id:res[i].idJogo,type:res[i].Desporto,estado:res[i].estado,data:res[i].data,equipas:equipas});
        equipas=[];
      }
    }
    return jogos;
  };

Jogos.getRecentGame= () => {
  return Jogo.getMostRecentGame();
    
  };
Jogos.getRecentlyEnded = () => {
  return Jogo.getRecentlyEnd();
};

Jogos.updateEstado = (idJogo,jogo) => {
  return Jogo.updateEstados(idJogo,jogo.estado);
};


Jogos.getEstado = (idJogo) =>{
  return Jogo.getEstados(idJogo);
};


  var headers = {
    'x-rapidapi-host': 'unibet.p.rapidapi.com',
    'x-rapidapi-key': '8cf7d9caf6msh0c78ad7a27547d5p198c26jsn7f2ac9d99f04'
  }
  /*
  var closeGames = setInterval(async function(){
    var res = await Jogo.getAllTimeJogos();
    var datenow = new Date();
    for( var i in res){
      var date = new Date(res[i].last_update);
      var diff = (datenow.getTime() - date.getTime())/(60000);
      console.log(res[i])
      if(diff > 5 ){
        res[i].estado='F'
      }
      Jogo.updateEstados(res[i].idJogo,res[i].estado)
    }
  
  },300000)

  

var requestFootball = setInterval(async function(){
  const delay = ms => new Promise(resolve => setTimeout(resolve, ms))
  await delay(2000);
  axios.get('https://unibet.p.rapidapi.com/matches-by-competition',{
    params:{competitionid:'football/england/premier_league'},
    headers:headers
  }).then(async function(response) {
    sql.getConnection(async function(err, connection) {
      try {
        connection.beginTransaction()
        const queryPromises = []
        var jogos= response.data;
        //console.log(jogos);
        for(i in jogos){
          jogos[i].last_update=new Date().toISOString().slice(0, 19).replace('T', ' ');
          queryPromises.push(Jogo.createJogoFutebol(jogos[i],connection));
          queryPromises.push(Partida.createPartidaFutebol(jogos[i],connection));
          queryPromises.push(JogoEquipa.createEquipaAjogar(jogos[i].id,jogos[i].team1,jogos[i].team2,connection));
        }
        const results = await Promise.all(queryPromises)
        connection.commit()
        connection.release()
        return results
    } catch (err) {
      console.log("error ", err);
        connection.rollback()
        connection.release()
    }
  })
  }).catch(function (error) {
    console.error(error);
  });
}, 60000);


var requestFormula1 = setInterval(async function(){
  const delay = ms => new Promise(resolve => setTimeout(resolve, ms))
  await delay(4000);
  axios.get('https://unibet.p.rapidapi.com/matches-by-competition',{
    params:{competitionid:'formula_1/race'},
    headers:headers
  }).then(async function(response) {
    sql.getConnection(async function(err, connection) {
      try {
        connection.beginTransaction()
        const queryPromises = []
        var jogos= response.data;
        
        for(i in jogos){
          jogos[i].last_update=new Date().toISOString().slice(0, 19).replace('T', ' ');
          queryPromises.push(Jogo.createJogoF1(jogos[i],connection));
          queryPromises.push(Partida.createPartidaF1(jogos[i],connection));
          for(j in jogos.teams)
            queryPromises.push(JogoEquipa.createEquipaAjogarF1(jogos[i].id,jogos[i].team1,jogos[i].team2,connection));
        }
        const results = await Promise.all(queryPromises)
        connection.commit()
        connection.release()
        return results
    } catch (err) {
        console.log("error", err)
        connection.rollback()
        connection.release()
    }
  })
  }).catch(function (error) {
    console.error(error);
  });
}, 60000);


var requestBasketball = setInterval(async function(){
  const delay = ms => new Promise(resolve => setTimeout(resolve, ms))
  await delay(6000);
  axios.get('https://unibet.p.rapidapi.com/matches-by-competition',{
    params:{competitionid:'basketball/nba'},
    headers:headers
  }).then(async function(response) {
    sql.getConnection(async function(err, connection) {
      try {
        connection.beginTransaction()
        const queryPromises = []
        var jogos= response.data;
        
        for(i in jogos){
          jogos[i].last_update=new Date().toISOString().slice(0, 19).replace('T', ' ');
          queryPromises.push(Jogo.createJogoBasquetebol(jogos[i],connection));
          queryPromises.push(Partida.createPartidaBasquetebol(jogos[i],connection));
          queryPromises.push(JogoEquipa.createEquipaAjogar(jogos[i].id,jogos[i].team1,jogos[i].team2,connection));
        }
        const results = await Promise.all(queryPromises)
        connection.commit()
        connection.release()
        return results
    } catch (err) {
        console.log("error", err)
        connection.rollback()
        connection.release()
    }
  })
  }).catch(function (error) {
    console.error(error);
  });
}, 60000);

var requestTennis = setInterval(async function(){
  const delay = ms => new Promise(resolve => setTimeout(resolve, ms))
  await delay(10000);
  axios.get('https://unibet.p.rapidapi.com/matches-by-competition',{
    params:{competitionid:'tennis/grand_slam/australian_open'},
    headers:headers
  }).then(async function(response) {
    console.log(response.data)
    sql.getConnection(async function(err, connection) {
      try {
        connection.beginTransaction()
        const queryPromises = []
        var jogos= response.data;
        console.log(jogos)
        for(i in jogos){
          jogos[i].last_update=new Date().toISOString().slice(0, 19).replace('T', ' ');
          queryPromises.push(Jogo.createJogoTennis(jogos[i],connection));
          queryPromises.push(Partida.createPartidaBasquetebol(jogos[i],connection));
          queryPromises.push(JogoEquipa.createEquipaAjogar(jogos[i].id,jogos[i].team1,jogos[i].team2,connection));
        }
        const results = await Promise.all(queryPromises)
        connection.commit()
        connection.release()
        return results
    } catch (err) {
        console.log("error", err)
        connection.rollback()
        connection.release()
    }
  })
  }).catch(function (error) {
    console.error(error);
  });
}, 60000); /* */
