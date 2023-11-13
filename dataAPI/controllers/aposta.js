const Aposta = require("../models/aposta.js");
const Apostas = module.exports

Apostas.createAposta= (idBoletim,idPartida,conn)=>{
    return Aposta.create(idBoletim,idPartida,conn);
  }

Apostas.updateAposta = (idBoletim)=>{
    return Aposta.update(idBoletim);
  }